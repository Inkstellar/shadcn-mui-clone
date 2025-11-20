import React from 'react';
import {
  Box,
  Typography,
  Container,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { ArrowRight, Code, Palette, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import CardComp from '../components/ui/Card/Card';
import Button from 'mui-cascade'
import { features, components } from '../data/dataContents';

export default function HomePage() {
  return (
    <Container maxWidth="md">
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
          <Button size="large" rightIcon={<ArrowRight />}>
            Get Started
          </Button>
          <Button size="large" variant="outlined" component={Link} to="/components">
            View Components
          </Button>
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
          <Button variant="contained">Primary</Button>
          <Button variant="outlined">Secondary</Button>
          <Button variant="tonal">Tonal</Button>
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
          Why choose Cascade UI?
        </Typography>

        <Grid container spacing={2}>
          {features.map((feature: any, index: any) => (
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

        <Grid container spacing={2}>
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
          <Button size="large" rightIcon={<ArrowRight />} component={Link} to="/components">
            Browse Components
          </Button>
          <Button size="large" variant="outlined">
            View on GitHub
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
