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
                            <option value="3">3 Members per Row</option>
                            <option value="4">4 Members per Row</option>
                            <option value="2">2 Members per Row</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-sm-12 form-label">Card Style</label>
                    <div class="col-sm-12">
                        <select class="form-select team-style">
                            <option value="card">Card with Shadow</option>
                            <option value="simple">Simple</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-sm btn-primary btn-add-member w-100">+ Add Team Member</button>
                    </div>
                </div>
            </form>
        `);
        
        let layoutSelect = form.find('.team-layout');
        layoutSelect.on('change', function () {
            let cols = parseInt(this.value);
            let colClass = cols === 2 ? 'col-12 col-md-6' : (cols === 3 ? 'col-12 col-md-4' : 'col-12 col-md-3');
            keditor.getSettingComponent().find('.team-member').attr('class', 'team-member ' + colClass);
        });
        
        let addBtn = form.find('.btn-add-member');
        addBtn.on('click', function () {
            let teamRow = keditor.getSettingComponent().find('.team-row');
            let colClass = 'col-12 col-md-4';
            teamRow.append(`
                <div class="team-member ${colClass}">
                    <div class="card text-center shadow-sm">
                        <img src="https://placehold.co/150" class="card-img-top rounded-circle mx-auto mt-3" style="width: 100px; height: 100px;" alt="Team Member">
                        <div class="card-body">
                            <h5 class="card-title">Team Member</h5>
                            <p class="card-text text-muted">Role / Position</p>
                            <div class="social-links">
                                <a href="#" class="text-primary me-2"><i class="fa fa-linkedin"></i></a>
                                <a href="#" class="text-info me-2"><i class="fa fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `);
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
    }
};

