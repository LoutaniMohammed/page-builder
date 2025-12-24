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
                    <label class="col-sm-12 form-label">Add Item</label>
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-sm btn-primary btn-add-crumb w-100">+ Add Breadcrumb</button>
                    </div>
                </div>
            </form>
        `);
        
        let dividerSelect = form.find('.breadcrumb-divider');
        dividerSelect.on('change', function () {
            let nav = keditor.getSettingComponent().find('nav');
            nav.css('--bs-breadcrumb-divider', "'" + this.value + "'");
        });
        
        let addBtn = form.find('.btn-add-crumb');
        addBtn.on('click', function () {
            let breadcrumb = keditor.getSettingComponent().find('.breadcrumb');
            let lastItem = breadcrumb.find('.breadcrumb-item').last();
            lastItem.removeClass('active').attr('aria-current', null);
            lastItem.html('<a href="#">' + lastItem.text() + '</a>');
            breadcrumb.append('<li class="breadcrumb-item active" aria-current="page">New Page</li>');
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let nav = component.find('nav');
        let divider = nav.css('--bs-breadcrumb-divider') || '/';
        divider = divider.replace(/'/g, '');
        form.find('.breadcrumb-divider').val(divider);
    }
};
