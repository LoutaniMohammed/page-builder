import '../styles/keditor-component-text.less';

import KEditor from 'keditor';

// Text component using CKEditor 5
// ---------------------------------------------------------------------
KEditor.components['text'] = {
    // Store editor instances by element ID
    editors: {},

    init: function (contentArea, container, component, keditor) {
        let self = this;
        let options = keditor.options;

        let componentContent = component.children('.keditor-component-content');
        let elementId = componentContent.attr('id');
        
        // Check if CKEditor 5 is available
        if (typeof window.InlineEditor === 'undefined') {
            console.error('[ KEditor ] CKEditor 5 InlineEditor is not loaded. Please include CKEditor 5 script.');
            // Fallback to contenteditable
            componentContent.prop('contenteditable', true);
            return;
        }

        // Create CKEditor 5 inline editor
        window.InlineEditor
            .create(componentContent[0], {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        '|',
                        'link',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'alignment',
                        '|',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'undo',
                        'redo'
                    ],
                    shouldNotGroupWhenFull: true
                },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                    ]
                },
                link: {
                    addTargetToExternalLinks: true
                }
            })
            .then(editor => {
                // Store editor instance
                self.editors[elementId] = editor;

                // Listen for content changes
                editor.model.document.on('change:data', () => {
                    if (typeof options.onComponentChanged === 'function') {
                        options.onComponentChanged.call(keditor, null, component);
                    }

                    if (typeof options.onContainerChanged === 'function') {
                        options.onContainerChanged.call(keditor, null, container, contentArea);
                    }

                    if (typeof options.onContentChanged === 'function') {
                        options.onContentChanged.call(keditor, null, contentArea);
                    }
                });

                if (typeof options.onComponentReady === 'function') {
                    options.onComponentReady.call(contentArea, component, editor);
                }
            })
            .catch(error => {
                console.error('[ KEditor ] CKEditor 5 initialization error:', error);
                // Fallback to contenteditable
                componentContent.prop('contenteditable', true);
            });
    },

    getContent: function (component, keditor) {
        let componentContent = component.find('.keditor-component-content');
        let id = componentContent.attr('id');
        let editor = this.editors[id];
        
        if (editor) {
            return editor.getData();
        } else {
            return componentContent.html();
        }
    },

    destroy: function (component, keditor) {
        let id = component.find('.keditor-component-content').attr('id');
        let editor = this.editors[id];
        
        if (editor) {
            editor.destroy()
                .then(() => {
                    delete this.editors[id];
                })
                .catch(error => {
                    console.error('[ KEditor ] Error destroying CKEditor 5:', error);
                });
        }
    },
};
