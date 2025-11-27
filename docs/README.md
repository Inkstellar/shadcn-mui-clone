# Documentation Folder

This folder contains all markdown documentation files for the application. Files are automatically discovered and indexed - **no manual configuration required**.

## 🚀 Quick Start

### Adding New Documentation

1. **Create a markdown file** in the appropriate subfolder:
   ```markdown
   ---
   title: My New Feature
   category: Guide
   ---

   # My New Feature
   
   Documentation content goes here...
   ```

2. **That's it!** The file will be automatically:
   - Discovered and loaded
   - Indexed for search
   - Categorized based on folder structure
   - Available in the Help page

### No Manual Updates Needed ✨

Unlike the old system, you **DO NOT** need to:
- ❌ Add the file to any array or configuration
- ❌ Update `markdownLoader.ts`
- ❌ Modify any import statements
- ❌ Manually specify routes or IDs

The system uses **Vite's `import.meta.glob`** to automatically discover all `.md` files at build time.

## 📁 Folder Structure

```
docs/
├── guide/              → Category: "Guide"
│   ├── getting-started.md
│   ├── components-overview.md
│   └── ...
├── components/         → Category: "Components"
│   ├── button.md
│   ├── card.md
│   └── ...
├── design-system/      → Category: "Design System"
│   ├── introduction.md
│   ├── accessibility.md
│   └── ...
├── ux-strategy/        → Category: "UX Strategy"
│   └── strategy.md
└── legacy/             → Category: "Legacy"
    ├── deprecated-components.md
    └── deprecated-styles.md
```

## 🏷️ Automatic Metadata Generation

### Categories
Categories are **automatically inferred** from the folder name:

| Folder | Auto-Generated Category |
|--------|------------------------|
| `guide/` | Guide |
| `components/` | Components |
| `design-system/` | Design System |
| `ux-strategy/` | UX Strategy |
| `legacy/` | Legacy |
| *(other)* | Documentation |

**Override:** Add `category: Custom Category` to frontmatter

### Routes
Routes are **automatically generated** based on folder and filename:

| File | Auto-Generated Route |
|------|---------------------|
| `guide/getting-started.md` | `/help#getting-started` |
| `components/button.md` | `/components/button` |
| `design-system/accessibility.md` | `/help#accessibility` |

**Override:** Add `path: /custom/route` to frontmatter

### IDs
Document IDs are **automatically generated** from the filename:

| File | Auto-Generated ID |
|------|------------------|
| `getting-started.md` | `getting-started` |
| `button.md` (in components/) | `button-component` |
| `accessibility.md` | `accessibility` |

**Note:** Component files get `-component` suffix to avoid ID conflicts.

### Titles
If no `title` is specified in frontmatter, it's **auto-generated** from the filename:

| Filename | Auto-Generated Title |
|----------|---------------------|
| `getting-started.md` | Getting Started |
| `livecodes-integration.md` | Livecodes Integration |
| `faq.md` | Faq |

**Best Practice:** Always specify `title` in frontmatter for proper capitalization.

## 📝 Frontmatter Format

### Minimal (Auto-Generated Metadata)
```markdown
---
title: My Document
---

Content here...
```

### Full Control (Override Defaults)
```markdown
---
title: Custom Document Title
category: Custom Category
path: /custom/path
---

Content here...
```

### Frontmatter Fields

| Field | Required | Auto-Generated | Description |
|-------|----------|----------------|-------------|
| `title` | No | Yes (from filename) | Document title shown in UI |
| `category` | No | Yes (from folder) | Category for filtering |
| `path` | No | Yes (from folder/file) | Route for navigation |

## 🔍 How It Works

### 1. Discovery (Build Time)
```typescript
// Vite evaluates this at build time
const markdownModules = import.meta.glob('../../docs/**/*.md', { 
  as: 'raw',
  eager: false 
});
```

This creates a map of all `.md` files in the `docs/` directory. New files are automatically included when you restart the dev server or rebuild.

### 2. Loading (Runtime)
```typescript
for (const [filePath, importFn] of Object.entries(markdownModules)) {
  const content = await importFn();
  // Parse frontmatter and generate metadata
}
```

Files are loaded on-demand when the Help page mounts.

### 3. Parsing
- Extracts YAML frontmatter
- Parses markdown content
- Generates missing metadata from file path

### 4. Indexing
All loaded documents are indexed by MiniSearch for full-text search.

## 🎨 Styling & Formatting

### Code Blocks
Use fenced code blocks with language specification:

