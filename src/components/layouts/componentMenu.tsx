import { Chip, Collapse, ListItemText, MenuItem, MenuList, Stack, useTheme } from '@mui/material';
import { Link, Location } from 'react-router-dom';
import { ChevronDown, ChevronRight, TestTube2, Package, StopCircle } from 'lucide-react';

interface NavigationItem {
    name: string;
    href: string;
    icon: any;
    newitem?: boolean;
    experimental?: boolean;
    deprecated?: boolean;
}

interface MenuListItemProps {
    name: string;
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}

interface ExpandedSections {
    [key: string]: boolean;
}

interface Section {
    key: string;
    title: string;
    items: NavigationItem[];
}

export default function componentMenu(
    navigation: NavigationItem[],
    location: Location,
    expandedSections: ExpandedSections,
    toggleSection: (section: string) => void
) {
    const theme = useTheme();

    // Separate static items from categorized items
    const staticItems = navigation.filter(
        (item) => item.href === '/' || item.href === '/assets' || item.href === '/mcp'
    );

    // Group items by their path prefix (e.g., /components/, /forms/, /hooks/, etc.)
    const categorizedItems = navigation.filter(
        (item) => !staticItems.includes(item)
    );

    // Extract unique sections from paths
    const sections: Section[] = [];
    const sectionMap = new Map<string, NavigationItem[]>();

    categorizedItems.forEach((item) => {
        // Extract section from path (e.g., /components/button -> components)
        const pathParts = item.href.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            const sectionKey = pathParts[0];
            if (!sectionMap.has(sectionKey)) {
                sectionMap.set(sectionKey, []);
            }
            sectionMap.get(sectionKey)!.push(item);
        }
    });

    // Convert map to sections array
    sectionMap.forEach((items, key) => {
        sections.push({
            key,
            title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            items,
        });
    });

    function MenuListItem({ name, href, children, isActive }: MenuListItemProps) {
        return (
            <MenuItem
                key={name}
                component={Link}
                to={href}
                sx={{
                    my: 0.5,
                    borderRadius: 1,
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.primary.main,
                    },
                    textTransform: 'none',
                }}
            >
                {children}
            </MenuItem>
        );
    }

    return (
        <MenuList sx={{ px: 1 }}>
            {/* Static items */}
            {staticItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                    <MenuListItem key={item.name} name={item.name} href={item.href} isActive={isActive}>
                        <ListItemText secondary={item.name} />
                    </MenuListItem>
                );
            })}

            {/* Dynamic sections */}
            {sections.map((section) => (
                <div key={section.key}>
                    <MenuItem
                        sx={{
                            borderRadius: 1,
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                                color: theme.palette.primary.main,
                            },
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                        onClick={() => toggleSection(section.key)}
                    >
                        <ListItemText secondary={section.title} />
                        {expandedSections[section.key] ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </MenuItem>
                    <Collapse in={expandedSections[section.key]} timeout="auto" unmountOnExit sx={{ pl: 3 }}>
                        {section.items.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <MenuListItem key={item.name} name={item.name} href={item.href} isActive={isActive}>
                                    <Stack gap={1} direction="row" alignItems="center">
                                        <ListItemText secondary={item.name} />
                                        {item.newitem && <Package size={16} color={'#00a499'} />}
                                        {item.experimental && <TestTube2 size={16} color={theme.palette.error.main} />}
                                        {item.deprecated && (
                                            <StopCircle size={16} color={theme.palette.error.main} />
                                        )}
                                    </Stack>
                                </MenuListItem>
                            );
                        })}
                    </Collapse>
                </div>
            ))}
        </MenuList>
    );
}
