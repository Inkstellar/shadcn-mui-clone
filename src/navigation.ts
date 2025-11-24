import { componentDocsRegistry } from 'mui-cascade';

// Transform componentDocsRegistry to navigation format
const componentNavItems = Object.values(componentDocsRegistry).map(({ name, path, newitem, experimental, deprecated }) => ({
  name,
  href: path,
  icon: null,
  newitem,
  experimental,
  deprecated
}));

export const navigation = [
  { name: 'Getting Started', href: '/', icon: null },
  { name: 'Design Assets', href: '/assets', icon: null },
  { name: 'AI Playground', href: '/mcp/cascade', icon: null },
  { name: 'MCP Logs', href: '/mcp/logs', icon: null },
  { name: 'All Components', href: '/components', icon: null },
  ...componentNavItems,
];
