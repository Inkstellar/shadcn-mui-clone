import { Paper, Typography, Stack, Chip } from '@mui/material';
import { Search } from 'lucide-react';

interface NoResultsProps {
    query: string;
    onClearSearch: () => void;
}

export function NoResults({ query, onClearSearch }: NoResultsProps) {
    return (
        <Paper sx={{ p: 6, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Search size={48} color="#999" style={{ marginBottom: '16px' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
                No results found for "{query}"
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Try different keywords or browse our featured documentation below.
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
                <Chip label="Clear search" onClick={onClearSearch} color="primary" />
            </Stack>
        </Paper>
    );
}
