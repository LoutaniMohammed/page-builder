# KEditor Usage Guide - Using and Adding Components

## Quick Start

### 1. Include Dependencies

```html
<!-- CSS -->
<link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css" data-type="keditor-style" />
<link rel="stylesheet" href="plugins/font-awesome/css/font-awesome.min.css" data-type="keditor-style" />
<link rel="stylesheet" href="dist/css/keditor.css" data-type="keditor-style" />
<link rel="stylesheet" href="dist/css/keditor-components.css" data-type="keditor-style" />

<!-- JavaScript -->
<script src="plugins/jquery/jquery.min.js"></script>
<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="plugins/ckeditor/ckeditor.js"></script>
<script src="dist/js/keditor.js"></script>
<script src="dist/js/keditor-components.js"></script>
```

### 2. Create Content Area

```html
<div data-keditor="html">
    <div id="content-area"></div>
</div>
```

### 3. Initialize KEditor

```javascript
$(function() {
    $('#content-area').keditor({
        snippetsUrl: 'snippets/snippets.html',
        onSave: function(content) {
            console.log('Saved content:', content);
            // Send to server
        }
    });
});
```

---

## Configuration Options

### Basic Configuration

```javascript
$('#content-area').keditor({
    // Title in topbar
    title: 'Page Editor',
    
    // Path to snippets HTML
    snippetsUrl: '/snippets/my-snippets.html',
    
    // Device preview widths
    widthMobile: 375,
    widthTablet: 768,
    widthLaptop: 1024,
    minWidthDesktop: 1200,
    
    // Additional CSS for iframe content
    contentStyles: [
        { href: '/css/content-styles.css' },
        { content: 'body { font-family: Arial; }' }
    ]
});
```

### Callbacks

```javascript
$('#content-area').keditor({
    // Called when editor is ready
    onReady: function() {
        console.log('Editor ready!');
    },
    
    // Called when save button clicked
    onSave: function(content) {
        $.post('/api/save', { html: content });
    },
    
    // Called on any content change
    onContentChanged: function(event, contentArea) {
        console.log('Content changed');
    },
    
    // Called when component added
    onComponentSnippetAdded: function(event, component, snippet, contentArea) {
        console.log('Component added:', component);
    }
});
```

---

## Getting and Setting Content

### Get Content

```javascript
// Get as single string
var content = $('#content-area').keditor('getContent');

// Get as array (for multiple content areas)
var contentArray = $('#content-area').keditor('getContent', true);
```

### Set Content

```javascript
$('#content-area').keditor('setContent', `
    <div class="row">
        <div class="col-md-12" data-type="container-content">
            <div data-type="component-text">
                <p>Hello World!</p>
            </div>
        </div>
    </div>
`);
```

### Destroy Editor

```javascript
$('#content-area').keditor('destroy');
```

---

## Creating Snippets

Snippets are HTML templates that users can drag into the editor.

### Snippet File Structure (snippets.html)

```html
<!-- Container Snippets -->
<div data-type="container" 
     data-preview="/images/snippets/1-column.png"
     data-keditor-title="1 Column"
     data-keditor-categories="Layouts">
    <div class="row">
        <div class="col-md-12" data-type="container-content"></div>
    </div>
</div>

<div data-type="container"
     data-preview="/images/snippets/2-columns.png"
     data-keditor-title="2 Columns"
     data-keditor-categories="Layouts">
    <div class="row">
        <div class="col-md-6" data-type="container-content"></div>
        <div class="col-md-6" data-type="container-content"></div>
    </div>
</div>

<!-- Component Snippets -->
<div data-type="component-text"
     data-preview="/images/snippets/heading.png"
     data-keditor-title="Heading"
     data-keditor-categories="Text;Basic">
    <h1>Your Heading Here</h1>
</div>

<div data-type="component-photo"
     data-preview="/images/snippets/image.png"
     data-keditor-title="Image"
     data-keditor-categories="Media">
    <img src="/images/placeholder.jpg" alt="Image" />
</div>
```

### Snippet Attributes

| Attribute | Description |
|-----------|-------------|
| `data-type` | `container` or `component-{type}` |
| `data-preview` | URL to preview thumbnail |
| `data-keditor-title` | Display title in modal |
| `data-keditor-categories` | Categories (semicolon-separated) |

### Add Snippets Programmatically

```javascript
var keditor = $('#content-area').keditor();

keditor.addSnippet(
    'component-text',           // type
    'Custom Text Block',        // title
    '/images/custom-text.png',  // preview URL
    'Custom;Text',              // categories
    '<div><p>Custom content</p></div>'  // HTML content
);
```

---

## Creating Custom Components

### Step 1: Create Component Handler

Create a new file `src/components/keditor-component-custom.js`:

