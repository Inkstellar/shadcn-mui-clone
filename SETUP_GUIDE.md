# Quick Setup Guide

## Installation

### 1. Navigate to the project directory:
```bash
cd shadcn-mui-clone
```

### 2. Install all dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

### 4. Open your browser:
Navigate to `http://localhost:3000`

## What's Included

This project includes:

- **5 Core Components**: Button, Card, Input, Badge, Modal
- **Complete Documentation**: With live examples and code copying
- **Design System**: Colors, typography, spacing, shadows
- **Theme Support**: Light/dark mode toggle
- **Responsive Design**: Mobile-friendly interface
- **Example App**: Comprehensive usage examples

## Quick Component Usage

### Using Components in Your Project

1. Copy the component files from `src/components/`
2. Import them into your React application:
```jsx
import { Button, Card } from './path/to/components';
```

3. Use them like this:
```jsx
function App() {
  return (
    <div>
      <Button variant="contained">Click me</Button>
      <Card>
        <CardContent>
          Hello World!
        </CardContent>
      </Card>
    </div>
  );
}
```

### Required Dependencies

Make sure you have these in your `package.json`:
```json
{
  "dependencies": {
    "@mui/material": "^5.14.20",
    "@mui/icons-material": "^5.14.19",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── docs/          # Documentation components
├── pages/         # Application pages
├── theme/         # Theme configuration
└── App.jsx        # Main application
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### If npm install fails:
1. Try: `npm install --legacy-peer-deps`
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and try again

### If you see build errors:
1. Check that all dependencies are installed
2. Ensure Node.js version is 16 or higher
3. Try deleting `package-lock.json` and reinstalling

## Next Steps

1. Explore the documentation at `http://localhost:3000`
2. Check out the design assets section
3. Look at the example app for usage patterns
4. Customize components to match your brand

Happy building! 🚀