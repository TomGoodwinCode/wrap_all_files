const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

/**
 * Wraps the content of all provided files in XML format
 * @param {string[]} filePaths - Array of file paths to process
 * @returns {Promise<string>} - The final XML content
 */
async function wrapAllCodeInXml(filePaths) {
    const xmlBlocks = [];
    
    for (const filePath of filePaths) {
        if (!fs.existsSync(filePath)) {
            console.warn(`Warning: File not found: ${filePath}`);
            continue;
        }
        
        try {
            // Read file content
            const code = fs.readFileSync(filePath, 'utf-8');
            const fileName = path.basename(filePath);
            const directory = path.dirname(filePath);
            
            // Wrap this file's contents in an XML block
            const fileXml = `<file>
  <name>${fileName}</name>
  <path>${directory}</path>
  <code><![CDATA[
${code}
  ]]></code>
</file>`;
            
            xmlBlocks.push(fileXml);
        } catch (error) {
            console.error(`Error processing file ${filePath}: ${error.message}`);
        }
    }
    
    // Join all file blocks together under a root tag
    const finalXml = "<files>\n" + xmlBlocks.join("\n") + "\n</files>";
    
    // Copy the XML output to the clipboard
    try {
        await vscode.env.clipboard.writeText(finalXml);
        console.log("XML-wrapped code for all open files has been copied to the clipboard!");
    } catch (error) {
        console.error(`Error copying to clipboard: ${error.message}`);
    }
    
    // Also output to console for debugging
    console.log(finalXml);
    
    return finalXml;
}

module.exports = { wrapAllCodeInXml };