```javascript
import KEditor from 'keditor';

KEditor.components['custom'] = {
    // Enable settings panel
    settingEnabled: true,
    settingTitle: 'Custom Component Settings',
    
    /**
     * Initialize component
     */
    init: function(contentArea, container, component, keditor) {
        var self = this;
        var componentContent = component.find('.keditor-component-content');
        
        // Add any initialization logic
        componentContent.find('button').on('click', function() {
            alert('Button clicked!');
        });
    },
    
    /**
     * Get component's HTML for saving
     */
    getContent: function(component, keditor) {
        var componentContent = component.find('.keditor-component-content');
        return componentContent.html();
    },
    
    /**
     * Clean up when component deleted
     */
    destroy: function(component, keditor) {
        // Remove event listeners, clean up resources
    },
    
    /**
     * Initialize settings form (called once)
     */
    initSettingForm: function(form, keditor) {
        form.append(`
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control setting-title" />
            </div>
            <div class="form-group">
                <label>Color</label>
                <input type="color" class="form-control setting-color" />
            </div>
        `);
        
        // Handle changes
        form.find('.setting-title').on('input', function() {
            var component = keditor.getSettingComponent();
            component.find('h2').text($(this).val());
        });
        
        form.find('.setting-color').on('change', function() {
            var component = keditor.getSettingComponent();
            component.find('.custom-box').css('background', $(this).val());
        });
    },
    
    /**
     * Populate settings when component selected
     */
    showSettingForm: function(form, component, keditor) {
        var title = component.find('h2').text();
        var color = component.find('.custom-box').css('background-color');
        
        form.find('.setting-title').val(title);
        form.find('.setting-color').val(color);
    },
    
    /**
     * Clean up settings when deselected
     */
    hideSettingForm: function(form, keditor) {
        form.find('.setting-title').val('');
        form.find('.setting-color').val('#000000');
    }
};
```

### Step 2: Register Component

Add import to `src/components/index.js`:

```javascript
import './keditor-component-text';
import './keditor-component-photo';
import './keditor-component-video';
// ... other components
import './keditor-component-custom';  // Add this line
```

### Step 3: Add Snippet

Add to your snippets HTML:

```html
<div data-type="component-custom"
     data-preview="/images/snippets/custom.png"
     data-keditor-title="Custom Block"
     data-keditor-categories="Custom">
    <div class="custom-box" style="padding: 20px; background: #f5f5f5;">
        <h2>Title Here</h2>
        <p>Custom content</p>
        <button class="btn btn-primary">Click Me</button>
    </div>
</div>
```

### Step 4: Build

```bash
npm run build
```

---

## Container Settings

Enable container-level settings:

```javascript
$('#content-area').keditor({
    containerSettingEnabled: true,
    
    containerSettingInitFunction: function(form, keditor) {
        form.append(`
            <div class="form-group">
                <label>Background Color</label>
                <input type="color" class="form-control container-bg" />
            </div>
            <div class="form-group">
                <label>Padding</label>
                <input type="number" class="form-control container-padding" />
            </div>
        `);
        
        form.find('.container-bg').on('change', function() {
            var container = keditor.getSettingContainer();
            container.css('background', $(this).val());
        });
        
        form.find('.container-padding').on('input', function() {
            var container = keditor.getSettingContainer();
            container.css('padding', $(this).val() + 'px');
        });
    },
    
    containerSettingShowFunction: function(form, container, keditor) {
        form.find('.container-bg').val(container.css('background-color') || '#ffffff');
        form.find('.container-padding').val(parseInt(container.css('padding')) || 0);
    }
});
```

---

## Dynamic Content

Load content dynamically from server:

```html
<div data-type="component-text"
     data-dynamic-href="/api/get-content/123"
     data-keditor-title="Dynamic Content">
    <div class="loading">Loading...</div>
</div>
```

```javascript
$('#content-area').keditor({
    onBeforeDynamicContentLoad: function(element, component, contentArea) {
        element.html('<div class="spinner">Loading...</div>');
    },
    
    onDynamicContentLoaded: function(element, jqXHR, contentArea) {
        console.log('Content loaded');
    },
    
    onDynamicContentError: function(element, jqXHR, contentArea) {
        element.html('<div class="error">Failed to load</div>');
    }
});
```

---

## Extra Settings (Global Settings)

Add custom settings panels triggered by external buttons:

```javascript
$('#content-area').keditor({
    extraSettings: {
        pageSettings: {
            title: 'Page Settings',
            trigger: '#btn-page-settings',  // External button selector
            autoInit: true,
            
            settingInitFunction: function(form, keditor) {
                form.append(`
                    <div class="form-group">
                        <label>Page Title</label>
                        <input type="text" class="form-control page-title" />
                    </div>
                    <div class="form-group">
                        <label>Meta Description</label>
                        <textarea class="form-control page-meta"></textarea>
                    </div>
                `);
            },
            
            settingShowFunction: function(form, trigger, keditor) {
                // Populate form when shown
            }
        }
    }
});
```

---

## Localization

Customize UI text:

```javascript
$('#content-area').keditor({
    locale: {
        viewOnMobile: 'Mobile Preview',
        viewOnTablet: 'Tablet Preview',
        viewOnDesktop: 'Desktop Preview',
        save: 'Save Changes',
        addContent: 'Add Block',
        move: 'Drag to Move',
        setting: 'Settings',
        copy: 'Duplicate',
        delete: 'Remove',
        confirmDeleteContainerText: 'Delete this section?',
        confirmDeleteComponentText: 'Delete this block?'
    }
});
```

---

## Best Practices

### 1. Snippet Previews
- Use clear, consistent preview images
- Size: 200x150px recommended
- Show the component in context

### 2. Component Settings
- Keep settings relevant and minimal
- Update content in real-time
- Validate inputs

### 3. Content Structure
- Use semantic HTML
- Include proper Bootstrap classes
- Test responsive behavior

### 4. Performance
- Lazy-load heavy components
- Clean up resources in `destroy()`
- Minimize DOM operations
