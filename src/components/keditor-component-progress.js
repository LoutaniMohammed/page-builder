import KEditor from 'keditor';

KEditor.components['progress'] = {
    settingEnabled: true,
    
    settingTitle: 'Progress Bar Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Value (%)</label>
                    <div class="col-sm-12">
                        <input type="range" class="form-range progress-value" min="0" max="100" value="50" />
                        <span class="progress-value-display">50%</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Color</label>
                    <div class="col-sm-12">
                        <select class="form-select progress-color">
                            <option value="">Default (Primary)</option>
                            <option value="bg-success">Success (Green)</option>
                            <option value="bg-info">Info (Cyan)</option>
                            <option value="bg-warning">Warning (Yellow)</option>
                            <option value="bg-danger">Danger (Red)</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Options</label>
                    <div class="col-sm-12">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input progress-striped" id="progress-striped" />
                            <label class="form-check-label" for="progress-striped">Striped</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input progress-animated" id="progress-animated" />
                            <label class="form-check-label" for="progress-animated">Animated</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input progress-show-label" id="progress-show-label" checked />
                            <label class="form-check-label" for="progress-show-label">Show Label</label>
                        </div>
                    </div>
                </div>
            </form>
        `);
        
        let valueInput = form.find('.progress-value');
        let valueDisplay = form.find('.progress-value-display');
        valueInput.on('input', function () {
            let value = this.value;
            valueDisplay.text(value + '%');
            let progressBar = keditor.getSettingComponent().find('.progress-bar');
            progressBar.css('width', value + '%').attr('aria-valuenow', value);
            if (progressBar.parent().find('.progress-label').length) {
                progressBar.parent().find('.progress-label').text(value + '%');
            }
        });
        
        let colorSelect = form.find('.progress-color');
        colorSelect.on('change', function () {
            let progressBar = keditor.getSettingComponent().find('.progress-bar');
            progressBar.removeClass('bg-success bg-info bg-warning bg-danger');
            if (this.value) {
                progressBar.addClass(this.value);
            }
        });
        
        let stripedCheck = form.find('.progress-striped');
        stripedCheck.on('change', function () {
            let progressBar = keditor.getSettingComponent().find('.progress-bar');
            progressBar.toggleClass('progress-bar-striped', this.checked);
        });
        
        let animatedCheck = form.find('.progress-animated');
        animatedCheck.on('change', function () {
            let progressBar = keditor.getSettingComponent().find('.progress-bar');
            progressBar.toggleClass('progress-bar-animated', this.checked);
        });
        
        let showLabelCheck = form.find('.progress-show-label');
        showLabelCheck.on('change', function () {
            let component = keditor.getSettingComponent();
            let label = component.find('.progress-label');
            if (this.checked) {
                if (label.length === 0) {
                    let value = component.find('.progress-bar').attr('aria-valuenow') || '50';
                    component.find('.progress').after('<div class="progress-label text-center mt-1">' + value + '%</div>');
                }
            } else {
                label.remove();
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let progressBar = component.find('.progress-bar');
        let value = progressBar.attr('aria-valuenow') || '50';
        
        form.find('.progress-value').val(value);
        form.find('.progress-value-display').text(value + '%');
        
        if (progressBar.hasClass('bg-success')) form.find('.progress-color').val('bg-success');
        else if (progressBar.hasClass('bg-info')) form.find('.progress-color').val('bg-info');
        else if (progressBar.hasClass('bg-warning')) form.find('.progress-color').val('bg-warning');
        else if (progressBar.hasClass('bg-danger')) form.find('.progress-color').val('bg-danger');
        else form.find('.progress-color').val('');
        
        form.find('.progress-striped').prop('checked', progressBar.hasClass('progress-bar-striped'));
        form.find('.progress-animated').prop('checked', progressBar.hasClass('progress-bar-animated'));
        form.find('.progress-show-label').prop('checked', component.find('.progress-label').length > 0);
    }
};
