const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { wrapAllCodeInXml } = require('./wrap_all_code_in_xml');

function activate(context) {

    let disposable = vscode.commands.registerCommand('wrapAllFiles.wrapAllCodeInXml', async function () {
        // Debug information
        console.log('All tab groups:', vscode.window.tabGroups.all);
        
        // Get all open tabs from visible tab groups
        const allTabs = vscode.window.tabGroups.all.flatMap(tabGroup => 
            tabGroup.tabs.filter(tab => {
                // Only include tabs that are:
                // 1. File-based
                // 2. Currently visible in an active group
                // 3. Actually exists on the filesystem
                return tab.input && 
                    tab.input.uri && 
                    tab.input.uri.scheme === 'file' &&
                    tabGroup.isActive && // Make sure the tab group is active
                    fs.existsSync(tab.input.uri.fsPath); // Verify file exists
            })
        );

        
        // Filter for file-based tabs only
        const fileTabs = allTabs.filter(tab => {
        
            return tab.input && 
            tab.input.uri && 
            tab.input.uri.scheme === 'file';
    });
        console.log('File tabs:', fileTabs);
        
        // Map to file paths
        const openTabs = fileTabs.map(tab => {
            console.log('Tab input:', tab.input);
            console.log('Tab URI:', tab.input.uri);
            console.log('Tab path:', tab.input.uri.fsPath);
            return tab.input.uri.fsPath;
        });
        console.log('Open tab paths:', openTabs);
        
        // Show debug information in a notification
        const fileList = openTabs.map(path => {
            // Extract just the filename from the path
            const parts = path.split('/');
            return parts[parts.length - 1];
        }).join(', ');

        if (openTabs.length === 0) {
            vscode.window.showInformationMessage("No open files found to wrap.");
            return;
        }

        // Use the file paths from open tabs
        try {
            // Use our JavaScript function instead of Python
            await wrapAllCodeInXml(openTabs);
            
            // Show appropriate message based on number of files
            if (openTabs.length === 1) {
                vscode.window.showInformationMessage(`Wrapped 1 file with XML and copied to clipboard!`);
            } else {
                vscode.window.showInformationMessage(`Wrapped ${openTabs.length} files with XML and copied to clipboard!`);
            }
        } catch (error) {
            vscode.window.showErrorMessage("Error: " + error.message);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
