import { useEffect, useState, useCallback, useRef } from 'react';
import { UserManager, User } from 'oidc-client-ts';

interface EnterpriseAuthConfigRaw {
  publicUrl?: string;
  auth: {
    authority: string;
    client_id: string;
    redirect_uri: string;
    post_logout_redirect_uri?: string;
    response_type?: string;
    scope: string;
    automaticSilentRenew?: boolean;
    validateSubOnSilentRenew?: boolean; // not directly used but retained
    loadUserInfo?: boolean;
    monitorAnonymousSession?: boolean;
    filterProtocolClaims?: boolean;
    revokeAccessTokenOnSignout?: boolean;
    response_mode?: string;
  };
}

export interface EnterpriseAuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  refreshUser: () => Promise<void>;
}

let sharedManager: UserManager | null = null;

function createUserManager(config: EnterpriseAuthConfigRaw['auth']): UserManager {
  return new UserManager({
    authority: config.authority,
    client_id: config.client_id,
    redirect_uri: config.redirect_uri,
    post_logout_redirect_uri: config.post_logout_redirect_uri,
    response_type: config.response_type || 'code',
    scope: config.scope,
    automaticSilentRenew: config.automaticSilentRenew ?? false,
    loadUserInfo: config.loadUserInfo ?? true,
    monitorAnonymousSession: config.monitorAnonymousSession ?? true,
    filterProtocolClaims: config.filterProtocolClaims ?? true,
    revokeTokensOnSignout: config.revokeAccessTokenOnSignout ?? true,
    response_mode: 'query',
  });
}

export function useEnterpriseAuth(): EnterpriseAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    async function init() {
      try {
        let config: EnterpriseAuthConfigRaw;
        
        // Try runtime config first
        try {
          const res = await fetch('/config/env-config.json');
          if (res.ok) {
            config = await res.json();
          } else {
            throw new Error('Config not found, using fallback');
          }
        } catch {
          // Fallback to environment variables
          console.warn('[useEnterpriseAuth] Using fallback configuration from environment variables');
          config = {
            auth: {
              authority: (import.meta as any).env.VITE_AUTH_AUTHORITY || 'https://prep-auth.fefundinfo.com',
              client_id: (import.meta as any).env.VITE_AZURE_CLIENT_ID || 'ams-portal-local',
              redirect_uri: (import.meta as any).env.VITE_AZURE_REDIRECT_URI || 'http://localhost:8080/signin-oidc',
              post_logout_redirect_uri: (import.meta as any).env.VITE_AZURE_POST_LOGOUT_REDIRECT_URI || 'http://localhost:8080/signout-callback-oidc',
              response_type: 'code',
              scope: (import.meta as any).env.VITE_AUTH_SCOPE || 'ams-read-write email openid profile roles phone offline_access mailservice-mail poc-notificationservice-api-write AMSPortal',
              automaticSilentRenew: false,
              loadUserInfo: true,
              monitorAnonymousSession: true,
              filterProtocolClaims: true,
              revokeAccessTokenOnSignout: true,
              response_mode: 'query',
            }
          };
        }

        if (!sharedManager) {
          sharedManager = createUserManager(config.auth);
          console.log('[useEnterpriseAuth] Initialized with config:', {
            authority: config.auth.authority,
            client_id: config.auth.client_id,
            redirect_uri: config.auth.redirect_uri,
            scope: config.auth.scope,
          });
        }

        // Try existing user from storage first
        const existingUser = await sharedManager.getUser();
        if (existingUser && !existingUser.expired) {
          setUser(existingUser);
          setLoading(false);
          
          // Check if returning from logout and redirect to stored path
          const postLogoutPath = sessionStorage.getItem('post_logout_redirect');
          if (postLogoutPath && window.location.pathname === '/') {
            sessionStorage.removeItem('post_logout_redirect');
            window.history.replaceState({}, document.title, postLogoutPath);
          }
          
          return;
        }

        // If we are returning from a redirect callback, process it
        if (window.location.pathname.includes('signin-oidc')) {
          try {
            const callbackUser = await sharedManager.signinCallback();
            setUser(callbackUser ?? null);
          } catch (e) {
            setError(e instanceof Error ? e : new Error('Callback processing failed'));
          } finally {
            // Replace history to clean callback url
            window.history.replaceState({}, document.title, config.auth.redirect_uri.replace('/signin-oidc', '/'));
          }
        }
        
        // Check if just returned from logout (no user but have redirect path)
        const postLogoutPath = sessionStorage.getItem('post_logout_redirect');
        if (!existingUser && postLogoutPath) {
          // User is logged out, clear the stored path
          sessionStorage.removeItem('post_logout_redirect');
        }

        setLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Unknown auth init error'));
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!sharedManager) return;
    
    const onUserLoaded = (u: User) => setUser(u);
    const onUserUnloaded = () => setUser(null);
    const onUserSignedOut = () => setUser(null);
    const onSilentRenewError = (e: unknown) => {
      if (e instanceof Error) setError(e);
    };

    sharedManager.events.addUserLoaded(onUserLoaded);
    sharedManager.events.addUserUnloaded(onUserUnloaded);
    sharedManager.events.addUserSignedOut(onUserSignedOut);
    sharedManager.events.addSilentRenewError(onSilentRenewError);
    
    return () => {
      if (sharedManager) {
        sharedManager.events.removeUserLoaded(onUserLoaded);
        sharedManager.events.removeUserUnloaded(onUserUnloaded);
        sharedManager.events.removeUserSignedOut(onUserSignedOut);
        sharedManager.events.removeSilentRenewError(onSilentRenewError);
      }
    };
  }, []); // Remove sharedManager dependency to prevent re-renders

  const signIn = useCallback(async () => {
    if (!sharedManager) {
      setError(new Error('Auth manager not initialized. Please wait for initialization to complete.'));
      throw new Error('Auth manager not initialized');
    }
    await sharedManager.signinRedirect();
  }, []);

  const signOut = useCallback(async () => {
    if (!sharedManager) {
      setError(new Error('Auth manager not initialized. Please wait for initialization to complete.'));
      throw new Error('Auth manager not initialized');
    }
    // Store current path before logout to redirect back after
    const currentPath = window.location.pathname + window.location.search;
    sessionStorage.setItem('post_logout_redirect', currentPath);
    await sharedManager.signoutRedirect();
  }, []);

  const getAccessToken = useCallback(async () => {
    if (!sharedManager) return null;
    const current = await sharedManager.getUser();
    if (!current || current.expired) return null;
    return current.access_token || null;
  }, []);

  const refreshUser = useCallback(async () => {
    if (!sharedManager) return;
    try {
      const current = await sharedManager.getUser();
      if (current && current.expired) {
        // Trigger silent renew if configured, else full redirect
        if ((sharedManager.settings as any).automaticSilentRenew) {
          await sharedManager.signinSilent();
        } else {
          await sharedManager.signinRedirect();
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Refresh failed'));
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user && !user.expired,
    loading,
    error,
    signIn,
    signOut,
    getAccessToken,
    refreshUser,
  };
}

export default useEnterpriseAuth;
