import KEditor from 'keditor';

KEditor.components['alert'] = {
    settingEnabled: true,
    
    settingTitle: 'Alert Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Alert Type</label>
                    <div class="col-sm-12">
                        <select class="form-select alert-type">
                            <option value="alert-primary">Primary</option>
                            <option value="alert-secondary">Secondary</option>
                            <option value="alert-success">Success</option>
                            <option value="alert-danger">Danger</option>
                            <option value="alert-warning">Warning</option>
                            <option value="alert-info">Info</option>
                            <option value="alert-light">Light</option>
                            <option value="alert-dark">Dark</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Options</label>
                    <div class="col-sm-12">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input alert-dismissible-check" id="alert-dismissible" />
                            <label class="form-check-label" for="alert-dismissible">Dismissible</label>
                        </div>
                    </div>
                </div>
            </form>
        `);
        
        let typeSelect = form.find('.alert-type');
        typeSelect.on('change', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            alert.removeClass('alert-primary alert-secondary alert-success alert-danger alert-warning alert-info alert-light alert-dark');
            alert.addClass(this.value);
        });
        
        let dismissibleCheck = form.find('.alert-dismissible-check');
        dismissibleCheck.on('change', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            if (this.checked) {
                alert.addClass('alert-dismissible fade show');
                if (alert.find('.btn-close').length === 0) {
                    alert.append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');
                }
            } else {
                alert.removeClass('alert-dismissible fade show');
                alert.find('.btn-close').remove();
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let alert = component.find('.alert');
        
        let types = ['alert-primary', 'alert-secondary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-light', 'alert-dark'];
        for (let type of types) {
            if (alert.hasClass(type)) {
                form.find('.alert-type').val(type);
                break;
            }
        }
        
        form.find('.alert-dismissible-check').prop('checked', alert.hasClass('alert-dismissible'));
    }
};
