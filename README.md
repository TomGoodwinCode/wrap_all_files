# Wrap All Files in XML

A Visual Studio Code extension that helps you export code to external LLM programs, it wraps all open files in XML tags and copies the result to your clipboard

## Features

- Wraps all currently open files in XML format
- Includes file name and path information
- Automatically copies the result to your clipboard
- Works with any file type

## Installation

### Option 1: Install from VSIX file

1. Download the `.vsix` file from this repository
2. Open VS Code
3. Go to the Extensions view by clicking the Extensions icon in the Activity Bar or pressing `Cmd+Shift+X` (macOS)
4. Click the "..." (More Actions) button at the top of the Extensions view
5. Select "Install from VSIX..."
6. Browse to the location of the downloaded `.vsix` file and select it
7. Click "Install"


## Usage

1. Open the files you want to wrap in XML
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Type "Wrap All Open Files in XML" and select the command
4. The XML-wrapped content will be copied to your clipboard
5. Paste the content wherever you need it

## Setting Up a Keyboard Shortcut

To create a keyboard shortcut for this extension:

1. Open VS Code
2. Go to File > Preferences > Keyboard Shortcuts (Windows/Linux) or Code > Preferences > Keyboard Shortcuts (macOS)
   - Alternatively, press `Ctrl+K Ctrl+S` (Windows/Linux) or `Cmd+K Cmd+S` (macOS)
3. Click the "+" icon to add a new keyboard shortcut
4. In the search box that appears, type "Wrap All Open Files in XML"
5. Select the command from the dropdown
6. Press the key combination you want to use (e.g., `Ctrl+Alt+W` or `Cmd+Alt+W`)
7. Press Enter to save the shortcut

Now you can use your chosen keyboard shortcut to quickly wrap all open files in XML.

## Example Output

```xml
<files>
<file>
  <name>example.js</name>
  <path>/path/to/file</path>
  <code><![CDATA[
function hello() {
  console.log("Hello, world!");
}
  ]]></code>
</file>
<file>
  <name>styles.css</name>
  <path>/path/to/file</path>
  <code><![CDATA[
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
  ]]></code>
</file>
</files>
```

## Troubleshooting

- **No files are wrapped**: Make sure you have files open in the editor. The extension only processes files that are currently open.
- **Clipboard doesn't contain the XML**: Some clipboard managers or security settings might interfere with the clipboard operation. Try running the command again.

## License

This extension is licensed under the MIT License.
