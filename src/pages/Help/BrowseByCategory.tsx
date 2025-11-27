import { Box, Typography, Stack, Card, CardContent } from '@mui/material';
import { DocItem } from '../../hooks/useMiniSearchDocs';

interface BrowseByCategoryProps {
    categories: string[];
    docs: DocItem[];
    onCategoryClick: (category: string) => void;
}

export function BrowseByCategory({ categories, docs, onCategoryClick }: BrowseByCategoryProps) {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Browse by Keywords
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {categories.map((category) => {
                    const count = docs.filter(doc => doc.category === category).length;
                    return (
                        <Card
                            key={category}
                            sx={{
                                minWidth: 200,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 4,
                                },
                            }}
                            onClick={() => onCategoryClick(category || '')}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {category}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {count} {count === 1 ? 'article' : 'articles'}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}
