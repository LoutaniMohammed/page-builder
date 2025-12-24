import KEditor from 'keditor';

KEditor.components['countdown'] = {
    settingEnabled: true,
    
    settingTitle: 'Countdown Timer Settings',
    
    init: function (contentArea, container, component, keditor) {
        this.startCountdown(component);
    },
    
    startCountdown: function (component) {
        let countdownEl = component.find('.countdown-timer');
        
        // Set default if not set
        if (!countdownEl.attr('data-target-date')) {
            let future = new Date();
            future.setDate(future.getDate() + 7);
            let targetDate = future.toISOString().slice(0, 16);
            countdownEl.attr('data-target-date', targetDate);
        }
        
        // Clear any existing interval
        if (countdownEl.data('interval')) {
            clearInterval(countdownEl.data('interval'));
        }
        
        // Store reference to DOM element for live updates
        let countdownDom = countdownEl[0];
        
        let updateCountdown = function () {
            // Re-read from DOM each time to get latest value
            let targetDate = countdownDom.getAttribute('data-target-date');
            if (!targetDate) return;
            
            let now = new Date().getTime();
            let target = new Date(targetDate).getTime();
            let distance = target - now;
            
            let daysEl = countdownDom.querySelector('.countdown-days');
            let hoursEl = countdownDom.querySelector('.countdown-hours');
            let minutesEl = countdownDom.querySelector('.countdown-minutes');
            let secondsEl = countdownDom.querySelector('.countdown-seconds');
            
            // Check for expired message
            let expiredMsg = countdownDom.getAttribute('data-expired-message');
            
            if (distance < 0) {
                if (expiredMsg) {
                    let msgEl = countdownDom.querySelector('.countdown-expired');
                    if (!msgEl) {
                        countdownDom.innerHTML = '<div class="countdown-expired alert alert-warning text-center">' + expiredMsg + '</div>';
                    }
                } else {
                    if (daysEl) daysEl.textContent = '00';
                    if (hoursEl) hoursEl.textContent = '00';
                    if (minutesEl) minutesEl.textContent = '00';
                    if (secondsEl) secondsEl.textContent = '00';
                }
                return;
            }
            
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        };
        
        updateCountdown();
        let interval = setInterval(updateCountdown, 1000);
        countdownEl.data('interval', interval);
    },
    
    initSettingForm: function (form, keditor) {
        let self = this;
        
        // Get today's date/time as minimum
        let now = new Date();
        let minDateTime = now.toISOString().slice(0, 16);
        
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Target Date & Time</label>
                    <div class="col-sm-12">
                        <input type="datetime-local" class="form-control countdown-date" min="${minDateTime}" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Labels</label>
                    <div class="col-sm-12">
                        <div class="row g-1">
                            <div class="col-3"><input type="text" class="form-control form-control-sm label-days" placeholder="days" /></div>
                            <div class="col-3"><input type="text" class="form-control form-control-sm label-hours" placeholder="hours" /></div>
                            <div class="col-3"><input type="text" class="form-control form-control-sm label-mins" placeholder="mins" /></div>
                            <div class="col-3"><input type="text" class="form-control form-control-sm label-secs" placeholder="secs" /></div>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Expired Message</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control countdown-expired-msg" placeholder="e.g. Event has ended!" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Color Theme</label>
                    <div class="col-sm-12">
                        <select class="form-select countdown-color">
                            <option value="bg-primary">Primary (Blue)</option>
                            <option value="bg-success">Success (Green)</option>
                            <option value="bg-danger">Danger (Red)</option>
                            <option value="bg-warning text-dark">Warning (Yellow)</option>
                            <option value="bg-dark">Dark</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Style</label>
                    <div class="col-sm-12">
                        <select class="form-select countdown-style">
                            <option value="boxes">Boxes</option>
                            <option value="inline">Inline</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control countdown-css-class" placeholder="e.g. my-custom-countdown" />
                    </div>
                </div>
            </form>
        `);
        
        let dateInput = form.find('.countdown-date');
        dateInput.on('change', function () {
            let component = keditor.getSettingComponent();
            component.find('.countdown-timer').attr('data-target-date', this.value);
        });
        
        // Label inputs
        form.find('.label-days').on('input', function () {
            keditor.getSettingComponent().find('.countdown-box .countdown-label').eq(0).text(this.value || 'days');
        });
        form.find('.label-hours').on('input', function () {
            keditor.getSettingComponent().find('.countdown-box .countdown-label').eq(1).text(this.value || 'hours');
        });
        form.find('.label-mins').on('input', function () {
            keditor.getSettingComponent().find('.countdown-box .countdown-label').eq(2).text(this.value || 'mins');
        });
        form.find('.label-secs').on('input', function () {
            keditor.getSettingComponent().find('.countdown-box .countdown-label').eq(3).text(this.value || 'secs');
        });
        
        form.find('.countdown-expired-msg').on('input', function () {
            keditor.getSettingComponent().find('.countdown-timer').attr('data-expired-message', this.value);
        });
        
        form.find('.countdown-color').on('change', function () {
            let boxes = keditor.getSettingComponent().find('.countdown-box');
            boxes.removeClass('bg-primary bg-success bg-danger bg-warning bg-dark text-dark text-white');
            boxes.addClass(this.value);
            if (this.value.includes('warning')) {
                boxes.removeClass('text-white');
            } else {
                boxes.addClass('text-white');
            }
        });
        
        let styleSelect = form.find('.countdown-style');
        styleSelect.on('change', function () {
            let countdownEl = keditor.getSettingComponent().find('.countdown-timer');
            countdownEl.removeClass('countdown-boxes countdown-inline');
            countdownEl.addClass('countdown-' + this.value);
        });
        
        let cssClassInput = form.find('.countdown-css-class');
        cssClassInput.on('input', function () {
            let countdownEl = keditor.getSettingComponent().find('.countdown-timer');
            let customClass = countdownEl.attr('data-custom-class') || '';
            if (customClass) countdownEl.removeClass(customClass);
            countdownEl.attr('data-custom-class', this.value);
            countdownEl.addClass(this.value);
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let countdownEl = component.find('.countdown-timer');
        let targetDate = countdownEl.attr('data-target-date') || '';
        form.find('.countdown-date').val(targetDate);
        
        // Get labels
        let labels = component.find('.countdown-box .countdown-label');
        if (labels.length >= 4) {
            form.find('.label-days').val(labels.eq(0).text());
            form.find('.label-hours').val(labels.eq(1).text());
            form.find('.label-mins').val(labels.eq(2).text());
            form.find('.label-secs').val(labels.eq(3).text());
        }
        
        form.find('.countdown-expired-msg').val(countdownEl.attr('data-expired-message') || '');
        
        let box = component.find('.countdown-box').first();
        if (box.hasClass('bg-success')) form.find('.countdown-color').val('bg-success');
        else if (box.hasClass('bg-danger')) form.find('.countdown-color').val('bg-danger');
        else if (box.hasClass('bg-warning')) form.find('.countdown-color').val('bg-warning text-dark');
        else if (box.hasClass('bg-dark')) form.find('.countdown-color').val('bg-dark');
        else form.find('.countdown-color').val('bg-primary');
        
        if (countdownEl.hasClass('countdown-inline')) {
            form.find('.countdown-style').val('inline');
        } else {
            form.find('.countdown-style').val('boxes');
        }
        
        form.find('.countdown-css-class').val(countdownEl.attr('data-custom-class') || '');
    }
};
