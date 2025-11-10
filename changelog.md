# Changelog

## Version 1.2.1 - 2025-11-10

### Added
- **Load from GitHub URL**: Users can now load quizzes directly from a GitHub repository URL.
- **Recommended Quizzes**: A new section on the initial screen provides quick access to a predefined list of recommended quizzes.
- **Dynamic Quiz Listing**: When a GitHub directory URL is loaded, a list of available `.json` quiz files is displayed.

### Changed
- **Unified Input Field**: The text area for pasting JSON and the input for GitHub URLs have been combined into a single "universal" input field.
- **UI Refinements**: The initial setup screen has been reorganized to accommodate the new loading options.

## Version 1.2.0 - 2025-11-10

### Added
- **Mobile-Friendly Design**: Implemented responsive layout for optimal viewing on mobile devices.
- **Animated Progress Bar**: Progress bar now slides up/down with animation on mobile.
- **Hide/Show Progress Button**: Added a floating arrow button on mobile to toggle progress bar visibility.
- **Beautified Initial Page**: Redesigned the quiz loading screen with a modern aesthetic, new font, and improved layout.

### Changed
- **Progress Bar Positioning**: On mobile, the progress bar is now fixed at the bottom of the screen.
- **Font Consistency**: Answer option buttons now use the 'Poppins' font for a unified look.
- **UI/UX Refinements**:
    - Fixed `TypeError` by ensuring DOM elements are loaded before script execution.
    - Ensured file input element is completely hidden.
    - Corrected "Click to Upload" button placement on desktop.
    - Removed all code comments for a cleaner codebase.

## Version 1.1.0 - 2025-11-10

### Added
- **Application Version Display**: The current version number is now displayed in the bottom right corner of the screen.
- **Delayed Feedback Mode**: New option to hide answer correctness until the entire quiz is submitted.
- **Question Flagging**: Users can now flag questions for later review using a '🚩' button.
- **Submit All Button**: In delayed feedback mode, a "Submit All" button appears to finalize the quiz.
- **Enhanced Navigation**: The vertical progress bar now allows jumping to any question during the quiz.
- **Answered Question Indicator**: The progress bar now visually indicates which questions have been answered in delayed feedback mode.
- **Incomplete Quiz Confirmation**: A confirmation prompt appears if the user tries to submit an incomplete quiz.
- **File Upload Button**: Added a "Click to Upload" button as an alternative to drag-and-drop.

### Changed
- **Consistent Answer Shuffling**: Answer choices are now shuffled only once at the beginning of the quiz.
- **UI/UX Improvements**:
    - Optimized progress bar updates for smoother navigation.
    - Selected answers are no longer hoverable.
    - The flag button now uses emojis for a more compact design.

## Version 1.0.1 - 2025-11-08

### Added
- Implemented toggleable checkboxes for shuffling question order and answer choices.
- Added a visual indicator (red styling) for incorrect answer selections.
- Displayed the name of the loaded JSON file below the quiz title.
- Enabled drag and drop of new JSON files anytime, allowing quizzes to be loaded without page reload.

### Changed
- Expanded the drag-and-drop region to cover the entire page for improved usability.
- Set 'Shuffle Choices' to be enabled by default.
- Modified question counter and progress bar to display sequential question numbers (1, 2, 3...) when questions are shuffled.
- Ensured detailed results are displayed in the order questions were answered.

## Version 1.0.0 - 2025-11-05

- Initial release of the Quiz App.
- Features include loading quizzes from JSON files, a vertical progress bar, question navigation, and results summary with download option.