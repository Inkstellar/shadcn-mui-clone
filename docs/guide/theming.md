---
title: Theming
category: Guides
---

# Theming

mui-cascade is built on Material-UI's theming system, allowing full customization of colors, typography, spacing, and more.

## Creating a Theme

```tsx
import { createCustomTheme } from 'mui-cascade';
import { ThemeProvider } from '@mui/material/styles';

const theme = createCustomTheme('light');

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Theme Modes

- `light` - Light color scheme
- `dark` - Dark color scheme

## Customizing Colors

```tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```

## Using sx Prop

All components support the `sx` prop for inline styling:

```tsx
<Button sx={{ 
  backgroundColor: 'primary.main',
  color: 'white',
  padding: '12px 24px',
  '&:hover': {
    backgroundColor: 'primary.dark'
  }
}}>
  Styled Button
</Button>
```
