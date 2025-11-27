import { Box, Typography, Stack, Chip } from '@mui/material';
import { SearchResult } from '../../hooks/useMiniSearchDocs';

interface CategoryFilterProps {
    categories: string[];
    results: SearchResult[];
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
}

export function CategoryFilter({ categories, results, selectedCategory, onCategorySelect }: CategoryFilterProps) {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                Filter by category:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                    label="All"
                    onClick={() => onCategorySelect(null)}
                    color={!selectedCategory ? 'primary' : 'default'}
                    variant={!selectedCategory ? 'filled' : 'outlined'}
                />
                {categories.map((category) => {
                    const count = results.filter(r => r.category === category).length;
                    return (
                        <Chip
                            key={category}
                            label={`${category} (${count})`}
                            onClick={() => onCategorySelect(category === selectedCategory ? null : category)}
                            color={selectedCategory === category ? 'primary' : 'default'}
                            variant={selectedCategory === category ? 'filled' : 'outlined'}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}
