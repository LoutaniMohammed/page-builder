import KEditor from 'keditor';

KEditor.components['carousel'] = {
    settingEnabled: true,
    
    settingTitle: 'Carousel Settings',
    
    init: function (contentArea, container, component, keditor) {
        // Initialize Swiper if available
        if (typeof Swiper !== 'undefined') {
            let swiperEl = component.find('.swiper')[0];
            if (swiperEl && !swiperEl.swiper) {
                new Swiper(swiperEl, {
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            }
        }
    },
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Autoplay Delay (ms)</label>
                    <div class="col-sm-12">
                        <input type="number" class="form-control carousel-delay" min="1000" max="10000" step="500" value="5000" />
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Options</label>
                    <div class="col-sm-12">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input carousel-loop" id="carousel-loop" checked />
                            <label class="form-check-label" for="carousel-loop">Loop</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input carousel-autoplay" id="carousel-autoplay" checked />
                            <label class="form-check-label" for="carousel-autoplay">Autoplay</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input carousel-pagination" id="carousel-pagination" checked />
                            <label class="form-check-label" for="carousel-pagination">Show Pagination</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input carousel-navigation" id="carousel-navigation" checked />
                            <label class="form-check-label" for="carousel-navigation">Show Navigation</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-sm btn-primary btn-add-slide w-100">+ Add Slide</button>
                    </div>
                </div>
            </form>
        `);
        
        let self = this;
        
        let updateSwiper = function () {
            let component = keditor.getSettingComponent();
            let swiperEl = component.find('.swiper')[0];
            if (swiperEl && swiperEl.swiper) {
                swiperEl.swiper.destroy();
            }
            self.init(null, null, component, keditor);
        };
        
        form.find('.carousel-delay').on('change', function () {
            keditor.getSettingComponent().find('.swiper').attr('data-delay', this.value);
            updateSwiper();
        });
        
        form.find('.carousel-pagination').on('change', function () {
            keditor.getSettingComponent().find('.swiper-pagination').toggle(this.checked);
        });
        
        form.find('.carousel-navigation').on('change', function () {
            let nav = keditor.getSettingComponent().find('.swiper-button-next, .swiper-button-prev');
            nav.toggle(this.checked);
        });
        
        form.find('.btn-add-slide').on('click', function () {
            let swiperWrapper = keditor.getSettingComponent().find('.swiper-wrapper');
            swiperWrapper.append(`
                <div class="swiper-slide">
                    <div class="testimonial-slide text-center p-4">
                        <img src="https://placehold.co/80" class="rounded-circle mb-3" alt="Avatar">
                        <blockquote class="blockquote">
                            <p>"New testimonial quote here."</p>
                        </blockquote>
                        <footer class="blockquote-footer">Author Name</footer>
                    </div>
                </div>
            `);
            updateSwiper();
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let swiperEl = component.find('.swiper');
        let delay = swiperEl.attr('data-delay') || '5000';
        form.find('.carousel-delay').val(delay);
        
        form.find('.carousel-pagination').prop('checked', component.find('.swiper-pagination').is(':visible'));
        form.find('.carousel-navigation').prop('checked', component.find('.swiper-button-next').is(':visible'));
    }
};

