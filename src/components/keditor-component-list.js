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
                    <label class="col-sm-12 form-label">Add Item</label>
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-sm btn-primary btn-add-item w-100">+ Add List Item</button>
                    </div>
                </div>
            </form>
        `);
        
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
    }
};
