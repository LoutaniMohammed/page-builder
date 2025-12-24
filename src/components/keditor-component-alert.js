import KEditor from 'keditor';

KEditor.components['alert'] = {
    settingEnabled: true,
    
    settingTitle: 'Alert Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Title</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control alert-title" placeholder="e.g. Success!" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Message</label>
                    <div class="col-sm-12">
                        <textarea class="form-control alert-message" rows="2" placeholder="Alert message..."></textarea>
                    </div>
                </div>
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
                    <label class="col-sm-12 form-label">Icon</label>
                    <div class="col-sm-12">
                        <select class="form-select alert-icon">
                            <option value="">None</option>
                            <option value="fa-check-circle">✓ Check Circle</option>
                            <option value="fa-info-circle">ℹ Info Circle</option>
                            <option value="fa-exclamation-triangle">⚠ Warning</option>
                            <option value="fa-times-circle">✕ Error</option>
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
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control alert-css-class" placeholder="e.g. my-custom-alert" />
                    </div>
                </div>
            </form>
        `);
        
        let titleInput = form.find('.alert-title');
        titleInput.on('input', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            let strong = alert.find('strong');
            if (strong.length === 0) {
                alert.prepend('<strong></strong> ');
                strong = alert.find('strong');
            }
            strong.text(this.value);
        });
        
        let messageInput = form.find('.alert-message');
        messageInput.on('input', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            let strong = alert.find('strong');
            let closeBtn = alert.find('.btn-close');
            // Get text after strong tag
            let content = this.value;
            alert.contents().filter(function() {
                return this.nodeType === 3; // Text nodes only
            }).remove();
            if (strong.length) {
                strong.after(' ' + content);
            } else {
                if (closeBtn.length) {
                    closeBtn.before(content);
                } else {
                    alert.append(content);
                }
            }
        });
        
        let typeSelect = form.find('.alert-type');
        typeSelect.on('change', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            alert.removeClass('alert-primary alert-secondary alert-success alert-danger alert-warning alert-info alert-light alert-dark');
            alert.addClass(this.value);
        });
        
        let iconSelect = form.find('.alert-icon');
        iconSelect.on('change', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            let icon = alert.find('i.fa');
            if (this.value) {
                if (icon.length === 0) {
                    alert.prepend('<i class="fa ' + this.value + ' me-2"></i>');
                } else {
                    icon.attr('class', 'fa ' + this.value + ' me-2');
                }
            } else {
                icon.remove();
            }
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
        
        let cssClassInput = form.find('.alert-css-class');
        cssClassInput.on('input', function () {
            let alert = keditor.getSettingComponent().find('.alert');
            let customClass = alert.attr('data-custom-class') || '';
            if (customClass) {
                alert.removeClass(customClass);
            }
            alert.attr('data-custom-class', this.value);
            alert.addClass(this.value);
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let alert = component.find('.alert');
        
        // Get title from strong tag
        let strong = alert.find('strong');
        form.find('.alert-title').val(strong.text());
        
        // Get message (text after strong)
        let fullText = alert.clone().children().remove().end().text().trim();
        form.find('.alert-message').val(fullText);
        
        let types = ['alert-primary', 'alert-secondary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-light', 'alert-dark'];
        for (let type of types) {
            if (alert.hasClass(type)) {
                form.find('.alert-type').val(type);
                break;
            }
        }
        
        let icon = alert.find('i.fa');
        if (icon.length) {
            let iconClass = icon.attr('class').replace('fa ', '').replace(' me-2', '');
            form.find('.alert-icon').val(iconClass);
        } else {
            form.find('.alert-icon').val('');
        }
        
        form.find('.alert-dismissible-check').prop('checked', alert.hasClass('alert-dismissible'));
        form.find('.alert-css-class').val(alert.attr('data-custom-class') || '');
    }
};
