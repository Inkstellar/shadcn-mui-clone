# Documentation System

This project now uses a hybrid documentation approach combining **VitePress** for static documentation and **MiniSearch** for in-app search.

## Architecture Overview

### 1. Markdown Files (`/docs`)
All documentation content is stored as markdown files with YAML frontmatter:

```markdown
---
title: Getting Started
category: Guide
---

# Getting Started
...content...
```

**Structure:**
- `docs/guide/` - Getting started, tutorials, integration guides
- `docs/components/` - Component documentation (Button, Card, Input, Modal)
- `docs/design-system/` - Design system principles, accessibility
- `docs/ux-strategy/` - UX strategy and guidelines
- `docs/legacy/` - Deprecated components and styles

### 2. VitePress Integration
VitePress provides static documentation site generation.

**Configuration:** `docs/.vitepress/config.ts`

**Scripts:**
```bash
# Start VitePress dev server
yarn docs:dev

# Build static docs
yarn docs:build

# Preview built docs
yarn docs:preview
```

**Access:** http://localhost:5173/docs (when running `yarn docs:dev`)

### 3. In-App Help System
The Help page (`src/pages/Help.tsx`) dynamically loads markdown files and provides search functionality.

**Key Components:**
- `src/utils/markdownLoader.ts` - Loads markdown files via fetch, parses frontmatter
- `src/hooks/useMiniSearchDocs.ts` - Search hook using MiniSearch for full-text search
- `src/pages/Help.tsx` - Help page with search UI, categories, and document viewer

**Features:**
- Full-text search across all documentation
- Category filtering (Guide, Components, Design System, etc.)
- Featured documents section
- Markdown rendering with syntax highlighting
- Responsive design

### 4. Markdown Loader System

**Frontmatter Parsing:**
```typescript
interface DocItem {
  id: string;
  title: string;
  category: string;
  path: string;
  content: string;
}
```

The `markdownLoader.ts` utility:
1. Fetches markdown files from `/docs` directory
2. Parses YAML frontmatter to extract metadata
3. Maps files to routes and categories
4. Returns structured `DocItem[]` for search indexing

**File Mapping:**
- `docs/guide/getting-started.md` → `/help/getting-started`
- `docs/components/button.md` → `/help/button`
- etc.

### 5. Search Implementation

**MiniSearch Configuration:**
```typescript
{
  fields: ["title", "content", "category"],
  storeFields: ["id", "title", "content", "path", "category"],
  searchOptions: {
    fuzzy: 0.2,
    prefix: true,
    boost: { title: 2, category: 1.5 }
  }
}
```

**Search Features:**
- Fuzzy matching for typo tolerance
- Prefix search for autocomplete
- Title and category boosting
- Relevance scoring

## Usage

### Adding New Documentation

1. **Create markdown file** in appropriate `docs/` subdirectory:
```markdown
---
title: New Feature
category: Guide
---

# New Feature
Documentation content here...
```

2. **Update VitePress config** (optional) in `docs/.vitepress/config.ts`:
```typescript
sidebar: {
  '/guide/': [
    // ... existing items
    { text: 'New Feature', link: '/guide/new-feature' }
  ]
}
```

3. **Update markdownLoader.ts** to include the new file in `loadMarkdownDocs()` function.

4. **Restart dev server** to see changes.

### Searching Documentation

In the Help page:
- Use search bar for full-text search
- Click categories to filter
- Click documents to view full content
- Featured docs appear at top

### VitePress vs In-App Help

**Use VitePress when:**
- Generating static documentation site
- Creating comprehensive API reference
- Building documentation for external users
- Need SEO and shareable URLs

**Use In-App Help when:**
- Users need quick in-app reference
- Context-sensitive help is required
- Search needs to be integrated with app state
- Offline functionality is important

## Technical Details

### Vite Configuration
Added markdown asset handling in `vite.config.js`:
```javascript
assetsInclude: ['**/*.md']
```

This allows Vite to serve markdown files as static assets that can be fetched at runtime.

### Package Scripts
```json
{
  "scripts": {
    "dev": "vite",                      // Main app dev server
    "docs:dev": "vitepress dev docs",   // VitePress dev server
    "docs:build": "vitepress build docs", // Build static docs
    "docs:preview": "vitepress preview docs" // Preview built docs
  }
}
```

### Performance Considerations

- Markdown files loaded asynchronously on Help page mount
- MiniSearch index built client-side from loaded docs
- All 20 markdown files ~50KB total (uncompressed)
- Search indexing takes <100ms on modern browsers
- Consider caching loaded docs in localStorage for faster subsequent loads

## Migration from TypeScript Docs

Previously, documentation was stored as TypeScript objects in `src/data/helpDocs.ts`. The new system:

✅ **Advantages:**
- Separation of content from code
- Industry-standard markdown format
- VitePress for static site generation
- Easier for non-developers to contribute
- Version control friendly (better diffs)
- Reusable across multiple platforms

🔄 **Migration Completed:**
- All 19 original docs converted to markdown
- Added proper frontmatter metadata
- Organized into logical folder structure
- Search functionality preserved
- No breaking changes to Help page UI

## Future Enhancements

### Short Term
- [ ] Add loading states during markdown fetch
- [ ] Implement markdown file caching
- [ ] Add error handling for missing files
- [ ] Add breadcrumb navigation

### Medium Term
- [ ] Algolia DocSearch integration
- [ ] Multi-language support
- [ ] Code playground integration
- [ ] Component preview in docs

### Long Term
- [ ] Automated API documentation generation
- [ ] Interactive tutorials
- [ ] Video content integration
- [ ] Analytics on popular docs

## Troubleshooting

### Markdown files not loading
- Check Vite dev server is running
- Verify `assetsInclude` in vite.config.js
- Check browser console for fetch errors
- Ensure markdown files exist in `/docs` folder

### Search not working
- Verify MiniSearch is installed: `yarn list minisearch`
- Check docs are loaded: inspect `docs` array in Help component
- Look for console errors in browser DevTools

### VitePress not starting
- Ensure VitePress is installed: `yarn list vitepress`
- Check Node.js version (requires Node 18+)
- Verify `docs/.vitepress/config.ts` is valid

## Resources

- [VitePress Documentation](https://vitepress.dev/)
- [MiniSearch Documentation](https://lucaong.github.io/minisearch/)
- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Frontmatter](https://jekyllrb.com/docs/front-matter/)