\`\`\`typescript
const example = "code here";
\`\`\`

### Links
- **Internal:** `[Button Component](button.md)` or `[Getting Started](../guide/getting-started.md)`
- **External:** `[MUI Docs](https://mui.com)`
- **Anchors:** `[Section](#section-heading)`

### Images
```markdown
![Alt text](../../assets/images/example.png)
```

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## 📂 Adding a New Category

1. **Create a new folder** in `docs/`:
   ```
   docs/api/
   ```

2. **Add markdown files**:
   ```
   docs/api/authentication.md
   docs/api/endpoints.md
   ```

3. **Update category mapping** in `markdownLoader.ts`:
   ```typescript
   const categoryMap: Record<string, string> = {
     'guide': 'Guide',
     'components': 'Components',
     'design-system': 'Design System',
     'ux-strategy': 'UX Strategy',
     'legacy': 'Legacy',
     'api': 'API Reference'  // Add this line
   };
   ```

4. **Restart dev server** - Files will be automatically discovered!

## 🔧 Advanced Configuration

### Excluding Files
To exclude certain files from being loaded, modify the glob pattern in `markdownLoader.ts`:

```typescript
const markdownModules = import.meta.glob('../../docs/**/!(README|index).md', { 
  as: 'raw',
  eager: false 
});
```

This excludes `README.md` and `index.md` files.

### Custom Route Patterns
Modify the `getRouteFromPath` function in `markdownLoader.ts`:

```typescript
function getRouteFromPath(filePath: string): string {
  const match = filePath.match(/\/docs\/([^/]+)\/([^/]+)\.md$/);
  if (!match) return '/help';
  
  const [, folder, fileName] = match;
  
  // Add custom routing logic
  if (folder === 'api') {
    return `/api-docs/${fileName}`;
  }
  
  // ... existing logic
}
```

### Eager vs Lazy Loading
Current configuration uses **lazy loading** (`eager: false`):
- Files loaded on-demand
- Better initial page load
- Slight delay when Help page opens

To use **eager loading** (`eager: true`):
- All files loaded at build time
- Larger bundle size
- Instant Help page load

Change in `markdownLoader.ts`:
```typescript
const markdownModules = import.meta.glob('../../docs/**/*.md', { 
  as: 'raw',
  eager: true  // Change this
});
```

## 🐛 Troubleshooting

### File Not Showing Up
1. **Check file location** - Must be in `docs/` subdirectory
2. **Verify frontmatter** - Must have valid YAML syntax
3. **Restart dev server** - `Ctrl+C` then `yarn dev`
4. **Check browser console** - Look for loading errors

### Search Not Finding Content
1. **Verify frontmatter parsed correctly**
2. **Check content isn't empty** after frontmatter
3. **Clear browser cache** and reload
4. **Check MiniSearch indexing** in browser DevTools

### Wrong Category/Route
1. **Add explicit frontmatter** to override defaults
2. **Check folder name** matches category mapping
3. **Verify file path** matches expected pattern

## 📊 Performance

- **Discovery:** ~0ms (build-time evaluation)
- **Loading:** ~50-100ms (18 files, lazy loading)
- **Parsing:** ~10ms per file
- **Indexing:** ~50-100ms (MiniSearch)
- **Total:** ~150-300ms to fully load Help system

## 🚦 Best Practices

### ✅ Do
- Use descriptive filenames (`user-authentication.md`, not `doc1.md`)
- Include frontmatter with `title` for proper formatting
- Organize files logically into folders
- Use relative links for internal documentation
- Write clear, searchable content

### ❌ Don't
- Don't use spaces in filenames (use hyphens: `getting-started.md`)
- Don't manually update `docsStructure` arrays (they don't exist anymore!)
- Don't create deeply nested folders (keep it flat)
- Don't duplicate filenames across folders (IDs may conflict)
- Don't include `index.md` in category folders (automatically excluded)

## 🔄 Migration from Old System

### Old Way (Manual)
```typescript
// Had to manually list every file
const docsStructure = [
  { path: '/docs/guide/getting-started.md', id: 'getting-started', route: '/help#getting-started' },
  { path: '/docs/guide/theming.md', id: 'theming', route: '/help#theming' },
  // ... 20+ more entries
];
```

### New Way (Automatic)
```typescript
// Automatically discovers all files
const markdownModules = import.meta.glob('../../docs/**/*.md', { 
  as: 'raw',
  eager: false 
});
```

**Benefits:**
- 🎯 No manual maintenance
- ⚡ Faster to add new docs
- 🛡️ No forgotten files
- 📦 Smaller source code
- 🔄 Self-updating

## 📚 Resources

- [Vite Glob Import Docs](https://vitejs.dev/guide/features.html#glob-import)
- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Frontmatter](https://jekyllrb.com/docs/front-matter/)
- [MiniSearch Docs](https://lucaong.github.io/minisearch/)

## 💡 Tips

1. **VS Code Extensions:**
   - Install "Markdown All in One" for better editing
   - Install "markdownlint" for style checking

2. **Testing:**
   - Run `yarn dev` and visit `/help`
   - Search for your new document
   - Verify category filtering works

3. **Preview:**
   - Use VitePress: `yarn docs:dev`
   - Visit http://localhost:5173

4. **Debugging:**
   - Check browser console for loading errors
   - Inspect `docs` state in React DevTools
   - Verify file paths match expected patterns
