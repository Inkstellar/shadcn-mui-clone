import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Container,
  useTheme,
  TextField,
  IconButton,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { PricingCard } from 'mui-cascade';


// Get colors and typography from the theme dynamically
export default function DesignAssets() {
  const theme = useTheme();
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedValue, setCopiedValue] = useState('');

  // Extract colors from theme palette
  const colors = {
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark,
    },
    secondary: {
      main: theme.palette.secondary.main,
      light: theme.palette.secondary.light,
      dark: theme.palette.secondary.dark,
    },
    grey: theme.palette.grey,
    text: {
      primary: theme.palette.text.primary,
      secondary: theme.palette.text.secondary,
    },
    background: {
      default: theme.palette.background.default,
      paper: theme.palette.background.paper,
    },
  };

  // Extract typography from theme
  const typography = {
    h1: theme.typography.h1,
    h2: theme.typography.h2,
    h3: theme.typography.h3,
    h4: theme.typography.h4,
    h5: theme.typography.h5,
    h6: theme.typography.h6,
    body1: theme.typography.body1,
    body2: theme.typography.body2,
    button: theme.typography.button,
  };

  const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  };

  const borderRadius = {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  };

  const handleCopyColor = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setSnackbarOpen(true);
  };

  const renderColorPalette = (name, palette) => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography variant="h4" sx={{ marginBottom: '24px' }} id={`${name}Colors`}>{name} Colors</Typography>
      <Grid container spacing={1}>
        {Object.entries(palette).map(([key, value]) => (
          <Grid item xs={6} sm={4} md={3} lg={3} key={key}>
            <Card variant="outlined" sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  height: '80px',
                  backgroundColor: value,
                  borderBottom: '1px solid',
                  borderColor: 'var(--border)',
                }}
              />
              <CardContent sx={{ padding: '12px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">
                      {key}
                    </Typography>
                    <Typography variant="caption">
                      {value}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleCopyColor(value)}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderTypography = () => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography variant="h3" sx={{ marginBottom: '24px' }} id="typography">Typography</Typography>
      <TextField
        fullWidth
        label="Sample Text"
        value={sampleText}
        onChange={(e) => setSampleText(e.target.value)}
        variant="outlined"
        sx={{ marginBottom: '16px' }}
        placeholder="Enter custom text to preview"
      />
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            {Object.entries(typography).map(([key, style]) => (
              <Grid item xs={12} md={12} key={key}>
                <Box sx={{ marginBottom: '24px' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--muted-foreground)',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {key}
                  </Typography>
                  <Box sx={{ marginBottom: '8px' }}>
                    <Typography
                      variant={key.startsWith('h') ? key : 'body1'}
                      sx={style}
                    >
                      {sampleText}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color={theme.palette.grey[400]}>
                    {Object.entries(style)
                      .map(([prop, value]) => `${prop}: ${value}`)
                      .join(', ')}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  const renderShadows = () => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography
        id="shadows"
        variant="h3"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '24px',
        }}
      >
        Shadows
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(shadows).map(([key, value]) => (
          <Grid item xs={6} md={4} lg={3} key={key}>
            <Card variant="outlined" sx={{ padding: '32px', textAlign: 'center' }}>
              <Box
                sx={{
                  height: '80px',
                  backgroundColor: 'var(--background)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  boxShadow: value,
                }}
              />
              <Typography variant="body2">
                {key}
              </Typography>
              <Typography variant="caption">
                {value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderBorderRadius = () => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography variant="h3" id="borderRadius">Border Radius</Typography>
      <Grid container spacing={2}>
        {Object.entries(borderRadius).map(([key, value]) => (
          <Grid item xs={6} md={4} lg={3} key={key}>
            <Card variant="outlined" sx={{ padding: '32px', textAlign: 'center' }}>
              <Box
                sx={{
                  height: '80px',
                  backgroundColor: 'var(--secondary)',
                  borderRadius: value,
                  marginBottom: '16px',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '8px',
                }}
              >
                {key}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'Monaco, Consolas, monospace',
                }}
              >
                {value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderSpacing = () => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography variant="h3" id="spacing">
        Spacing
      </Typography>
      <Card variant="outlined">
        <CardContent>
          {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32].map((space) => (
            <Box
              key={space}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <Box
                sx={{
                  width: `${space * 4}px`,
                  height: '32px',
                  backgroundColor: 'var(--primary)',
                  marginRight: '16px',
                  borderRadius: '4px',
                  minWidth: space === 0 ? '2px' : '4px',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  minWidth: '60px',
                }}
              >
                {space}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'Monaco, Consolas, monospace',
                }}
              >
                {space * 4}px
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Box sx={{ px: { xs: 0, md: 12 } }}>
            {/* Header */}
            <Box sx={{ marginBottom: '80px' }}>
              <Typography variant="h1" sx={{ mb: '24px' }}>Design Assets</Typography>
              <Typography variant="body1" sx={{
                fontSize: '1.25rem',
                color: '#52525b',
                marginBottom: '48px',
                maxWidth: '600px',
              }}>
                A comprehensive design system with colors, typography, shadows,
                and spacing. Everything you need to maintain consistency across your project.
              </Typography>
            </Box>

            {/* Color Palettes */}
            {Object.entries(colors).map(([name, palette]) => (
              <React.Fragment key={name}>
                {renderColorPalette(name, palette)}
              </React.Fragment>
            ))}

            {/* Typography */}
            {renderTypography()}

            {/* Shadows */}
            {renderShadows()}

            {/* Border Radius */}
            {renderBorderRadius()}

            {/* Spacing */}
            {renderSpacing()}

            {/* CSS Variables */}
            <Box sx={{ marginBottom: '48px' }}>
              <Typography variant="h3" id="cssVariables">CSS Variables</Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2">These CSS variables can be used directly in your stylesheets:</Typography>
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: 'var(--muted)',
                      padding: '16px',
                      borderRadius: '8px',
                      overflow: 'auto',
                      fontSize: '0.875rem',
                      fontFamily: 'Monaco, Consolas, monospace',
                    }}
                  >
                    {`:root {
  --primary: ${theme.palette.primary.main};
  --primary-light: ${theme.palette.primary.light};
  --primary-dark: ${theme.palette.primary.dark};
  --secondary: ${theme.palette.secondary.main};
  --secondary-light: ${theme.palette.secondary.light};
  --secondary-dark: ${theme.palette.secondary.dark};
  --background-default: ${theme.palette.background.default};
  --background-paper: ${theme.palette.background.paper};
  --text-primary: ${theme.palette.text.primary};
  --text-secondary: ${theme.palette.text.secondary};
  --grey-50: ${theme.palette.grey[50]};
  --grey-100: ${theme.palette.grey[100]};
  --grey-200: ${theme.palette.grey[200]};
  --grey-300: ${theme.palette.grey[300]};
  --grey-400: ${theme.palette.grey[400]};
  --grey-500: ${theme.palette.grey[500]};
  --grey-600: ${theme.palette.grey[600]};
  --grey-700: ${theme.palette.grey[700]};
  --grey-800: ${theme.palette.grey[800]};
  --grey-900: ${theme.palette.grey[900]};
}`}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Toast notification */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={() => setSnackbarOpen(false)}
              message={`Copied ${copiedValue}`}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack spacing={1} sx={{ position: 'sticky', top: '64px' }}>
            <Typography variant="caption" key="on-this-page">
              On this page
            </Typography>
            {['primaryColors', 'secondaryColors', 'backgroundColors', 'textColors', 'greyColors', 'typography', 'shadows', 'borderRadius', 'spacing', 'cssVariables'].map((item) => (
              <a
                href={`#${item}`}
                key={item}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontSize: '0.875rem',
                  display: 'block',
                  padding: '4px 0',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(`${item}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {item}
              </a>
            ))}

          </Stack>
        </Grid>
      </Grid>
      <PricingCard />
    </Container>
  );
}
