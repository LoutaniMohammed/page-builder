import $ from 'jquery';
import KEditor from 'keditor';

KEditor.components['googlemap'] = {
    init: function (contentArea, container, component, keditor) {
        let iframe = component.find('iframe');
        let wrapper = iframe.parent();
        keditor.initIframeCover(iframe, wrapper);
    },
    
    settingEnabled: true,
    
    settingTitle: 'Google Map Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(
            '<form class="form-horizontal">' +
            '   <div class="mb-3">' +
            '       <div class="col-sm-12">' +
            '           <button type="button" class="btn w-100 btn-primary btn-googlemap-edit">Update Map</button>' +
            '       </div>' +
            '   </div>' +
            '   <div class="mb-3">' +
            '       <label class="col-sm-12 form-label">Aspect Ratio</label>' +
            '       <div class="col-sm-12">' +
            '           <button type="button" class="btn btn-sm btn-secondary btn-googlemap-169">16:9</button>' +
            '           <button type="button" class="btn btn-sm btn-secondary btn-googlemap-43">4:3</button>' +
            '       </div>' +
            '   </div>' +
            '</form>'
        );
        
        let btnEdit = form.find('.btn-googlemap-edit');
        btnEdit.on('click', function (e) {
            e.preventDefault();
            
            let inputData = prompt('Please enter Google Map embed code in here:');
            let iframe = $(inputData);
            let src = iframe.attr('src');
            if (iframe.length > 0 && src && src.length > 0) {
                keditor.getSettingComponent().find('iframe').attr('src', src);
            } else {
                alert('Your Google Map embed code is invalid!');
            }
        });
        
        let btn169 = form.find('.btn-googlemap-169');
        btn169.on('click', function (e) {
            e.preventDefault();
            
            keditor.getSettingComponent().find('.ratio').removeClass('ratio-4x3').addClass('ratio-16x9');
        });
        
        let btn43 = form.find('.btn-googlemap-43');
        btn43.on('click', function (e) {
            e.preventDefault();
            
            keditor.getSettingComponent().find('.ratio').removeClass('ratio-16x9').addClass('ratio-4x3');
        });
    }
};
