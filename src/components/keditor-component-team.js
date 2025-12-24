import KEditor from 'keditor';

KEditor.components['team'] = {
    settingEnabled: true,
    
    settingTitle: 'Team Member Settings',
    
    initSettingForm: function (form, keditor) {
        form.append(`
            <form class="form-horizontal">
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Layout</label>
                    <div class="col-sm-12">
                        <select class="form-select team-layout">
                            <option value="3">3 per Row</option>
                            <option value="4">4 per Row</option>
                            <option value="2">2 per Row</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Team Members</label>
                    <div class="col-sm-12">
                        <div class="team-members-editor"></div>
                        <button type="button" class="btn btn-sm btn-primary btn-add-member w-100 mt-2">+ Add Member</button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Custom CSS Class</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control team-css-class" placeholder="e.g. my-custom-team" />
                    </div>
                </div>
            </form>
        `);
        
        let self = this;
        
        let layoutSelect = form.find('.team-layout');
        layoutSelect.on('change', function () {
            let cols = parseInt(this.value);
            let colClass = cols === 2 ? 'col-12 col-md-6' : (cols === 3 ? 'col-12 col-md-4' : 'col-12 col-md-3');
            keditor.getSettingComponent().find('.team-member').each(function() {
                $(this).attr('class', 'team-member ' + colClass);
            });
        });
        
        let addMemberBtn = form.find('.btn-add-member');
        addMemberBtn.on('click', function () {
            let teamRow = keditor.getSettingComponent().find('.team-row');
            let colClass = 'col-12 col-md-4';
            teamRow.append(`
                <div class="team-member ${colClass}">
                    <div class="card text-center shadow-sm">
                        <img src="https://placehold.co/150" class="card-img-top rounded-circle mx-auto mt-3" style="width: 100px; height: 100px;" alt="Team Member">
                        <div class="card-body">
                            <h5 class="card-title member-name">New Member</h5>
                            <p class="card-text text-muted member-role">Role / Position</p>
                            <div class="social-links"></div>
                        </div>
                    </div>
                </div>
            `);
            self.refreshMembersEditor(form, keditor);
        });
        
        let cssClassInput = form.find('.team-css-class');
        cssClassInput.on('input', function () {
            let row = keditor.getSettingComponent().find('.team-row');
            let customClass = row.attr('data-custom-class') || '';
            if (customClass) row.removeClass(customClass);
            row.attr('data-custom-class', this.value);
            row.addClass(this.value);
        });
    },
    
    refreshMembersEditor: function (form, keditor) {
        let membersEditor = form.find('.team-members-editor');
        membersEditor.empty();
        
        keditor.getSettingComponent().find('.team-member').each(function (index) {
            let member = $(this);
            let name = member.find('.card-title, .member-name').text();
            let role = member.find('.card-text, .member-role').text();
            let imgSrc = member.find('img').attr('src');
            
            let memberCard = $(`
                <div class="card mb-2" data-index="${index}">
                    <div class="card-header p-2 d-flex justify-content-between align-items-center">
                        <span>Member ${index + 1}: ${name}</span>
                        <button type="button" class="btn btn-sm btn-outline-danger btn-remove-member" data-index="${index}">×</button>
                    </div>
                    <div class="card-body p-2">
                        <div class="mb-2">
                            <label class="form-label form-label-sm">Photo URL</label>
                            <input type="text" class="form-control form-control-sm member-img" value="${imgSrc}" data-index="${index}" placeholder="Image URL" />
                        </div>
                        <div class="mb-2">
                            <label class="form-label form-label-sm">Name</label>
                            <input type="text" class="form-control form-control-sm member-name-input" value="${name}" data-index="${index}" placeholder="Name" />
                        </div>
                        <div class="mb-2">
                            <label class="form-label form-label-sm">Role / Position</label>
                            <input type="text" class="form-control form-control-sm member-role-input" value="${role}" data-index="${index}" placeholder="Role" />
                        </div>
                    </div>
                </div>
            `);
            membersEditor.append(memberCard);
        });
        
        membersEditor.find('.member-img').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.team-member').eq(index).find('img').attr('src', this.value);
        });
        
        membersEditor.find('.member-name-input').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.team-member').eq(index).find('.card-title, .member-name').text(this.value);
        });
        
        membersEditor.find('.member-role-input').on('input', function () {
            let index = $(this).data('index');
            keditor.getSettingComponent().find('.team-member').eq(index).find('.card-text, .member-role').text(this.value);
        });
        
        membersEditor.find('.btn-remove-member').on('click', function () {
            let index = $(this).data('index');
            let members = keditor.getSettingComponent().find('.team-member');
            if (members.length > 1) {
                members.eq(index).remove();
                let self = KEditor.components['team'];
                self.refreshMembersEditor(form, keditor);
            }
        });
    },
    
    showSettingForm: function (form, component, keditor) {
        let members = component.find('.team-member');
        if (members.first().hasClass('col-md-6')) {
            form.find('.team-layout').val('2');
        } else if (members.first().hasClass('col-md-3')) {
            form.find('.team-layout').val('4');
        } else {
            form.find('.team-layout').val('3');
        }
        
        form.find('.team-css-class').val(component.find('.team-row').attr('data-custom-class') || '');
        
        this.refreshMembersEditor(form, keditor);
    }
};
