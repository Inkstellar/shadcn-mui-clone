import { Box, Typography, IconButton } from '@mui/material';
import { Menu } from 'lucide-react';

interface HelpHeaderProps {
    isMobile: boolean;
    onMenuClick: () => void;
}

export function HelpHeader({ isMobile, onMenuClick }: HelpHeaderProps) {
    return (
        <Box sx={{ mb: 6, textAlign: 'center' }}>
            {isMobile && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <IconButton
                        color="primary"
                        onClick={onMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <Menu size={24} />
                    </IconButton>
                </Box>
            )}
            <Typography variant="h1" sx={{ mb: '24px' }}>
                Help & Documentation
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
                Search our comprehensive documentation to find answers, guides, and examples for mui-cascade components.
            </Typography>
        </Box>
    );
}
