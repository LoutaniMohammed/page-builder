/*! KEditor v0.1.0 | Copyright (c) 2016-present Kademi (http://kademi.co) */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import $$1 from "jquery";
const CSS_CLASS = {
  UI: "keditor-ui",
  UI_DRAGGING: "keditor-ui-dragging",
  UI_HIDDEN: "keditor-ui-hidden",
  UI_CUTTING: "keditor-ui-cutting",
  UI_RESIZER: "ui-resizable-resizer",
  SORTABLE: "ui-sortable",
  RESIZABLE: "ui-sortable",
  WRAPPER: "keditor-wrapper",
  BTN: "keditor-btn",
  BTN_DEFAULT: "keditor-btn-default",
  STATE_ACTIVE: "active",
  STATE_OPENED: "opened",
  STATE_SHOWED: "showed",
  STATE_SELECTED: "selected",
  STATE_DUPLICATED: "duplicated",
  STATE_INITIALIZED: "initialized",
  STATE_INITIALIZING: "initializing",
  STATE_PREVIEWING: "previewing",
  STATE_TOOLBAR_SHOWED: "showed-keditor-toolbar",
  STATE_SIDEBAR_SHOWED: "showed-keditor-sidebar",
  STATE_MODAL_OPENED: "opened-modal",
  STATE_NOT_MATCHED: "not-matched",
  STATE_HAS_FOOTER: "has-footer",
  STATE_COPYING: "copying",
  STATE_COPYING_COMPONENT: "copying-component",
  STATE_COPYING_CONTAINER: "copying-container",
  STATE_COPYING_SUB_CONTAINER: "copying-sub-container",
  ADD_CONTENT: "btn-add-content",
  PASTE_CONTENT: "btn-paste-content",
  SIDEBAR: "keditor-sidebar",
  SIDEBAR_HEADER: "keditor-sidebar-header",
  SIDEBAR_BODY: "keditor-sidebar-body",
  SIDEBAR_TITLE: "keditor-sidebar-title",
  SIDEBAR_CLOSER: "keditor-sidebar-closer",
  TOPBAR: "keditor-topbar",
  TOPBAR_LEFT: "keditor-topbar-left",
  TOPBAR_CENTER: "keditor-topbar-center",
  TOPBAR_RIGHT: "keditor-topbar-right",
  TOPBAR_BUTTON: "keditor-topbar-btn",
  TOPBAR_TITLE: "keditor-topbar-title",
  MODAL: "keditor-modal",
  MODAL_COMPONENT: "keditor-modal-component",
  MODAL_CONTAINER: "keditor-modal-container",
  MODAL_HEADER: "keditor-modal-header",
  MODAL_TITLE: "keditor-modal-title",
  MODAL_BODY: "keditor-modal-body",
  MODAL_FOOTER: "keditor-modal-footer",
  MODAL_CLOSE: "keditor-modal-close",
  SNIPPET: "keditor-snippet",
  SNIPPET_INNER: "keditor-snippet-inner",
  SNIPPET_TITLE: "keditor-snippet-title",
  SNIPPET_PREVIEW: "keditor-snippet-preview",
  SNIPPET_CONTAINER: "keditor-snippet-container",
  SNIPPET_COMPONENT: "keditor-snippet-component",
  SNIPPETS: "keditor-snippets",
  SNIPPETS_FILTER: "keditor-snippets-filter",
  SNIPPETS_FILTER_COMPONENT: "keditor-snippets-filter-component",
  SNIPPETS_FILTER_CONTAINER: "keditor-snippets-filter-container",
  SNIPPETS_FILTER_LABEL: "keditor-snippets-filter-label",
  SNIPPETS_SEARCH: "keditor-snippets-search",
  SNIPPETS_FILTER_WRAPPER: "keditor-snippets-filter-wrapper",
  SNIPPETS_WRAPPER: "keditor-snippets-wrapper",
  TOOLBAR: "keditor-toolbar",
  TOOLBAR_BOTTOM: "keditor-toolbar-bottom",
  TOOLBAR_CONTENT_AREA: "keditor-toolbar-content-area",
  TOOLBAR_CONTAINER: "keditor-toolbar-container",
  TOOLBAR_CONTAINER_BOTTOM: "keditor-toolbar-bottom-container",
  TOOLBAR_CONTAINER_CONTENT: "keditor-toolbar-container-content",
  TOOLBAR_SUB_CONTAINER: "keditor-toolbar-sub-container",
  TOOLBAR_SUB_CONTAINER_BOTTOM: "keditor-toolbar-bottom-sub-container",
  TOOLBAR_SUB_CONTAINER_CONTENT: "keditor-toolbar-sub-container-content",
  TOOLBAR_COMPONENT: "keditor-toolbar-component",
  TOOLBAR_COMPONENT_BOTTOM: "keditor-toolbar-bottom-component",
  SETTING_FORM: "keditor-setting-form",
  SETTING_FORM_LOADING: "keditor-setting-form-loading",
  CONTENT_AREA: "keditor-content-area",
  CONTENT_AREA_INNER: "keditor-content-area-inner",
  CONTENT_AREAS_WRAPPER: "keditor-content-areas-wrapper",
  IFRAME: "keditor-iframe",
  IFRAME_BODY: "keditor-iframe-body",
  IFRAME_WRAPPER: "keditor-iframe-wrapper",
  IFRAME_WIDTH_SWITCHER: "keditor-iframe-width-switcher",
  IFRAME_COVER_WRAPPER: "keditor-iframe-cover-wrapper",
  IFRAME_COVER_WRAPPER_FAKE: "keditor-iframe-cover-wrapper-fake",
  IFRAME_COVER: "keditor-iframe-cover",
  IFRAME_COVER_HIDDEN: "hidden-cover",
  COMPONENT: "keditor-component",
  COMPONENT_MOVE: "btn-component-move",
  COMPONENT_MOVE_UP: "btn-component-move-up",
  COMPONENT_MOVE_DOWN: "btn-component-move-down",
  COMPONENT_SETTING: "btn-component-setting",
  COMPONENT_DUPLICATE: "btn-component-duplicate",
  COMPONENT_COPY: "btn-component-copy",
  COMPONENT_CUT: "btn-component-cut",
  COMPONENT_DELETE: "btn-component-delete",
  COMPONENT_CONTENT: "keditor-component-content",
  COMPONENT_EXISTING: "existing-component",
  CONTAINER: "keditor-container",
  CONTAINER_MOVE: "btn-container-move",
  CONTAINER_MOVE_UP: "btn-container-move-up",
  CONTAINER_MOVE_DOWN: "btn-container-move-down",
  CONTAINER_DUPLICATE: "btn-container-duplicate",
  CONTAINER_COPY: "btn-container-copy",
  CONTAINER_CUT: "btn-container-cut",
  CONTAINER_DELETE: "btn-container-delete",
  CONTAINER_SETTING: "btn-container-setting",
  CONTAINER_INNER: "keditor-container-inner",
  CONTAINER_CONTENT: "keditor-container-content",
  CONTAINER_CONTENT_INNER: "keditor-container-content-inner",
  SUB_CONTAINER: "keditor-sub-container",
  SUB_CONTAINER_CONTENT: "keditor-sub-container-content",
  PREVIEW_AREA: "keditor-preview-area"
};
const DEFAULTS = {
  /*
   * Title will be showed in left of topbar
   * @option {String}
   */
  title: "Editing with KEditor",
  /*
   * containerForQuickAddComponent The container snippet which will be added automatically in content are when you adding a component. Note: component will be added in first container content of container
   * @option {String}
   */
  containerForQuickAddComponent: `
        <div class="row">
            <div class="col-sm-12" data-type="container-content">
            </div>
        </div>
    `,
  /*
   * Extra settings in sidebar
   * @option {Object<String, Object>}
   * @format:
   * {
   *     settingName: {
   *         title,
   *         content,
   *         trigger
   *         settingShowFunction
   *     }
   * }
   * @settingName.option {String} title
   * @settingName.option {jQuery|Function|String} trigger If pass as function, argument will be current extra setting. This function must return a jQuery object
   * @settingName.option {Boolean} autoInit By default, all settings form of KEditor will be initialized in first time you show it. If you want it to initialize intermediately, just set `autoIni=true`
   * @settingName.option {Function} settingInitFunction Same arguments with `containerSettingInitFunction`
   * @settingName.option {Function} settingShowFunction Same arguments with `containerSettingShowFunction`
   * @example:
   * {
   *     settingName1: {
   *         title: 'Page Settings',
   *         trigger: $('.btn-page-setting'),
   *         autoInit: true,
   *         settingInitFunction: function (form, keditor) {
   *             form.append('<div>This is content of page settings</div>');
   *         },
   *         settingShowFunction: function (form, trigger, keditor) {
   *             // Do something
   *         }
   *     },
   *     settingName2: {
   *         title: 'Page Settings 2',
   *         triggerSelector: '.btn-page-settings',
   *         trigger: function (extraSetting) {
   *             return $(extraSetting.triggerSelector);
   *         },
   *         settingInitFunction: function (form, keditor) {
   *             form.append('<div>This is content of page settings 2</div>');
   *         },
   *         settingShowFunction: function (form, trigger, keditor) {
   *             // Do something
   *         }
   *     },
   *     settingName3: {
   *         title: 'Page Settings 3',
   *         trigger: '.btn-page-settings',
   *         settingInitFunction: function (form, keditor) {
   *             form.append('<div>This is content of page settings 3</div>');
   *         },
   *         settingShowFunction: function (form, trigger, keditor) {
   *             // Do something
   *         }
   *     }
   * }
   */
  extraSettings: null,
  /*
   * Extra items in topbar
   * @option {Array<Object>}
   * @format:
   * {
   *     itemName: {
   *         html,
   *         click
   *     }
   * }
   * @itemName.option {String} html HTML string for extra item
   * @itemName.option {Function} click Handler for click event of extra item
   */
  extraTopbarItems: null,
  locale: {
    /*
     * Text title for devices switcher
     * @option {String}
     */
    viewOnMobile: "View on mobile",
    viewOnTablet: "View on tablet",
    viewOnLaptop: "View on laptop",
    viewOnDesktop: "View on desktop",
    /*
     * Text title for preview mode
     * @option {String}
     */
    previewOn: "Preview ON",
    previewOff: "Preview OFF",
    /*
     * Text title for fullscreen mode
     * @option {String}
     */
    fullscreenOn: "Fullscreen ON",
    fullscreenOff: "Fullscreen Off",
    /*
     * Text title for save button
     * @option {String}
     */
    save: "Save",
    /*
     * Text title for add content button
     * @option {String}
     */
    addContent: "Add content",
    /*
     * Text title for add content button below sub-container and component
     * @option {String}
     */
    addContentBelow: "Add content below",
    /*
     * Text title for paste content button
     * @option {String}
     */
    pasteContent: "Paste content",
    /*
     * Text title for paste content button below sub-container and component
     * @option {String}
     */
    pasteContentBelow: "Paste content below",
    /*
     * Text title for move button
     * @option {String}
     */
    move: "Drag",
    /*
     * Text title for move up button
     * @option {String}
     */
    moveUp: "Move up",
    /*
     * Text title for move down button
     * @option {String}
     */
    moveDown: "Move down",
    /*
     * Text title for setting button
     * @option {String}
     */
    setting: "Setting",
    /*
     * Text title for copy button
     * @option {String}
     */
    copy: "Copy",
    /*
     * Text title for cut button
     * @option {String}
     */
    cut: "Cut",
    /*
     * Text title for delete button
     * @option {String}
     */
    delete: "Delete",
    /*
     * Text for snippet category label
     * @option {String}
     */
    snippetCategoryLabel: "Category",
    /*
     * Text for snippet category `All`
     * @option {String}
     */
    snippetCategoryAll: "All",
    /*
     * Text for snippet search text box
     * @option {String}
     */
    snippetCategorySearch: "Type to search...",
    /*
     * Text title for bootstrap column resizer
     * @option {String}
     */
    columnResizeTitle: "Drag to resize",
    /*
     * Text title for container setting
     * @option {String}
     */
    containerSetting: "Container Settings",
    /*
     * Text content for confirm dialog when deleting container
     * @option {String}
     */
    confirmDeleteContainerText: "Are you sure that you want to delete this container? This action can not be undone!",
    /*
     * Text content for confirm dialog when deleting container
     * @option {String}
     */
    confirmDeleteComponentText: "Are you sure that you want to delete this component? This action can not be undone!"
  },
  /*
   * Width of mobile device
   * @option {Number}
   */
  widthMobile: 420,
  /*
   * Width of tablet device
   * @option {Number}
   */
  widthTablet: 820,
  /*
   * Width of laptop device
   * @option {Number}
   */
  widthLaptop: 1050,
  /*
   * Min width of desktop device
   * @option {Number}
   */
  minWidthDesktop: 1250,
  /*
   * Default component type of component. If type of component does not exist in KEditor.components, will be used `defaultComponentType` as type of this component. If is function, argument is component
   * @option {String|Function}
   * @param {jQuery} component
   */
  defaultComponentType: "blank",
  /*
   * Url to snippets file
   * @option {String}
   */
  snippetsUrl: "snippets/snippets.html",
  /*
   * The separator character between each categories
   * @option {String}
   */
  snippetsCategoriesSeparator: ";",
  /*
   * Content styles for iframe mode. Beside of this option, KEditor will add all elements which have 'data-type=keditor-style' for iframe stylesheet. These elements can be 'link', 'style' or any tags. If these elements have 'href' attribute, will create link tag with href. If these elements do not have 'href' attribute, will create style tag with css rule is html code inside element
   * @option {Array<Object>}
   * @example:
   * [
   *     {
   *         href: '/path/to/style/file'
   *     }, {
   *         content: 'a { color: red; }'
   *     }
   * ]
   */
  contentStyles: [],
  /*
   * Selector of content areas. If is null or selector does not match any elements, will create default content area and wrap all content inside it.
   * @option {String}
   */
  contentAreasSelector: null,
  /*
   * The wrapper element for all contents inside iframe or new div which will contains content of textarea. It's just for displaying purpose. If you want all contents inside iframe are appended into body tag, just leave it as blank
   * @option {String}
   */
  contentAreasWrapper: `<div class="${CSS_CLASS.UI} ${CSS_CLASS.CONTENT_AREAS_WRAPPER}"></div>`,
  /*
   * Enable setting panel for container
   * @option {Boolean}
   */
  containerSettingEnabled: false,
  /*
   * Method will be called when initializing setting panel for container
   * @option {Function}
   * @param {jQuery} container
   * @param {KEditor} keditorInstance
   */
  containerSettingInitFunction: null,
  /*
   * Method will be called when setting panel for container is showed
   * @option {Function}
   * @param {jQuery} settingForm
   * @param {jQuery} container
   * @param {KEditor} keditorInstance
   */
  containerSettingShowFunction: null,
  /*
   * Method will be called when setting panel for container is hidden
   * @option {Function}
   * @param {jQuery} settingForm
   * @param {KEditor} keditorInstance
   */
  containerSettingHideFunction: null,
  /**
   * Bootstrap settings
   */
  bootstrap: {
    /**
     * Enable column resize by drag and drop or not. Require: jQuery UI Resizable
     * @option {Boolean}
     */
    columnResizeEnabled: true,
    /**
     * List of device class for responsive grid system
     * @option {Object}
     */
    deviceClass: {
      MOBILE: "xs",
      TABLET: "sm",
      LAPTOP: "md",
      DESKTOP: "lg"
    },
    /**
     * Grid system of bootstrap with `width` in percentage and `col` number
     * @option {Array<Object>}
     */
    gridSystem: [{
      width: 8.33333333,
      col: 1
    }, {
      width: 16.66666667,
      col: 2
    }, {
      width: 25,
      col: 3
    }, {
      width: 33.33333333,
      col: 4
    }, {
      width: 41.66666667,
      col: 5
    }, {
      width: 50,
      col: 6
    }, {
      width: 58.33333333,
      col: 7
    }, {
      width: 66.66666667,
      col: 8
    }, {
      width: 75,
      col: 9
    }, {
      width: 83.33333333,
      col: 10
    }, {
      width: 91.66666667,
      col: 11
    }, {
      width: 100,
      col: 12
    }, {
      width: 1e4,
      col: 1e4
    }]
  },
  clickComponentToShowSetting: false,
  /*
   * Callback will be called after keditor instance is ready
   * @option {Function}
   */
  onReady: function() {
  },
  /*
   * Callback will be called after clicking on `Save` button in topbar
   * @option {Function}
   * @param {String} content
   */
  onSave: function(content) {
  },
  /*
   * Callback will be called after snippets are loaded. If you want to modify snippets content, please return modified
   * @option {Function}
   * @param {String} resp
   * @return {String}
   */
  onSnippetsLoaded: function(resp) {
  },
  /*
   * Callback will be called when error in loading snippets
   * @option {Function}
   * @param {jqXHR} jqXHR
   */
  onSnippetsError: function(jqXHR) {
  },
  /*
   * Callback will be called after iframe and content areas wrapper inside it are created
   * @option {Function}
   * @param {jQuery} iframe
   * @param {jQuery} iframeHead
   * @param {jQuery} iframeBody
   */
  onInitIframe: function(iframe, iframeHead, iframeBody) {
  },
  /*
   * Callback will be called when content is changed. Includes add, delete, duplicate container or component. Or content of a component is changed
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} contentArea
   */
  onContentChanged: function(event, contentArea) {
  },
  /*
   * Callback will be called before initializing container
   * @option {Function}
   * @param {jQuery} contentArea
   */
  onBeforeInitContentArea: function(contentArea) {
  },
  /*
   * Callback will be called when initializing content area. Need to return jQuery objects which will be initialized as container
   * @option {Function}
   * @param {jQuery} contentArea
   * @return {jQuery}
   */
  onInitContentArea: function(contentArea) {
    return contentArea.children(`.${CSS_CLASS.CONTENT_AREA_INNER}`).children();
  },
  /*
   * Callback will be called before initializing container
   * @option {Function}
   * @param {jQuery} container
   * @param {jQuery} contentArea
   */
  onBeforeInitContainer: function(container, contentArea) {
  },
  /*
   * Callback will be called when initializing container. It can return array of jQuery objects which will be initialized as editable components in container content (NOTE: these objects MUST be under elements which have attribute `data-type="container-content"`). By default, all first level sections under container content will be initialized
   * @option {Function}
   * @param {jQuery} container
   * @param {jQuery} contentArea
   */
  onInitContainer: function(container, contentArea) {
  },
  /*
   * Callback will be called before container is deleted
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} selectedContainer
   * @param {jQuery} contentArea
   */
  onBeforeContainerDeleted: function(event, selectedContainer, contentArea) {
  },
  /*
   * Callback will be called after container and its components are already deleted
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} selectedContainer
   * @param {jQuery} contentArea
   */
  onContainerDeleted: function(event, selectedContainer, contentArea) {
  },
  /*
   * Callback will be called when content of container is changed. It can be when container received new component from snippet or from other container. Or content of any components are changed or any components are deleted or duplicated
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} changedContainer
   * @param {jQuery} contentArea
   */
  onContainerChanged: function(event, changedContainer, contentArea) {
  },
  /*
   * Callback will be called when a container is duplicated
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} originalContainer
   * @param {jQuery} newContainer
   * @param {jQuery} contentArea
   */
  onContainerDuplicated: function(event, originalContainer, newContainer, contentArea) {
  },
  /*
   * Callback will be called when a container is selected
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} selectedContainer
   * @param {jQuery} contentArea
   */
  onContainerSelected: function(event, selectedContainer, contentArea) {
  },
  /*
   * Callback will be called when a container snippet is added in a content area
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} newContainer
   * @param {jQuery} selectedSnippet
   * @param {jQuery} contentArea
   */
  onContainerSnippetAdded: function(event, newContainer, selectedSnippet, contentArea) {
  },
  /*
   * Callback will be called after component is initialized. This callback is available or not is depend on component type handler.
   * @option {Function}
   * @param {jQuery} component
   */
  onComponentReady: function(component) {
  },
  /*
   * Callback will be called before initializing component
   * @option {Function}
   * @param {jQuery} component
   * @param {jQuery} contentArea
   */
  onBeforeInitComponent: function(component, contentArea) {
  },
  /*
   * Callback will be called when initializing component
   * @option {Function}
   * @param {jQuery} component
   * @param {jQuery} contentArea
   */
  onInitComponent: function(component, contentArea) {
  },
  /*
   * Callback will be called before a component is deleted
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} selectedComponent
   * @param {jQuery} contentArea
   */
  onBeforeComponentDeleted: function(event, selectedComponent, contentArea) {
  },
  /*
   * Callback will be called after a component is deleted
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} selectedComponent
   * @param {jQuery} contentArea
   */
  onComponentDeleted: function(event, selectedComponent, contentArea) {
  },
  /*
   * Callback will be called when content of a component is changed
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} changedComponent
   * @param {jQuery} contentArea
   */
  onComponentChanged: function(event, changedComponent, contentArea) {
  },
  /*
   * Callback will be called when a component is duplicated
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} originalComponent
   * @param {jQuery} newComponent
   * @param {jQuery} contentArea
   */
  onComponentDuplicated: function(event, originalComponent, newComponent, contentArea) {
  },
  /*
   * Callback will be called when a component is selected
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} selectedComponent
   * @param {jQuery} contentArea
   */
  onComponentSelected: function(event, selectedComponent, contentArea) {
  },
  /*
   * Callback will be called after a component snippet is added in a container
   * @option {Function}
   * @param {Event} event
   * @param {jQuery} newComponent
   * @param {jQuery} selectedSnippet
   * @param {jQuery} contentArea
   */
  onComponentSnippetAdded: function(event, newComponent, selectedSnippet, contentArea) {
  },
  /*
   * Callback will be called before loading dynamic content
   * @option {Function}
   * @param {jQuery} dynamicElement
   * @param {jQuery} component
   * @param {jQuery} contentArea Can be null if preview is ON
   */
  onBeforeDynamicContentLoad: function(dynamicElement, component, contentArea) {
  },
  /*
   * Callback will be called after dynamic content is loaded
   * @option {Function}
   * @param {jQuery} dynamicElement
   * @param {jqXHR} , jqXHR
   * @param {jQuery} contentArea Can be null if preview is ON
   */
  onDynamicContentLoaded: function(dynamicElement, jqXHR, contentArea) {
  },
  /*
   * Callback will be called if loading dynamic content is error, abort or timeout
   * @option {Function}
   * @param {jQuery} dynamicElement
   * @param {jqXHR} , jqXHR
   * @param {jQuery} contentArea Can be null if preview is ON
   */
  onDynamicContentError: function(dynamicElement, jqXHR, contentArea) {
  }
};
const log = (...args) => {
  if (console && typeof console.log === "function" && window.KEDITOR_DEBUG) {
    console.log.apply(console, ["[ KEditor ] ", ...args]);
  }
};
const error = (message) => {
  throw new Error(`[ KEditor ] ${message}`);
};
function generateId() {
  let timestamp = (/* @__PURE__ */ new Date()).getTime();
  let random = Math.round(Math.random() * 9876543210);
  return `keditor-ui-${timestamp}${random}`;
}
function getDataAttributes(target, ignoreAttributes, isArray) {
  let dataAttributes = isArray ? [] : {};
  if (!ignoreAttributes) {
    ignoreAttributes = [];
  }
  $.each(target.get(0).attributes, function(i, attr) {
    if (attr.name.indexOf("data-") === 0 && $.inArray(attr.name, ignoreAttributes) === -1) {
      if (isArray) {
        dataAttributes.push(`${attr.name}="${attr.value}"`);
      } else {
        dataAttributes[attr.name] = attr.value;
      }
    }
  });
  return dataAttributes;
}
function initIframeCover(iframe, wrapper) {
  if (!wrapper) {
    iframe.wrap(`<div class="${CSS_CLASS.IFRAME_COVER_WRAPPER_FAKE}"></div>`);
    wrapper = iframe.parent();
  }
  wrapper.addClass(`${CSS_CLASS.IFRAME_COVER_WRAPPER}`);
  let cover = $(`<div class="${CSS_CLASS.IFRAME_COVER}"></div>`);
  wrapper.prepend(cover);
  wrapper.on("mouseleave", function() {
    wrapper.removeClass(`${CSS_CLASS.IFRAME_COVER_HIDDEN}`);
  });
  cover.on("dblclick", function(e) {
    e.preventDefault();
    wrapper.addClass(`${CSS_CLASS.IFRAME_COVER_HIDDEN}`);
  });
}
function renderSnippet(type, title, previewUrl, categories, content, extraAttrs) {
  let self = this;
  let options = self.options;
  let snippetId = generateId();
  let snippetPreviewHtml = `
        <section
            class="${CSS_CLASS.UI} ${CSS_CLASS.SNIPPET} ${type === "container" ? CSS_CLASS.SNIPPET_CONTAINER : CSS_CLASS.SNIPPET_COMPONENT}"
            data-snippet="#${snippetId}"
            data-type="${type}"
            data-keditor-title="${title}"
            data-keditor-categories="${categories}"
        >
            <span class="${CSS_CLASS.SNIPPET_INNER}">
                <span class="${CSS_CLASS.SNIPPET_PREVIEW}" style="background-image: url('${previewUrl}')"></span>
                <span class="${CSS_CLASS.SNIPPET_TITLE}" title="${title}">${title}</span>
            </span>
        </section>
    `;
  let snippetContentHtml = `<script id="${snippetId}" type="text/html" ${extraAttrs.join(" ")}>${content}<\/script>`;
  categories = categories.split(options.snippetsCategoriesSeparator);
  if (type === "container") {
    self.categoryContainer = self.categoryContainer.concat(categories);
  } else if (type.indexOf("component") !== -1) {
    self.categoryComponent = self.categoryComponent.concat(categories);
  }
  return [
    snippetPreviewHtml,
    snippetContentHtml
  ];
}
function renderSnippetFilter() {
  let self = this;
  let options = self.options;
  let modal2 = self.modal;
  let categoriesOptions = `<option value="" selected="selected">${options.locale.snippetCategoryAll}</option>`;
  $.each(self.categoryComponent, function(i, category) {
    categoriesOptions += `<option value="${category}" class="${CSS_CLASS.SNIPPETS_FILTER_COMPONENT}">${category}</option>`;
  });
  $.each(self.categoryContainer, function(i, category) {
    let isDuplicateWithComponent = $.inArray(category, self.categoryComponent) !== -1;
    categoriesOptions += `<option value="${category}" class="${CSS_CLASS.SNIPPETS_FILTER_CONTAINER} ${isDuplicateWithComponent ? CSS_CLASS.STATE_DUPLICATED : ""}">${category}</option>`;
  });
  let filterWrapper = modal2.find(`.${CSS_CLASS.SNIPPETS_FILTER_WRAPPER}`);
  if (filterWrapper.length === 0) {
    filterWrapper = $(`<div class="${CSS_CLASS.UI} ${CSS_CLASS.SNIPPETS_FILTER_WRAPPER}"></div>`);
    modal2.find(`.${CSS_CLASS.MODAL_TITLE}`).replaceWith(filterWrapper);
  }
  return [
    categoriesOptions,
    filterWrapper
  ];
}
function beautifyCategories(categories) {
  let newArray = [];
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i] || "";
    if (category !== "" && $.inArray(category, newArray) === -1) {
      newArray.push(category);
    }
  }
  return newArray.sort();
}
function addSnippet(type, title, previewUrl, categories, content, extraAttrs) {
  let self = this;
  let [
    snippetPreviewHtml,
    snippetContentHtml
  ] = renderSnippet.call(self, type, title, previewUrl, categories, content, extraAttrs);
  self.categoryContainer = beautifyCategories(self.categoryContainer);
  self.categoryComponent = beautifyCategories(self.categoryComponent);
  self.modal.find(`.${CSS_CLASS.SNIPPETS}`).append(snippetPreviewHtml);
  self.modal.find(`.${CSS_CLASS.MODAL_BODY}`).append(snippetContentHtml);
  let [categoriesOptions, snippetsWrapper] = renderSnippetFilter.call(self);
  snippetsWrapper.find(`.${CSS_CLASS.SNIPPETS_FILTER}`).html(categoriesOptions).trigger("change");
}
function renderSnippets(resp) {
  let self = this;
  let snippetsContentHtml = "";
  let snippetsHtml = "";
  $(resp).filter("div").each(function() {
    let snippet = $(this);
    let content = snippet.html().trim();
    let previewUrl = snippet.attr("data-preview");
    let type = snippet.attr("data-type");
    let title = snippet.attr("data-keditor-title");
    let categories = snippet.attr("data-keditor-categories") || "";
    let dataAttributes = self.getDataAttributes(snippet, ["data-preview", "data-type", "data-keditor-title", "data-keditor-categories"], true);
    let [
      snippetPreviewHtml,
      snippetContentHtml
    ] = renderSnippet.call(self, type, title, previewUrl, categories, content, dataAttributes);
    snippetsHtml += snippetPreviewHtml;
    snippetsContentHtml += snippetContentHtml;
  });
  self.categoryContainer = beautifyCategories(self.categoryContainer);
  self.categoryComponent = beautifyCategories(self.categoryComponent);
  self.modal.find(`.${CSS_CLASS.SNIPPETS}`).html(snippetsHtml);
  self.modal.find(`.${CSS_CLASS.MODAL_BODY}`).append(snippetsContentHtml);
}
function initSnippetsFilter() {
  let self = this;
  let options = self.options;
  let [categoriesOptions, filterWrapper] = renderSnippetFilter.call(self);
  filterWrapper.html(`
        <span class="${CSS_CLASS.UI} ${CSS_CLASS.SNIPPETS_FILTER_LABEL}">${options.locale.snippetCategoryLabel}:</span>
        <select class="${CSS_CLASS.UI} ${CSS_CLASS.SNIPPETS_FILTER}">
            ${categoriesOptions}
        </select>
        <input type="text" class="${CSS_CLASS.UI} ${CSS_CLASS.SNIPPETS_SEARCH}" value="" placeholder="${options.locale.snippetCategorySearch}" />
    `);
  let txtSearch = filterWrapper.find(`.${CSS_CLASS.SNIPPETS_SEARCH}`);
  let cbbFilter = filterWrapper.find(`.${CSS_CLASS.SNIPPETS_FILTER}`);
  let doFilter = function() {
    let selectedCategory = (cbbFilter.val() || "").toLowerCase();
    let searchText = (txtSearch.val() || "").toLowerCase();
    let snippets = self.modal.find(`.${CSS_CLASS.SNIPPET}`);
    snippets.filter(`.${CSS_CLASS.STATE_SELECTED}`).removeClass(CSS_CLASS.STATE_SELECTED);
    if (selectedCategory || searchText) {
      snippets.each(function() {
        let snippet = $(this);
        let dataCategoriesString = snippet.attr("data-keditor-categories").toLowerCase();
        let dataCategories = dataCategoriesString.split(options.snippetsCategoriesSeparator);
        let error2 = 0;
        if (selectedCategory) {
          if ($.inArray(selectedCategory, dataCategories) === -1) {
            error2++;
          }
        }
        if (searchText) {
          let title = snippet.attr("data-keditor-title").toLowerCase();
          if (title.indexOf(searchText) === -1 && dataCategoriesString.indexOf(searchText) === -1) {
            error2++;
          }
        }
        snippet[error2 === 0 ? "removeClass" : "addClass"](CSS_CLASS.STATE_NOT_MATCHED);
      });
    } else {
      snippets.removeClass(CSS_CLASS.STATE_NOT_MATCHED);
    }
  };
  cbbFilter.on("change", function() {
    doFilter();
  });
  let timer;
  txtSearch.on("keydown", function() {
    clearTimeout(timer);
    timer = setTimeout(doFilter, 200);
  });
}
function hideModal(modal2) {
  let cssTransitionEnd = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
  modal2.off(cssTransitionEnd).on(cssTransitionEnd, () => {
    if (!modal2.hasClass(CSS_CLASS.STATE_SHOWED)) {
      modal2.css("display", "none");
      $(document.body).removeClass(CSS_CLASS.STATE_MODAL_OPENED);
    }
  });
  modal2.removeClass(CSS_CLASS.STATE_SHOWED);
}
function hideSnippetModal() {
  let self = this;
  let modal2 = self.modal;
  self.modalTarget = null;
  self.modalTargetAction = null;
  modal2.find(`.${CSS_CLASS.STATE_SELECTED}`).removeClass(CSS_CLASS.STATE_SELECTED);
  modal2.find(`.${CSS_CLASS.STATE_NOT_MATCHED}`).removeClass(CSS_CLASS.STATE_NOT_MATCHED);
  modal2.find(`.${CSS_CLASS.SNIPPETS_FILTER}`).val("");
  modal2.removeClass(CSS_CLASS.MODAL_COMPONENT);
  modal2.removeClass(CSS_CLASS.MODAL_CONTAINER);
  hideModal.call(self, modal2);
}
function initSnippetAction() {
  let self = this;
  let modal2 = self.modal;
  modal2.on({
    click: function(e) {
      e.preventDefault();
      let snippet = $(this);
      if (snippet.hasClass(CSS_CLASS.STATE_SELECTED)) {
        snippet.removeClass(CSS_CLASS.STATE_SELECTED);
      } else {
        modal2.find(`.${CSS_CLASS.STATE_SELECTED}`).removeClass(CSS_CLASS.STATE_SELECTED);
        snippet.addClass(CSS_CLASS.STATE_SELECTED);
      }
    },
    mouseover: function() {
      $(this).addClass(CSS_CLASS.STATE_SELECTED);
    },
    mouseout: function() {
      $(this).removeClass(CSS_CLASS.STATE_SELECTED);
    }
  }, `.${CSS_CLASS.SNIPPET}`);
}
const ACTION_TYPE = {
  APPEND: "append",
  AFTER: "after"
};
const TOOLBAR_TYPE = {
  CONTENT_AREA: 1e3,
  CONTAINER: 2e3,
  CONTAINER_CONTENT: 2100,
  CONTAINER_BOTTOM: 2200,
  SUB_CONTAINER: 3e3,
  SUB_CONTAINER_BOTTOM: 3100,
  SUB_CONTAINER_CONTENT: 3200,
  COMPONENT: 4e3,
  COMPONENT_BOTTOM: 4100
};
const ICON = {
  ADD_CONTENT: '<i class="fa fa-plus"></i>',
  PASTE_CONTENT: '<i class="fa fa-paste"></i>',
  MOVE_CONTAINER: '<i class="fa fa-arrows-v"></i>',
  MOVE_COMPONENT: '<i class="fa fa-arrows"></i>',
  MOVE_UP_CONTAINER: '<i class="fa fa-chevron-up"></i>',
  MOVE_UP_COMPONENT: '<i class="fa fa-chevron-up"></i>',
  MOVE_DOWN_CONTAINER: '<i class="fa fa-chevron-down"></i>',
  MOVE_DOWN_COMPONENT: '<i class="fa fa-chevron-down"></i>',
  SETTING_CONTAINER: '<i class="fa fa-cog"></i>',
  SETTING_COMPONENT: '<i class="fa fa-cog"></i>',
  COPY_CONTAINER: '<i class="fa fa-files-o"></i>',
  COPY_COMPONENT: '<i class="fa fa-files-o"></i>',
  CUT_CONTAINER: '<i class="fa fa-cut"></i>',
  CUT_COMPONENT: '<i class="fa fa-cut"></i>',
  DELETE_CONTAINER: '<i class="fa fa-trash-o"></i>',
  DELETE_COMPONENT: '<i class="fa fa-trash-o"></i>',
  DEVICE_MOBILE: '<i class="fa fa-fw fa-mobile"></i>',
  DEVICE_TABLET: '<i class="fa fa-fw fa-tablet"></i>',
  DEVICE_LAPTOP: '<i class="fa fa-fw fa-laptop"></i>',
  DEVICE_DESKTOP: '<i class="fa fa-fw fa-desktop"></i>',
  PREVIEW_ON: '<i class="fa fa-fw fa-eye"></i>',
  PREVIEW_OFF: '<i class="fa fa-fw fa-eye-slash"></i>',
  FULLSCREEN_ON: '<i class="fa fa-fw fa-compress"></i>',
  FULLSCREEN_OFF: '<i class="fa fa-fw fa-expand"></i>',
  SAVE: '<i class="fa fa-fw fa-save"></i>'
};
function generateToolbar(type, isConfigurable) {
  let self = this;
  let options = self.options;
  let settingBtn = "";
  switch (type) {
    case TOOLBAR_TYPE.CONTAINER:
    case TOOLBAR_TYPE.SUB_CONTAINER:
      if (isConfigurable) {
        settingBtn = `<a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_SETTING}" title="${options.locale.setting}">${ICON.SETTING_CONTAINER}</a>`;
      }
      return `
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOOLBAR} ${CSS_CLASS.TOOLBAR_CONTAINER} ${type === TOOLBAR_TYPE.SUB_CONTAINER ? CSS_CLASS.TOOLBAR_SUB_CONTAINER : ""}">
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_MOVE}" title="${options.locale.move}">${ICON.MOVE_CONTAINER}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_MOVE_UP}" title="${options.locale.moveUp}">${ICON.MOVE_UP_CONTAINER}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_MOVE_DOWN}" title="${options.locale.moveDown}">${ICON.MOVE_DOWN_CONTAINER}</a>
                    ${settingBtn}
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_CUT}" title="${options.locale.cut}">${ICON.CUT_CONTAINER}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_COPY}" title="${options.locale.copy}">${ICON.COPY_CONTAINER}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_DELETE}" title="${options.locale.delete}">${ICON.DELETE_CONTAINER}</a>
                </div>
            `;
    case TOOLBAR_TYPE.COMPONENT:
      if (isConfigurable) {
        settingBtn = `<a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_SETTING}" title="${options.locale.setting}">${ICON.SETTING_COMPONENT}</a>`;
      }
      return `
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOOLBAR} ${CSS_CLASS.TOOLBAR_COMPONENT}">
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_MOVE}" title="${options.locale.move}">${ICON.MOVE_COMPONENT}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_MOVE_UP}" title="${options.locale.moveUp}">${ICON.MOVE_UP_COMPONENT}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_MOVE_DOWN}" title="${options.locale.moveDown}">${ICON.MOVE_DOWN_COMPONENT}</a>
                    ${settingBtn}
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_CUT}" title="${options.locale.cut}">${ICON.CUT_COMPONENT}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_COPY}" title="${options.locale.copy}">${ICON.COPY_COMPONENT}</a>
                    <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_DELETE}" title="${options.locale.delete}">${ICON.DELETE_COMPONENT}</a>
                </div>
            `;
    case TOOLBAR_TYPE.CONTENT_AREA:
      return `
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOOLBAR_CONTENT_AREA}">
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.BTN} ${CSS_CLASS.BTN_DEFAULT} ${CSS_CLASS.ADD_CONTENT}" title="${options.locale.addContent}">${ICON.ADD_CONTENT}</a>
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.BTN} ${CSS_CLASS.BTN_DEFAULT} ${CSS_CLASS.PASTE_CONTENT}" title="${options.locale.pasteContent}">${ICON.PASTE_CONTENT}</a>
                </div>
            `;
    case TOOLBAR_TYPE.CONTAINER_CONTENT:
    case TOOLBAR_TYPE.SUB_CONTAINER_CONTENT:
      return `
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOOLBAR_CONTAINER_CONTENT} ${type === TOOLBAR_TYPE.SUB_CONTAINER_CONTENT ? CSS_CLASS.TOOLBAR_SUB_CONTAINER_CONTENT : ""}">
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.BTN} ${CSS_CLASS.BTN_DEFAULT} ${CSS_CLASS.ADD_CONTENT}" title="${options.locale.addContent}">${ICON.ADD_CONTENT}</a>
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.BTN} ${CSS_CLASS.BTN_DEFAULT} ${CSS_CLASS.PASTE_CONTENT}" title="${options.locale.pasteContent}">${ICON.PASTE_CONTENT}</a>
                </div>
            `;
    case TOOLBAR_TYPE.CONTAINER_BOTTOM:
    case TOOLBAR_TYPE.SUB_CONTAINER_BOTTOM:
      return `
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOOLBAR} ${CSS_CLASS.TOOLBAR_BOTTOM} ${CSS_CLASS.TOOLBAR_CONTAINER_BOTTOM} ${type === TOOLBAR_TYPE.SUB_CONTAINER_BOTTOM ? CSS_CLASS.TOOLBAR_SUB_CONTAINER_BOTTOM : ""}">
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.ADD_CONTENT}" title="${options.locale.addContentBelow}">${ICON.ADD_CONTENT}</a>
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.PASTE_CONTENT}" title="${options.locale.pasteContentBelow}">${ICON.PASTE_CONTENT}</a>
                </div>
            `;
    case TOOLBAR_TYPE.COMPONENT_BOTTOM:
      return `
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOOLBAR} ${CSS_CLASS.TOOLBAR_BOTTOM} ${CSS_CLASS.TOOLBAR_COMPONENT_BOTTOM}">
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.ADD_CONTENT}" title="${options.locale.addContentBelow}">${ICON.ADD_CONTENT}</a>
                    <a href="javascript:void(0)" class="${CSS_CLASS.UI} ${CSS_CLASS.PASTE_CONTENT}" title="${options.locale.pasteContentBelow}">${ICON.PASTE_CONTENT}</a>
                </div>
            `;
  }
}
function getComponentType(component) {
  let self = this;
  let options = self.options;
  let componentType = (component.attr("data-type") || "").replace("component-", "");
  if (componentType && componentType in KEditor.components) {
    return componentType;
  } else {
    if (typeof options.defaultComponentType === "string") {
      componentType = options.defaultComponentType;
    } else if (typeof options.defaultComponentType === "function") {
      componentType = options.defaultComponentType.call(self, component);
    }
    if (!componentType) {
      self.error("Component type is undefined!");
    }
    return componentType;
  }
}
function initDynamicContent(dynamicElement) {
  let self = this;
  let options = self.options;
  let component = dynamicElement.closest(`[data-type^="component"]`);
  let contentArea = dynamicElement.closest(`.${CSS_CLASS.CONTENT_AREA}`);
  !dynamicElement.attr("id") && dynamicElement.attr("id", generateId());
  if (typeof options.onBeforeDynamicContentLoad === "function") {
    options.onBeforeDynamicContentLoad.call(self, dynamicElement, component, contentArea);
  }
  let dynamicHref = dynamicElement.attr("data-dynamic-href");
  let data = getDataAttributes(component, ["data-type", "data-dynamic-href"], false);
  data = $.param(data);
  return $.ajax({
    url: dynamicHref,
    data,
    type: "GET",
    dataType: "HTML",
    success: function(response, status, jqXHR) {
      dynamicElement.html(response);
      if (typeof options.onDynamicContentLoaded === "function") {
        options.onDynamicContentLoaded.call(self, dynamicElement, jqXHR, contentArea);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if (typeof options.onDynamicContentError === "function") {
        options.onDynamicContentError.call(self, dynamicElement, jqXHR, contentArea);
      }
    }
  });
}
function initComponent(component) {
  let self = this;
  let options = self.options;
  let container = component.closest(`.${CSS_CLASS.CONTAINER}`);
  let contentArea = container.closest(`.${CSS_CLASS.CONTENT_AREA}`);
  if (!component.hasClass(CSS_CLASS.STATE_INITIALIZED) || !component.hasClass(CSS_CLASS.STATE_INITIALIZING)) {
    component.addClass(CSS_CLASS.STATE_INITIALIZING);
    component.attr("id", generateId());
    if (typeof options.onBeforeInitComponent === "function") {
      options.onBeforeInitComponent.call(self, component, contentArea);
    }
    let componentContent = component.children(`.${CSS_CLASS.COMPONENT_CONTENT}`);
    componentContent.attr("id", generateId());
    let componentType = getComponentType.call(self, component);
    let componentData = KEditor.components[componentType];
    component.append(generateToolbar.call(self, TOOLBAR_TYPE.COMPONENT, componentData.settingEnabled));
    component.append(generateToolbar.call(self, TOOLBAR_TYPE.COMPONENT_BOTTOM));
    component.find("[data-dynamic-href]").each(function() {
      let dynamicElement = $(this);
      initDynamicContent.call(self, dynamicElement);
    });
    if (typeof componentData.init === "function") {
      componentData.init.call(componentData, contentArea, container, component, self);
    }
    if (typeof options.onInitComponent === "function") {
      options.onInitComponent.call(self, component, contentArea);
    }
    component.addClass(CSS_CLASS.STATE_INITIALIZED);
    component.removeClass(CSS_CLASS.STATE_INITIALIZING);
  }
}
function convertToComponent(target, isExisting) {
  if (target.is(`.${CSS_CLASS.TOOLBAR_CONTAINER_CONTENT}`)) {
    return;
  }
  let self = this;
  let component;
  let dataAttributes = getDataAttributes.call(self, target, null, true);
  target.wrap(`<section class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT}" data-type="${target.attr("data-type")}" ${dataAttributes.join(" ")}></section>`);
  target.wrap(`<section class="${CSS_CLASS.UI} ${CSS_CLASS.COMPONENT_CONTENT}"></section>`);
  component = target.parent().parent();
  target.removeAttr("data-type");
  if (isExisting) {
    component.addClass(`${CSS_CLASS.COMPONENT_EXISTING}`);
  }
  initComponent.call(self, component);
}
function showModal(modal2) {
  modal2.css("display", "block");
  $(document.body).addClass(CSS_CLASS.STATE_MODAL_OPENED);
  setTimeout(() => {
    modal2.addClass(CSS_CLASS.STATE_SHOWED);
  }, 0);
}
function showSnippetModal(target, actionType, showComponent, showContainer) {
  let self = this;
  let modal2 = self.modal;
  self.modalTarget = target;
  self.modalTargetAction = actionType;
  showComponent && modal2.addClass(CSS_CLASS.MODAL_COMPONENT);
  showContainer && modal2.addClass(CSS_CLASS.MODAL_CONTAINER);
  modal2.css("display", "block");
  showModal.call(self, modal2);
}
function initContainerContent(contentArea, container, containerContent, isNested) {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  containerContent.addClass(CSS_CLASS.CONTAINER_CONTENT);
  isNested && containerContent.addClass(CSS_CLASS.SUB_CONTAINER_CONTENT);
  containerContent.attr("id", generateId());
  let containerContentInner = $(`<div class="${CSS_CLASS.CONTAINER_CONTENT_INNER}"></div>`);
  containerContentInner.html(containerContent.html());
  containerContent.html(containerContentInner);
  let containerContentToolbar = $(
    generateToolbar.call(self, isNested ? TOOLBAR_TYPE.SUB_CONTAINER_CONTENT : TOOLBAR_TYPE.CONTAINER_CONTENT, options.containerSettingEnabled)
  );
  containerContentToolbar.appendTo(containerContent);
  containerContentToolbar.children(`.${CSS_CLASS.ADD_CONTENT}`).on("click", function(e) {
    e.preventDefault();
    showSnippetModal.call(self, containerContentInner, ACTION_TYPE.APPEND, true, !isNested);
  });
  containerContentInner.sortable({
    handle: `.${CSS_CLASS.COMPONENT_MOVE}, .${CSS_CLASS.CONTAINER_MOVE}`,
    helper: "clone",
    items: `> .${CSS_CLASS.COMPONENT}`,
    connectWith: `.${CSS_CLASS.CONTAINER_CONTENT_INNER}`,
    tolerance: "pointer",
    receive: function(event, ui) {
      let helper = ui.helper;
      let item = ui.item;
      let container2;
      if (helper) {
        helper.remove();
      }
      container2 = item.closest(`.${CSS_CLASS.CONTAINER}`);
      if (!container2.hasClass(CSS_CLASS.STATE_TOOLBAR_SHOWED)) {
        contentAreasWrapper.find(`.${CSS_CLASS.CONTAINER}.${CSS_CLASS.STATE_TOOLBAR_SHOWED}`).removeClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
        container2.addClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
      }
      if (typeof options.onContainerChanged === "function") {
        options.onContainerChanged.call(self, event, container2, contentArea);
      }
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, event, contentArea);
      }
      item.removeClass(CSS_CLASS.UI_DRAGGING);
    },
    start: function(e, ui) {
      ui.item.addClass(CSS_CLASS.UI_DRAGGING);
      ui.item.addClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
    },
    stop: function(e, ui) {
      if (ui.helper) {
        ui.helper.remove();
      }
      ui.item.removeClass(CSS_CLASS.UI_DRAGGING);
    }
  });
  containerContentInner.children().each(function() {
    let child = $(this);
    if (child.find('[data-type="container-content"]').length > 0) {
      convertToContainer.call(self, child);
    } else {
      convertToComponent.call(self, child, true);
    }
  });
}
const getColByWidth = (grid, width) => {
  let closest;
  let minDiff;
  for (let i = 0; i < grid.length; ++i) {
    let diff = Math.abs(grid[i].width - width);
    if (!minDiff || diff < minDiff) {
      closest = i;
      minDiff = diff;
    } else {
      return grid[closest]["col"];
    }
  }
  return null;
};
function initColumnResizer(container) {
  let self = this;
  let options = self.options;
  let cols = container.find('.row > [class*="col-"]');
  if (cols.length > 0) {
    cols.resizable({
      handles: "resizer, none",
      create: function() {
        $(this).find(`.${CSS_CLASS.UI_RESIZER}`).attr("title", options.locale.columnResizeTitle);
      },
      resize: function(e, ui) {
        let col = $(this);
        let deviceClass = options.bootstrap.deviceClass[self.deviceMode];
        let bsClass = `col-${deviceClass}-1 col-${deviceClass}-2 col-${deviceClass}-3 col-${deviceClass}-4 col-${deviceClass}-5 col-${deviceClass}-6 col-${deviceClass}-7 col-${deviceClass}-8 col-${deviceClass}-9 col-${deviceClass}-10 col-${deviceClass}-11 col-${deviceClass}-12`;
        let row = col.parent();
        let colNum = getColByWidth(options.bootstrap.gridSystem, 100 * ui.size.width / row.innerWidth());
        col.removeClass(bsClass).addClass(`col-${deviceClass}-${colNum}`);
        col.css("width", "");
        col.css("height", "");
      }
    });
  }
}
function initContainer(container) {
  let self = this;
  let options = self.options;
  let isNested = container.closest('[data-type="container-content"]').length > 0;
  let contentArea = container.closest(`.${CSS_CLASS.CONTENT_AREA}`);
  if (!container.hasClass(CSS_CLASS.STATE_INITIALIZED) || !container.hasClass(CSS_CLASS.STATE_INITIALIZING)) {
    container.addClass(CSS_CLASS.STATE_INITIALIZING);
    if (typeof options.onBeforeInitContainer === "function") {
      options.onBeforeInitContainer.call(self, container, contentArea);
    }
    if (isNested) {
      container.addClass(CSS_CLASS.SUB_CONTAINER);
    }
    container.append(
      generateToolbar.call(self, isNested ? TOOLBAR_TYPE.SUB_CONTAINER : TOOLBAR_TYPE.CONTAINER, options.containerSettingEnabled) + generateToolbar.call(self, isNested ? TOOLBAR_TYPE.SUB_CONTAINER_BOTTOM : TOOLBAR_TYPE.CONTAINER_BOTTOM)
    );
    container.attr("id", generateId());
    let containerContents = container.find('[data-type="container-content"]');
    containerContents.each(function() {
      let containerContent = $(this);
      if (!isNested && containerContent.parents('[data-type="container-content"]').length > 0) {
        return;
      }
      initContainerContent.call(self, contentArea, container, containerContent, isNested);
    });
    options.bootstrap.columnResizeEnabled && initColumnResizer.call(self, container);
    if (typeof options.onInitContainer === "function") {
      options.onInitContainer.call(self, container, contentArea);
    }
    container.addClass(CSS_CLASS.STATE_INITIALIZED);
    container.removeClass(CSS_CLASS.STATE_INITIALIZING);
  }
}
function convertToContainer(target) {
  let self = this;
  let container;
  target.wrap(`<section class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER}"></section>`);
  target.wrap(`<section class="${CSS_CLASS.UI} ${CSS_CLASS.CONTAINER_INNER}"></section>`);
  container = target.parent().parent();
  initContainer.call(self, container);
}
function addSnippetToTarget(e, selectedSnippet, target, targetAction) {
  let self = this;
  let modal2 = self.modal;
  let options = self.options;
  let contentArea = target.closest(`.${CSS_CLASS.CONTENT_AREA}`);
  let snippetType = selectedSnippet.attr("data-type");
  let snippetContentElement = modal2.find(selectedSnippet.attr("data-snippet"));
  let snippetContent = snippetContentElement.html();
  let isModalComponent = modal2.hasClass(CSS_CLASS.MODAL_COMPONENT);
  let isModalContainer = modal2.hasClass(CSS_CLASS.MODAL_CONTAINER);
  let isAddingContainer = false;
  let isAddingComponent = false;
  let isAddingComponentWithContainer = false;
  if (snippetType === "container") {
    isAddingContainer = true;
  } else {
    if (isModalComponent && !isModalContainer) {
      isAddingComponent = true;
    }
    if (isModalComponent && isModalContainer) {
      if (target.is(`.${CSS_CLASS.CONTAINER_CONTENT_INNER}`)) {
        isAddingComponent = true;
      } else {
        if (targetAction === ACTION_TYPE.APPEND) {
          isAddingComponentWithContainer = true;
        } else {
          isAddingComponent = true;
        }
      }
    }
  }
  let newContainer;
  let newComponent;
  self.contentAreasWrapper.find(`.${CSS_CLASS.STATE_TOOLBAR_SHOWED}`).removeClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
  if (isAddingContainer) {
    newContainer = $(snippetContent);
    target[targetAction](newContainer);
    if (typeof options.onContainerSnippetAdded === "function") {
      options.onContainerSnippetAdded.call(self, e, newContainer, selectedSnippet, contentArea);
    }
    if (typeof options.onContentChanged === "function") {
      options.onContentChanged.call(self, e, contentArea);
    }
    convertToContainer.call(self, newContainer);
    newContainer.trigger("click");
  }
  if (isAddingComponent || isAddingComponentWithContainer) {
    let dataAttributes = getDataAttributes.call(self, snippetContentElement, null, true);
    newComponent = $(`
            <div data-type="${snippetType}" ${dataAttributes.join(" ")}>
                ${snippetContent}
            </div>
        `);
  }
  if (isAddingComponent) {
    target[targetAction](newComponent);
    let container = target.closest(`.${CSS_CLASS.CONTAINER}`);
    container.addClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
    if (typeof options.onComponentSnippetAdded === "function") {
      options.onComponentSnippetAdded.call(self, e, newComponent, selectedSnippet, contentArea);
    }
    if (typeof options.onContentChanged === "function") {
      options.onContentChanged.call(self, e, contentArea);
    }
    convertToComponent.call(self, newComponent);
    newComponent.trigger("click");
  }
  if (isAddingComponentWithContainer) {
    newContainer = $(options.containerForQuickAddComponent);
    newContainer.find('[data-type="container-content"]').eq(0).html(newComponent);
    target[targetAction](newContainer);
    if (typeof options.onComponentSnippetAdded === "function") {
      options.onComponentSnippetAdded.call(self, e, newComponent, selectedSnippet, contentArea);
    }
    if (typeof options.onContentChanged === "function") {
      options.onContentChanged.call(self, e, contentArea);
    }
    convertToContainer.call(self, newContainer);
    newComponent.trigger("click");
  }
}
function initModal(modalId, hasFooter = true, disableOriginEvents = false) {
  let self = this;
  let modalFooter = `<div class="${CSS_CLASS.MODAL_FOOTER}"></div>`;
  let modal2 = $(`
        <div class="${CSS_CLASS.UI} ${CSS_CLASS.MODAL} ${hasFooter ? CSS_CLASS.STATE_HAS_FOOTER : ""}" id="${modalId}">
            <div class="${CSS_CLASS.MODAL_HEADER}">
                <button type="button" class="${CSS_CLASS.MODAL_CLOSE}">&times;</button>
                <h4 class="${CSS_CLASS.MODAL_TITLE}"></h4>
            </div>
            <div class="${CSS_CLASS.MODAL_BODY}"></div>
            ${hasFooter ? modalFooter : ""}
        </div>
    `);
  if (!disableOriginEvents) {
    modal2.on("click", `.${CSS_CLASS.MODAL_CLOSE}`, function(e) {
      e.preventDefault();
      hideModal.call(self, modal2);
    });
  }
  return modal2.appendTo(self.wrapper);
}
function initSnippetsModal() {
  let self = this;
  let options = self.options;
  let modal2 = self.modal = initModal.call(self, generateId(), false, true);
  if (typeof options.snippetsUrl === "string" && options.snippetsUrl.length > 0) {
    modal2.find(`.${CSS_CLASS.MODAL_BODY}`).append(`
            <div class="${CSS_CLASS.SNIPPETS_WRAPPER}">
                <div class="${CSS_CLASS.SNIPPETS}"></div>
            </div>
        `);
    $.ajax({
      type: "get",
      dataType: "html",
      url: options.snippetsUrl,
      success: function(resp) {
        if (typeof options.onSnippetsLoaded === "function") {
          resp = options.onSnippetsLoaded.call(self, resp) || resp;
        }
        renderSnippets.call(self, resp);
        initSnippetsFilter.call(self);
      },
      error: function(jqXHR) {
        if (typeof options.onSnippetsError === "function") {
          options.onSnippetsError.call(self, jqXHR);
        }
      }
    });
    initSnippetAction.call(self);
    modal2.find(`.${CSS_CLASS.MODAL_CLOSE}`).on("click", function(e) {
      e.preventDefault();
      hideSnippetModal.call(self);
    });
    modal2.on("click", `.${CSS_CLASS.SNIPPET}`, function(e) {
      e.preventDefault();
      let selectedSnippet = $(this);
      addSnippetToTarget.call(self, e, selectedSnippet, self.modalTarget, self.modalTargetAction);
      hideSnippetModal.call(self);
    });
  } else {
    self.error('"snippetsUrl" must be not null!');
  }
}
const SETTING_CATEGORY = {
  COMPONENT: "component",
  CONTAINER: "container",
  EXTRA: "extra"
};
function closeSidebar() {
  log("closeSidebar");
  let self = this;
  let options = self.options;
  let sidebar = self.sidebar;
  let activeForm = self.sidebarBody.children(`.${CSS_CLASS.STATE_ACTIVE}`);
  if (activeForm.length > 0) {
    switch (activeForm.attr("[data-setting-category]")) {
      case SETTING_CATEGORY.CONTAINER:
        if (typeof options.containerSettingHideFunction === "function") {
          options.containerSettingHideFunction.call(self, activeForm, self);
        }
        break;
      case SETTING_CATEGORY.COMPONENT:
        let activeType = activeForm.attr("data-type");
        let componentData = KEditor.components[activeType];
        if (typeof componentData.hideSettingForm === "function") {
          componentData.hideSettingForm.call(componentData, activeForm, self);
        }
        break;
    }
    activeForm.removeClass(CSS_CLASS.STATE_ACTIVE);
  }
  self.settingComponent = null;
  self.settingContainer = null;
  sidebar.removeClass(CSS_CLASS.STATE_OPENED);
  self.iframeBody.removeClass(CSS_CLASS.STATE_SIDEBAR_SHOWED);
}
function initSettingForm(target, settingType, settingCategory, initFunction, functionContext, callback) {
  let self = this;
  let sidebarBody = self.sidebarBody;
  let isExisting = false;
  let settingForm = sidebarBody.children(`.${CSS_CLASS.SETTING_FORM}[data-setting-type="${settingType}"][data-setting-category="${settingCategory}"]`);
  if (settingForm.length === 0) {
    if (typeof initFunction === "function") {
      settingForm = $(`
                <div
                    data-setting-type="${settingType}"
                    data-setting-category="${settingCategory}"
                    class="${CSS_CLASS.UI} ${CSS_CLASS.SETTING_FORM}"
                ></div>
            `);
      let loadingText = $(`<span class="${CSS_CLASS.SETTING_FORM_LOADING}" />`).html("Loading...");
      sidebarBody.append(settingForm);
      settingForm.append(loadingText);
      $.when(initFunction.call(functionContext, settingForm, self)).done(function() {
        setTimeout(function() {
          loadingText.remove();
          typeof callback === "function" && callback(false);
        }, 100);
      });
    }
  } else {
    isExisting = true;
  }
  return {
    settingForm,
    isExisting
  };
}
function showSettingForm(target, settingType, settingCategory, settingTitle, initFunction, showFunction, functionContext) {
  let self = this;
  let sidebar = self.sidebar;
  let sidebarTitle = self.sidebarTitle;
  let sidebarBody = self.sidebarBody;
  let { settingForm, isExisting } = initSettingForm.call(self, target, settingType, settingCategory, initFunction, functionContext, () => {
    if (typeof showFunction === "function") {
      showFunction.call(functionContext, settingForm, target, self);
    }
  });
  let shouldCloseSidebar = settingForm.hasClass(CSS_CLASS.STATE_ACTIVE) && (target.is(self.settingContainer) || target.is(self.settingComponent) || target.is("[data-extra-setting]"));
  self.settingComponent = null;
  self.settingContainer = null;
  switch (settingCategory) {
    case SETTING_CATEGORY.COMPONENT:
      self.settingComponent = target;
      break;
    case SETTING_CATEGORY.CONTAINER:
      self.settingContainer = target;
      break;
  }
  if (isExisting) {
    if (shouldCloseSidebar) {
      closeSidebar.call(self);
      return;
    } else {
      if (typeof showFunction === "function") {
        showFunction.call(functionContext, settingForm, target, self);
      }
    }
  }
  sidebarTitle.html(settingTitle);
  sidebarBody.children(`.${CSS_CLASS.STATE_ACTIVE}`).removeClass(CSS_CLASS.STATE_ACTIVE);
  settingForm.addClass(CSS_CLASS.STATE_ACTIVE);
  sidebar.addClass(CSS_CLASS.STATE_OPENED);
  self.iframeBody.addClass(CSS_CLASS.STATE_SIDEBAR_SHOWED);
}
function openSidebar(target) {
  log("openSidebar", target);
  let self = this;
  let options = self.options;
  if (target.is(`.${CSS_CLASS.COMPONENT}`)) {
    let componentType = getComponentType.call(self, target);
    let componentData = KEditor.components[componentType];
    showSettingForm.call(self, target, componentType, SETTING_CATEGORY.COMPONENT, componentData.settingTitle, componentData.initSettingForm, componentData.showSettingForm, componentData);
  } else if (target.is(`.${CSS_CLASS.CONTAINER}`)) {
    showSettingForm.call(self, target, null, SETTING_CATEGORY.CONTAINER, options.locale.containerSetting, options.containerSettingInitFunction, options.containerSettingShowFunction, self);
  } else {
    let extraKey = target.attr("data-extra-setting");
    let extraSetting = options.extraSettings[extraKey];
    showSettingForm.call(self, target, extraKey, SETTING_CATEGORY.EXTRA, extraSetting.title, extraSetting.settingInitFunction, extraSetting.settingShowFunction, extraSetting);
  }
}
function initExtraSettings() {
  let self = this;
  let options = self.options;
  $.isPlainObject(options.extraSettings) && $.each(options.extraSettings, (name, extraSetting) => {
    let trigger;
    switch (typeof extraSetting.trigger) {
      case "function":
        trigger = extraSetting.trigger.call(self, extraSetting);
        break;
      case "string":
        trigger = $(extraSetting.trigger);
        break;
      default:
        trigger = extraSetting.trigger;
    }
    trigger.attr("data-extra-setting", name);
    trigger.on("click", function(e) {
      e.preventDefault();
      openSidebar.call(self, trigger);
    });
    if (extraSetting.autoInit) {
      initSettingForm.call(self, trigger, name, SETTING_CATEGORY.EXTRA, extraSetting.settingInitFunction, extraSetting);
    }
  });
}
function initSidebar() {
  let self = this;
  let sidebarId = generateId();
  let sidebar = self.sidebar = $(`
        <div class="${CSS_CLASS.UI} ${CSS_CLASS.SIDEBAR}" id="${sidebarId}">
            <div class="${CSS_CLASS.UI} ${CSS_CLASS.SIDEBAR_HEADER}">
                <span class="${CSS_CLASS.UI} ${CSS_CLASS.SIDEBAR_TITLE}"></span>
                <a href="javascript:void(0);" class="${CSS_CLASS.UI} ${CSS_CLASS.SIDEBAR_CLOSER}">&times;</a>
            </div>
            <div class="${CSS_CLASS.UI} ${CSS_CLASS.SIDEBAR_BODY}"></div>
        </div>
    `);
  sidebar.find(`.${CSS_CLASS.SIDEBAR_CLOSER}`).on("click", function(e) {
    e.preventDefault();
    closeSidebar.call(self);
  });
  self.sidebarTitle = sidebar.find(`.${CSS_CLASS.SIDEBAR_TITLE}`);
  let sidebarBody = self.sidebarBody = sidebar.find(`.${CSS_CLASS.SIDEBAR_BODY}`);
  sidebarBody.on("submit", "form", function(e) {
    e.preventDefault();
    return false;
  });
  sidebar.appendTo(self.wrapper);
}
const DEVICE_MODE = {
  MOBILE: "MOBILE",
  TABLET: "TABLET",
  LAPTOP: "LAPTOP",
  DESKTOP: "DESKTOP"
};
function switchDevice(deviceMode, trigger) {
  let self = this;
  let options = self.options;
  let topbarCenter = self.topbarCenter;
  let iframeWidthSwitcher = self.iframe.parent();
  let width = "";
  let minWidth = "";
  topbarCenter.find(`.${CSS_CLASS.STATE_ACTIVE}`).removeClass(CSS_CLASS.STATE_ACTIVE);
  trigger.addClass(CSS_CLASS.STATE_ACTIVE);
  switch (deviceMode) {
    case DEVICE_MODE.MOBILE:
      width = options.widthMobile;
      break;
    case DEVICE_MODE.TABLET:
      width = options.widthTablet;
      break;
    case DEVICE_MODE.LAPTOP:
      width = options.widthLaptop;
      break;
    case DEVICE_MODE.DESKTOP:
      minWidth = options.minWidthDesktop;
      break;
  }
  self.deviceMode = deviceMode;
  iframeWidthSwitcher.css("width", width);
  iframeWidthSwitcher.css("min-width", minWidth);
}
function initDeviceSwitcher() {
  let self = this;
  let options = self.options;
  let topbarCenter = self.topbarCenter;
  let btnMobile = self.btnMobile = $(`
        <a href="javascript:void(0);" title="${options.locale.viewOnMobile}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.DEVICE_MOBILE}</a>
    `);
  btnMobile.on("click", function(e) {
    e.preventDefault();
    switchDevice.call(self, DEVICE_MODE.MOBILE, btnMobile);
  });
  let btnTablet = self.btnTablet = $(`
        <a href="javascript:void(0);" title="${options.locale.viewOnTablet}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.DEVICE_TABLET}</a>
    `);
  btnTablet.on("click", function(e) {
    e.preventDefault();
    switchDevice.call(self, DEVICE_MODE.TABLET, btnTablet);
  });
  let btnLaptop = self.btnLaptop = $(`
        <a href="javascript:void(0);" title="${options.locale.viewOnLaptop}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.DEVICE_LAPTOP}</a>
    `);
  btnLaptop.on("click", function(e) {
    e.preventDefault();
    switchDevice.call(self, DEVICE_MODE.LAPTOP, btnLaptop);
  });
  let btnDesktop = self.btnDesktop = $(`
        <a href="javascript:void(0);" title="${options.locale.viewOnDesktop}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.DEVICE_DESKTOP}</a>
    `);
  btnDesktop.on("click", function(e) {
    e.preventDefault();
    switchDevice.call(self, DEVICE_MODE.DESKTOP, btnDesktop);
  }).trigger("click");
  topbarCenter.append(btnMobile);
  topbarCenter.append(btnTablet);
  topbarCenter.append(btnLaptop);
  topbarCenter.append(btnDesktop);
}
function getComponentContent(component) {
  let self = this;
  let clonedComponent = component.clone();
  let componentType = getComponentType.call(self, clonedComponent);
  let componentData = KEditor.components[componentType];
  let dataAttributes = getDataAttributes(clonedComponent, null, false);
  let content;
  let iframeWrapper = clonedComponent.find(`.${CSS_CLASS.IFRAME_COVER_WRAPPER}`);
  if (iframeWrapper.length > 0) {
    iframeWrapper.find(`.${CSS_CLASS.IFRAME_COVER}`).remove();
    let iframe = iframeWrapper.children("iframe");
    if (iframeWrapper.hasClass(CSS_CLASS.IFRAME_COVER_WRAPPER_FAKE)) {
      iframe.unwrap();
    } else {
      iframeWrapper.removeClass(CSS_CLASS.IFRAME_COVER_WRAPPER);
    }
  }
  if (typeof componentData.getContent === "function") {
    content = componentData.getContent.call(componentData, clonedComponent, self);
  } else {
    let componentContent = clonedComponent.children(`.${CSS_CLASS.COMPONENT_CONTENT}`);
    content = componentContent.html();
  }
  clonedComponent.html(content).find("[data-dynamic-href]").each(function() {
    $(this).html("");
  });
  clonedComponent.children().attr(dataAttributes).attr("data-type", `component-${componentType}`);
  return clonedComponent.html();
}
function getContainerContent(container, isNested) {
  let self = this;
  let containerInner = container.children(`.${CSS_CLASS.CONTAINER_INNER}`).clone();
  containerInner.find("[data-type=container-content]").not(isNested ? "" : `.${CSS_CLASS.SUB_CONTAINER_CONTENT}`).each(function() {
    let containerContent = $(this);
    containerContent.removeClass(`${CSS_CLASS.CONTAINER_CONTENT} ${CSS_CLASS.SUB_CONTAINER_CONTENT} ${CSS_CLASS.SORTABLE} ${CSS_CLASS.RESIZABLE}`).removeAttr("id");
    let containerContentInner = containerContent.children();
    let content = "";
    containerContentInner.children().each(function() {
      let child = $(this);
      if (child.is(`.${CSS_CLASS.COMPONENT}`)) {
        content += getComponentContent.call(self, child);
      } else if (child.is(`.${CSS_CLASS.SUB_CONTAINER}`)) {
        content += getContainerContent.call(self, child, true);
      }
    });
    containerContent.html(content);
  });
  return containerInner.html();
}
function getContent(inArray) {
  let self = this;
  let result = [];
  self.contentAreasWrapper.find(`.${CSS_CLASS.CONTENT_AREA_INNER}`).each(function() {
    let html = "";
    $(this).children(`.${CSS_CLASS.CONTAINER}`).each(function() {
      let container = $(this);
      html += getContainerContent.call(self, container);
    });
    result.push(html);
  });
  return inArray ? result : result.join("\n");
}
function initPreviewAction() {
  let self = this;
  let options = self.options;
  let btnPreview = self.btnPreview = $(`<a href="javascript:void(0);" title="${options.locale.previewOff}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.PREVIEW_OFF}</a>`);
  self.previewArea = $(`<div class="${CSS_CLASS.PREVIEW_AREA}"></div>`);
  self.contentAreasWrapper.after(self.previewArea);
  btnPreview.on("click", function(e) {
    e.preventDefault();
    let isPreviewOn = !btnPreview.hasClass(CSS_CLASS.STATE_ACTIVE);
    btnPreview.html(isPreviewOn ? ICON.PREVIEW_ON : ICON.PREVIEW_OFF);
    btnPreview[isPreviewOn ? "addClass" : "removeClass"](CSS_CLASS.STATE_ACTIVE);
    btnPreview.attr("title", isPreviewOn ? options.locale.previewOn : options.locale.previewOff);
    self.iframeBody[isPreviewOn ? "addClass" : "removeClass"](CSS_CLASS.STATE_PREVIEWING);
    self.previewArea.html("");
    closeSidebar.call(self);
    isPreviewOn && self.previewArea.html(getContent.call(self)).find("[data-dynamic-href]").each(function() {
      let dynamicElement = $(this);
      dynamicElement.html("Loading...");
      initDynamicContent.call(self, dynamicElement);
    });
  });
  self.topbarRight.append(btnPreview);
}
const enterFullscreen = (el) => {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
};
const exitFullscreen = () => {
  if (!document.fullscreenElement) {
    return;
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};
function setFullscreenMode(isOn) {
  let self = this;
  if (isOn) {
    enterFullscreen(self.wrapper[0]);
  } else {
    exitFullscreen();
  }
}
function initFullscreenAction() {
  let self = this;
  let options = self.options;
  let btnFullscreen = self.btnFullscreen = $(`<a href="javascript:void(0);" title="${options.locale.fullscreenOff}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.FULLSCREEN_OFF}</a>`);
  btnFullscreen.on("click", function(e) {
    e.preventDefault();
    setFullscreenMode.call(self, !document.fullscreenElement);
  });
  document.addEventListener("fullscreenchange", function() {
    let isOn = !!document.fullscreenElement;
    btnFullscreen.html(isOn ? ICON.FULLSCREEN_ON : ICON.FULLSCREEN_OFF);
    btnFullscreen.attr("title", isOn ? options.locale.fullscreenOn : options.locale.fullscreenOff);
  });
  self.topbarRight.append(btnFullscreen);
}
function initSaveAction() {
  let self = this;
  let options = self.options;
  let btnSave = self.btnSave = $(`<a href="javascript:void(0);" title="${options.locale.save}" class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_BUTTON}">${ICON.SAVE}</a>`);
  btnSave.on("click", function(e) {
    e.preventDefault();
    let content = getContent.call(self);
    options.onSave.call(self, content);
  });
  self.topbarRight.append(btnSave);
}
function initTopbarRightActions() {
  let self = this;
  let options = self.options;
  initPreviewAction.apply(self);
  initFullscreenAction.apply(self);
  typeof options.onSave === "function" && initSaveAction.apply(self);
}
function initTopbarExtraItems() {
  let self = this;
  let options = self.options;
  let topbarRight = self.topbarRight;
  $.isPlainObject(options.extraTopbarItems) && $.each(options.extraTopbarItems, (name, item) => {
    let btn = $(item.html);
    btn.addClass(`keditor-ui keditor-topbar-btn keditor-topbar-btn-${name}`);
    btn.on("click", item.click);
    topbarRight.append(btn);
  });
}
function initTopbar() {
  let self = this;
  let topbarId = generateId();
  let options = self.options;
  self.topbar = $(`
        <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR}" id="${topbarId}">
            <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_LEFT}">
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_TITLE}" title="${options.title}">${options.title}</div>
            </div>
            <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_CENTER}">
            </div>
            <div class="${CSS_CLASS.UI} ${CSS_CLASS.TOPBAR_RIGHT}">
            </div>
        </div>
    `);
  self.topbarLeft = self.topbar.find(`.${CSS_CLASS.TOPBAR_LEFT}`);
  self.topbarCenter = self.topbar.find(`.${CSS_CLASS.TOPBAR_CENTER}`);
  self.topbarRight = self.topbar.find(`.${CSS_CLASS.TOPBAR_RIGHT}`);
  self.topbar.appendTo(self.wrapper);
  initDeviceSwitcher.call(self);
  initTopbarRightActions.call(self);
  initTopbarExtraItems.call(self);
}
function getClickedElement(event, selector) {
  let target = $(event.target);
  let closest = target.closest(selector);
  if (target.is(selector)) {
    return target;
  } else if (closest.length > 0) {
    return closest;
  } else {
    return null;
  }
}
function initSelectAction() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  self.iframeBody.on("click", function(e) {
    let sidebar = getClickedElement(e, `.${CSS_CLASS.SIDEBAR}`);
    let modal2 = getClickedElement(e, `.${CSS_CLASS.MODAL}`);
    let container = getClickedElement(e, `.${CSS_CLASS.CONTAINER}`);
    if (container) {
      if (!container.hasClass(CSS_CLASS.STATE_TOOLBAR_SHOWED)) {
        contentAreasWrapper.find(`.${CSS_CLASS.STATE_TOOLBAR_SHOWED}`).removeClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
        container.addClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
        let contentArea = container.parent();
        if (typeof options.onContainerSelected === "function") {
          options.onContainerSelected.call(self, e, container, contentArea);
        }
      }
    } else {
      if (!sidebar && !modal2) {
        contentAreasWrapper.find(`.${CSS_CLASS.STATE_TOOLBAR_SHOWED}`).removeClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
      }
    }
    let component = getClickedElement(e, `.${CSS_CLASS.COMPONENT}`);
    if (component) {
      if (!component.hasClass(CSS_CLASS.STATE_TOOLBAR_SHOWED)) {
        contentAreasWrapper.find(`.${CSS_CLASS.COMPONENT}.${CSS_CLASS.STATE_TOOLBAR_SHOWED}`).removeClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
        component.addClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
        let contentArea = component.parent();
        if (typeof options.onComponentSelected === "function") {
          options.onComponentSelected.call(self, e, component, contentArea);
        }
      }
      let toolbar = getClickedElement(e, `.${CSS_CLASS.TOOLBAR_COMPONENT}`);
      if (toolbar) {
        return;
      }
      if (options.clickComponentToShowSetting) {
        let btnSetting = component.find(`.${CSS_CLASS.COMPONENT_SETTING}`);
        if (btnSetting.length > 0) {
          self.settingComponent = null;
          openSidebar.call(self, component);
        } else {
          closeSidebar.call(self);
        }
      }
    } else {
      if (!sidebar) {
        contentAreasWrapper.find(`.${CSS_CLASS.COMPONENT}.${CSS_CLASS.STATE_TOOLBAR_SHOWED}`).removeClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
      }
    }
  });
}
const KEY_MAP = {
  ESC: 27
};
function setCopyContent(target, isCut) {
  let self = this;
  self.copyContent = isCut ? null : target;
  self.cutContent = isCut ? target : null;
  self.contentAreasWrapper.find(`.${CSS_CLASS.UI_CUTTING}`).removeClass(CSS_CLASS.UI_CUTTING);
  self.iframeBody.removeClass(`${CSS_CLASS.STATE_COPYING} ${CSS_CLASS.STATE_COPYING_COMPONENT} ${CSS_CLASS.STATE_COPYING_CONTAINER} ${CSS_CLASS.STATE_COPYING_SUB_CONTAINER}`);
  if (target) {
    isCut && target.addClass(CSS_CLASS.UI_CUTTING);
    self.iframeBody.addClass(CSS_CLASS.STATE_COPYING);
    if (target.hasClass(CSS_CLASS.COMPONENT)) {
      self.iframeBody.addClass(CSS_CLASS.STATE_COPYING_COMPONENT);
    }
    if (target.hasClass(CSS_CLASS.CONTAINER)) {
      self.iframeBody.addClass(target.hasClass(CSS_CLASS.SUB_CONTAINER) ? CSS_CLASS.STATE_COPYING_SUB_CONTAINER : CSS_CLASS.STATE_COPYING_CONTAINER);
    }
  }
}
function initKeyDownAction() {
  let self = this;
  self.iframeDoc.on("keydown", function(e) {
    switch (e.keyCode) {
      case KEY_MAP.ESC:
        setCopyContent.call(self, null);
        setFullscreenMode.call(self, false);
        break;
    }
  });
}
function initBtnPasteContent() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.PASTE_CONTENT}`, function(e) {
    e.preventDefault();
    log(`Click on ".${CSS_CLASS.PASTE_CONTENT}"`);
    let btn = $(this);
    let isCopy = !!self.copyContent;
    let source = isCopy ? self.copyContent : self.cutContent;
    let isComponent = source.hasClass(CSS_CLASS.COMPONENT);
    let isContainer = source.hasClass(CSS_CLASS.CONTAINER);
    let isSubContainer = source.hasClass(CSS_CLASS.SUB_CONTAINER);
    let pasteContent;
    if (isCopy) {
      pasteContent = $(isComponent ? getComponentContent.call(self, source) : getContainerContent.call(self, source, isSubContainer));
    } else {
      pasteContent = source;
    }
    let target = null;
    let toolbarBottom = btn.closest(`.${CSS_CLASS.TOOLBAR_BOTTOM}`);
    if (toolbarBottom.length > 0) {
      if (toolbarBottom.hasClass(CSS_CLASS.TOOLBAR_CONTAINER_BOTTOM)) {
        log("Target is container");
        target = btn.closest(`.${CSS_CLASS.CONTAINER}`);
      }
      if (toolbarBottom.hasClass(CSS_CLASS.TOOLBAR_COMPONENT_BOTTOM)) {
        log("Target is component");
        target = btn.closest(`.${CSS_CLASS.COMPONENT}`);
      }
    }
    let toolbarContainerContent = btn.closest(`.${CSS_CLASS.TOOLBAR_CONTAINER_CONTENT}`);
    if (toolbarContainerContent.length > 0) {
      log("Target is component");
      target = toolbarContainerContent.siblings(`.${CSS_CLASS.CONTAINER_CONTENT_INNER}`);
    }
    let toolbarContentArea = btn.closest(`.${CSS_CLASS.TOOLBAR_CONTENT_AREA}`);
    if (toolbarContentArea.length > 0) {
      log("Target is content-area");
      target = toolbarContentArea.siblings(`.${CSS_CLASS.CONTENT_AREA_INNER}`);
    }
    let action = null;
    if (toolbarBottom.length > 0) {
      action = ACTION_TYPE.AFTER;
    } else {
      action = ACTION_TYPE.APPEND;
    }
    log(`isCopy: ${isCopy} | isComponent: ${isComponent} | isContainer: ${isContainer} | isSubContainer: ${isSubContainer} | action: ${action}`);
    log("target: ", target);
    target[action](pasteContent);
    setCopyContent.call(self, null);
    if (isCopy) {
      if (isComponent) {
        convertToComponent.call(self, pasteContent);
      }
      if (isContainer) {
        convertToContainer.call(self, pasteContent);
      }
    }
  });
}
function initBtnAddContentAfterContainer() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.TOOLBAR_CONTAINER_BOTTOM} .${CSS_CLASS.ADD_CONTENT}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    showSnippetModal.call(self, container, ACTION_TYPE.AFTER, true, true);
  });
}
function initBtnAddContentAfterComponent() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.TOOLBAR_COMPONENT_BOTTOM} .${CSS_CLASS.ADD_CONTENT}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    showSnippetModal.call(self, component, ACTION_TYPE.AFTER, true, !container.hasClass(CSS_CLASS.SUB_CONTAINER));
  });
}
function deleteComponent(component) {
  let self = this;
  let componentType = getComponentType.call(self, component);
  let componentData = KEditor.components[componentType];
  if (typeof componentData.destroy === "function") {
    componentData.destroy.call(componentData, component, self);
  }
  component.remove();
}
function initBtnComponentDelete() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_DELETE}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    if (confirm(options.locale.confirmDeleteComponentText)) {
      let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
      let container = component.closest(`.${CSS_CLASS.CONTAINER}`);
      let contentArea = component.closest(`.${CSS_CLASS.CONTENT_AREA}`);
      if (typeof options.onBeforeComponentDeleted === "function") {
        options.onBeforeComponentDeleted.call(self, e, component, contentArea);
      }
      if (component.is(self.settingComponent)) {
        closeSidebar.call(self);
      }
      deleteComponent.call(self, component);
      if (typeof options.onComponentDeleted === "function") {
        options.onComponentDeleted.call(self, e, component, contentArea);
      }
      if (typeof options.onContainerChanged === "function") {
        options.onContainerChanged.call(self, e, container, contentArea);
      }
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, e, contentArea);
      }
    }
  });
}
function initBtnComponentDuplicate() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_DUPLICATE}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    let container = component.closest(`.${CSS_CLASS.CONTAINER}`);
    let contentArea = container.parent();
    let newComponent = $(getComponentContent.call(self, component));
    component.after(newComponent);
    convertToComponent.call(self, newComponent);
    if (typeof options.onComponentDuplicated === "function") {
      options.onComponentDuplicated.call(self, component, newComponent, contentArea);
    }
    if (typeof options.onContainerChanged === "function") {
      options.onContainerChanged.call(self, e, container, contentArea);
    }
    if (typeof options.onContentChanged === "function") {
      options.onContentChanged.call(self, e, contentArea);
    }
  });
}
function initBtnComponentCopy() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_COPY}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    setCopyContent.call(self, component, false);
  });
}
function initBtnComponentCut() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_CUT}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    setCopyContent.call(self, component, true);
  });
}
function initBtnComponentSetting() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_SETTING}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    openSidebar.call(self, component);
  });
}
function initBtnComponentMoveDown() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_MOVE_DOWN}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    let nextComponent = component.next(`.${CSS_CLASS.COMPONENT}`);
    if (nextComponent.length > 0) {
      let container = component.closest(`.${CSS_CLASS.CONTAINER}`);
      let contentArea = component.closest(`.${CSS_CLASS.CONTENT_AREA}`);
      nextComponent.after(component);
      if (typeof options.onContainerChanged === "function") {
        options.onContainerChanged.call(self, e, container, contentArea);
      }
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, e, contentArea);
      }
    }
  });
}
function initBtnComponentMoveUp() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.COMPONENT_MOVE_UP}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let component = btn.closest(`.${CSS_CLASS.COMPONENT}`);
    let prevComponent = component.prev(`.${CSS_CLASS.COMPONENT}`);
    if (prevComponent.length > 0) {
      let container = component.closest(`.${CSS_CLASS.CONTAINER}`);
      let contentArea = component.closest(`.${CSS_CLASS.CONTENT_AREA}`);
      prevComponent.before(component);
      if (typeof options.onContainerChanged === "function") {
        options.onContainerChanged.call(self, e, container, contentArea);
      }
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, e, contentArea);
      }
    }
  });
}
function initBtnContainerDelete() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_DELETE}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    if (confirm(options.locale.confirmDeleteContainerText)) {
      let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
      let components = container.find(`.${CSS_CLASS.COMPONENT}`);
      let contentArea = container.closest(`.${CSS_CLASS.CONTENT_AREA}`);
      if (typeof options.onBeforeContainerDeleted === "function") {
        options.onBeforeContainerDeleted.call(self, e, container, contentArea);
      }
      if (self.settingComponent) {
        let settingComponentParent = self.settingComponent.closest(`.${CSS_CLASS.CONTAINER}`);
        if (settingComponentParent.is(container)) {
          closeSidebar.call(self);
        }
      } else if (container.is(self.settingContainer)) {
        closeSidebar.call(self);
      }
      if (components.length > 0) {
        components.each(function() {
          deleteComponent.call(self, $(this));
        });
      }
      container.remove();
      if (typeof options.onContainerDeleted === "function") {
        options.onContainerDeleted.call(self, e, container, contentArea);
      }
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, e, contentArea);
      }
    }
  });
}
function initBtnContainerDuplicate() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_DUPLICATE}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    let contentArea = container.parent();
    let newContainer = $(getContainerContent.call(self, container, btn.parent().hasClass(CSS_CLASS.TOOLBAR_SUB_CONTAINER)));
    container.after(newContainer);
    convertToContainer.call(self, newContainer);
    if (typeof options.onContainerDuplicated === "function") {
      options.onContainerDuplicated.call(self, container, newContainer, contentArea);
    }
    if (typeof options.onContentChanged === "function") {
      options.onContentChanged.call(self, e, contentArea);
    }
  });
}
function initBtnContainerCopy() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_COPY}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    setCopyContent.call(self, container, false);
  });
}
function initBtnContainerCut() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_CUT}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    setCopyContent.call(self, container, true);
  });
}
function initBtnContainerSetting() {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_SETTING}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    openSidebar.call(self, container);
  });
}
function initBtnContainerMoveDown() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_MOVE_DOWN}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    let nextContainer = container.next(`.${CSS_CLASS.CONTAINER}`);
    if (nextContainer.length > 0) {
      let contentArea = container.parent();
      nextContainer.after(container);
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, e, contentArea);
      }
    }
  });
}
function initBtnContainerMoveUp() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  contentAreasWrapper.on("click", `.${CSS_CLASS.CONTAINER_MOVE_UP}`, function(e) {
    e.preventDefault();
    let btn = $(this);
    let container = btn.closest(`.${CSS_CLASS.CONTAINER}`);
    let prevContainer = container.prev(`.${CSS_CLASS.CONTAINER}`);
    if (prevContainer.length > 0) {
      let contentArea = container.parent();
      prevContainer.before(container);
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, e, contentArea);
      }
    }
  });
}
function initIframeActions() {
  let self = this;
  initSelectAction.call(self);
  initKeyDownAction.call(self);
  initBtnPasteContent.call(self);
  initBtnAddContentAfterComponent.call(self);
  initBtnAddContentAfterContainer.call(self);
  initBtnComponentDelete.call(self);
  initBtnComponentDuplicate.call(self);
  initBtnComponentCopy.call(self);
  initBtnComponentCut.call(self);
  initBtnComponentMoveDown.call(self);
  initBtnComponentMoveUp.call(self);
  initBtnComponentSetting.call(self);
  initBtnContainerDelete.call(self);
  initBtnContainerDuplicate.call(self);
  initBtnContainerCopy.call(self);
  initBtnContainerCut.call(self);
  initBtnContainerMoveDown.call(self);
  initBtnContainerMoveUp.call(self);
  initBtnContainerSetting.call(self);
}
function initContentArea(contentArea, dontInitToolbar) {
  let self = this;
  let options = self.options;
  contentArea.addClass(CSS_CLASS.CONTENT_AREA);
  let content = contentArea.html();
  let contentAreaInner = $(`<div class="${CSS_CLASS.CONTENT_AREA_INNER}"></div>`).html(content);
  contentArea.html(contentAreaInner);
  if (typeof options.onBeforeInitContentArea === "function") {
    options.onBeforeInitContentArea.call(self, contentArea);
  }
  if (!dontInitToolbar) {
    let contentAreaToolbar = $(generateToolbar.call(self, TOOLBAR_TYPE.CONTENT_AREA));
    contentArea.append(contentAreaToolbar);
    contentAreaToolbar.children(`.${CSS_CLASS.ADD_CONTENT}`).on("click", function(e) {
      e.preventDefault();
      showSnippetModal.call(self, contentAreaInner, ACTION_TYPE.APPEND, true, true);
    });
  }
  contentAreaInner.sortable({
    handle: `.${CSS_CLASS.TOOLBAR_CONTAINER}:not(.${CSS_CLASS.TOOLBAR_SUB_CONTAINER}) .${CSS_CLASS.CONTAINER_MOVE}`,
    items: `> .${CSS_CLASS.CONTAINER}`,
    helper: "clone",
    connectWith: `.${CSS_CLASS.CONTENT_AREA}`,
    axis: "y",
    tolerance: "pointer",
    receive: function(event, ui) {
      let helper = ui.helper;
      let item = ui.item;
      if (helper) {
        helper.remove();
      }
      closeSidebar.call(self);
      if (typeof options.onContentChanged === "function") {
        options.onContentChanged.call(self, event, contentArea);
      }
      item.addClass(CSS_CLASS.UI_DRAGGING);
    },
    start: function(e, ui) {
      ui.item.addClass(CSS_CLASS.UI_DRAGGING);
      ui.item.addClass(CSS_CLASS.STATE_TOOLBAR_SHOWED);
    },
    stop: function(e, ui) {
      if (ui.helper) {
        ui.helper.remove();
      }
      ui.item.removeClass(CSS_CLASS.UI_DRAGGING);
    }
  });
  let containers;
  if (typeof options.onInitContentArea === "function") {
    containers = options.onInitContentArea.call(self, contentArea);
  } else {
    containers = contentAreaInner.children();
  }
  containers.each(function() {
    convertToContainer.call(self, $(this));
  });
}
function initContentAreas() {
  let self = this;
  let options = self.options;
  let contentAreasWrapper = self.contentAreasWrapper;
  let contentAreas;
  if (options.contentAreasSelector) {
    contentAreas = contentAreasWrapper.find(options.contentAreasSelector);
  }
  if (!contentAreas || contentAreas.length === 0) {
    let originalContent = contentAreasWrapper.html();
    contentAreas = $("<div />").html(originalContent);
    contentAreasWrapper.empty().append(contentAreas);
  }
  contentAreas.each(function() {
    let contentArea = $(this);
    if (!contentArea.attr("id")) {
      contentArea.attr("id", generateId());
    }
    initContentArea.call(self, contentArea);
  });
}
function initIframe() {
  let self = this;
  let element = self.element;
  let options = self.options;
  let wrapperId = self.generateId();
  let wrapper = self.wrapper = $(`
        <div id="${wrapperId}" class="${CSS_CLASS.UI} ${CSS_CLASS.WRAPPER}">
            <div class="${CSS_CLASS.UI} ${CSS_CLASS.IFRAME_WRAPPER}">
                <div class="${CSS_CLASS.UI} ${CSS_CLASS.IFRAME_WIDTH_SWITCHER}">
                    <iframe class="${CSS_CLASS.UI} ${CSS_CLASS.IFRAME}"></iframe>
                </div>
            </div>
        </div>
    `);
  element.addClass(CSS_CLASS.UI_HIDDEN);
  element.after(wrapper);
  let iframe = self.iframe = wrapper.find(`.${CSS_CLASS.IFRAME}`);
  self.iframeDoc = iframe.contents();
  self.iframeDoc.get(0).open();
  self.iframeDoc.get(0).close();
  self.iframeWindow = iframe[0].contentWindow ? iframe[0].contentWindow : iframe[0].contentDocument.defaultView;
  self.iframeHead = self.iframeDoc.find("head");
  self.iframeBody = self.iframeDoc.find("body");
  let styles = "";
  $('[data-type="keditor-style"]').each(function() {
    let style = $(this);
    let idStr = style.attr("id") || "";
    let href = style.attr("href") || style.attr("data-href") || "";
    if (href) {
      styles += `<link rel="stylesheet" type="text/css" href="${href}" ${idStr} />
