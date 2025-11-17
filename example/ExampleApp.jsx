import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import { 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  CardHeader,
  Input, 
  Badge, 
  Modal,
  createCustomTheme 
} from './src/index';
import { Search, Heart, MessageCircle, User } from 'lucide-react';

const theme = createCustomTheme('light');

function ExampleApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [likes, setLikes] = useState(42);
  const [username, setUsername] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Example App
        </Typography>
        
        <Typography variant="body1" paragraph>
          This is a demonstration of Shadcn MUI components in action.
        </Typography>

        {/* Button Examples */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Buttons
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Button variant="contained">Primary</Button>
            <Button variant="outlined">Secondary</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="text">Text</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </Box>
        </Box>

        {/* Input Examples */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Input Fields
          </Typography>
          <Box sx={{ maxWidth: 400, mb: 2 }}>
            <Input 
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              startAdornment={<User />}
            />
          </Box>
          <Box sx={{ maxWidth: 400 }}>
            <Input 
              label="Search"
              placeholder="Search..."
              startAdornment={<Search />}
            />
          </Box>
        </Box>

        {/* Card Examples */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Cards
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Card variant="elevated">
              <CardHeader 
                title="Getting Started"
                subtitle="Learn how to use components"
              />
              <CardContent>
                Get started with Shadcn MUI by copying components directly into your project.
              </CardContent>
              <CardActions>
                <Button size="small" variant="text">
                  <Heart style={{ marginRight: 4 }} />
                  Like ({likes})
                </Button>
                <Button 
                  size="small" 
                  variant="text"
                  onClick={() => setLikes(likes + 1)}
                >
                  <MessageCircle style={{ marginRight: 4 }} />
                  Comment
                </Button>
              </CardActions>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Badge color="success">Live</Badge>
                  <Badge color="info" variant="tonal" sx={{ ml: 1 }}>
                    New
                  </Badge>
                </Box>
                <Typography variant="h4" gutterBottom>
                  Interactive Card
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This card shows how you can build interactive components with state management.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Badge Examples */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Badges
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge>Default</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="info">Info</Badge>
            <Badge variant="outlined">Outlined</Badge>
            <Badge variant="tonal">Tonal</Badge>
            <Badge pulse color="error">
              Notifications
            </Badge>
          </Box>
        </Box>

        {/* Modal Example */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Modal
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setModalOpen(true)}
          >
            Open Example Modal
          </Button>
        </Box>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Welcome to Shadcn MUI"
        description="This is an example of how modals work in Shadcn MUI"
        footer={
          <>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setModalOpen(false)}>
              Get Started
            </Button>
          </>
        }
      >
        <Typography variant="body1" paragraph>
          Shadcn MUI provides beautiful, accessible components that you can copy and paste directly into your project.
        </Typography>
        <Typography variant="body1" paragraph>
          All components are built with Material-UI and come with comprehensive documentation and examples.
        </Typography>
        <Typography variant="body1">
          Start building today!
        </Typography>
      </Modal>
    </ThemeProvider>
  );
}

export default ExampleApp;