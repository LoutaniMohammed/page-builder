import KEditor from 'keditor';

KEditor.components['pricing'] = {
    settingEnabled: true,
    
    settingTitle: 'Pricing Table Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Pricing Tiers</label>
                    <div class="col-sm-12">
                        <div class="pricing-tiers-editor"></div>
                        <button type="button" class="btn btn-sm btn-primary btn-add-tier w-100 mt-2">+ Add Tier</button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control pricing-css-class" placeholder="e.g. my-custom-pricing" />
                    </div>
                </div>
            </form>
        `);
        
        let self = this;
        
        let addTierBtn = form.find('.btn-add-tier');
        addTierBtn.on('click', function () {
            let pricingRow = keditor.getSettingComponent().find('.pricing-row');
            pricingRow.append(`
                <div class="col-12 col-md pricing-col">
                    <div class="card text-center">
                        <div class="card-header">New Tier</div>
                        <div class="card-body">
                            <h5 class="card-title pricing-amount">$0/mo</h5>
                            <ul class="list-unstyled pricing-features">
                                <li>Feature 1</li>
                            </ul>
                            <a href="#" class="btn btn-outline-primary pricing-btn">Select</a>
                        </div>
                    </div>
                </div>
            `);
            self.refreshTiersEditor(form, keditor);
        });
        
        let cssClassInput = form.find('.pricing-css-class');
        cssClassInput.on('input', function () {
            let row = keditor.getSettingComponent().find('.pricing-row');
            let customClass = row.attr('data-custom-class') || '';
            if (customClass) row.removeClass(customClass);
            row.attr('data-custom-class', this.value);
            row.addClass(this.value);
        });
    },
    
    refreshTiersEditor: function (form, keditor) {
        let tiersEditor = form.find('.pricing-tiers-editor');
        tiersEditor.empty();
        
        keditor.getSettingComponent().find('.pricing-col').each(function (index) {
            let tier = $(this);
            let name = tier.find('.card-header').text();
            let price = tier.find('.pricing-amount').text();
            let btnText = tier.find('.pricing-btn').text() || tier.find('.card-body .btn').text();
            let btnLink = tier.find('.pricing-btn').attr('href') || tier.find('.card-body .btn').attr('href') || '#';
            let isFeatured = tier.find('.card').hasClass('border-primary');
            let features = [];
            tier.find('.pricing-features li, .list-unstyled li').each(function() {
                features.push($(this).text());
            });
            
            let tierCard = $(`
                <div class="card mb-2" data-index="${index}">
                    <div class="card-header p-2 d-flex justify-content-between align-items-center">
                        <span>Tier ${index + 1}: ${name}</span>
                        <button type="button" class="btn btn-sm btn-outline-danger btn-remove-tier" data-index="${index}">×</button>
                    </div>
                    <div class="card-body p-2">
                        <div class="mb-2">
                            <input type="text" class="form-control form-control-sm tier-name" value="${name}" data-index="${index}" placeholder="Tier Name" />
                        </div>
                        <div class="mb-2">
                            <input type="text" class="form-control form-control-sm tier-price" value="${price}" data-index="${index}" placeholder="e.g. $19/mo" />
                        </div>
                        <div class="mb-2">
                            <textarea class="form-control form-control-sm tier-features" rows="3" data-index="${index}" placeholder="One feature per line">${features.join('\n')}</textarea>
                        </div>
                        <div class="row g-1 mb-2">
                            <div class="col-6">
                                <input type="text" class="form-control form-control-sm tier-btn-text" value="${btnText}" data-index="${index}" placeholder="Button Text" />
                            </div>
                            <div class="col-6">
                                <input type="text" class="form-control form-control-sm tier-btn-link" value="${btnLink}" data-index="${index}" placeholder="Button Link" />
                            </div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input tier-featured" data-index="${index}" ${isFeatured ? 'checked' : ''} />
                            <label class="form-check-label">Featured</label>
                        </div>
                    </div>
                </div>
            `);
            tiersEditor.append(tierCard);
        });
        
        // Event handlers
        tiersEditor.find('.tier-name').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.pricing-col').eq(index).find('.card-header').text(this.value);
        });
        
        tiersEditor.find('.tier-price').on('input', function () {
            let index = $(this).data('index');
            let amountEl = keditor.getSettingComponent().find('.pricing-col').eq(index).find('.pricing-amount, .card-title').first();
            amountEl.text(this.value);
        });
        
        tiersEditor.find('.tier-features').on('input', function () {
            let index = $(this).data('index');
            let features = this.value.split('\n').filter(f => f.trim());
            let ul = keditor.getSettingComponent().find('.pricing-col').eq(index).find('.pricing-features, .list-unstyled').first();
            ul.empty();
            features.forEach(f => ul.append('<li>' + f + '</li>'));
        });
        
        tiersEditor.find('.tier-btn-text').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.pricing-col').eq(index).find('.pricing-btn, .card-body .btn').first().text(this.value);
        });
        
        tiersEditor.find('.tier-btn-link').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.pricing-col').eq(index).find('.pricing-btn, .card-body .btn').first().attr('href', this.value);
        });
        
        tiersEditor.find('.tier-featured').on('change', function () {
            let index = $(this).data('index');
            let card = keditor.getSettingComponent().find('.pricing-col').eq(index).find('.card');
            let header = card.find('.card-header');
            let btn = card.find('.pricing-btn, .card-body .btn').first();
            
            if (this.checked) {
                card.addClass('border-primary');
                header.addClass('bg-primary text-white');
                btn.removeClass('btn-outline-primary').addClass('btn-primary');
            } else {
                card.removeClass('border-primary');
                header.removeClass('bg-primary text-white');
                btn.removeClass('btn-primary').addClass('btn-outline-primary');
            }
        });
        
        tiersEditor.find('.btn-remove-tier').on('click', function () {
            let index = $(this).data('index');
            let tiers = keditor.getSettingComponent().find('.pricing-col');
            if (tiers.length > 1) {
                tiers.eq(index).remove();
                let self = KEditor.components['pricing'];
                self.refreshTiersEditor(form, keditor);
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        form.find('.pricing-css-class').val(component.find('.pricing-row').attr('data-custom-class') || '');
        this.refreshTiersEditor(form, keditor);
    }
};
