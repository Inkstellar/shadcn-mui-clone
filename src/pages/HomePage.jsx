import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { ArrowRight, Code, Palette, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import ButtonComp from '@/components/Button/Button';
import CardComp from '@/components/Card/Card';
import BadgeComp from '@/components/Badge/Badge';

const features = [
  {
    icon: <Code />,
    title: 'Copy & Paste',
    description: 'Copy component code directly into your project. No build steps or dependencies to install.',
  },
  {
    icon: <Palette />,
    title: 'Beautiful Design',
    description: 'Carefully crafted components that look great and provide excellent user experience.',
  },
  {
    icon: <Zap />,
    title: 'Fast Performance',
    description: 'Lightweight components built with Material-UI for optimal performance.',
  },
  {
    icon: <Shield />,
    title: 'Accessible',
    description: 'All components follow accessibility best practices and ARIA guidelines.',
  },
];

const components = [
  {
    name: 'Button',
    description: 'Buttons are used to initialize an action',
    href: '/components/button',
  },
  {
    name: 'Card',
    description: 'Cards are surfaces that display content',
    href: '/components/card',
  },
  {
    name: 'Input',
    description: 'Input fields for user data entry',
    href: '/components/input',
  },
  {
    name: 'Badge',
    description: 'Small status descriptors for UI elements',
    href: '/components/badge',
  },
  {
    name: 'Modal',
    description: 'Dialogs that temporarily overlay content',
    href: '/components/modal',
  },
];

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', padding: '80px 20px', paddingBottom: '120px' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: 'var(--secondary)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            marginBottom: '32px',
          }}
        >
          <Zap style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          <Typography
            variant="body2"
            sx={{ fontSize: '0.875rem', fontWeight: 500 }}
          >
            Material-UI Components for React
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3rem', md: '4rem' },
            fontWeight: 700,
            background: 'linear-gradient(135deg, #18181b 0%, #52525b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '24px',
            lineHeight: 1.1,
          }}
        >
          Beautiful components
          <br />
          built with Material-UI
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.25rem',
            color: '#52525b',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px',
          }}
        >
          A collection of accessible, customizable, and beautiful components
          built with Material-UI. Copy, paste, and customize to your needs.
        </Typography>

        <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <ButtonComp size="large" rightIcon={<ArrowRight />}>
            Get Started
          </ButtonComp>
          <ButtonComp size="large" variant="outlined">
            View Components
          </ButtonComp>
        </Box>
      </Box>

      {/* Demo Section */}
      <Box sx={{ marginBottom: '120px' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          See components in action
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <ButtonComp variant="contained">Primary</ButtonComp>
          <ButtonComp variant="outlined">Secondary</ButtonComp>
          <ButtonComp variant="tonal">Tonal</ButtonComp>
          <BadgeComp>New</BadgeComp>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardComp style={{ maxWidth: '400px', width: '100%' }}>
            <CardContent>
              <Typography variant="h4" sx={{ marginBottom: '16px' }}>
                Beautiful Components
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--muted-foreground)' }}>
                These components are designed to work seamlessly with your Material-UI
                application while providing a consistent and professional look.
              </Typography>
            </CardContent>
          </CardComp>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ marginBottom: '120px' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Why choose Shadcn MUI?
        </Typography>

        <Grid container spacing={32}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <CardComp variant="outlined" sx={{ height: '100%', padding: '32px' }}>
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                  <Box
                    sx={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      marginBottom: '16px',
                    }}
                  >
                    {React.cloneElement(feature.icon, { size: 24 })}
                  </Box>
                  <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--muted-foreground)' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardComp>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Components Grid */}
      <Box sx={{ marginBottom: '120px' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Available Components
        </Typography>

        <Grid container spacing={24}>
          {components.map((component, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={component.href} style={{ textDecoration: 'none' }}>
                <CardComp 
                  variant="outlined" 
                  interactive
                  sx={{ height: '100%', padding: '24px' }}
                >
                  <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <Typography
                        variant="h3"
                        sx={{ fontSize: '1.125rem', fontWeight: 600, marginRight: '8px' }}
                      >
                        {component.name}
                      </Typography>
                      <Chip
                        label="React"
                        size="small"
                        sx={{
                          backgroundColor: 'var(--secondary)',
                          color: 'var(--primary)',
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: 'var(--muted-foreground)' }}
                    >
                      {component.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '16px',
                        color: 'var(--primary)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      View component
                      <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                    </Box>
                  </CardContent>
                </CardComp>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: 'var(--secondary)',
          borderRadius: '24px',
          marginBottom: '80px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            marginBottom: '16px',
          }}
        >
          Ready to build something beautiful?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            color: 'var(--muted-foreground)',
            marginBottom: '32px',
            maxWidth: '500px',
            margin: '0 auto 32px',
          }}
        >
          Start building with our beautiful, accessible components today.
          Copy, paste, and customize to your needs.
        </Typography>
        <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <ButtonComp size="large" rightIcon={<ArrowRight />}>
            Browse Components
          </ButtonComp>
          <ButtonComp size="large" variant="outlined">
            View on GitHub
          </ButtonComp>
        </Box>
      </Box>
    </Box>
  );
}
