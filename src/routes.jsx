import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesignAssets from './pages/DesignAssets';
import Components from './pages/Components';
import CascadeMCP from './pages/CascadeMCP/CascadeMCP';
import MCPLogs from './pages/MCPLogs';
import Login from './pages/servicePages/Login';
import AuthCallback from './pages/servicePages/AuthCallback';
import LogoutCallback from './pages/servicePages/LogoutCallback';
import ProtectedRoute from './components/ProtectedRoute';
import { componentDocsRegistry } from 'mui-cascade';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<Components />} />
            <Route
                path="/mcp/cascade"
                element={
                    <ProtectedRoute>
                        <CascadeMCP />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/mcp/logs"
                element={
                    <ProtectedRoute>
                        <MCPLogs />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signin-oidc" element={<AuthCallback />} />
            <Route path="/signout-callback-oidc" element={<LogoutCallback />} />
            {/* Dynamic component doc routes */}
            {Object.entries(componentDocsRegistry).map(([key, { component: Component, path }]) => (
                <Route key={key} path={path} element={<Component />} />
            ))}
            <Route path="/assets" element={<DesignAssets />} />
        </Routes>
    );
}
