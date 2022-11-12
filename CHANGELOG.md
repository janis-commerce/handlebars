# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.3] - 2022-11-12
### Fixed
- Handled barcode128 generation errors to be able to pre compile without interrupting the process

## [2.0.2] - 2022-04-18
### Fixed
- Add try/catch in `formatDate` helper to avoid errors

## [2.0.1] - 2022-04-18
### Fixed
- Fix in `formatDate` helper

## [2.0.0] - 2022-04-12
### Changed
- Add the possibility to use a `timezone` in `formatDate` helper
- Change package use in formatDate helper, now use date

### Removed
- Remove unused helpers `ansi` and `markdown`

## [1.1.0] - 2021-11-15
### Added
- New functionality that supports the handling of `QR` and `Barcode128`. [See More](https://github.com/janis-commerce/handlebars/blob/master/docs/preCompile.md)

## [1.0.1] - 2021-09-24
### Fixed
- Fix helper `formatDate`
- Improves in `README.md`

## [1.0.0] - 2021-09-24
### Added
- Project inited
- Custom Helpers