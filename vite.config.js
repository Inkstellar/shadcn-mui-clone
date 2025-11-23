import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'prop-types',
      'lowlight',
      '@mui/icons-material',
      'react-dom',
      'react',
      'react-router-dom',
      'react-syntax-highlighter',
      'react-syntax-highlighter/dist/esm/languages/prism/javascript',
      'react-syntax-highlighter/dist/esm/languages/prism/jsx',
      'react-syntax-highlighter/dist/esm/languages/prism/typescript',
      'react-syntax-highlighter/dist/esm/languages/prism/tsx',
      'react-syntax-highlighter/dist/esm/languages/prism/json',
      'react-syntax-highlighter/dist/esm/languages/prism/css',
      'react-syntax-highlighter/dist/esm/languages/prism/markdown',
      'prismjs',
      'prismjs/components/prism-javascript',
      'prismjs/components/prism-jsx',
      'prismjs/components/prism-typescript',
      'prismjs/components/prism-tsx',
      'prismjs/components/prism-json',
      'prismjs/components/prism-css',
      'prismjs/components/prism-markdown',
      '@mui/material',
      '@mui/system',
      '@emotion/react',
      '@emotion/styled',
      'lucide-react',
      'react-copy-to-clipboard'
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: [
      'prop-types',
      'lowlight',
      '@mui/icons-material',
      'react-dom',
      'react',
      'react-router-dom',
      'react-syntax-highlighter',
      'prismjs'
    ],
  },
  server: {
    port: 8080,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/system', '@emotion/react', '@emotion/styled'],
          syntax: ['react-syntax-highlighter', 'prismjs'],
          utils: ['lucide-react', 'react-copy-to-clipboard']
        },
      },
      external: [], // Don't externalize anything to ensure proper bundling
    },
    commonjsOptions: {
      include: [
        /prop-types/,
        /lowlight/,
        /react-dom/,
        /react-router-dom/,
        /react-syntax-highlighter/,
        /prismjs/,
        /node_modules/
      ],
      transformMixedEsModules: true,
    },
  },
  define: {
    global: 'globalThis', // Fix for some CommonJS compatibility
  },
})
