# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2024-12-24

### Added
- Vite 5.4 build system (replaces webpack)
- CKEditor 5 integration (replaces CKEditor 4)
- ES module support (`keditor.es.js`)
- UMD bundle (`keditor.umd.js`)
- Combined build (keditor + all components in single file)

### Changed
- Migrated from webpack to Vite for Node 18+ compatibility
- Upgraded from CKEditor 4.11.4 to CKEditor 5.41.4
- Updated all example files for new dist paths
- Simplified build configuration

### Removed
- webpack.config.js
- .babelrc
- node-sass dependency
- CKEditor 4 dependency
- Separate keditor-components.js file (now included in main bundle)

### Fixed
- Node.js 18+ compatibility (removed node-sass)
- PHP server path resolution for examples
- Debug flag removed from production build
