# Drama - Queen

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Improve synchronization performance : for download step, the list of interrogations is now retrieved from local storage (given by the parent app). If there is nothing in local storage, we keep the old implementation using api.
- Improve synchronization performance : for upload step, we now upload only interrogations that have been locally updated since it was last sent to the server.

## [3.3.2](https://github.com/InseeFr/Drama-Queen/releases/tag/3.3.2) - 2026-04-14

### Fixed

- Pairwise: do not display error when person is empty. Fixed by Luantic 3.13.4

## [3.3.1](https://github.com/InseeFr/Drama-Queen/releases/tag/3.3.1) - 2026-04-13

### Fixed

- Visualize route are now handle correctly all query params.
- Suggester synonyms now handle uppercase. Fixed by Lunatic 3.12.1.
- Suggester synonyms now sort correctly the results. Fixed by Lunatic 3.12.2.
- In dropdown selection, the options id is not longer displayed. Only the label is now displayed. Fixed by Lunatic 3.12.3.
- Cleaning is now working correctly for questions in loop with a list of responses options based on a variable. Fixed by Lunatic 3.13.0.
- Cleaning variables from options based on a variable. Fixed by Lunatic 3.13.1 & 3.13.3.

## [3.3.0](https://github.com/InseeFr/Drama-Queen/releases/tag/3.3.0) - 2026-02-26

### Added

- Radio, Dropdown and CheckboxOne can now have options based on a variable. Added by Lunatic 3.12.0.
- Enable Pairwise component to be paginated in a loop. Added by Lunatic 3.12.0.

## [3.2.4](https://github.com/InseeFr/Drama-Queen/releases/tag/3.2.4) - 2026-02-26

### Fixed

- Continue button is no more disabled when entering a rondabout iteration after triggering blocking controls.

## [3.2.3](https://github.com/InseeFr/Drama-Queen/releases/tag/3.2.3) - 2026-02-20

### Changed

- Upgraded React version to 19.
- Migrate routing to tanstack-router.
