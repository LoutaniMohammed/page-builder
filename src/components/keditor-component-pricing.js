import KEditor from 'keditor';

KEditor.components['pricing'] = {
    settingEnabled: true,
    
    settingTitle: 'Pricing Table Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Columns</label>
                    <div class="col-sm-12">
                        <select class="form-select pricing-columns">
                            <option value="2">2 Tiers</option>
                            <option value="3" selected>3 Tiers</option>
                            <option value="4">4 Tiers</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Style</label>
                    <div class="col-sm-12">
                        <select class="form-select pricing-style">
                            <option value="card">Card Style</option>
                            <option value="bordered">Bordered</option>
                        </select>
                    </div>
                </div>
            </form>
        `);
        
        let columnsSelect = form.find('.pricing-columns');
        columnsSelect.on('change', function () {
            let pricingRow = keditor.getSettingComponent().find('.pricing-row');
            let currentCols = pricingRow.children('.pricing-col').length;
            let newCols = parseInt(this.value);
            
            if (newCols > currentCols) {
                for (let i = currentCols; i < newCols; i++) {
                    pricingRow.append(`
                        <div class="col-12 col-md pricing-col">
                            <div class="card text-center">
                                <div class="card-header">Tier ${i + 1}</div>
                                <div class="card-body">
                                    <h5 class="card-title pricing-amount">$${(i + 1) * 10}/mo</h5>
                                    <ul class="list-unstyled">
                                        <li>Feature 1</li>
                                        <li>Feature 2</li>
                                        <li>Feature 3</li>
                                    </ul>
                                    <a href="#" class="btn btn-primary">Select</a>
                                </div>
                            </div>
                        </div>
                    `);
                }
            } else if (newCols < currentCols) {
                for (let i = currentCols; i > newCols; i--) {
                    pricingRow.children('.pricing-col').last().remove();
                }
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let cols = component.find('.pricing-col').length;
        form.find('.pricing-columns').val(cols.toString());
    }
};
