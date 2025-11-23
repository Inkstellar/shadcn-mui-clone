# useFullscreen Hook

A reusable React hook for adding fullscreen functionality to any component.

## Installation

The hook is located at: `src/hooks/useFullscreen.ts`

## Usage

### Basic Example

```tsx
import { Paper, IconButton } from '@mui/material';
import { Scaling } from 'lucide-react';
import useFullscreen from '../hooks/useFullscreen';

function MyComponent() {
  const { isFullscreen, toggleFullscreen, fullscreenStyles } = useFullscreen();

  return (
    <Paper sx={{ ...fullscreenStyles, p: 3 }}>
      <IconButton onClick={toggleFullscreen}>
        <Scaling />
      </IconButton>
      <div>Your content here</div>
    </Paper>
  );
}
```

### Advanced Example with Custom Styles

```tsx
import useFullscreen from '../hooks/useFullscreen';

function Dashboard() {
  const { isFullscreen, toggleFullscreen, fullscreenStyles } = useFullscreen();

  return (
    <Box 
      sx={{ 
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        ...fullscreenStyles, // Spread fullscreen styles
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Dashboard</Typography>
        <IconButton 
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <Scaling />
        </IconButton>
      </Stack>
      {/* Your dashboard content */}
    </Box>
  );
}
```

### Using Individual Methods

```tsx
function VideoPlayer() {
  const { 
    isFullscreen, 
    enterFullscreen, 
    exitFullscreen, 
    fullscreenStyles 
  } = useFullscreen();

  return (
    <Box sx={fullscreenStyles}>
      <video />
      <Button onClick={enterFullscreen}>Go Fullscreen</Button>
      {isFullscreen && (
        <Button onClick={exitFullscreen}>Exit Fullscreen</Button>
      )}
    </Box>
  );
}
```

## API Reference

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `isFullscreen` | `boolean` | Current fullscreen state |
| `toggleFullscreen` | `() => void` | Toggle between fullscreen and normal |
| `enterFullscreen` | `() => void` | Enter fullscreen mode |
| `exitFullscreen` | `() => void` | Exit fullscreen mode |
| `fullscreenStyles` | `object` | Styles to apply for fullscreen mode |

### Fullscreen Styles

When `isFullscreen` is `true`, the following styles are applied:

```typescript
{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1300,        // Above most MUI components
  borderRadius: 0,     // Remove rounded corners
  maxWidth: '100vw',
  width: '100vw',
  height: '100vh',
  overflow: 'auto',    // Allow scrolling if needed
}
```

## Features

- ✅ **Reusable**: Use with any component
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Flexible**: Multiple control methods
- ✅ **MUI Compatible**: Works seamlessly with Material-UI
- ✅ **Performant**: Uses `useCallback` for optimized re-renders
- ✅ **Simple API**: Easy to integrate

## Notes

- The hook uses `zIndex: 1300` which is the same level as MUI Dialogs
- Fullscreen styles are only applied when `isFullscreen` is `true`
- The component will overlay everything else on the page when fullscreen
- Scrolling is enabled by default with `overflow: 'auto'`

## Example in Production

See `src/pages/CascadeMCP.tsx` for a real-world implementation.
