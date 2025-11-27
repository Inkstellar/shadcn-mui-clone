import { Box, Typography, Stack, Card, CardActionArea, CardContent, Chip } from '@mui/material';
import { FileText, ExternalLink } from 'lucide-react';
import { SearchResult } from '../../hooks/useMiniSearchDocs';

interface SearchResultsProps {
    results: SearchResult[];
    onResultClick: (result: SearchResult) => void;
}

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
    const highlightMatch = (text: string, maxLength: number = 200) => {
        if (!text) return '';
        const trimmed = text.trim().substring(0, maxLength);
        return trimmed + (text.length > maxLength ? '...' : '');
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Found <strong>{results.length}</strong> Documents matching keyword
            </Typography>
            <Stack spacing={2}>
                {results.map((result) => (
                    <Card
                        key={result.id}
                        elevation={1}
                        sx={{
                            transition: 'all 0.2s',
                            '&:hover': {
                                elevation: 4,
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <CardActionArea onClick={() => onResultClick(result)}>
                            <CardContent>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <FileText size={20} color="#1976d2" />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {result.title}
                                    </Typography>
                                    {result.category && (
                                        <Chip label={result.category} size="small" color="primary" variant="outlined" />
                                    )}
                                    <Box sx={{ flexGrow: 1 }} />
                                    <ExternalLink size={16} color="#666" />
                                </Stack>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    {highlightMatch(result.content.replace(/[#`*\n]/g, ' ').trim())}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>
                                    Score: {result.score.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
