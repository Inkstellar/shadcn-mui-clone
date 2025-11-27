---
title: LiveCodes Integration
category: Guides
---

# LiveCodes Integration

Interactive code playgrounds are available in the documentation using LiveCodes.

## What is LiveCodes?

LiveCodes provides in-browser code execution, allowing users to:
- Edit component examples
- See changes in real-time
- Experiment without setup
- Share working examples

## Using Live Playgrounds

Look for the view toggle on examples with three modes:

1. **Preview** - See the rendered component
2. **Code** - View the source code
3. **Live** - Edit and run code interactively

## Features

- Real-time TypeScript/React execution
- Full Material-UI support
- Console output
- Error messages
- Fullscreen mode
- Auto-imports for common libraries

## For Developers

Enable live playgrounds in your documentation:

```tsx
<ComponentDoc
  examples={[
    {
      title: "Example",
      description: "Try editing this",
      code: myCode,
      enableLiveCode: true, // Enable playground
    }
  ]}
/>
```

## Requirements

```bash
yarn add livecodes
```

See LIVECODES_INTEGRATION.md for full documentation.
