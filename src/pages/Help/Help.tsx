import { useState, useMemo } from 'react';
import {
    Container,
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useMiniSearchDocs, SearchResult } from '../../hooks/useMiniSearchDocs';
import { useNavigate } from 'react-router-dom';
import { HelpSidebar, SIDEBAR_WIDTH } from './HelpSidebar';
import { HelpHeader } from './HelpHeader';
import { HelpSearchBar } from './HelpSearchBar';
import { CategoryFilter } from './CategoryFilter';
import { SearchResults } from './SearchResults';
import { NoResults } from './NoResults';
import { BrowseByCategory } from './BrowseByCategory';
import { ExpandedDocumentView } from './ExpandedDocumentView';

export default function Help() {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        'Guides': true,
        'Help': false,
        'Design Guidelines': false,
        'UX Strategy': false,
        'Introduction': false,
    });
    const { search, isReady, docs } = useMiniSearchDocs();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Get search results
    const results = useMemo(() => {
        if (!query.trim()) return [];
        return search(query);
    }, [query, search]);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(docs.map(doc => doc.category).filter(Boolean));
        return Array.from(cats);
    }, [docs]);

    // Group docs by category for sidebar
    const docsByCategory = useMemo(() => {
        const grouped: Record<string, typeof docs> = {};
        docs.forEach(doc => {
            const category = doc.category || 'Other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(doc);
        });
        // Sort docs within each category by title
        Object.keys(grouped).forEach(key => {
            grouped[key].sort((a, b) => a.title.localeCompare(b.title));
        });
        return grouped;
    }, [docs]);

    const toggleSection = (category: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Filter results by category if selected
    const filteredResults = useMemo(() => {
        if (!selectedCategory) return results;
        return results.filter(r => r.category === selectedCategory);
    }, [results, selectedCategory]);

    const handleResultClick = (result: SearchResult | { id?: string; path?: string }) => {
        if (result.path) {
            if (result.path.startsWith('/components/')) {
                navigate(result.path);
            } else {
                // For help page items, expand the document inline
                const hash = result.path.split('#')[1];
                if (hash && result.id) {
                    setExpandedDoc(result.id);
                    setQuery(''); // Clear search to show expanded view
                    // Scroll after a brief delay to allow render
                    setTimeout(() => {
                        const element = document.getElementById(result.id || hash);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            }
        }
    };

    const renderDocumentContent = (doc: typeof docs[0]) => {
        // Simple markdown-like rendering
        const lines = doc.content.split('\n');
        return (
            <Box sx={{ '& > *': { mb: 2 } }}>
                {lines.map((line, idx) => {
                    if (line.startsWith('# ')) {
                        return <Typography key={idx} variant="h4" sx={{ fontWeight: 600, mt: 3 }}>{line.substring(2)}</Typography>;
                    } else if (line.startsWith('## ')) {
                        return <Typography key={idx} variant="h5" sx={{ fontWeight: 600, mt: 2 }}>{line.substring(3)}</Typography>;
                    } else if (line.startsWith('### ')) {
                        return <Typography key={idx} variant="h6" sx={{ fontWeight: 600, mt: 2 }}>{line.substring(4)}</Typography>;
                    } else if (line.startsWith('- ') || line.startsWith('* ')) {
                        return <Typography key={idx} variant="body1" sx={{ pl: 2 }}>• {line.substring(2)}</Typography>;
                    } else if (line.startsWith('```')) {
                        return null; // Skip code block markers for simple rendering
                    } else if (line.trim()) {
                        return <Typography key={idx} variant="body1" sx={{ color: 'text.secondary' }}>{line}</Typography>;
                    }
                    return null;
                })}
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <HelpSidebar
                docsByCategory={docsByCategory}
                expandedSections={expandedSections}
                expandedDoc={expandedDoc}
                sidebarOpen={sidebarOpen}
                isMobile={isMobile}
                onToggleSection={toggleSection}
                onDocClick={handleResultClick}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
                }}
            >
                <Container maxWidth="md" sx={{ backgroundColor: theme.palette.grey[100], borderRadius: 2, p: 4 }}>
                    {/* Header */}
                    <HelpHeader
                        isMobile={isMobile}
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                    {/* Search Bar */}
                    <HelpSearchBar
                        query={query}
                        isReady={isReady}
                        onQueryChange={setQuery}
                    />

                    {/* Category Filter */}
                    {query && results.length > 0 && (
                        <CategoryFilter
                            categories={categories}
                            results={results}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                        />
                    )}

                    {/* Search Results */}
                    {query && filteredResults.length > 0 && (
                        <SearchResults
                            results={filteredResults}
                            onResultClick={handleResultClick}
                        />
                    )}

                    {/* No Results */}
                    {query && filteredResults.length === 0 && (
                        <NoResults
                            query={query}
                            onClearSearch={() => setQuery('')}
                        />
                    )}

                    {/* Expanded Document View */}
                    {expandedDoc && !query && (
                        <>
                            {docs
                                .filter(doc => doc.id === expandedDoc)
                                .map((doc) => (
                                    <ExpandedDocumentView
                                        key={doc.id}
                                        doc={doc}
                                        onClose={() => setExpandedDoc(null)}
                                        renderContent={renderDocumentContent}
                                    />
                                ))}
                        </>
                    )}

                    {!query && !expandedDoc && (
                        <BrowseByCategory
                            categories={categories}
                            docs={docs}
                            onCategoryClick={(category) => setQuery(category)}
                        />
                    )}
                </Container>
            </Box>
        </Box>
    );
}
