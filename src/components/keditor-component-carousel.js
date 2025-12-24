import KEditor from 'keditor';

KEditor.components['carousel'] = {
    settingEnabled: true,
    
    settingTitle: 'Carousel Settings',
    
    init: function (contentArea, container, component, keditor) {
        this.initSwiper(component);
    },
    
    initSwiper: function (component) {
        if (typeof Swiper !== 'undefined') {
            let swiperEl = component.find('.swiper')[0];
            if (swiperEl) {
                if (swiperEl.swiper) {
                    swiperEl.swiper.destroy();
                }
                new Swiper(swiperEl, {
                    loop: true,
                    autoplay: {
                        delay: parseInt(component.find('.swiper').attr('data-delay') || 5000),
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
        let self = this;
        
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
                    <label class="col-sm-12 form-label">Slides</label>
                    <div class="col-sm-12">
                        <div class="slides-editor"></div>
                        <button type="button" class="btn btn-sm btn-primary btn-add-slide w-100 mt-2">+ Add Slide</button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control carousel-css-class" placeholder="e.g. my-custom-carousel" />
                    </div>
                </div>
            </form>
        `);
        
        form.find('.carousel-delay').on('change', function () {
            keditor.getSettingComponent().find('.swiper').attr('data-delay', this.value);
            self.initSwiper(keditor.getSettingComponent());
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
                        <img src="https://placehold.co/80" class="rounded-circle mb-3 slide-avatar" alt="Avatar">
                        <blockquote class="blockquote">
                            <p class="slide-quote">"New testimonial quote here."</p>
                        </blockquote>
                        <footer class="blockquote-footer slide-author">Author Name, <cite class="slide-title">Title</cite></footer>
                    </div>
                </div>
            `);
            self.initSwiper(keditor.getSettingComponent());
            self.refreshSlidesEditor(form, keditor);
        });
        
        let cssClassInput = form.find('.carousel-css-class');
        cssClassInput.on('input', function () {
            let swiper = keditor.getSettingComponent().find('.swiper');
            let customClass = swiper.attr('data-custom-class') || '';
            if (customClass) swiper.removeClass(customClass);
            swiper.attr('data-custom-class', this.value);
            swiper.addClass(this.value);
        });
    },
    
    refreshSlidesEditor: function (form, keditor) {
        let slidesEditor = form.find('.slides-editor');
        slidesEditor.empty();
        
        keditor.getSettingComponent().find('.swiper-slide').each(function (index) {
            let slide = $(this);
            let imgSrc = slide.find('img').attr('src') || '';
            let quote = slide.find('.blockquote p, .slide-quote').text() || '';
            let footer = slide.find('.blockquote-footer').clone();
            footer.find('cite').remove();
            let author = footer.text().replace(',', '').trim();
            let title = slide.find('cite').text() || '';
            
            let slideCard = $(`
                <div class="card mb-2" data-index="${index}">
                    <div class="card-header p-2 d-flex justify-content-between align-items-center">
                        <span>Slide ${index + 1}</span>
                        <button type="button" class="btn btn-sm btn-outline-danger btn-remove-slide" data-index="${index}">×</button>
                    </div>
                    <div class="card-body p-2">
                        <div class="mb-2">
                            <input type="text" class="form-control form-control-sm slide-img" value="${imgSrc}" data-index="${index}" placeholder="Avatar URL" />
                        </div>
                        <div class="mb-2">
                            <textarea class="form-control form-control-sm slide-quote-input" rows="2" data-index="${index}" placeholder="Quote text">${quote}</textarea>
                        </div>
                        <div class="mb-2">
                            <input type="text" class="form-control form-control-sm slide-author-input" value="${author}" data-index="${index}" placeholder="Author Name" />
                        </div>
                        <div class="mb-2">
                            <input type="text" class="form-control form-control-sm slide-title-input" value="${title}" data-index="${index}" placeholder="Author Title" />
                        </div>
                    </div>
                </div>
            `);
            slidesEditor.append(slideCard);
        });
        
        let self = this;
        
        slidesEditor.find('.slide-img').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.swiper-slide').eq(index).find('img').attr('src', this.value);
        });
        
        slidesEditor.find('.slide-quote-input').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.swiper-slide').eq(index).find('.blockquote p, .slide-quote').text(this.value);
        });
        
        slidesEditor.find('.slide-author-input').on('input', function () {
            let index = $(this).data('index');
            let slide = keditor.getSettingComponent().find('.swiper-slide').eq(index);
            let title = slide.find('cite').text();
            slide.find('.blockquote-footer').html(this.value + ', <cite>' + title + '</cite>');
        });
        
        slidesEditor.find('.slide-title-input').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.swiper-slide').eq(index).find('cite').text(this.value);
        });
        
        slidesEditor.find('.btn-remove-slide').on('click', function () {
            let index = $(this).data('index');
            let slides = keditor.getSettingComponent().find('.swiper-slide');
            if (slides.length > 1) {
                slides.eq(index).remove();
                self.initSwiper(keditor.getSettingComponent());
                self.refreshSlidesEditor(form, keditor);
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let swiperEl = component.find('.swiper');
        let delay = swiperEl.attr('data-delay') || '5000';
        form.find('.carousel-delay').val(delay);
        
        form.find('.carousel-pagination').prop('checked', component.find('.swiper-pagination').is(':visible'));
        form.find('.carousel-navigation').prop('checked', component.find('.swiper-button-next').is(':visible'));
        form.find('.carousel-css-class').val(swiperEl.attr('data-custom-class') || '');
        
        this.refreshSlidesEditor(form, keditor);
    }
};
