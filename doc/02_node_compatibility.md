# Node.js Compatibility - Vite Migration Guide

## The Problem

KEditor was built with dependencies incompatible with **Node.js 16+**. The primary issue is `node-sass v4.14.1` which only works with Node 10-14.

## Solution: Migrate to Vite

**Vite** is the recommended build tool for Node 18+ compatibility and long-term support.

### Why Vite?

| Feature | Benefit |
|---------|---------|
| Node Support | Node 18, 20, 22, 23+ (all modern versions) |
| Build Speed | 10-100x faster than webpack |
| HMR | <100ms hot reload |
| Configuration | Minimal, clean syntax |
| CSS Preprocessors | Built-in LESS/SASS support |
| Future-proof | Active development, long-term maintenance |

---

## Migration Guide

### Step 1: Remove Old Files

```bash
# Remove old dependencies and config
rm -rf node_modules package-lock.json
rm webpack.config.js .babelrc
```

### Step 2: Create New package.json

Replace `package.json` with:

```json
{
    "name": "@kademi/keditor",
    "title": "KEditor",
    "libraryName": "KEditor",
    "version": "3.0.0",
    "type": "module",
    "description": "KEditor - Content editor with drag and drop",
    "author": "Kademi (http://kademi.co)",
    "license": "MIT",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "devDependencies": {
        "less": "^4.2.0",
        "sass": "^1.77.0",
        "terser": "^5.31.0",
        "vite": "^5.4.0",
        "vite-plugin-banner": "^0.8.0"
    }
}
```

### Step 3: Create vite.config.js

Create `vite.config.js` in project root:

```javascript
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const BANNER = `/*! ${pkg.title} v${pkg.version} | Copyright (c) 2016-present ${pkg.author} */`;

export default defineConfig({
    build: {
        lib: {
            entry: {
                'keditor': './src/keditor/index.js',
                'keditor-components': './src/components/index.js'
            },
            name: 'KEditor',
            formats: ['umd', 'es'],
            fileName: (format, entryName) => `js/${entryName}.${format}.js`
        },
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            external: ['jquery', 'ckeditor'],
            output: {
                globals: {
                    jquery: 'jQuery',
                    ckeditor: 'CKEDITOR'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'css/[name][extname]';
                    }
                    return 'assets/[name][extname]';
                }
            }
        },
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true
            }
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            },
            scss: {}
        },
        devSourcemap: true
    },
    plugins: [
        banner(BANNER)
    ],
    resolve: {
        alias: {
            'keditor': '/src/keditor'
        }
    }
});
```

### Step 4: Update Source Imports (If Needed)

If any files use CommonJS `require()`, update to ES modules:

```javascript
// Before (CommonJS)
const $ = require('jquery');

// After (ES modules)
import $ from 'jquery';
```

### Step 5: Install & Build

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Output Structure

After building, `dist/` will contain:

```
dist/
├── css/
│   ├── keditor.css
│   └── keditor-components.css
└── js/
    ├── keditor.umd.js      # For <script> tags
    ├── keditor.es.js       # For ES module imports
    ├── keditor-components.umd.js
    └── keditor-components.es.js
```

---

## Usage After Migration

### Using UMD Build (Traditional)

```html
<script src="dist/js/keditor.umd.js"></script>
<script src="dist/js/keditor-components.umd.js"></script>
<link rel="stylesheet" href="dist/css/keditor.css">
```

### Using ES Module Build

```javascript
import KEditor from './dist/js/keditor.es.js';
import './dist/js/keditor-components.es.js';
```

---

## Troubleshooting

### Error: "Cannot find module 'vite'"
```bash
npm install
```

### Error: "ReferenceError: require is not defined"
Your source files use CommonJS. Update to ES module imports (see Step 4).

### Error: LESS/SASS not compiling
```bash
npm install less sass --save-dev
```

### Error: "jQuery is not defined" at runtime
jQuery must be loaded before KEditor:
```html
<script src="jquery.min.js"></script>
<script src="dist/js/keditor.umd.js"></script>
```

---

## Node Version Support

| Node Version | Status |
|--------------|--------|
| 18.x (LTS) | ✅ Fully supported |
| 20.x (LTS) | ✅ Fully supported |
| 22.x (LTS) | ✅ Fully supported |
| 23.x+ | ✅ Fully supported |

---

## Quick Reference

```bash
# Full migration in one go
rm -rf node_modules package-lock.json webpack.config.js .babelrc

# Create package.json and vite.config.js as shown above

npm install
npm run build
```
