import { Paper, TextField, InputAdornment, IconButton, Alert } from '@mui/material';
import { Search, X } from 'lucide-react';

interface HelpSearchBarProps {
    query: string;
    isReady: boolean;
    onQueryChange: (query: string) => void;
}

export function HelpSearchBar({ query, isReady, onQueryChange }: HelpSearchBarProps) {
    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    mb: 4,
                    width: query ? '100%' : '50%',
                    transition: 'all 0.5s ease 2s',
                    borderRadius: 2,
                    ml: query ? 0 : '25%',
                    '& .MuiFormControl-root': {
                        padding: '4px',
                        '& .MuiOutlinedInput-root': {
                            border: '1px solid #00a499',
                        }
                    },
                    "&:hover": {
                        transition: 'all 0.5s ease',
                        ml: 0,
                        width: '100%',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                        background: 'linear-gradient(135deg, #00a499 0%, #764ba2 100%)',
                        '& .MuiOutlinedInput-root': {
                            border: '1px solid transparent',
                        }
                    },
                    position: 'sticky',
                    top: '72px',
                    zIndex: 11000,
                }}
            >
                <TextField
                    fullWidth
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search documentation"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} color="#666" />
                            </InputAdornment>
                        ),
                        endAdornment: query && (
                            <InputAdornment position="end">
                                <IconButton onClick={() => onQueryChange('')}>
                                    <X size={20} color="#666" />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            transition: 'all 0.3s ease',
                            backgroundColor: 'white',
                            borderRadius: 1.5,
                            '& fieldset': { border: 'none' },
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            fontSize: '1rem',
                            '& .MuiInputBase-input': {
                                padding: '8px 14px',
                            },
                        },
                    }}
                />
            </Paper>

            {!isReady && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Indexing documentation...
                </Alert>
            )}
        </>
    );
}
