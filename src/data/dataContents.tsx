import { ArrowRight, Code, Palette, Zap, Shield } from 'lucide-react';

export const features = [
  {
    icon: <Code />,
    title: 'Copy & Paste',
    description: 'Copy component code directly into your project. No build steps or dependencies to install.',
  },
  {
    icon: <Palette />,
    title: 'Beautiful Design',
    description: 'Carefully crafted components that look great and provide excellent user experience.',
  },
  {
    icon: <Zap />,
    title: 'Fast Performance',
    description: 'Lightweight components built with Material-UI for optimal performance.',
  },
  {
    icon: <Shield />,
    title: 'Accessible',
    description: 'All components follow accessibility best practices and ARIA guidelines.',
  },
];

export const components = [
  {
    name: 'Button',
    description: 'Buttons are used to initialize an action',
    href: '/components/button',
  },
  {
    name: 'Card',
    description: 'Cards are surfaces that display content',
    href: '/components/card',
  },
  {
    name: 'Input',
    description: 'Input fields for user data entry',
    href: '/components/input',
  },
  {
    name: 'Modal',
    description: 'Dialogs that temporarily overlay content',
    href: '/components/modal',
  },
];