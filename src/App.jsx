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
import CascadeMCP from './pages/CascadeMCP';
import componentMenu from './components/layouts/componentMenu.tsx';
import { componentDocsRegistry } from 'mui-cascade';
import { navigation } from './navigation';
import './app.css';
import logoImage from '../assets/images/fefundinfo_logo_colour_rgb.svg';

const drawerWidth = 280;

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const currentTheme = createCustomTheme(darkMode ? 'dark' : 'light');

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDrawerOpen(!drawerOpen);
    }
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
        <img src={logoImage} alt="FE fundinfo Logo" style={{ maxWidth: '200px', marginBottom: '16px' }} />
        <Typography variant="h6">Cascade UI</Typography>
        <Typography
          variant="body2"
          sx={{ color: currentTheme.palette.text.secondary, marginTop: '4px' }}
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
            width: { md: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
            ml: { md: drawerOpen ? `${drawerWidth}px` : 0 },
            backgroundColor: currentTheme.palette.background.default,
            color: currentTheme.palette.text.primary,
            border: 'none',
            backdropFilter: 'blur(10px)',
            transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1), width 225ms cubic-bezier(0, 0, 0.2, 1)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
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
                  color: currentTheme.palette.text.secondary,
                  '&:hover': {
                    color: currentTheme.palette.primary.main,
                    backgroundColor: currentTheme.palette.action.hover,
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
          sx={{ width: { md: drawerOpen ? drawerWidth : 0 }, transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)', flexShrink: { md: 0 } }}
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
                borderRight: 'none',
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: currentTheme.palette.background.default,
                borderRight: '1px solid',
                borderColor: currentTheme.palette.divider,
                transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1)',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
            minHeight: '100vh',
            backgroundColor: currentTheme.palette.background.paper,
            transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)',
          }}
        >
          <Toolbar />

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/components" element={<Components />} />
              <Route path="/mcp" element={<CascadeMCP />} />
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
