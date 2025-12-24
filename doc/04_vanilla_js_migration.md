# Migrating from jQuery to Vanilla JavaScript

## Overview

This document analyzes the feasibility of converting KEditor from jQuery to vanilla JavaScript and provides a roadmap for migration.

## jQuery Usage Analysis

### Core Dependencies

KEditor's jQuery dependencies fall into these categories:

| Category | jQuery Feature | Replaceable with Vanilla JS? |
|----------|---------------|------------------------------|
| DOM Selection | `$()`, `.find()`, `.children()` | ✅ Yes |
| DOM Manipulation | `.append()`, `.html()`, `.css()` | ✅ Yes |
| Event Handling | `.on()`, `.off()`, `.trigger()` | ✅ Yes |
| AJAX | `$.ajax()`, `$.get()` | ✅ Yes (fetch API) |
| Utilities | `$.extend()`, `$.each()` | ✅ Yes |
| **jQuery UI Sortable** | `.sortable()` | ⚠️ Needs replacement library |
| **jQuery UI Resizable** | `.resizable()` | ⚠️ Needs replacement library |
| **jQuery Fullscreen** | `.fullscreen()` | ✅ Native Fullscreen API |
| **jQuery Plugin System** | `$.fn.keditor` | 🔄 Different pattern needed |

## The Verdict: Partially Feasible

**Yes, you can migrate to vanilla JS, but:**

1. ✅ All basic jQuery features have vanilla JS equivalents
2. ⚠️ jQuery UI Sortable/Resizable need replacement libraries
3. 🔄 The jQuery plugin pattern needs restructuring
4. ⏱️ Significant development effort required

---

## Migration Strategy

### Option A: Hybrid Approach (Recommended First Step)

Keep jQuery for core functionality but write new components in vanilla JS:

```javascript
// New component using vanilla JS
KEditor.components['modern'] = {
    init: function(contentArea, container, component, keditor) {
        // Use vanilla JS internally
        const content = component[0].querySelector('.keditor-component-content');
        content.addEventListener('click', (e) => {
            // handle click
        });
    }
};
```

### Option B: Full Migration

Replace jQuery entirely with vanilla JS and alternative libraries.

---

## jQuery to Vanilla JS Conversion Guide

### DOM Selection

```javascript
// jQuery
$('#id')
$('.class')
$('div.class')
$(element).find('.child')
$(element).children()
$(element).parent()
$(element).closest('.ancestor')

// Vanilla JS
document.getElementById('id')
document.querySelectorAll('.class')
document.querySelectorAll('div.class')
element.querySelectorAll('.child')
Array.from(element.children)
element.parentElement
element.closest('.ancestor')
```

### DOM Manipulation

```javascript
// jQuery
$(element).html('<div>content</div>')
$(element).text('content')
$(element).append('<div>new</div>')
$(element).prepend('<div>new</div>')
$(element).before('<div>before</div>')
$(element).after('<div>after</div>')
$(element).remove()
$(element).empty()
$(element).clone()

// Vanilla JS
element.innerHTML = '<div>content</div>'
element.textContent = 'content'
element.insertAdjacentHTML('beforeend', '<div>new</div>')
element.insertAdjacentHTML('afterbegin', '<div>new</div>')
element.insertAdjacentHTML('beforebegin', '<div>before</div>')
element.insertAdjacentHTML('afterend', '<div>after</div>')
element.remove()
element.innerHTML = ''
element.cloneNode(true)
```

### CSS & Attributes

```javascript
// jQuery
$(element).css('property')
$(element).css('property', 'value')
$(element).css({ prop1: 'v1', prop2: 'v2' })
$(element).addClass('class')
$(element).removeClass('class')
$(element).toggleClass('class')
$(element).hasClass('class')
$(element).attr('name')
$(element).attr('name', 'value')
$(element).data('key')
$(element).data('key', 'value')

// Vanilla JS
getComputedStyle(element).getPropertyValue('property')
element.style.property = 'value'
Object.assign(element.style, { prop1: 'v1', prop2: 'v2' })
element.classList.add('class')
element.classList.remove('class')
element.classList.toggle('class')
element.classList.contains('class')
element.getAttribute('name')
element.setAttribute('name', 'value')
element.dataset.key
element.dataset.key = 'value'
```

