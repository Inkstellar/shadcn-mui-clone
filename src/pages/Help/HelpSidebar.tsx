import { Box, Typography, List, ListItemButton, ListItemText, Collapse, Chip, Drawer, useTheme } from '@mui/material';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { DocItem } from '../../hooks/useMiniSearchDocs';

interface HelpSidebarProps {
    docsByCategory: Record<string, DocItem[]>;
    expandedSections: Record<string, boolean>;
    expandedDoc: string | null;
    sidebarOpen: boolean;
    isMobile: boolean;
    onToggleSection: (category: string) => void;
    onDocClick: (doc: DocItem) => void;
    onClose: () => void;
}

const DRAWER_WIDTH = 280;

export function HelpSidebar({
    docsByCategory,
    expandedSections,
    expandedDoc,
    sidebarOpen,
    isMobile,
    onToggleSection,
    onDocClick,
    onClose
}: HelpSidebarProps) {
    const theme = useTheme();

    const renderSidebarContent = () => (
        <Box sx={{ width: DRAWER_WIDTH, height: '100%', overflowY: 'auto', overflowX: 'hidden', p: 0, position: 'sticky', top: 64 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, px: 2 }}>
                Documentation
            </Typography>
            <List sx={{ width: '100%' }}>
                {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
                    <Box key={category}>
                        <ListItemButton
                            onClick={() => onToggleSection(category)}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                py: '6px',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemText
                                secondary={category}
                                secondaryTypographyProps={{
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                }}
                                sx={{ m: 0 }}
                            />
                            <Chip label={categoryDocs.length} size="small" sx={{ ml: 1, minWidth: 24 }} />
                            {expandedSections[category] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </ListItemButton>
                        <Collapse in={expandedSections[category]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {categoryDocs.map((doc) => (
                                    <ListItemButton
                                        key={doc.id}
                                        onClick={() => {
                                            onDocClick(doc);
                                            if (isMobile) onClose();
                                        }}
                                        selected={expandedDoc === doc.id}
                                        sx={{
                                            ml: 2,
                                            pl: 2,
                                            borderRadius: 1,
                                            mb: 0.5,
                                            py: '2px',
                                            color: theme.palette.grey[500],
                                            '&.Mui-selected': {
                                                backgroundColor: theme.palette.action.selected,
                                                color: theme.palette.text.secondary,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.action.hover,
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={doc.title}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </Box>
                ))}
            </List>
        </Box>
    );

    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={sidebarOpen}
                onClose={onClose}
                sx={{
                    border: 'none',
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {renderSidebarContent()}
            </Drawer>
        );
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                background: 'transparent',
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    position: 'sticky',
                    top: 64,
                    border: 'none',
                    height: 'auto',
                    '&>.MuiBox-root': {
                        p: 0
                    }
                },
            }}
        >
            {renderSidebarContent()}
        </Drawer>
    );
}

export const SIDEBAR_WIDTH = DRAWER_WIDTH;
