import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

/**
 * OAuth callback handler component
 * This page is loaded after redirect from the auth server
 * The useEnterpriseAuth hook handles the actual callback processing
 */
export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // The useEnterpriseAuth hook in parent components will handle the callback
        // After a short delay, navigate to home if still on this page
        const timer = setTimeout(() => {
            navigate('/', { replace: true });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                }}
            >
                <CircularProgress size={48} />
                <Typography variant="h6" color="text.secondary">
                    Completing sign in...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Please wait while we verify your credentials
                </Typography>
            </Box>
        </Container>
    );
}
