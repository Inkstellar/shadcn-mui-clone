# Cascade UI

A beautiful and accessible React component library built with Material-UI (MUI). Copy, paste, and customize to your needs.

![Cascade UI](./docs/preview.png)

## Features

- ✨ **Beautiful Design**: Carefully crafted components with modern aesthetics
- 🎯 **Accessible**: All components follow ARIA guidelines and best practices
- 🚀 **Easy to Use**: Copy and paste components directly into your project
- 📝 **Well Documented**: Comprehensive documentation with examples and code snippets
- 🎨 **Customizable**: Easy to theme and customize to your brand
- ⚡ **Performance**: Lightweight components built with Material-UI
- 🌙 **Dark Mode**: Built-in dark mode support
- 💻 **TypeScript**: Full TypeScript support (coming soon)

## Quick Start

### Installation

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```
Or if you're starting fresh:

```bash
# Create a new React app
npx create-react-app my-app
cd my-app

# Install dependencies
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled lucide-react
```

### Usage

Import components directly into your React files:

```jsx
import { Button } from './components/Button/Button';

function App() {
  return (
    <div>
      <Button variant="contained">
        Click me
      </Button>
    </div>
  );
}
```

## Components

### Button

Buttons are used to initialize an action.

```jsx
import { Button } from 'mui-cascade';

function MyComponent() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button variant="contained">Primary</Button>
      <Button variant="outlined">Secondary</Button>
      <Button variant="tonal">Tonal</Button>
    </div>
  );
}
```

**Props:**
- `variant`: 'contained' | 'outlined' | 'text' | 'elevated' | 'tonal'
- `size`: 'small' | 'medium' | 'large'
- `loading`: boolean
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode

### Card

Cards are surfaces that display content and actions.

```jsx
import { Card, CardHeader, CardContent, CardActions } from 'mui-cascade';

function MyCard() {
  return (
    <Card variant="elevated">
      <CardHeader 
        title="Card Title"
        subtitle="Card subtitle"
      />
      <CardContent>
        This is the content area of the card.
      </CardContent>
      <CardActions>
        <Button size="small">Action</Button>
      </CardActions>
    </Card>
  );
}
```

### Input

Text fields for user data entry.

```jsx
import { Input } from 'mui-cascade';
import { Search } from 'lucide-react';

function MyInput() {
  return (
    <Input 
      label="Search"
      placeholder="Enter search term..."
      startAdornment={<Search />}
    />
  );
}
```

### Badge

Small status descriptors for UI elements.

```jsx
import { Badge } from 'mui-cascade';

function MyBadge() {
  return (
    <div>
      <Badge>New</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="success">Success</Badge>
    </div>
  );
}
```

### Modal

Dialogs that temporarily overlay content.

```jsx
import { Modal, Button } from 'mui-cascade';
import { useState } from 'react';

function MyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
        description="Modal description"
      >
        <p>Modal content goes here...</p>
      </Modal>
    </>
  );
}
```

## Design System

### Colors

The library uses a carefully curated color palette:

```css
:root {
  --primary: #18181b;
  --secondary: #f4f4f5;
  --muted: #f9fafb;
  --border: #e5e7eb;
  --destructive: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
  --info: #3b82f6;
}
```

### Typography

Inter font family with optimized line heights and spacing:

- **Headings**: h1-h6 with appropriate font weights
- **Body text**: body1 (16px) and body2 (14px)
- **Labels**: button, caption, etc.

### Spacing

Based on 8px grid system:
- `0`: 0px
- `1`: 4px
- `2`: 8px
- `3`: 12px
- `4`: 16px
- `6`: 24px
- `8`: 32px
- `12`: 48px

### Shadows

Subtle shadows for depth:
- `sm`: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- `DEFAULT`: 0 1px 3px 0 rgb(0 0 0 / 0.1)
- `md`: 0 4px 6px -1px rgb(0 0 0 / 0.1)
- `lg`: 0 10px 15px -3px rgb(0 0 0 / 0.1)
- `xl`: 0 20px 25px -5px rgb(0 0 0 / 0.1)

## Customization

### Theme Customization

You can customize the theme by creating your own theme configuration:

```jsx
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
  },
  typography: {
    fontFamily: 'Your Font, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Component Customization

Each component accepts a `sx` prop for custom styling:

```jsx
<Button 
  sx={{ 
    backgroundColor: 'your-color',
    '&:hover': {
      backgroundColor: 'your-hover-color',
    }
  }}
>
  Custom Button
</Button>
```

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shadcn-mui-clone.git
cd shadcn-mui-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Project Structure

```
src/
├── components/           # Individual components
│   ├── Button/          # Button component
│   ├── Card/            # Card component
│   ├── Input/           # Input component
│   ├── Badge/           # Badge component
│   └── Modal/           # Modal component
├── docs/                # Documentation components
│   ├── ComponentDoc.jsx # Generic documentation template
│   ├── ButtonDoc.jsx    # Button documentation
│   ├── CardDoc.jsx      # Card documentation
│   ├── InputDoc.jsx     # Input documentation
│   ├── BadgeDoc.jsx     # Badge documentation
│   └── ModalDoc.jsx     # Modal documentation
├── pages/               # Page components
│   ├── HomePage.jsx     # Landing page
│   └── DesignAssets.jsx # Design system page
├── theme/               # Theme configuration
│   └── theme.js         # MUI theme setup
└── App.jsx              # Main app component
```

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [Shadcn](https://ui.shadcn.com/) for the inspiration
- [Lucide](https://lucide.dev/) for the beautiful icons

## Roadmap

- [ ] TypeScript definitions
- [ ] More components (Table, Form, Navigation, etc.)
- [ ] Figma design kit
- [ ] Storybook integration
- [ ] Testing suite
- [ ] Performance optimizations
- [ ] Accessibility audits
- [ ] More theme variants
- [ ] Animation primitives

## Support

If you have any questions or need help, please:
1. Check the [documentation](./docs/)
2. Search [existing issues](https://github.com/yourusername/shadcn-mui-clone/issues)
3. [Create a new issue](https://github.com/yourusername/shadcn-mui-clone/issues/new)

---

Built with ❤️ by MiniMax Agent