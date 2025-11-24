import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../../config/authConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Stack,
    Divider,
    Link,
} from '@mui/material';
import { Button, Modal } from 'mui-cascade';
import { LogIn, Shield } from 'lucide-react';
import { privacyPolicy, termsAndConditions } from '../../data/legal';

export default function Login() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
    const [termsOpen, setTermsOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);

    // Get the page user was trying to access, or default to homepage
    const from = (location.state as any)?.from?.pathname || '/';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest);
            // After successful login, redirect to intended page
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Don't render login form if already authenticated
    if (isAuthenticated) {
        return null;
    }

    return (
        <Container maxWidth="sm" sx={{ py: 0 }}>
            <Box
                sx={{
                    minHeight: 'calc(100vh - 120px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        width: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)', // Safari support
                    }}
                >
                    <Stack spacing={3} alignItems="center">
                        {/* Logo/Icon */}
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 2,
                                backgroundColor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Shield size={32} color="white" />
                        </Box>

                        {/* Title */}
                        <Stack spacing={1} alignItems="center">
                            <Typography variant="h4" fontWeight={600}>
                                Welcome to Cascade UI
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Sign in with your Microsoft account to continue
                            </Typography>
                        </Stack>

                        <Divider sx={{ width: '100%' }} />

                        {/* Login Button */}
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={<LogIn size={20} />}
                            onClick={handleLogin}
                            sx={{ py: 1.5 }}
                        >
                            Sign in with Microsoft
                        </Button>

                        {/* Footer */}
                        <Typography variant="caption" color="text.secondary" textAlign="center">
                            By signing in, you agree to our{' '}
                            <Link
                                component="button"
                                variant="caption"
                                onClick={() => setTermsOpen(true)}
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    color: 'primary.main',
                                }}
                            >
                                Terms & Conditions
                            </Link>
                            {' '}and{' '}
                            <Link
                                component="button"
                                variant="caption"
                                onClick={() => setPrivacyOpen(true)}
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    color: 'primary.main',
                                }}
                            >
                                Privacy Policy
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>

            {/* Terms & Conditions Modal */}
            <Modal
                open={termsOpen}
                onClose={() => setTermsOpen(false)}
                title="Terms & Conditions"
                maxWidth="md"
            >
                <Box sx={{ maxHeight: '60vh', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                        {termsAndConditions}
                    </Typography>
                </Box>
            </Modal>

            {/* Privacy Policy Modal */}
            <Modal
                open={privacyOpen}
                onClose={() => setPrivacyOpen(false)}
                title="Privacy Policy"
                maxWidth="md"
            >
                <Box sx={{ maxHeight: '60vh', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                        {privacyPolicy}
                    </Typography>
                </Box>
            </Modal>
        </Container>
    );
}
