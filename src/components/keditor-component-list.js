import KEditor from 'keditor';

KEditor.components['list'] = {
    settingEnabled: true,
    
    settingTitle: 'List Group Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Style</label>
                    <div class="col-sm-12">
                        <select class="form-select list-style">
                            <option value="">Default</option>
                            <option value="list-group-flush">Flush (no borders)</option>
                            <option value="list-group-numbered">Numbered</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Items</label>
                    <div class="col-sm-12">
                        <div class="list-items-editor"></div>
                        <button type="button" class="btn btn-sm btn-primary btn-add-item w-100 mt-2">+ Add Item</button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control list-css-class" placeholder="e.g. my-custom-list" />
                    </div>
                </div>
            </form>
        `);
        
        let self = this;
        
        let styleSelect = form.find('.list-style');
        styleSelect.on('change', function () {
            let listGroup = keditor.getSettingComponent().find('.list-group');
            listGroup.removeClass('list-group-flush list-group-numbered');
            if (this.value) {
                listGroup.addClass(this.value);
            }
        });
        
        let addItemBtn = form.find('.btn-add-item');
        addItemBtn.on('click', function () {
            let listGroup = keditor.getSettingComponent().find('.list-group');
            listGroup.append('<li class="list-group-item">New Item</li>');
            self.refreshItemsEditor(form, keditor);
        });
        
        let cssClassInput = form.find('.list-css-class');
        cssClassInput.on('input', function () {
            let listGroup = keditor.getSettingComponent().find('.list-group');
            let customClass = listGroup.attr('data-custom-class') || '';
            if (customClass) listGroup.removeClass(customClass);
            listGroup.attr('data-custom-class', this.value);
            listGroup.addClass(this.value);
        });
    },
    
    refreshItemsEditor: function (form, keditor) {
        let listGroup = keditor.getSettingComponent().find('.list-group');
        let itemsEditor = form.find('.list-items-editor');
        itemsEditor.empty();
        
        listGroup.find('.list-group-item').each(function (index) {
            let item = $(this);
            let itemRow = $(`
                <div class="input-group input-group-sm mb-1">
                    <input type="text" class="form-control item-text" value="${item.text()}" data-index="${index}" />
                    <button type="button" class="btn btn-outline-danger btn-remove-item" data-index="${index}">×</button>
                </div>
            `);
            itemsEditor.append(itemRow);
        });
        
        itemsEditor.find('.item-text').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.list-group-item').eq(index).text(this.value);
        });
        
        itemsEditor.find('.btn-remove-item').on('click', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.list-group-item').eq(index).remove();
            let self = KEditor.components['list'];
            self.refreshItemsEditor(form, keditor);
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let listGroup = component.find('.list-group');
        
        if (listGroup.hasClass('list-group-flush')) {
            form.find('.list-style').val('list-group-flush');
        } else if (listGroup.hasClass('list-group-numbered')) {
            form.find('.list-style').val('list-group-numbered');
        } else {
            form.find('.list-style').val('');
        }
        
        form.find('.list-css-class').val(listGroup.attr('data-custom-class') || '');
        
        this.refreshItemsEditor(form, keditor);
    }
};
