import KEditor from 'keditor';

KEditor.components['youtube'] = {
    init: function (contentArea, container, component, keditor) {
        let iframe = component.find('iframe');
        let wrapper = iframe.parent();
        keditor.initIframeCover(iframe, wrapper);
    },
    
    settingEnabled: true,
    
    settingTitle: 'Youtube Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(
            '<form class="form-horizontal">' +
            '   <div class="mb-3">' +
            '       <div class="col-sm-12">' +
            '           <button type="button" class="btn w-100 btn-primary btn-youtube-edit">Change Video</button>' +
            '       </div>' +
            '   </div>' +
            '   <div class="mb-3">' +
            '       <label class="col-sm-12 form-label">Autoplay</label>' +
            '       <div class="col-sm-12">' +
            '           <input type="checkbox" class="form-check-input" id="youtube-autoplay" />' +
            '       </div>' +
            '   </div>' +
            '   <div class="mb-3">' +
            '       <label class="col-sm-12 form-label">Aspect Ratio</label>' +
            '       <div class="col-sm-12">' +
            '           <button type="button" class="btn btn-sm btn-secondary btn-youtube-169">16:9</button>' +
            '           <button type="button" class="btn btn-sm btn-secondary btn-youtube-43">4:3</button>' +
            '       </div>' +
            '   </div>' +
            '</form>'
        );
        
        let btnEdit = form.find('.btn-youtube-edit');
        btnEdit.on('click', function (e) {
            e.preventDefault();
            
            let inputData = prompt('Please enter Youtube URL in here:');
            let youtubeRegex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'><]+)/;
            let match = inputData.match(youtubeRegex);
            if (match && match[1]) {
                keditor.getSettingComponent().find('iframe').attr('src', 'https://www.youtube.com/embed/' + match[1]);
            } else {
                alert('Your Youtube URL is invalid!');
            }
        });
        
        let btn169 = form.find('.btn-youtube-169');
        btn169.on('click', function (e) {
            e.preventDefault();
            
            keditor.getSettingComponent().find('.ratio').removeClass('ratio-4x3').addClass('ratio-16x9');
        });
        
        let btn43 = form.find('.btn-youtube-43');
        btn43.on('click', function (e) {
            e.preventDefault();
            
            keditor.getSettingComponent().find('.ratio').removeClass('ratio-16x9').addClass('ratio-4x3');
        });
        
        let chkAutoplay = form.find('#youtube-autoplay');
        chkAutoplay.on('click', function () {
            let embedItem = keditor.getSettingComponent().find('iframe');
            let currentUrl = embedItem.attr('src');
            let newUrl = (currentUrl.replace(/(\?.+)+/, '')) + '?autoplay=' + (chkAutoplay.is(':checked') ? 1 : 0);
            embedItem.attr('src', newUrl);
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let embedItem = component.find('iframe');
        let chkAutoplay = form.find('#youtube-autoplay');
        let src = embedItem.attr('src');
        
        chkAutoplay.prop('checked', src.indexOf('autoplay=1') !== -1);
    }
};
