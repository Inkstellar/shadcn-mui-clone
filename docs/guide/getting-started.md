---
title: Getting Started
category: Introduction
---

# Getting Started

Welcome to the mui-cascade component library documentation! This guide will help you get up and running quickly.

## Installation

Install mui-cascade via npm or yarn:

```bash
npm install mui-cascade
# or
yarn add mui-cascade
```

## Usage

Import components directly from mui-cascade:

```tsx
import { Button, Card, Input } from 'mui-cascade';

function MyComponent() {
  return (
    <Card>
      <Input label="Name" />
      <Button variant="contained">Submit</Button>
    </Card>
  );
}
```

## CLI Tool

Use our CLI tool to add components to your project:

```bash
npx mui-cascade-add button
npx mui-cascade-add card
```

This will copy the component source code directly into your project for full customization.
