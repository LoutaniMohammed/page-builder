import KEditor from 'keditor';

KEditor.components['countdown'] = {
    settingEnabled: true,
    
    settingTitle: 'Countdown Timer Settings',
    
    init: function (contentArea, container, component, keditor) {
        this.startCountdown(component);
    },
    
    startCountdown: function (component) {
        let countdownEl = component.find('.countdown-timer');
        let targetDate = countdownEl.attr('data-target-date');
        
        if (!targetDate) {
            // Default: 7 days from now
            let future = new Date();
            future.setDate(future.getDate() + 7);
            targetDate = future.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
            countdownEl.attr('data-target-date', targetDate);
        }
        
        // Clear any existing interval
        if (countdownEl.data('interval')) {
            clearInterval(countdownEl.data('interval'));
        }
        
        let updateCountdown = function () {
            let now = new Date().getTime();
            let target = new Date(targetDate).getTime();
            let distance = target - now;
            
            if (distance < 0) {
                countdownEl.find('.countdown-days').text('00');
                countdownEl.find('.countdown-hours').text('00');
                countdownEl.find('.countdown-minutes').text('00');
                countdownEl.find('.countdown-seconds').text('00');
                return;
            }
            
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownEl.find('.countdown-days').text(days.toString().padStart(2, '0'));
            countdownEl.find('.countdown-hours').text(hours.toString().padStart(2, '0'));
            countdownEl.find('.countdown-minutes').text(minutes.toString().padStart(2, '0'));
            countdownEl.find('.countdown-seconds').text(seconds.toString().padStart(2, '0'));
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
            self.startCountdown(component);
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
