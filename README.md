# Auto Fold Imports

## Description

Auto Fold Imports is a Visual Studio Code extension designed to automatically fold import statements in JSX and TSX files. This helps to keep your code clean and organized by hiding the clutter of import statements, allowing you to focus on the main logic of your code.

## Features

- **Auto Fold on Start or Open**: Automatically folds import statements when a file is opened or the extension is activated.
- **Auto Fold on Save**: Automatically folds import statements when a file is saved.
- **Auto Fold on Editor Change**: Automatically folds import statements when you switch between editors.
- **Manual Fold Command**: Provides a command to manually fold import statements at any time.

## Configuration

The extension provides several configuration options to control its behavior:

- `autofoldImports.onStartOrOpen`: (Default: `true`) Automatically fold imports on start or open.
- `autofoldImports.onSave`: (Default: `false`) Automatically fold imports on save.
- `autofoldImports.onEditorChange`: (Default: `true`) Automatically fold imports on editor change.

## Usage

1. **Auto Fold on Start or Open**: When enabled, this feature will automatically fold import statements when you open a file or when the extension is activated. This is controlled by the `autofoldImports.onStartOrOpen` configuration.

2. **Auto Fold on Save**: When enabled, this feature will automatically fold import statements every time you save a file. This is controlled by the `autofoldImports.onSave` configuration.

3. **Auto Fold on Editor Change**: When enabled, this feature will automatically fold import statements whenever you switch between editors. This is controlled by the `autofoldImports.onEditorChange` configuration.

4. **Manual Fold Command**: You can manually fold import statements at any time by executing the command `Collapse Imports` from the Command Palette (`Ctrl+Shift+P`).

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `Auto Fold Imports`.
4. Click on the `Install` button.

## Contribution

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request on [GitHub](https://github.com/adriandrs/auto-fold-imports).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Developed by [Adrian Santelis](https://github.com/adriandrs).
