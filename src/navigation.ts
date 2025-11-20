import { componentDocsRegistry } from 'mui-cascade';

// Transform componentDocsRegistry to navigation format
const componentNavItems = Object.values(componentDocsRegistry).map(({ name, path }) => ({
  name,
  href: path,
  icon: null,
}));

export const navigation = [
  { name: 'Getting Started', href: '/', icon: null },
  { name: 'Design Assets', href: '/assets', icon: null },
  ...componentNavItems,
];
