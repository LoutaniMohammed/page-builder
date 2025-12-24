# KEditor (Page Builder) - How It Works

## Overview

KEditor is a **jQuery-based visual page builder** that provides drag-and-drop content editing capabilities. It allows users to create web page layouts using containers and components, with real-time preview and editing inside an iframe.

## Core Architecture

### Technology Stack
- **jQuery** - Core DOM manipulation and plugin architecture
- **jQuery UI** - Sortable and resizable functionality for drag-and-drop
- **jQuery Fullscreen** - Fullscreen editing mode
- **FontAwesome** - Icon system
- **Bootstrap** - Grid system and content styles (optional)
- **CKEditor** - Rich text editing for text components
- **Webpack 4** - Module bundling
- **Babel** - ES6+ transpilation
- **LESS/SASS** - CSS preprocessing

### Project Structure

```
page-builder/
├── src/
│   ├── keditor/            # Core editor code
│   │   ├── index.js        # Main KEditor class
│   │   ├── init.js         # Initialization logic
│   │   ├── constants/      # Default settings, CSS classes
│   │   ├── component/      # Component handling
│   │   ├── container/      # Container handling
│   │   ├── iframe/         # Iframe management
│   │   ├── modal/          # Modal dialogs
│   │   ├── sidebar/        # Settings sidebar
│   │   ├── topbar/         # Toolbar controls
│   │   └── utils/          # Helper functions
│   ├── components/         # Built-in component types
│   │   ├── keditor-component-text.js
│   │   ├── keditor-component-photo.js
│   │   ├── keditor-component-video.js
│   │   ├── keditor-component-form.js
│   │   ├── keditor-component-audio.js
│   │   ├── keditor-component-youtube.js
│   │   ├── keditor-component-vimeo.js
│   │   └── keditor-component-googlemap.js
│   └── styles/             # LESS stylesheets
├── dist/                   # Compiled output (js/css)
├── examples/               # Demo pages
└── docs/                   # Original documentation
```

## Content Hierarchy

KEditor uses a nested structure for organizing content:

```
keditor
└── content-area (one or more)
    └── container (one or more)
        └── container-content (one or more columns)
            ├── component (any component type)
            └── sub-container (optional nesting)
                └── sub-container-content
                    └── component
```

### Elements Explained:
1. **KEditor** - The main editor instance
2. **Content Area** - A region that holds containers
3. **Container** - A layout wrapper (typically a Bootstrap row)
4. **Container Content** - A column within a container
5. **Sub-container** - A nested container for complex layouts
6. **Component** - An individual content block (text, image, video, etc.)

## Initialization Process

### Via jQuery Plugin
```javascript
$('#content-area').keditor({
    // options
});
```

### Via Static Method
```javascript
KEditor.init($('#content-area'), {
    // options
});
```

### What Happens During Init:
1. **initIframe** - Creates an iframe for isolated content editing
2. **initTopbar** - Builds the toolbar (device switcher, preview, save)
3. **initSidebar** - Sets up the settings panel
4. **initSnippetsModal** - Loads and displays available snippets
5. **initExtraSettings** - Adds any custom settings forms

## Built-in Components

| Component | File | Purpose |
|-----------|------|---------|
| `text` | keditor-component-text.js | Rich text editing with CKEditor |
| `photo` | keditor-component-photo.js | Image management |
| `video` | keditor-component-video.js | Video embedding |
| `audio` | keditor-component-audio.js | Audio player |
| `youtube` | keditor-component-youtube.js | YouTube embed |
| `vimeo` | keditor-component-vimeo.js | Vimeo embed |
| `googlemap` | keditor-component-googlemap.js | Google Maps embed |
| `form` | keditor-component-form.js | Form builder (uses formBuilder) |
| `blank` | (default) | Empty component with no editing |

## Component Lifecycle

Each component type can implement these methods:

```javascript
KEditor.components['myComponent'] = {
    // Called when component is initialized
    init: function(contentArea, container, component, keditor) {},
    
    // Called to get component's HTML content
    getContent: function(component, keditor) {},
    
    // Called when component is deleted
    destroy: function(component, keditor) {},
    
    // Enable/disable settings panel
    settingEnabled: true,
    settingTitle: 'My Component Settings',
    
    // Initialize the settings form
    initSettingForm: function(form, keditor) {},
    
    // Populate settings when shown
    showSettingForm: function(form, component, keditor) {},
    
    // Clean up settings when hidden
    hideSettingForm: function(form, keditor) {}
};
```

## Key Features

### 1. Iframe-Based Editing
All content is edited within an iframe to:
- Isolate editor styles from content styles
- Support responsive device preview widths
- Prevent CSS conflicts

### 2. Drag and Drop
Uses jQuery UI Sortable for:
- Reordering containers within content areas
- Moving components between containers
- Dragging snippets from the modal to content

### 3. Snippets System
- Snippets are HTML templates loaded from `snippets/snippets.html`
- Can be containers or components
- Support categories for filtering
- Can be added programmatically via `addSnippet()` method

### 4. Responsive Preview
- Mobile (420px)
- Tablet (820px)
- Laptop (1050px)
- Desktop (1250px+)

### 5. Full Callback System
Over 25 callbacks for:
- Lifecycle events (init, ready, destroy)
- Content changes (add, delete, duplicate)
- Selection events
- Dynamic content loading
- Save actions

## How Content Flow Works

### Adding Content:
1. User clicks "Add Content" → Opens snippet modal
2. User drags a snippet → Snippet cloned and transformed
3. If container snippet → Added to content area
4. If component snippet → Added to container-content or auto-wrapped in container

### Editing Content:
1. User clicks on component → Component selected
2. If `settingEnabled` → Settings panel opens in sidebar
3. Changes in settings → Updates component in real-time
4. For text components → CKEditor inline editing

### Saving Content:
1. Call `getContent()` → Iterates all content areas
2. Each component's `getContent()` called → Gets processed HTML
3. Returns clean HTML string without editor markup

## Configuration Options

Key configuration options (see `src/keditor/constants/defaults.js`):

| Option | Default | Description |
|--------|---------|-------------|
| `title` | 'Editing with KEditor' | Topbar title |
| `snippetsUrl` | 'snippets/snippets.html' | URL to load snippets |
| `widthMobile` | 420 | Mobile preview width |
| `widthTablet` | 820 | Tablet preview width |
| `widthLaptop` | 1050 | Laptop preview width |
| `minWidthDesktop` | 1250 | Desktop min width |
| `containerSettingEnabled` | false | Enable container settings |
| `contentStyles` | [] | CSS for iframe content |
| `locale` | {...} | UI text translations |

## Dynamic Content

Components can load content dynamically using `data-dynamic-href`:

```html
<div data-type="component-x" data-dynamic-href="/api/content"></div>
```

The editor will fetch content from the URL and inject it into the component.
