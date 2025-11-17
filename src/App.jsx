import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import { createCustomTheme, themeOptions } from './theme/theme';
import HomePage from './pages/HomePage';
import DesignAssets from './pages/DesignAssets';


const ButtonDoc = lazy(() => import('mui-cascade/docs/ButtonDoc'));
const CardDoc = lazy(() => import('mui-cascade/docs/CardDoc'));
const InputDoc = lazy(() => import('mui-cascade/docs/InputDoc'));
const ModalDoc = lazy(() => import('mui-cascade/docs/ModalDoc'));

const drawerWidth = 280;

const navigation = [
  { name: 'Getting Started', href: '/', icon: null },
  { name: 'Button', href: '/components/button', icon: null },
  { name: 'Card', href: '/components/card', icon: null },
  { name: 'Input', href: '/components/input', icon: null },
  { name: 'Modal', href: '/components/modal', icon: null },
  { name: 'Design Assets', href: '/assets', icon: null },
];

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const currentTheme = createCustomTheme(darkMode ? 'dark' : 'light');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--muted-foreground)',
            letterSpacing: '0.05em',
          }}
        >
          Components
        </Typography>
      </Box>

      <Box sx={{ px: 1 }}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.name}
              component={Link}
              to={item.href}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '8px 16px',
                margin: '2px 0',
                borderRadius: 1,
                color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                backgroundColor: isActive ? 'var(--secondary)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--primary)',
                },
                textTransform: 'none',
                fontSize: '0.875rem',
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </Box>
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
            border:'none',
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
              {navigation.find(nav => nav.href === location.pathname)?.name || 'Shadcn MUI'}
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
              <Route path="/components/button" element={<ButtonDoc />} />
              <Route path="/components/card" element={<CardDoc />} />
              <Route path="/components/input" element={<InputDoc />} />
              {/* <Route path="/components/badge" element={<BadgeDoc />} /> */}
              <Route path="/components/modal" element={<ModalDoc />} />
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
