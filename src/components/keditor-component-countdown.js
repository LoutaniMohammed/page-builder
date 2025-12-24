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
            
            if (distance < 0) {
                if (daysEl) daysEl.textContent = '00';
                if (hoursEl) hoursEl.textContent = '00';
                if (minutesEl) minutesEl.textContent = '00';
                if (secondsEl) secondsEl.textContent = '00';
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
                    <label class="col-sm-12 form-label">Style</label>
                    <div class="col-sm-12">
                        <select class="form-select countdown-style">
                            <option value="boxes">Boxes</option>
                            <option value="inline">Inline</option>
                        </select>
                    </div>
                </div>
            </form>
        `);
        
        let dateInput = form.find('.countdown-date');
        dateInput.on('change', function () {
            let component = keditor.getSettingComponent();
            component.find('.countdown-timer').attr('data-target-date', this.value);
            // No need to restart, the interval re-reads from DOM
        });
        
        let styleSelect = form.find('.countdown-style');
        styleSelect.on('change', function () {
            let countdownEl = keditor.getSettingComponent().find('.countdown-timer');
            countdownEl.removeClass('countdown-boxes countdown-inline');
            countdownEl.addClass('countdown-' + this.value);
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let countdownEl = component.find('.countdown-timer');
        let targetDate = countdownEl.attr('data-target-date') || '';
        form.find('.countdown-date').val(targetDate);
        
        if (countdownEl.hasClass('countdown-inline')) {
            form.find('.countdown-style').val('inline');
        } else {
            form.find('.countdown-style').val('boxes');
        }
    }
};
