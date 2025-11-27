---
title: CLI Tool
category: Guides
---

# CLI Tool

The mui-cascade CLI tool allows you to add components directly to your project for full customization.

## Installation

No installation needed! Use npx:

```bash
npx mui-cascade-add <component-name>
```

## Usage

Add a component to your project:

```bash
npx mui-cascade-add button
```

This will:
1. Create the component file in your project
2. Install any dependencies
3. Set up proper imports

## Available Commands

```bash
# Add a specific component
npx mui-cascade-add button
npx mui-cascade-add card
npx mui-cascade-add input
npx mui-cascade-add modal

# Add multiple components
npx mui-cascade-add button card input
```

## Component Location

Components are added to:
```
src/components/ui/<ComponentName>/
```

## Benefits

- Full control over component code
- Easy customization
- No dependency on the library
- Copy just what you need
