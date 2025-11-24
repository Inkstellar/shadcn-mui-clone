import React, { createContext, useContext } from 'react';
import useEnterpriseAuth, { EnterpriseAuthState } from '../hooks/useEnterpriseAuth';

const AuthContext = createContext<EnterpriseAuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useEnterpriseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth(): EnterpriseAuthState {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
