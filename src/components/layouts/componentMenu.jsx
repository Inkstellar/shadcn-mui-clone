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

  return (
    <MenuList sx={{ px: 1 }} >
      {/* Static items */}
      {staticItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <MenuItem
            key={item.name}
            component={Link}
            to={item.href}
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
          >
            <ListItemText primary={item.name} />
          </MenuItem>
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
              primary="Components"
               />
            {expandedSections['components'] ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </MenuItem>
          <Collapse in={expandedSections['components']} timeout="auto" unmountOnExit>
            {componentItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <MenuItem
                  key={item.name}
                  component={Link}
                  to={item.href}
                  sx={{
                    borderRadius: 1,
                    color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                    backgroundColor: isActive ? 'var(--secondary)' : 'transparent',
                    my: 0.5,
                    '&:hover': {
                      backgroundColor: 'var(--secondary)',
                      color: 'var(--primary)',
                    },
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    pl: 4,
                  }}
                >
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            })}
          </Collapse>
        </>
      )}
    </MenuList>
  );
}

