# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2024-12-24

### Added
- Bootstrap 5.3.3 integration (replaces Bootstrap 3.4.1)
- 5-column and 6-column responsive grid layout snippets
- Responsive grid classes (col-12 col-md-*) for mobile-first design

### Changed
- Upgraded from Bootstrap 3.4.1 to Bootstrap 5.3.3
- All components updated with Bootstrap 5 classes:
  - `form-group` → `mb-3`
  - `form-control` → `form-select` (for dropdowns)
  - `btn-block` → `w-100`
  - `help-block` → `form-text`
  - `control-label` → `form-label`
  - `col-sm-offset-*` → `offset-sm-*`
  - `embed-responsive` → `ratio`
  - `img-responsive` → `img-fluid`
  - `img-circle` → `rounded-circle`
  - `btn-default` → `btn-secondary`
- Container snippets now use responsive grid (col-12 col-md-*)
- All images in snippets now have `img-fluid` class

---

## [0.1.0] - 2024-12-24

### Added
- Vite 5.4 build system (replaces webpack)
- CKEditor 5 integration (replaces CKEditor 4)
- ES module support (`keditor.es.js`)
- UMD bundle (`keditor.umd.js`)

### Changed
- Migrated from webpack to Vite for Node 18+ compatibility
- Upgraded from CKEditor 4.11.4 to CKEditor 5.41.4

### Removed
- webpack.config.js, .babelrc
- node-sass dependency
- CKEditor 4 dependency
