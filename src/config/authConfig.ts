/**
 * Enterprise Auth runtime configuration loader.
 * Replaces static MSAL configuration with a dynamic fetch of OpenID Connect settings.
 * The expected JSON shape is documented in enterprise-auth.md (env-config.json).
 */
export interface EnterpriseAuthConfigRaw {
    publicUrl?: string;
    auth: {
        authority: string;
        client_id: string;
        redirect_uri: string;
        post_logout_redirect_uri?: string;
        response_type?: string;
        scope: string;
        automaticSilentRenew?: boolean;
        loadUserInfo?: boolean;
        monitorAnonymousSession?: boolean;
        filterProtocolClaims?: boolean;
        revokeAccessTokenOnSignout?: boolean;
    };
}

const ENV_FALLBACK: EnterpriseAuthConfigRaw = {
    publicUrl: (import.meta as any).env.BASE_URL || 'http://localhost:8080',
    auth: {
        authority: (import.meta as any).env.VITE_AUTH_AUTHORITY || 'https://prep-auth.fefundinfo.com',
        client_id: (import.meta as any).env.VITE_AZURE_CLIENT_ID || 'ams-portal-local',
        redirect_uri: (import.meta as any).env.VITE_AZURE_REDIRECT_URI || 'http://localhost:8080/signin-oidc',
        post_logout_redirect_uri: (import.meta as any).env.VITE_AZURE_REDIRECT_URI || 'http://localhost:8080/',
        response_type: 'code',
        scope: (import.meta as any).env.VITE_AUTH_SCOPE || 'openid profile offline_access ams-read-write',
        automaticSilentRenew: false,
        loadUserInfo: true,
        monitorAnonymousSession: true,
        filterProtocolClaims: true,
        revokeAccessTokenOnSignout: true,
    },
};

/**
 * Fetch config from /config/env-config.json, falling back to environment variables.
 */
export async function loadEnterpriseAuthConfig(): Promise<EnterpriseAuthConfigRaw> {
    try {
        const res = await fetch('/config/env-config.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Config fetch failed');
        const json = await res.json();
        if (!json.auth || !json.auth.authority || !json.auth.client_id || !json.auth.redirect_uri || !json.auth.scope) {
            console.warn('[authConfig] Invalid config shape received; using fallback');
            return ENV_FALLBACK;
        }
        return json as EnterpriseAuthConfigRaw;
    } catch (e) {
        console.warn('[authConfig] Using fallback auth configuration:', e instanceof Error ? e.message : e);
        return ENV_FALLBACK;
    }
}

export type { EnterpriseAuthConfigRaw as AuthConfig };