`;
    } else {
      styles += `<style type="text/css" ${idStr}>${style.html()}</style>
`;
    }
  });
  $.isArray(options.contentStyles) && $.each(options.contentStyles, function(i, style) {
    let idStr = style.id || "";
    if (style.href) {
      styles += `<link rel="stylesheet" type="text/css" href="${style.href}" ${idStr} />
`;
    } else {
      styles += `<style type="text/css" ${idStr}>${style.content}</style>
`;
    }
  });
  self.iframeHead.append(styles);
  self.contentAreasWrapper = $(options.contentAreasWrapper || "<div />");
  self.contentAreasWrapper.attr("class", `${CSS_CLASS.UI} ${CSS_CLASS.CONTENT_AREAS_WRAPPER}`);
  self.contentAreasWrapper.html(element.val() || element.html() || "");
  if (!self.contentAreasWrapper.attr("id")) {
    self.contentAreasWrapper.attr("id", self.generateId());
  }
  self.iframeBody.append(self.contentAreasWrapper).addClass(CSS_CLASS.IFRAME_BODY);
  if (typeof options.onInitIframe === "function") {
    options.onInitIframe.call(self, self.iframe, self.iframeHead, self.iframeBody);
  }
  initContentAreas.call(self);
  initIframeActions.call(self);
}
function init(target, config) {
  let self = this;
  self.element = target;
  self.options = $.extend({}, DEFAULTS, config);
  initIframe.call(self);
  initTopbar.call(self);
  initSidebar.call(self);
  initSnippetsModal.call(self);
  initExtraSettings.call(self);
  self.id = generateId();
  KEditor.instances[self.id] = self;
  if (typeof self.options.onReady === "function") {
    self.options.onReady.call(self);
  }
}
function destroy() {
  let self = this;
  let element = self.element;
  let id = self.id;
  let content = getContent.call(self, false);
  self.wrapper.remove();
  if (element.is("textarea")) {
    element.val(content);
  } else {
    element.html(content);
  }
  element.removeClass(CSS_CLASS.UI_HIDDEN);
  element.data("keditor", null);
  delete KEditor.instances[id];
}
function setContent(content, contentArea) {
  let self = this;
  let contentAreasWrapper = self.contentAreasWrapper;
  let target;
  if (!contentArea) {
    target = contentAreasWrapper.children(`.${CSS_CLASS.CONTENT_AREA}`);
  } else {
    if (!contentArea.jquery) {
      target = contentAreasWrapper.find(contentArea);
    }
  }
  if (target.length === 0) {
    error("Content area does not exist!");
  }
  target.html(content);
  initContentArea.call(self, target, true);
}
if (!$$1.fn.sortable) {
  throw new Error("[ KEditor ] $.fn.sortable does not exist. Please import $.fn.sortable into your document for continue using KEditor.");
}
let KEditor$1 = (_a = class {
  constructor(target, config) {
    __publicField(this, "settingComponent", null);
    __publicField(this, "settingContainer", null);
    __publicField(this, "copyContent", null);
    __publicField(this, "cutContent", null);
    __publicField(this, "categoryComponent", []);
    __publicField(this, "categoryContainer", []);
    init.apply(this, [target, config]);
  }
  /**
   * Log utility of KEditor with `[ KEditor ] ` as prefix. You can see the log when `window.KEDITOR_DEBUG = true`
   * @param {*} args Values you want to log
   */
  static log(...args) {
    log(...args);
  }
  /**
   * Throw error with `[ KEditor ] ` as prefix for message
   * @param {String} message Error message
   */
  static error(message) {
    error(message);
  }
  /**
   * Initialize KEditor instance
   * @param {jQuery} target Element which you want to initialize as KEditor
   * @param {Object} config Configuration of KEditor instance. See https://github.com/Kademi/keditor/blob/master/docs/configuration.md for more details
   * @return {KEditor}
   */
  static init(target, config) {
    return new _a(target, config);
  }
  /**
   * Load dynamic content for elements which have `data-dynamic-href` attribute
   * @param {jQuery} dynamicElement jQuery object of element(s) which you want to load dynamic content. Element(s) must have `data-dynamic-href` attribute
   * @param {Object} options Callbacks include `onSuccess` and `onError` with arguments are `dynamicElement` and `jqXHR`
   */
  static loadDynamicContent(dynamicElement, options = {}) {
    dynamicElement.each(function() {
      initDynamicContent.call({
        options: {
          onDynamicContentLoaded: options.onSuccess,
          onDynamicContentError: options.onError
        }
      }, $$1(this));
    });
  }
  /**
   * Get container which is setting-up
   * @return {jQuery}
   */
  getSettingContainer() {
    return this.settingContainer;
  }
  /**
   * Get component which is setting-up
   * @return {jQuery}
   */
  getSettingComponent() {
    return this.settingComponent;
  }
  /**
   * Generate a random Id
   * @return {String}
   */
  generateId() {
    return generateId();
  }
  /**
   * Get list of `data-*` attributes
   * @param {jQuery} target jQuery of elements which you want to get list of `data-*` attributes
   * @param {Array<String>} ignoreAttributes Array of attributes you want to ignore
   * @param {Boolean} isArray Return list as Array or Object
   * @return {Array|Object}
   */
  getDataAttributes(target, ignoreAttributes, isArray) {
    return getDataAttributes.apply(this, [target, ignoreAttributes, isArray]);
  }
  /**
   * Init iframe cover which avoid iframe's z-index issue in IE browsers
   * @param {jQuery} iframe Iframe which you want to add cover for
   * @param {jQuery} wrapper Wrapper of iframe
   */
  initIframeCover(iframe, wrapper) {
    initIframeCover.apply(this, [iframe, wrapper]);
  }
  /**
   * Init KEditor modal
   * @param {String} modalId Id of modal
   * @param {Boolean} hasFooter Modal has footer or not
   * @param {Boolean} disableOriginEvents If you want to handle close button by yourself, just set it as `false`
   * @return {jQuery}
   */
  initModal(modalId, hasFooter, disableOriginEvents) {
    return initModal.call(this, modalId, hasFooter, disableOriginEvents);
  }
  /**
   * Show a KEditor modal
   * @param {jQuery} modal Modal you want to show
   */
  showModal(modal2) {
    showModal.call(this, modal2);
  }
  /**
   * Hide a KEditor modal
   * @param {jQuery} modal Modal you want to show
   */
  hideModal(modal2) {
    hideModal.call(this, modal2);
  }
  /**
   * @param {Boolean} inArray Return your content in array format or just plain string
   * @return {String|Array<String>}
   */
  getContent(inArray) {
    return getContent.apply(this, [inArray]);
  }
  /**
   * @param {String} content HTML content
   * @param {String|jQuery} contentArea Can be selector or jQuery object of content area which you want to set new content. If you have only a content area, you can leave it blank
   */
  setContent(content, contentArea) {
    setContent.apply(this, [content, contentArea]);
  }
  /**
   * Removes the KEditor functionality completely. This will return the element back to its pre-init state with latest content
   */
  destroy() {
    destroy.apply(this);
  }
  /**
   * Add snippet programmatically
   * @param {String} type Type of snippet. Can be `container` or `component-*`
   * @param {String} title Text title of snippet
   * @param {String} previewUrl Url to preview image of snippet
   * @param {String} categories Categories list of snippet, separated by `snippetsCategoriesSeparator` option
   * @param {String} content HTML content of snippet
   * @param {Array<String>} extraAttrs If you component contains dynamic content, you will need this parameter to add `data-*` attribute to your component
   */
  addSnippet(type, title, previewUrl, categories, content, extraAttrs) {
    addSnippet.apply(this, [type, title, previewUrl, categories, content, extraAttrs]);
  }
  /**
   * Load dynamic content for elements which have `data-dynamic-href` attribute
   * @param {jQuery} dynamicElement jQuery object of element(s) which you want to load dynamic content. Element(s) must have `data-dynamic-href` attribute
   * @return {jqXHR}
   */
  initDynamicContent(dynamicElement) {
    return initDynamicContent.apply(this, [dynamicElement]);
  }
}, __publicField(_a, "DEFAULTS", DEFAULTS), __publicField(_a, "debug", false), __publicField(_a, "version", "@{version}"), __publicField(_a, "instances", {}), __publicField(_a, "components", {
  blank: {
    settingEnabled: false
  }
}), _a);
$$1.fn.keditor = function(options) {
  let element = $$1(this);
  let instance = element.data("keditor");
  if (typeof options === "string") {
    if (instance && instance[options] && typeof instance[options] === "function") {
      return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
    }
  } else {
    if (!instance) {
      instance = KEditor$1.init(element, options);
      element.data("keditor", instance);
    }
    return instance;
  }
};
window.KEditor = $$1.keditor = $$1.fn.keditor.constructor = KEditor$1;
KEditor$1.components["audio"] = {
  settingEnabled: true,
  settingTitle: "Audio Settings",
  init: function(contentArea, container, component, keditor) {
    let componentContent = component.find(".keditor-component-content");
    if (componentContent.find(".audio-wrapper").length === 0) {
      componentContent.wrapInner('<div class="audio-wrapper"></div>');
    }
  },
  initSettingForm: function(form, keditor) {
    form.append(
      '<form class="form-horizontal">     <div class="form-group">         <label class="col-sm-12">Audio file</label>         <div class="col-sm-12">             <div class="audio-toolbar">                 <a href="#" class="btn-audio-upload btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>                 <input class="audio-upload" type="file" style="display: none" />             </div>         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Autoplay</label>         <div class="col-sm-12">             <input type="checkbox" class="audio-autoplay" />         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Show Controls</label>         <div class="col-sm-12">             <input type="checkbox" class="audio-controls" checked />         </div>     </div>     <div class="form-group">         <label class="col-sm-12">Width (%)</label>         <div class="col-sm-12">             <input type="number" min="20" max="100" class="form-control audio-width" value="100" />         </div>     </div></form>'
    );
    let fileInput = form.find(".audio-upload");
    let btnAudioUpload = form.find(".btn-audio-upload");
    btnAudioUpload.off("click").on("click", function(e) {
      e.preventDefault();
      fileInput.trigger("click");
    });
    fileInput.off("change").on("change", function() {
      let file = this.files[0];
      if (/audio/.test(file.type)) {
        let audio = keditor.getSettingComponent().find("audio");
        audio.attr("src", URL.createObjectURL(file));
      } else {
        alert("Your selected file is not an audio file!");
      }
    });
    let autoplayToggle = form.find(".audio-autoplay");
    autoplayToggle.on("click", function() {
      let audio = keditor.getSettingComponent().find("audio");
      audio.prop("autoplay", this.checked);
    });
    let controlsToggle = form.find(".audio-controls");
    controlsToggle.on("click", function() {
      let audio = keditor.getSettingComponent().find("audio");
      audio.prop("controls", this.checked);
    });
    let audioWidth = form.find(".audio-width");
    audioWidth.on("change", function() {
      let audio = keditor.getSettingComponent().find("audio");
      let wrapper = audio.parent();
      wrapper.attr("data-width", this.value);
      audio.css("width", this.value + "%");
    });
  },
  showSettingForm: function(form, component, keditor) {
    let audio = component.find("audio");
    let wrapper = audio.parent();
    let autoplayToggle = form.find(".audio-autoplay");
    let controlsToggle = form.find(".audio-controls");
    let audioWidth = form.find(".audio-width");
    autoplayToggle.prop("checked", !!audio.attr("autoplay"));
    controlsToggle.prop("checked", !!audio.attr("controls"));
    audioWidth.val(wrapper.attr("data-width") || 100);
  }
};
let modal;
let formBuilder;
KEditor$1.components["form"] = {
  emptyContent: '<p class="text-muted lead text-center"><br />[No form content]<br /><br /></p>',
  renderForm: function(component) {
    let formContent = component.find(".form-content");
    let temp = $$1("<div />");
    temp.formRender({
      dataType: "json",
      formData: formBuilder.actions.getData("json")
    });
    formContent.html(temp.html());
    if (formContent.hasClass("form-horizontal")) {
      formContent.children("div").each(function() {
        let div = $$1(this);
        let dataGrid = formContent.attr("data-grid") || "4-8";
        dataGrid = dataGrid.split("-");
        if (div.attr("class")) {
          if (div.hasClass("fb-button")) {
            div.find("button").wrap(`<div class="col-sm-${dataGrid[1]} col-sm-offset-${dataGrid[0]}"></div>`);
          } else {
            let label = div.children("label");
            let input = div.children("input, select, textarea");
            let subDiv = div.children("div");
            label.addClass(`control-label col-sm-${dataGrid[0]}`);
            if (subDiv.length > 0) {
              subDiv.addClass(`col-sm-${dataGrid[1]}`);
            } else {
              input.addClass("form-control").wrap(`<div class="col-sm-${dataGrid[1]}"></div>`);
            }
          }
        }
      });
    }
  },
  initModal: function(keditor) {
    let self = this;
    modal = keditor.initModal("keditor-modal-form");
    modal.find(".keditor-modal-title").html("Design form");
    modal.css({
      visibility: "hidden",
      display: "block",
      opacity: 1
    });
    modal.find(".keditor-modal-body").append(`
            <div class="form-builder-area-wrapper">
                <div class="form-builder-area"></div>
            </div>
        `);
    formBuilder = modal.find(".form-builder-area").formBuilder({
      showActionButtons: false,
      dataType: "json",
      disableFields: [
        "autocomplete",
        "paragraph",
        "header"
      ],
      disabledAttrs: ["access"],
      typeUserDisabledAttrs: {
        "checkbox-group": [
          "toggle",
          "inline"
        ]
      }
    });
    modal.find(".keditor-modal-footer").html(`
            <button type="button" class="keditor-ui keditor-btn keditor-btn-default keditor-modal-close">Close</button>
            <button type="button" class="keditor-ui keditor-btn keditor-btn-primary btn-save-form">Save</button>
        `);
    modal.find(".btn-save-form").on("click", function(e) {
      e.preventDefault();
      let component = keditor.getSettingComponent();
      component.find(".form-data").html(formBuilder.actions.getData("json"));
      self.renderForm(component);
      keditor.hideModal(modal);
    });
    setTimeout(() => {
      modal.css({
        visibility: "",
        display: "",
        opacity: ""
      });
    }, 500);
  },
  init: function(contentArea, container, component, keditor) {
    let self = this;
    let componentContent = component.find(".keditor-component-content");
    let formContent = component.find(".form-content");
    let formData = component.find(".form-data");
    if (formData.length === 0) {
      componentContent.append('<div class="form-data" style="display: none !important;"></div>');
    }
    if (formContent.length === 0) {
      componentContent.append(`<form class="form-content">${self.emptyContent}</form>`);
    }
    if (!modal) {
      self.initModal(keditor);
    }
  },
  settingEnabled: true,
  settingTitle: "Form Settings",
  initSettingForm: function(form, keditor) {
    let self = this;
    form.html(`
            <div class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-12">
                       <button class="btn btn-primary btn-block btn-design-form" type="button"><i class="fa fa-paint-brush"></i> Design form</button>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-12">Action</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control txt-form-action" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-12">Method</label>
                    <div class="col-sm-12">
                        <select class="form-control select-method">
                            <option value="get">Get</option>
                            <option value="post">Post</option>
                            <option value="put">Put</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-12">Enctype</label>
                    <div class="col-sm-12">
                        <select class="form-control select-enctype">
                            <option value="text/plain">text/plain</option>
                            <option value="multipart/form-data">multipart/form-data</option>
                            <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-12">Layout</label>
                    <div class="col-sm-12">
                        <select class="form-control select-layout">
                            <option value="">Normal</option>
                            <option value="form-horizontal">Horizontal</option>
                            <option value="form-inline">Inline</option>
                        </select>
                    </div>
                </div>
                <div class="form-group select-grid-wrapper">
                    <label class="col-sm-12">Grid setting</label>
                    <div class="col-sm-12">
                        <select class="form-control select-grid">
                            <option value="2-10">col-2 col-10</option>
                            <option value="3-9">col-3 col-9</option>
                            <option value="4-8">col-4 col-8</option>
                            <option value="5-7">col-5 col-7</option>
                            <option value="6-6">col-6 col-6</option>
                        </select>
                        <small class="help-block">This setting is for width of label and control with number of cols as unit</small>
                    </div>
                </div>
            </div>
        `);
    form.find(".btn-design-form").on("click", function(e) {
      e.preventDefault();
      let component = keditor.getSettingComponent();
      formBuilder.actions.setData(component.find(".form-data").html());
      keditor.showModal(modal);
    });
    form.find(".txt-form-action").on("change", function() {
      let component = keditor.getSettingComponent();
      let formContent = component.find(".form-content");
      formContent.attr("action", this.value);
    });
    form.find(".select-method").on("change", function() {
      let component = keditor.getSettingComponent();
      let formContent = component.find(".form-content");
      formContent.attr("action", this.value);
    });
    form.find(".select-enctype").on("change", function() {
      let component = keditor.getSettingComponent();
      let formContent = component.find(".form-content");
      formContent.attr("enctype", this.value);
    });
    form.find(".select-layout").on("change", function() {
      let component = keditor.getSettingComponent();
      let formContent = component.find(".form-content");
      formContent.removeClass("form-inline form-horizontal");
      if (this.value) {
        formContent.addClass(this.value);
      }
      self.renderForm(component);
      form.find(".select-grid-wrapper").css("display", this.value === "form-horizontal" ? "block" : "none");
    });
    form.find(".select-grid").on("change", function() {
      let component = keditor.getSettingComponent();
      let formContent = component.find(".form-content");
      formContent.attr("data-grid", this.value);
      self.renderForm(component);
    });
  },
  showSettingForm: function(form, component, keditor) {
    let formContent = component.find(".form-content");
    let layout = "";
    if (formContent.hasClass("form-inline")) {
      layout = "form-inline";
    } else if (formContent.hasClass("form-horizontal")) {
      layout = "form-horizontal";
    }
    form.find(".txt-form-action").val(formContent.attr("action") || "");
    form.find(".select-method").val(formContent.attr("method") || "get");
    form.find(".select-enctype").val(formContent.attr("enctype"));
    form.find(".select-layout").val(layout);
    form.find(".select-grid-wrapper").css("display", layout === "form-horizontal" ? "block" : "none");
    form.find(".select-grid").val(formContent.attr("data-grid") || "4-8");
  }
};
KEditor$1.components["googlemap"] = {
  init: function(contentArea, container, component, keditor) {
    let iframe = component.find("iframe");
    let wrapper = iframe.parent();
    keditor.initIframeCover(iframe, wrapper);
  },
  settingEnabled: true,
  settingTitle: "Google Map Settings",
  initSettingForm: function(form, keditor) {
    form.append(
      '<form class="form-horizontal">   <div class="mb-3">       <div class="col-sm-12">           <button type="button" class="btn w-100 btn-primary btn-googlemap-edit">Update Map</button>       </div>   </div>   <div class="mb-3">       <label class="col-sm-12 form-label">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-secondary btn-googlemap-169">16:9</button>           <button type="button" class="btn btn-sm btn-secondary btn-googlemap-43">4:3</button>       </div>   </div></form>'
    );
    let btnEdit = form.find(".btn-googlemap-edit");
    btnEdit.on("click", function(e) {
      e.preventDefault();
      let inputData = prompt("Please enter Google Map embed code in here:");
      let iframe = $$1(inputData);
      let src = iframe.attr("src");
      if (iframe.length > 0 && src && src.length > 0) {
        keditor.getSettingComponent().find("iframe").attr("src", src);
      } else {
        alert("Your Google Map embed code is invalid!");
      }
    });
    let btn169 = form.find(".btn-googlemap-169");
    btn169.on("click", function(e) {
      e.preventDefault();
      keditor.getSettingComponent().find(".ratio").removeClass("ratio-4x3").addClass("ratio-16x9");
    });
    let btn43 = form.find(".btn-googlemap-43");
    btn43.on("click", function(e) {
      e.preventDefault();
      keditor.getSettingComponent().find(".ratio").removeClass("ratio-16x9").addClass("ratio-4x3");
    });
  }
};
KEditor$1.components["photo"] = {
  init: function(contentArea, container, component, keditor) {
    let componentContent = component.children(".keditor-component-content");
    let img = componentContent.find("img");
    img.css("display", "inline-block");
  },
  settingEnabled: true,
  settingTitle: "Photo Settings",
  initSettingForm: function(form, keditor) {
    let self = this;
    keditor.options;
    form.append(
      '<form class="form-horizontal">   <div class="mb-3">       <div class="col-sm-12">           <button type="button" class="btn w-100 btn-primary" id="photo-edit">Change Photo</button>           <input type="file" style="display: none" />       </div>   </div>   <div class="mb-3">       <label for="photo-align" class="col-sm-12 form-label">Align</label>       <div class="col-sm-12">           <select id="photo-align" class="form-select">               <option value="left">Left</option>               <option value="center">Center</option>               <option value="right">Right</option>           </select>       </div>   </div>   <div class="mb-3">       <label for="photo-style" class="col-sm-12 form-label">Style</label>       <div class="col-sm-12">           <select id="photo-style" class="form-select">               <option value="">None</option>               <option value="rounded">Rounded</option>               <option value="rounded-circle">Circle</option>               <option value="img-thumbnail">Thumbnail</option>           </select>       </div>   </div>   <div class="mb-3">       <label for="photo-responsive" class="col-sm-12 form-label">Responsive</label>       <div class="col-sm-12">           <input type="checkbox" class="form-check-input" id="photo-responsive" />       </div>   </div>   <div class="mb-3">       <label for="photo-width" class="col-sm-12 form-label">Width</label>       <div class="col-sm-12">           <input type="number" id="photo-width" class="form-control" />       </div>   </div>   <div class="mb-3">       <label for="photo-height" class="col-sm-12 form-label">Height</label>       <div class="col-sm-12">           <input type="number" id="photo-height" class="form-control" />       </div>   </div></form>'
    );
    let photoEdit = form.find("#photo-edit");
    let fileInput = photoEdit.next();
    photoEdit.on("click", function(e) {
      e.preventDefault();
      fileInput.trigger("click");
    });
    fileInput.on("change", function() {
      let file = this.files[0];
      if (/image/.test(file.type)) {
        let reader = new FileReader();
        reader.addEventListener("load", function(e) {
          let img = keditor.getSettingComponent().find("img");
          img.attr("src", e.target.result);
          img.css({
            width: "",
            height: ""
          });
          img.load(function() {
            self.showSettingForm.call(self, form, keditor.getSettingComponent(), keditor);
          });
        });
        reader.readAsDataURL(this.files[0]);
      } else {
        alert("Your selected file is not photo!");
      }
    });
    let inputAlign = form.find("#photo-align");
    inputAlign.on("change", function() {
      let panel = keditor.getSettingComponent().find(".photo-panel");
      panel.css("text-align", this.value);
    });
    let inputResponsive = form.find("#photo-responsive");
    inputResponsive.on("click", function() {
      keditor.getSettingComponent().find("img")[this.checked ? "addClass" : "removeClass"]("img-fluid");
    });
    let cbbStyle = form.find("#photo-style");
    cbbStyle.on("change", function() {
      let img = keditor.getSettingComponent().find("img");
      let val = this.value;
      img.removeClass("rounded rounded-circle img-thumbnail");
      if (val) {
        img.addClass(val);
      }
    });
    let inputWidth = form.find("#photo-width");
    let inputHeight = form.find("#photo-height");
    inputWidth.on("change", function() {
      let img = keditor.getSettingComponent().find("img");
      let newWidth = +this.value;
      let newHeight = Math.round(newWidth / self.ratio);
      if (newWidth <= 0) {
        newWidth = self.width;
        newHeight = self.height;
        this.value = newWidth;
      }
      img.css({
        "width": newWidth,
        "height": newHeight
      });
      inputHeight.val(newHeight);
    });
    inputHeight.on("change", function() {
      let img = keditor.getSettingComponent().find("img");
      let newHeight = +this.value;
      let newWidth = Math.round(newHeight * self.ratio);
      if (newHeight <= 0) {
        newWidth = self.width;
        newHeight = self.height;
        this.value = newHeight;
      }
      img.css({
        "height": newHeight,
        "width": newWidth
      });
      inputWidth.val(newWidth);
    });
  },
  showSettingForm: function(form, component, keditor) {
    let self = this;
    let inputAlign = form.find("#photo-align");
    let inputResponsive = form.find("#photo-responsive");
    let inputWidth = form.find("#photo-width");
    let inputHeight = form.find("#photo-height");
    let cbbStyle = form.find("#photo-style");
    let panel = component.find(".photo-panel");
    let img = panel.find("img");
    let algin = panel.css("text-align");
    if (algin !== "right" || algin !== "center") {
      algin = "left";
    }
    if (img.hasClass("rounded")) {
      cbbStyle.val("rounded");
    } else if (img.hasClass("rounded-circle")) {
      cbbStyle.val("rounded-circle");
    } else if (img.hasClass("img-thumbnail")) {
      cbbStyle.val("img-thumbnail");
    } else {
      cbbStyle.val("");
    }
    inputAlign.val(algin);
    inputResponsive.prop("checked", img.hasClass("img-fluid"));
    inputWidth.val(img.width());
    inputHeight.val(img.height());
    $$1("<img />").attr("src", img.attr("src")).load(function() {
      self.ratio = this.width / this.height;
      self.width = this.width;
      self.height = this.height;
    });
  }
};
KEditor$1.components["text"] = {
  // Store editor instances by element ID
  editors: {},
  init: function(contentArea, container, component, keditor) {
    let self = this;
    let options = keditor.options;
    let componentContent = component.children(".keditor-component-content");
    let elementId = componentContent.attr("id");
    if (typeof window.InlineEditor === "undefined") {
      console.error("[ KEditor ] CKEditor 5 InlineEditor is not loaded. Please include CKEditor 5 script.");
      componentContent.prop("contenteditable", true);
      return;
    }
    window.InlineEditor.create(componentContent[0], {
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "alignment",
          "|",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "undo",
          "redo"
        ],
        shouldNotGroupWhenFull: true
      },
      heading: {
        options: [
          { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
          { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
          { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
          { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
          { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
          { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
          { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" }
        ]
      },
      link: {
        addTargetToExternalLinks: true
      }
    }).then((editor) => {
      self.editors[elementId] = editor;
      editor.model.document.on("change:data", () => {
        if (typeof options.onComponentChanged === "function") {
          options.onComponentChanged.call(keditor, null, component);
        }
        if (typeof options.onContainerChanged === "function") {
          options.onContainerChanged.call(keditor, null, container, contentArea);
        }
        if (typeof options.onContentChanged === "function") {
          options.onContentChanged.call(keditor, null, contentArea);
        }
      });
      if (typeof options.onComponentReady === "function") {
        options.onComponentReady.call(contentArea, component, editor);
      }
    }).catch((error2) => {
      console.error("[ KEditor ] CKEditor 5 initialization error:", error2);
      componentContent.prop("contenteditable", true);
    });
  },
  getContent: function(component, keditor) {
    let componentContent = component.find(".keditor-component-content");
    let id = componentContent.attr("id");
    let editor = this.editors[id];
    if (editor) {
      return editor.getData();
    } else {
      return componentContent.html();
    }
  },
  destroy: function(component, keditor) {
    let id = component.find(".keditor-component-content").attr("id");
    let editor = this.editors[id];
    if (editor) {
      editor.destroy().then(() => {
        delete this.editors[id];
      }).catch((error2) => {
        console.error("[ KEditor ] Error destroying CKEditor 5:", error2);
      });
    }
  }
};
KEditor$1.components["video"] = {
  init: function(contentArea, container, component, keditor) {
    let componentContent = component.children(".keditor-component-content");
    let video = componentContent.find("video");
    if (!video.parent().is(".video-wrapper")) {
      video.wrap('<div class="video-wrapper"></div>');
    }
  },
  getContent: function(component, keditor) {
    let componentContent = component.children(".keditor-component-content");
    let video = componentContent.find("video");
    video.unwrap();
    return componentContent.html();
  },
  settingEnabled: true,
  settingTitle: "Video Settings",
  initSettingForm: function(form, keditor) {
    form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label for="video-input" class="col-sm-12 form-label">Video file</label>
                    <div class="col-sm-12">
                        <div class="video-toolbar">
                            <a href="#" class="btn-video-input btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>
                            <input class="video-input" type="file" style="display: none" />
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="video-autoplay" class="col-sm-12 form-label">Autoplay</label>
                    <div class="col-sm-12">
                        <input type="checkbox" class="video-autoplay form-check-input" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="video-loop" class="col-sm-12 form-label">Loop</label>
                    <div class="col-sm-12">
                        <input type="checkbox" class="video-loop form-check-input" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="video-controls" class="col-sm-12 form-label">Show Controls</label>
                    <div class="col-sm-12">
                        <input type="checkbox" class="video-controls form-check-input" checked />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="" class="col-sm-12 form-label">Ratio</label>
                    <div class="col-sm-12">
                        <div class="form-check">
                            <input type="radio" name="video-radio" class="video-ratio form-check-input" value="4/3" checked />
                            <label class="form-check-label">4:3</label>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-check">
                            <input type="radio" name="video-radio" class="video-ratio form-check-input" value="16/9" />
                            <label class="form-check-label">16:9</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="video-width" class="col-sm-12 form-label">Width (px)</label>
                    <div class="col-sm-12">
                        <input type="number" class="video-width form-control" min="320" max="1920" value="320" />
                    </div>
                </div>
            </form>
        `);
    let fileInput = form.find(".video-input");
    form.find(".btn-video-input").on("click", function(e) {
      e.preventDefault();
      fileInput.trigger("click");
    });
    fileInput.on("change", function() {
      let file = this.files[0];
      let video = keditor.getSettingComponent().find("video");
      if (/video/.test(file.type)) {
        video.attr("src", URL.createObjectURL(file));
      } else {
        alert("Your selected file is not an video file!");
      }
    });
    let autoplayToggle = form.find(".video-autoplay");
    autoplayToggle.on("click", function() {
      let video = keditor.getSettingComponent().find("video");
      video.prop("autoplay", this.checked);
    });
    let loopToggle = form.find(".video-loop");
    loopToggle.on("click", function() {
      let video = keditor.getSettingComponent().find("video");
      video.prop("loop", this.checked);
    });
    let ratio = form.find(".video-ratio");
    ratio.on("click", function() {
      let video = keditor.getSettingComponent().find("video");
      video.attr("data-ratio", this.value);
      form.find(".video-width").trigger("change");
    });
    let controlToggle = form.find(".video-controls");
    controlToggle.on("click", function() {
      let video = keditor.getSettingComponent().find("video");
      video.prop("controls", this.checked);
    });
    let videoWidth = form.find(".video-width");
    videoWidth.on("change", function() {
      let video = keditor.getSettingComponent().find("video");
      let currentRatio = video.attr("data-ratio") === "16/9" ? 16 / 9 : 4 / 3;
      let height = this.value / currentRatio;
      video.attr("width", this.value);
      video.attr("height", height);
    });
  },
  showSettingForm: function(form, component, keditor) {
    let video = component.find("video");
    let autoplayToggle = form.find(".video-autoplay");
    autoplayToggle.prop("checked", video.prop("autoplay"));
    let loopToggle = form.find(".video-loop");
    loopToggle.prop("checked", video.prop("loop"));
    let ratio = form.find(".video-ratio");
    ratio.prop("checked", false).filter('[value="' + video.attr("data-ratio") + '"]').prop("checked", true);
    let controlToggle = form.find(".video-controls");
    controlToggle.prop("checked", video.prop("controls"));
    let videoWidth = form.find(".video-width");
    videoWidth.val(video.attr("width"));
  }
};
KEditor$1.components["vimeo"] = {
  init: function(contentArea, container, component, keditor) {
    let iframe = component.find("iframe");
    let wrapper = iframe.parent();
    keditor.initIframeCover(iframe, wrapper);
  },
  settingEnabled: true,
  settingTitle: "Vimeo Settings",
  initSettingForm: function(form, keditor) {
    form.append(
      '<form class="form-horizontal">   <div class="mb-3">       <div class="col-sm-12">           <button type="button" class="btn w-100 btn-primary btn-vimeo-edit">Change Video</button>       </div>   </div>   <div class="mb-3">       <label class="col-sm-12 form-label">Autoplay</label>       <div class="col-sm-12">           <input type="checkbox" class="form-check-input" id="vimeo-autoplay" />       </div>   </div>   <div class="mb-3">       <label class="col-sm-12 form-label">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-secondary btn-vimeo-169">16:9</button>           <button type="button" class="btn btn-sm btn-secondary btn-vimeo-43">4:3</button>       </div>   </div></form>'
    );
    let btnEdit = form.find(".btn-vimeo-edit");
    btnEdit.on("click", function(e) {
      e.preventDefault();
      let inputData = prompt("Please enter Vimeo URL in here:");
      let vimeoRegex = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
      let match = inputData.match(vimeoRegex);
      if (match && match[3]) {
        keditor.getSettingComponent().find("iframe").attr("src", "https://player.vimeo.com/video/" + match[3] + "?byline=0&portrait=0&badge=0");
      } else {
        alert("Your Vimeo URL is invalid!");
      }
    });
    let btn169 = form.find(".btn-vimeo-169");
    btn169.on("click", function(e) {
      e.preventDefault();
      keditor.getSettingComponent().find(".ratio").removeClass("ratio-4x3").addClass("ratio-16x9");
    });
    let btn43 = form.find(".btn-vimeo-43");
    btn43.on("click", function(e) {
      e.preventDefault();
      keditor.getSettingComponent().find(".ratio").removeClass("ratio-16x9").addClass("ratio-4x3");
    });
    let chkAutoplay = form.find("#vimeo-autoplay");
    chkAutoplay.on("click", function() {
      let embedItem = keditor.getSettingComponent().find("iframe");
      let currentUrl = embedItem.attr("src");
      let newUrl = currentUrl.replace(/(\?.+)+/, "") + "?byline=0&portrait=0&badge=0&autoplay=" + (chkAutoplay.is(":checked") ? 1 : 0);
      embedItem.attr("src", newUrl);
    });
  },
  showSettingForm: function(form, component, keditor) {
    let embedItem = component.find("iframe");
    let chkAutoplay = form.find("#vimeo-autoplay");
    let src = embedItem.attr("src");
    chkAutoplay.prop("checked", src.indexOf("autoplay=1") !== -1);
  }
};
KEditor$1.components["youtube"] = {
  init: function(contentArea, container, component, keditor) {
    let iframe = component.find("iframe");
    let wrapper = iframe.parent();
    keditor.initIframeCover(iframe, wrapper);
  },
  settingEnabled: true,
  settingTitle: "Youtube Settings",
  initSettingForm: function(form, keditor) {
    form.append(
      '<form class="form-horizontal">   <div class="mb-3">       <div class="col-sm-12">           <button type="button" class="btn w-100 btn-primary btn-youtube-edit">Change Video</button>       </div>   </div>   <div class="mb-3">       <label class="col-sm-12 form-label">Autoplay</label>       <div class="col-sm-12">           <input type="checkbox" class="form-check-input" id="youtube-autoplay" />       </div>   </div>   <div class="mb-3">       <label class="col-sm-12 form-label">Aspect Ratio</label>       <div class="col-sm-12">           <button type="button" class="btn btn-sm btn-secondary btn-youtube-169">16:9</button>           <button type="button" class="btn btn-sm btn-secondary btn-youtube-43">4:3</button>       </div>   </div></form>'
    );
    let btnEdit = form.find(".btn-youtube-edit");
    btnEdit.on("click", function(e) {
      e.preventDefault();
      let inputData = prompt("Please enter Youtube URL in here:");
      let youtubeRegex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'><]+)/;
      let match = inputData.match(youtubeRegex);
      if (match && match[1]) {
        keditor.getSettingComponent().find("iframe").attr("src", "https://www.youtube.com/embed/" + match[1]);
      } else {
        alert("Your Youtube URL is invalid!");
      }
    });
    let btn169 = form.find(".btn-youtube-169");
    btn169.on("click", function(e) {
      e.preventDefault();
      keditor.getSettingComponent().find(".ratio").removeClass("ratio-4x3").addClass("ratio-16x9");
    });
    let btn43 = form.find(".btn-youtube-43");
    btn43.on("click", function(e) {
      e.preventDefault();
      keditor.getSettingComponent().find(".ratio").removeClass("ratio-16x9").addClass("ratio-4x3");
    });
    let chkAutoplay = form.find("#youtube-autoplay");
    chkAutoplay.on("click", function() {
      let embedItem = keditor.getSettingComponent().find("iframe");
      let currentUrl = embedItem.attr("src");
      let newUrl = currentUrl.replace(/(\?.+)+/, "") + "?autoplay=" + (chkAutoplay.is(":checked") ? 1 : 0);
      embedItem.attr("src", newUrl);
    });
  },
  showSettingForm: function(form, component, keditor) {
    let embedItem = component.find("iframe");
    let chkAutoplay = form.find("#youtube-autoplay");
    let src = embedItem.attr("src");
    chkAutoplay.prop("checked", src.indexOf("autoplay=1") !== -1);
  }
};
//# sourceMappingURL=keditor.es.js.map
