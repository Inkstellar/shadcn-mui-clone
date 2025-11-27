---
title: Troubleshooting
category: Guides
---

# Troubleshooting

Common issues and solutions for mui-cascade.

## Installation Issues

### Package not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Peer dependency warnings
Install required peer dependencies:
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## TypeScript Errors

### Module not found
Ensure types are installed:
```bash
npm install --save-dev @types/react @types/react-dom
```

### Type errors in components
Check that your tsconfig.json includes:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Component Issues

### Styles not applied
Wrap your app with ThemeProvider:
```tsx
import { ThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from 'mui-cascade';

const theme = createCustomTheme('light');

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

### Icons not showing
Install Material-UI icons:
```bash
npm install @mui/icons-material
```

Or use lucide-react:
```bash
npm install lucide-react
```

## Build Errors

### Module parse failed
Update your bundler configuration to handle TypeScript:

**Vite:**
```js
// vite.config.js
export default {
  esbuild: {
    loader: 'tsx',
  }
}
```

**Webpack:**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      }
    ]
  }
}
```

## Getting Help

- Check the [documentation](/components)
- Search existing [GitHub issues](https://github.com/your-repo/mui-cascade/issues)
- Ask in [Discussions](https://github.com/your-repo/mui-cascade/discussions)
- Join our [Discord community](https://discord.gg/your-invite)