### Events

```javascript
// jQuery
$(element).on('click', handler)
$(element).on('click', '.delegate', handler)
$(element).off('click')
$(element).trigger('click')
$(document).ready(handler)

// Vanilla JS
element.addEventListener('click', handler)
element.addEventListener('click', (e) => {
    if (e.target.matches('.delegate')) handler(e)
})
element.removeEventListener('click', handler)
element.dispatchEvent(new Event('click'))
document.addEventListener('DOMContentLoaded', handler)
```

### AJAX

```javascript
// jQuery
$.ajax({
    url: '/api/data',
    method: 'POST',
    data: { key: 'value' },
    success: function(response) { },
    error: function(jqXHR) { }
});

$.get('/api/data').done(handler);

// Vanilla JS (fetch)
fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => { })
.catch(error => { });

fetch('/api/data').then(r => r.json()).then(handler);
```

### Utilities

```javascript
// jQuery
$.extend({}, defaults, options)
$.each(array, function(i, item) { })
$.isArray(obj)
$.isFunction(obj)
$.inArray(value, array)
$.trim(string)

// Vanilla JS
{ ...defaults, ...options }
// or: Object.assign({}, defaults, options)
array.forEach((item, i) => { })
Array.isArray(obj)
typeof obj === 'function'
array.indexOf(value)
string.trim()
```

---

## Replacing jQuery UI

### Sortable (Drag and Drop)

**Option 1: SortableJS** (Recommended)
```javascript
// Install: npm install sortablejs
import Sortable from 'sortablejs';

const container = document.getElementById('container');
Sortable.create(container, {
    animation: 150,
    group: 'shared',
    onEnd: function(evt) {
        console.log('Moved item from', evt.oldIndex, 'to', evt.newIndex);
    }
});
```

**Option 2: dragula**
```javascript
// Install: npm install dragula
import dragula from 'dragula';

dragula([container1, container2], {
    moves: function(el, source, handle) {
        return handle.classList.contains('handle');
    }
});
```

### Resizable

**Option 1: Native resize CSS**
```css
.resizable {
    resize: both;
    overflow: auto;
}
```

**Option 2: interact.js**
```javascript
// Install: npm install interactjs
import interact from 'interactjs';

interact('.resizable').resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
        move(event) {
            let { x, y } = event.target.dataset;
            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;
            
            Object.assign(event.target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`
            });
        }
    }
});
```

---

## Replacing jQuery Fullscreen

```javascript
// jQuery Fullscreen
$(element).fullscreen();

// Native Fullscreen API
if (element.requestFullscreen) {
    element.requestFullscreen();
} else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
} else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
}

// Exit fullscreen
document.exitFullscreen();

// Check if fullscreen
document.fullscreenElement !== null
```

---

## Rewriting the Plugin System

### Current jQuery Plugin Pattern

```javascript
// Current pattern
$.fn.keditor = function(options) {
    let element = $(this);
    // ...
    return instance;
};
```

### Vanilla JS Class Pattern

```javascript
// New pattern
class KEditor {
    constructor(element, options = {}) {
        this.element = typeof element === 'string' 
            ? document.querySelector(element) 
            : element;
        this.options = { ...KEditor.DEFAULTS, ...options };
        this.init();
    }
    
    static DEFAULTS = {
        title: 'Page Editor',
        // ...
    };
    
    init() {
        // Initialization logic
    }
    
    getContent() {
        // Return content
    }
    
    setContent(html) {
        // Set content
    }
    
    destroy() {
        // Clean up
    }
}

