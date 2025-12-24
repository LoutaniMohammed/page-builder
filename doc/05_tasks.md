# KEditor Implementation Tasks

This file lists all tasks required to implement the solutions from the documentation.
- **(NO)** = Not implemented yet
- **(DONE)** = Completed

---

## 6. Bootstrap 5 Migration

### Update External Dependencies
- [ ] Download Bootstrap 5.3.x CSS and JS **(NO)**
- [ ] Create `examples/plugins/bootstrap-5.3.3/` folder **(NO)**
- [ ] Add Bootstrap Icons (optional, replaces Font Awesome) **(NO)**

### Update Example HTML Files
- [ ] Update `examples/basic_with_blank_content.html` - Bootstrap 5 paths **(NO)**
- [ ] Update `examples/basic_with_content.html` **(NO)**
- [ ] Update `examples/custom_size.html` **(NO)**
- [ ] Update `examples/extra_settings.html` **(NO)**
- [ ] Update `examples/index.html` **(NO)**
- [ ] Update `examples/multi_content_area.html` **(NO)**
- [ ] Update `examples/settings_for_container.html` **(NO)**
- [ ] Update `examples/support_touch_device.html` **(NO)**

### Update Snippets HTML
- [ ] Update `snippets/snippets.html` - Bootstrap 5 grid classes **(NO)**
- [ ] Update container snippets with Bootstrap 5 structure **(NO)**
- [ ] Update component snippets with Bootstrap 5 classes **(NO)**

### Update KEditor Defaults
- [ ] Update `src/keditor/constants/defaults.js` - Bootstrap 5 grid config **(NO)**
- [ ] Change col-sm-* default classes to Bootstrap 5 format **(NO)**
- [ ] Update container/row structure for Bootstrap 5 **(NO)**

### Update Components
- [ ] Update `keditor-component-audio.js` - Bootstrap 5 classes **(NO)**
- [ ] Update `keditor-component-form.js` - Bootstrap 5 form classes **(NO)**
- [ ] Update `keditor-component-googlemap.js` **(NO)**
- [ ] Update `keditor-component-photo.js` - responsive images **(NO)**
- [ ] Update `keditor-component-video.js` - ratio classes **(NO)**
- [ ] Update `keditor-component-vimeo.js` - ratio classes **(NO)**
- [ ] Update `keditor-component-youtube.js` - ratio classes **(NO)**

### Bootstrap 5 Breaking Changes to Handle
- [ ] Update `data-toggle` to `data-bs-toggle` **(NO)**
- [ ] Update `data-target` to `data-bs-target` **(NO)**
- [ ] Update `data-dismiss` to `data-bs-dismiss` **(NO)**
- [ ] Remove jQuery dependency from Bootstrap (uses Popper) **(NO)**
- [ ] Update form classes (`form-group` → `mb-3`, etc.) **(NO)**
- [ ] Update button classes (if any) **(NO)**
- [ ] Update responsive embed → ratio classes **(NO)**

### Add New Bootstrap 5 Components (Optional)
- [ ] Create accordion component snippet **(NO)**
- [ ] Create card component snippet **(NO)**
- [ ] Create modal component snippet **(NO)**
- [ ] Create tabs component snippet **(NO)**
- [ ] Create carousel component snippet **(NO)**
- [ ] Create offcanvas component snippet **(NO)**

### Testing
- [ ] Test all examples load correctly **(NO)**
- [ ] Test grid system works **(NO)**
- [ ] Test responsive breakpoints **(NO)**
- [ ] Test all components render correctly **(NO)**
- [ ] Test drag and drop still works **(NO)**

### Cleanup
- [ ] Remove old Bootstrap 3.4.1 folder (optional) **(NO)**
- [ ] Update documentation **(NO)**

---

## Previous Completed Tasks

### ✅ Vite Migration - Complete
### ✅ CKEditor 5 Update - Complete  
### ✅ Example Updates - Complete
### ✅ Release v0.1.0 - Complete

---

## Summary

| Section | Status |
|---------|--------|
| 6. Bootstrap 5 Migration | ⏳ Pending |
| Previous Tasks | ✅ Complete |
