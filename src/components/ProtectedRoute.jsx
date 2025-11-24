import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';

/**
 * Protected Route component that requires authentication
 * Redirects to /login if user is not authenticated
 * Saves the attempted location to redirect back after login
 */
export default function ProtectedRoute({ children }) {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
