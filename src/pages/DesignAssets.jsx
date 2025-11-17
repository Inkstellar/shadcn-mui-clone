import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';

const colors = {
  primary: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  secondary: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  destructive: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
};

const typography = {
  h1: {
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
  },
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

export default function DesignAssets() {
  const renderColorPalette = (name, palette) => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography
        variant="h3"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '24px',
          textTransform: 'capitalize',
        }}
      >
        {name} Colors
      </Typography>
      <Grid container spacing={12}>
        {Object.entries(palette).map(([key, value]) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
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
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '4px',
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderTypography = () => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography
        variant="h3"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '24px',
        }}
      >
        Typography
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={32}>
            {Object.entries(typography).map(([key, style]) => (
              <Grid item xs={12} md={6} key={key}>
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
                      The quick brown fox
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'Monaco, Consolas, monospace',
                    }}
                  >
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
        variant="h3"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '24px',
        }}
      >
        Shadows
      </Typography>
      <Grid container spacing={24}>
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

  const renderBorderRadius = () => (
    <Box sx={{ marginBottom: '48px' }}>
      <Typography
        variant="h3"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '24px',
        }}
      >
        Border Radius
      </Typography>
      <Grid container spacing={24}>
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
      <Typography
        variant="h3"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '24px',
        }}
      >
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
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', marginBottom: '80px' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #18181b 0%, #52525b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Design Assets
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            color: '#52525b',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          A comprehensive design system with colors, typography, shadows,
          and spacing. Everything you need to maintain consistency across your project.
        </Typography>
      </Box>

      {/* Color Palettes */}
      {Object.entries(colors).map(([name, palette]) => renderColorPalette(name, palette))}

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
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          CSS Variables
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                color: 'var(--muted-foreground)',
                marginBottom: '16px',
              }}
            >
              These CSS variables can be used directly in your stylesheets:
            </Typography>
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
  --primary: #18181b;
  --primary-foreground: #fafafa;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f9fafb;
  --muted-foreground: #6b7280;
  --border: #e5e7eb;
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --success: #22c55e;
  --success-foreground: #fafafa;
  --warning: #f59e0b;
  --warning-foreground: #18181b;
  --info: #3b82f6;
  --info-foreground: #fafafa;
}`}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}