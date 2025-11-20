import { Collapse, ListItemText, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function componentMenu(navigation, location, expandedSections, toggleSection) {
  // Separate static items from component items
  const staticItems = navigation.filter(item =>
    item.href === '/' || item.href === '/assets'
  );
  const componentItems = navigation.filter(item =>
    item.href.startsWith('/components/')
  );

  function MenuListItem({name, href, children, isActive}){
    return <MenuItem
    key={name}
    component={Link}
    to={href}
    sx={{
      my: 0.5,
      borderRadius: 1,
      color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
      backgroundColor: isActive ? 'var(--secondary)' : 'transparent',
      '&:hover': {
        backgroundColor: 'var(--secondary)',
        color: 'var(--primary)',
      },
      textTransform: 'none',
    }}
  >{children}</MenuItem>
  }

  return (
    <MenuList sx={{ px: 1 }} >
      {/* Static items */}
      {staticItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <MenuListItem key={item.name} href={item.href} isActive={isActive}>
            <ListItemText secondary={item.name}/>
          </MenuListItem>
        );
      })}

      {/* Components section */}
      {componentItems.length > 0 && (
        <>
          <MenuItem
          component={Link}
              to="/components"
            sx={{
              borderRadius: 1,
              color: 'var(--muted-foreground)',
              '&:hover': {
                backgroundColor: 'var(--secondary)',
                color: 'var(--primary)',
              },
              
              textTransform: 'none',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onClick={() => toggleSection('components')}
          >
            <ListItemText
              secondary="Components"
               />
            {expandedSections['components'] ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </MenuItem>
          <Collapse in={expandedSections['components']} timeout="auto" unmountOnExit sx={{ pl: 3 }}>
            {componentItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <MenuListItem key={item.name} href={item.href} isActive={isActive}>
                  <ListItemText secondary={item.name} />
                </MenuListItem>
              );
            })}
          </Collapse>
        </>
      )}
    </MenuList>
  );
}

