import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

/**
 * Post-logout callback handler component
 * Redirects back to the original path after logout completes
 */
export default function LogoutCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Get the stored path from before logout
        const postLogoutPath = sessionStorage.getItem('post_logout_redirect');
        
        if (postLogoutPath) {
            sessionStorage.removeItem('post_logout_redirect');
            // Navigate back to the stored path
            setTimeout(() => {
                navigate(postLogoutPath, { replace: true });
            }, 1000);
        } else {
            // Default to home if no stored path
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1000);
        }
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
                    Logged out successfully
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Redirecting you back...
                </Typography>
            </Box>
        </Container>
    );
}
