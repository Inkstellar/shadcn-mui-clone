export interface DocMetadata {
  id: string;
  title: string;
  category: string;
  path: string;
  content: string;
  filePath: string;
}

export interface DocItem {
  id: string;
  title: string;
  category: string;
  path: string;
  content: string;
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const [, frontmatterStr, markdownContent] = match;
  const frontmatter: Record<string, string> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: markdownContent };
}

/**
 * Get category name from folder path
 */
function getCategoryFromPath(filePath: string): string {
  const match = filePath.match(/\/docs\/([^/]+)\//); 
  if (!match) return 'Documentation';
  
  const folder = match[1];
  const categoryMap: Record<string, string> = {
    'guide': 'Guide',
    'design-system': 'Design System',
    'ux-strategy': 'UX Strategy',
  };
  
  return categoryMap[folder] || 'Documentation';
}/**
 * Generate route from file path
 */
function getRouteFromPath(filePath: string): string {
  const match = filePath.match(/\/docs\/([^/]+)\/([^/]+)\.md$/);
  if (!match) return '/help';
  
  const [, folder, fileName] = match;
  
  // Components get their own route
  if (folder === 'components') {
    return `/components/${fileName}`;
  }
  
  // Everything else goes to help page with anchor
  return `/help#${fileName}`;
}

/**
 * Get ID from file path
 */
function getIdFromPath(filePath: string): string {
  const match = filePath.match(/\/docs\/([^/]+)\/([^/]+)\.md$/);
  if (!match) return 'unknown';
  
  const [, folder, fileName] = match;
  
  // Add suffix for components to avoid ID conflicts
  if (folder === 'components') {
    return `${fileName}-component`;
  }
  
  return fileName;
}

/**
 * Load all markdown documentation files using Vite's glob import
 * This automatically discovers all .md files in the docs directory
 */
export async function loadMarkdownDocs(): Promise<DocItem[]> {
  const docs: DocItem[] = [];

  // Use Vite's import.meta.glob to automatically discover all markdown files
  // This is evaluated at build time and doesn't require runtime directory scanning
  const markdownModules = import.meta.glob('../../docs/**/*.md', { 
    query: '?raw',
    import: 'default',
    eager: false 
  });

  // Load each discovered markdown file
  for (const [filePath, importFn] of Object.entries(markdownModules)) {
    // Skip index.md and README.md files
    if (filePath.includes('index.md') || filePath.includes('README.md')) {
      continue;
    }

    try {
      // Import the markdown content
      const content = await importFn() as string;
      const { frontmatter, content: markdownContent } = parseFrontmatter(content);

      // Auto-generate metadata from file path
      const id = getIdFromPath(filePath);
      const category = frontmatter.category || getCategoryFromPath(filePath);
      const route = frontmatter.path || getRouteFromPath(filePath);
      const title = frontmatter.title || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      docs.push({
        id,
        title,
        category,
        path: route,
        content: markdownContent,
      });
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
    }
  }

  return docs;
}

/**
 * Load a single markdown file
 */
export async function loadMarkdownFile(filePath: string): Promise<DocItem | null> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      return null;
    }

    const content = await response.text();
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);

    const id = filePath.split('/').pop()?.replace('.md', '') || 'unknown';

    return {
      id,
      title: frontmatter.title || id,
      category: frontmatter.category || 'Uncategorized',
      path: frontmatter.path || `/help#${id}`,
      content: markdownContent,
    };
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return null;
  }
}
