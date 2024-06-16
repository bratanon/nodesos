# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] Unreleased
### Added
- .`nvmrc` file.
- Enforce node 20+.

### Changed
- Dependabot uses node version from `.nvmrc`.
- Dependabot updates GitHub actions.

### Fixed
- Test to work with node 20+

## [1.0.2] 2023-12-16

### Fixed
- More clear log messages for the base unit.
- Events should be assigned before calling the handler.
- Client `close()` now resolves immediately if the socket already is closed.