// Usage
const editor = new KEditor('#content-area', {
    onSave: (content) => console.log(content)
});
```

---

## Example: Migrated Component

### Before (jQuery)

```javascript
KEditor.components['text'] = {
    init: function(contentArea, container, component, keditor) {
        let componentContent = component.children('.keditor-component-content');
        componentContent.prop('contenteditable', true);
        
        componentContent.on('input', function(e) {
            if (typeof keditor.options.onComponentChanged === 'function') {
                keditor.options.onComponentChanged.call(keditor, e, component);
            }
        });
    },
    
    getContent: function(component, keditor) {
        return component.find('.keditor-component-content').html();
    }
};
```

### After (Vanilla JS)

```javascript
KEditor.components['text'] = {
    init: function(contentArea, container, component, keditor) {
        // component is now a DOM element, not jQuery object
        const componentContent = component.querySelector('.keditor-component-content');
        componentContent.contentEditable = true;
        
        componentContent.addEventListener('input', (e) => {
            if (typeof keditor.options.onComponentChanged === 'function') {
                keditor.options.onComponentChanged.call(keditor, e, component);
            }
        });
    },
    
    getContent: function(component, keditor) {
        return component.querySelector('.keditor-component-content').innerHTML;
    }
};
```

---

## Migration Roadmap

### Phase 1: Preparation (1-2 weeks)
- [ ] Create vanilla JS utility functions
- [ ] Add TypeScript definitions (optional)
- [ ] Set up testing framework

### Phase 2: Core Utilities (2-3 weeks)
- [ ] Replace `$.extend` with spread operator
- [ ] Replace `$.each` with array methods
- [ ] Replace `$.ajax` with fetch
- [ ] Create DOM helper functions

### Phase 3: Replace jQuery UI (3-4 weeks)
- [ ] Integrate SortableJS for drag-drop
- [ ] Implement resizable with CSS/interact.js
- [ ] Use native Fullscreen API
- [ ] Update all sortable handlers

### Phase 4: Core Refactoring (4-6 weeks)
- [ ] Convert KEditor class
- [ ] Convert all component handlers
- [ ] Update modal system
- [ ] Update sidebar/topbar

### Phase 5: Testing & Polish (2-3 weeks)
- [ ] Test all functionality
- [ ] Fix browser compatibility
- [ ] Update documentation
- [ ] Create migration guide for users

**Total Estimated Time: 12-18 weeks**

---

## Recommendation

### For Most Projects: Keep jQuery

KEditor is deeply integrated with jQuery. Full migration would require:
- Significant development time
- Risk of introducing bugs
- Need to replace jQuery UI
- Breaking changes for existing users

**When to stick with jQuery:**
- Project is working fine
- No strong requirement to remove jQuery
- Team is familiar with jQuery

### For New Features: Use Vanilla JS

Write new components and features in vanilla JS:
- Modern syntax
- Smaller footprint
- Better for learning
- Forward compatible

### For New Projects: Consider Alternatives

If starting fresh, consider modern page builders:
- [GrapesJS](https://grapesjs.com/) - Vanilla JS, very active
- [Editor.js](https://editorjs.io/) - Block-based editor
- [Craft.js](https://craft.js.org/) - React-based

---

## Helper Library for Transition

Create a minimal jQuery-like helper for transition:

```javascript
// mini-query.js
const $ = (selector) => {
    const elements = typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : [selector];
    
    return {
        elements,
        first: () => elements[0],
        
        on(event, handler) {
            elements.forEach(el => el.addEventListener(event, handler));
            return this;
        },
        
        html(content) {
            if (content === undefined) return elements[0].innerHTML;
            elements.forEach(el => el.innerHTML = content);
            return this;
        },
        
        addClass(className) {
            elements.forEach(el => el.classList.add(className));
            return this;
        },
        
        removeClass(className) {
            elements.forEach(el => el.classList.remove(className));
            return this;
        },
        
        css(prop, value) {
            if (value === undefined) {
                return getComputedStyle(elements[0]).getPropertyValue(prop);
            }
            elements.forEach(el => el.style[prop] = value);
            return this;
        },
        
        find(selector) {
            return $(elements[0].querySelectorAll(selector));
        },
        
        each(callback) {
            elements.forEach((el, i) => callback.call(el, i, el));
            return this;
        }
    };
};
```

This allows gradual migration while maintaining familiar syntax.
