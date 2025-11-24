import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesignAssets from './pages/DesignAssets';
import Components from './pages/Components';
import CascadeMCP from './pages/CascadeMCP';
import Login from './pages/servicePages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { componentDocsRegistry } from 'mui-cascade';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<Components />} />
            <Route
                path="/cascade-mcp"
                element={
                    <ProtectedRoute>
                        <CascadeMCP />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            {/* Dynamic component doc routes */}
            {Object.entries(componentDocsRegistry).map(([key, { component: Component, path }]) => (
                <Route key={key} path={path} element={<Component />} />
            ))}
            <Route path="/assets" element={<DesignAssets />} />
        </Routes>
    );
}
