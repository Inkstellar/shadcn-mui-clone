# Enterprise Auth Hook

This document describes the reusable enterprise authentication hook `useEnterpriseAuth` for React applications integrating with the FE fundinfo Enterprise Identity platform (OpenID Connect / OAuth2 Authorization Code with PKCE).

## Goals
- Runtime configuration (no rebuild when endpoints change)
- Minimal surface for consuming apps: user state, login, logout, token access
- Works in development without forcing auth; enables auth when configuration is present
- Extensible for silent renew / role-based authorization

## Installation

Add dependency (already added here):
```bash
yarn add oidc-client-ts
```

## Configuration
Provided via `public/config/env-config.json` loaded at runtime:
```json
{
  "publicUrl": "https://localhost:8080",
  "auth": {
    "authority": "https://prep-auth.fefundinfo.com",
    "client_id": "ams-portal-local",
    "redirect_uri": "http://localhost:8080/signin-oidc",
    "post_logout_redirect_uri": "http://localhost:8080/",
    "response_type": "code",
    "scope": "openid profile offline_access ams-read-write",
    "automaticSilentRenew": false,
    "loadUserInfo": true,
    "monitorAnonymousSession": true,
    "filterProtocolClaims": true,
    "revokeAccessTokenOnSignout": true
  }
}
```

Required keys: `authority`, `client_id`, `redirect_uri`, `scope`. Optional: `post_logout_redirect_uri`, `automaticSilentRenew`, others.

## Hook API
```ts
interface EnterpriseAuthState {
  user: User | null;                 // Raw oidc-client user object
  isAuthenticated: boolean;          // Convenience flag
  loading: boolean;                  // Init / callback processing
  error: Error | null;               // Initialization or renewal errors
  signIn: () => Promise<void>;       // Starts redirect login
  signOut: () => Promise<void>;      // Starts redirect logout
  getAccessToken: () => Promise<string | null>; // Current valid access token
  refreshUser: () => Promise<void>;  // Attempt silent or redirect renew
}
```

## Usage Example
```tsx
import React from 'react';
import useEnterpriseAuth from '../hooks/useEnterpriseAuth';

export function AppShell() {
  const { user, isAuthenticated, loading, error, signIn, signOut } = useEnterpriseAuth();

  if (loading) return <div>Loading auth…</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isAuthenticated) return <button onClick={signIn}>Sign In</button>;

  return (
    <div>
      <header>
        <span>Welcome {user?.profile?.name || user?.profile?.sub}</span>
        <button onClick={signOut}>Sign Out</button>
      </header>
      {/* Protected application routes here */}
    </div>
  );
}
```

### Protecting Routes
```tsx
import { Navigate } from 'react-router-dom';
import useEnterpriseAuth from '../hooks/useEnterpriseAuth';

export function Protected({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useEnterpriseAuth();
  if (loading) return <div>Loading…</div>;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
```

### Attaching Tokens to Fetch / Axios
```ts
import useEnterpriseAuth from '../hooks/useEnterpriseAuth';

export function useAuthorizedFetch() {
  const { getAccessToken } = useEnterpriseAuth();
  return async (input: RequestInfo, init: RequestInit = {}) => {
    const token = await getAccessToken();
    const headers = new Headers(init.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  };
}
```

## Redirect Callback Handling
The hook auto-detects a pathname containing `signin-oidc` and invokes `signinCallback()`. After processing it replaces the URL to remove the callback path.

For applications using dedicated callback routes, ensure the route renders a component that simply mounts the app shell (nothing else needed):
```tsx
export function AuthCallback() {
  return <div>Completing sign-in…</div>; // Hook will process automatically
}
```

## Silent Renewal
Enable by setting `automaticSilentRenew: true` in config and providing a `silent_redirect_uri` (not included yet). Future enhancement: extend config & hook to accept `silent_redirect_uri`; implement an invisible iframe page at that path.

## Error Handling & Refresh
- Use `error` state to surface initialization or silent renew issues.
- Call `refreshUser()` before critical operations if long inactivity may have occurred.

## Security Considerations
- Use HTTPS for all production endpoints.
- Prefer `httpOnly` secure cookies for tokens if backend-assisted; current model stores tokens in memory (never localStorage) via `oidc-client-ts` default.
- Avoid exposing sensitive claims unnecessarily.
- Consider role/permission mapping layer wrapping `user.profile.roles` when available.

## Extensibility Points
1. Role-based helper: `hasRole(role: string)` utility built on `user?.profile?.roles`.
2. Token refresh polling: interval calling `refreshUser()` when near expiry.
3. Central `AuthProvider`: could wrap hook to share derived selectors; current singleton `UserManager` already prevents duplication.

## Migration Guidance
To adopt in another enterprise React app:
1. Copy `useEnterpriseAuth.ts` into `src/hooks`.
2. Provide `public/config/env-config.json` with environment-specific values.
3. Add login and logout UI states using the hook.
4. Wrap protected routes with a simple guard component.
5. Layer role-based checks as needed.

## Future Enhancements
- Add `silent_redirect_uri` support.
- Integrate refresh token rotation monitoring.
- Provide testing utilities (mock manager & user).
- Add SSR compatibility wrapper if needed for hybrid rendering.

---
For architectural background see `docs/architecture/authentication.md`.
