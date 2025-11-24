import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
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
  Avatar,
  Menu as MuiMenu,
  MenuItem,
} from '@mui/material';
import { Menu, Sun, Moon, Github, LogIn, LogOut, User } from 'lucide-react';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './config/authConfig';
import { createCustomTheme, FullscreenProvider } from 'mui-cascade';
import AppRoutes from './routes';
import componentMenu from './components/layouts/componentMenu.tsx';
import { navigation } from './navigation';
import './app.css';
import logoImage from '../assets/images/fefundinfo_logo_colour_rgb.svg';
import nexusBg from '../assets/images/nexus-bg.png';

const drawerWidth = 280;

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function AuthButton() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogin = () => {
    instance.loginPopup().catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!isAuthenticated) {
    return (
      <Button
        startIcon={<LogIn size={18} />}
        onClick={handleLogin}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        Sign In
      </Button>
    );
  }

  const account = accounts[0];

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'primary.main',
            fontSize: '0.875rem',
          }}
        >
          {account?.name?.charAt(0) || 'U'}
        </Avatar>
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {account?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {account?.username}
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogOut size={18} style={{ marginRight: 8 }} />
          Sign Out
        </MenuItem>
      </MuiMenu>
    </>
  );
}

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
    <Box sx={{ overflow: 'auto',  }}>
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

  const bgImageStyle = {
    backgroundImage: `url(${nexusBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const isLoginPage = location.pathname === '/login';

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
            backgroundColor: darkMode 
              ? 'rgba(18, 18, 18, 0.6)' 
              : 'rgba(255, 255, 255, 0.6)',
            color: currentTheme.palette.text.primary,
            border: 'none',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)', // Safari support
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
                href="https://github.com/yourusername/cascade-ui"
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
              <AuthButton />
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
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: currentTheme.palette.background.paper,
            transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)',
            ...(isLoginPage ? bgImageStyle : {}),
          }}
        >
          <Toolbar />

          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <FullscreenProvider>
          <AppContent />
        </FullscreenProvider>
      </Router>
    </MsalProvider>
  );
}

export default App;
