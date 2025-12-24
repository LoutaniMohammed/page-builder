import KEditor from 'keditor';

KEditor.components['breadcrumbs'] = {
    settingEnabled: true,
    
    settingTitle: 'Breadcrumb Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Divider</label>
                    <div class="col-sm-12">
                        <select class="form-select breadcrumb-divider">
                            <option value="/">/</option>
                            <option value="›">›</option>
                            <option value="→">→</option>
                            <option value="|">|</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Breadcrumb Items</label>
                    <div class="col-sm-12">
                        <div class="breadcrumb-items-editor"></div>
                        <button type="button" class="btn btn-sm btn-primary btn-add-crumb w-100 mt-2">+ Add Breadcrumb</button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control breadcrumb-css-class" placeholder="e.g. my-custom-breadcrumb" />
                    </div>
                </div>
            </form>
        `);
        
        let self = this;
        
        let dividerSelect = form.find('.breadcrumb-divider');
        dividerSelect.on('change', function () {
            let nav = keditor.getSettingComponent().find('nav');
            nav.css('--bs-breadcrumb-divider', "'" + this.value + "'");
        });
        
        let addBtn = form.find('.btn-add-crumb');
        addBtn.on('click', function () {
            let breadcrumb = keditor.getSettingComponent().find('.breadcrumb');
            // Remove active from last item and add link
            let lastItem = breadcrumb.find('.breadcrumb-item').last();
            if (lastItem.hasClass('active')) {
                lastItem.removeClass('active').removeAttr('aria-current');
                let text = lastItem.text();
                lastItem.html('<a href="#">' + text + '</a>');
            }
            breadcrumb.append('<li class="breadcrumb-item active" aria-current="page">New Page</li>');
            self.refreshItemsEditor(form, keditor);
        });
        
        let cssClassInput = form.find('.breadcrumb-css-class');
        cssClassInput.on('input', function () {
            let nav = keditor.getSettingComponent().find('nav');
            let customClass = nav.attr('data-custom-class') || '';
            if (customClass) nav.removeClass(customClass);
            nav.attr('data-custom-class', this.value);
            nav.addClass(this.value);
        });
    },
    
    refreshItemsEditor: function (form, keditor) {
        let breadcrumb = keditor.getSettingComponent().find('.breadcrumb');
        let itemsEditor = form.find('.breadcrumb-items-editor');
        itemsEditor.empty();
        
        breadcrumb.find('.breadcrumb-item').each(function (index) {
            let item = $(this);
            let text = item.find('a').length ? item.find('a').text() : item.text();
            let link = item.find('a').attr('href') || '';
            let isActive = item.hasClass('active');
            
            let itemRow = $(`
                <div class="card card-body p-2 mb-1">
                    <div class="input-group input-group-sm mb-1">
                        <span class="input-group-text">Text</span>
                        <input type="text" class="form-control crumb-text" value="${text}" data-index="${index}" />
                        <button type="button" class="btn btn-outline-danger btn-remove-crumb" data-index="${index}">×</button>
                    </div>
                    ${!isActive ? `
                    <div class="input-group input-group-sm">
                        <span class="input-group-text">Link</span>
                        <input type="text" class="form-control crumb-link" value="${link}" data-index="${index}" />
                    </div>
                    ` : '<small class="text-muted">Active (current page)</small>'}
                </div>
            `);
            itemsEditor.append(itemRow);
        });
        
        itemsEditor.find('.crumb-text').on('input', function () {
            let index = $(this).data('index');
            let item = keditor.getSettingComponent().find('.breadcrumb-item').eq(index);
            if (item.find('a').length) {
                item.find('a').text(this.value);
            } else {
                item.text(this.value);
            }
        });
        
        itemsEditor.find('.crumb-link').on('input', function () {
            let index = $(this).data('index');
            let item = keditor.getSettingComponent().find('.breadcrumb-item').eq(index);
            item.find('a').attr('href', this.value);
        });
        
        itemsEditor.find('.btn-remove-crumb').on('click', function () {
            let index = $(this).data('index');
            let items = keditor.getSettingComponent().find('.breadcrumb-item');
            if (items.length > 1) {
                items.eq(index).remove();
                // Make last item active
                let lastItem = keditor.getSettingComponent().find('.breadcrumb-item').last();
                if (!lastItem.hasClass('active')) {
                    lastItem.addClass('active').attr('aria-current', 'page');
                    let text = lastItem.find('a').text();
                    lastItem.html(text);
                }
                let self = KEditor.components['breadcrumbs'];
                self.refreshItemsEditor(form, keditor);
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let nav = component.find('nav');
        let divider = nav.css('--bs-breadcrumb-divider') || '/';
        divider = divider.replace(/'/g, '');
        form.find('.breadcrumb-divider').val(divider);
        form.find('.breadcrumb-css-class').val(nav.attr('data-custom-class') || '');
        
        this.refreshItemsEditor(form, keditor);
    }
};
