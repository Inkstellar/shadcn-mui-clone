---
title: Frequently Asked Questions
category: Help
---

# Frequently Asked Questions

## General Questions

### What is mui-cascade?
mui-cascade is a React component library built on Material-UI, offering a collection of pre-built, customizable UI components similar to shadcn/ui but for Material-UI.

### How is it different from Material-UI?
mui-cascade builds on top of Material-UI, providing:
- Additional component variants
- Pre-styled components
- CLI tool for component management
- Better TypeScript support
- Copy-paste component architecture

### Is it production-ready?
Yes! mui-cascade is built on the stable Material-UI framework and is used in production applications.

## Installation & Setup

### Do I need to install Material-UI separately?
Material-UI packages are peer dependencies. Install them with:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Can I use it with Next.js?
Yes! mui-cascade works with Next.js. See our Next.js setup guide.

### Can I use it with TypeScript?
Absolutely! mui-cascade is written in TypeScript with full type definitions.

## Usage Questions

### Can I customize the components?
Yes! Use the CLI tool to copy components into your project for full customization.

### How do I override styles?
Use the `sx` prop or Material-UI's styled API:
```tsx
<Button sx={{ backgroundColor: 'red' }}>Custom</Button>
```

### Can I use my own theme?
Yes! mui-cascade integrates with Material-UI's theming system.

## Component Questions

### Which components are available?
- UI: Button, Card, Input, Modal
- Forms: PaymentForm
- Blocks: PricingCard
- More components coming soon!

### Can I request new components?
Yes! Open an issue on GitHub or contribute via pull request.

### Are components accessible?
Yes, all components follow WCAG accessibility guidelines.

## Licensing

### What's the license?
MIT License - free for personal and commercial use.

### Can I use it in commercial projects?
Yes, the MIT license allows commercial use.
