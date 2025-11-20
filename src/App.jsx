import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu, Sun, Moon, Github } from 'lucide-react';
import { createCustomTheme } from 'mui-cascade';
import HomePage from './pages/HomePage';
import DesignAssets from './pages/DesignAssets';
import Components from './pages/Components';
import componentMenu from './components/layouts/componentMenu';
import { componentDocsRegistry } from 'mui-cascade';
import { navigation } from './navigation';
import './app.css';

const drawerWidth = 280;

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const currentTheme = createCustomTheme(darkMode ? 'dark' : 'light');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(currentTheme);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #18181b 0%, #52525b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cascade UI
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'var(--muted-foreground)', marginTop: '4px' }}
        >
          FE fundinfo React UI Library
        </Typography>
      </Box>

      {componentMenu(navigation, location, expandedSections, toggleSection)}
    </Box>
  );



  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            border: 'none',
            backdropFilter: 'blur(10px)',

          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <Menu />
            </IconButton>

            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {navigation.find(nav => nav.href === location.pathname)?.name || 'Cascade UI'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Sun /> : <Moon />}
              </IconButton>

              <Button
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Github />}
                sx={{
                  color: 'var(--muted-foreground)',
                  '&:hover': {
                    color: 'var(--primary)',
                    backgroundColor: 'var(--secondary)',
                  },
                }}
              >
                GitHub
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: 'var(--background)',
                borderRight: '1px solid',
                borderColor: 'var(--border)',
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: 'var(--background)',
                borderRight: '1px solid',
                borderColor: 'var(--border)',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            backgroundColor: 'var(--muted)',
          }}
        >
          <Toolbar />

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/components" element={<Components />} />
              {/* Dynamic component doc routes */}
              {Object.entries(componentDocsRegistry).map(([key, { component: Component, path }]) => (
                <Route key={key} path={path} element={<Component />} />
              ))}
              <Route path="/assets" element={<DesignAssets />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
