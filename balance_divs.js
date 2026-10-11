const fs = require('fs');
const path = require('path');

const dir = 'react-app/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if it's already perfectly parsed by Vite, but we know it's failing.
    // Instead of doing it blind, let's just count <div and </div!
    
    // We only care about the content inside `return (\n    <>\n` and `\n    </>\n  );`
    const match = content.match(/return \(\s*<>\s*([\s\S]*?)\s*<\/>\s*\);/);
    if (!match) return;
    
    let innerJSX = match[1];
    
    // Remove inline Modals and inline Toast containers to clean up
    // Remove Toast Container
    innerJSX = innerJSX.replace(/\{\/\*  Toast Container  \*\/\}([\s\S]*?)<div className="toast-container".*?<\/div>/g, '');
    innerJSX = innerJSX.replace(/<div className="toast-container".*?<\/div>/g, '');
    
    // Remove Modals (CreateFormModal, AddVenueModal, SlipModal) which might be unmatched
    innerJSX = innerJSX.replace(/\{\/\*\s*(Create Form|Add Venue|Slip) Modal.*?\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi, '');
    innerJSX = innerJSX.replace(/\{\/\*\s*(Create Form|Add Venue|Slip) Modal.*?\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
    innerJSX = innerJSX.replace(/\{\/\*\s*(Create Form|Add Venue|Slip) Modal.*?\*\/\}[\s\S]*?<\/div>\s*<\/div>/gi, '');
    
    // Count <div and </div in innerJSX
    // Regex for opening tags: /<div(\s|>)/gi
    // Regex for closing tags: /<\/div>/gi
    
    // Remove React comments for counting
    const pureJSX = innerJSX.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    
    let openCount = (pureJSX.match(/<div(\s|>)/gi) || []).length;
    let closeCount = (pureJSX.match(/<\/div>/gi) || []).length;
    
    // If not balanced, append or remove </div> at the very end of innerJSX (before any React Component appends like CreateFormModal)
    // Wait, CreateFormModal is a component `<CreateFormModal />`, not a div.
    
    if (openCount > closeCount) {
        const diff = openCount - closeCount;
        const divsToAppend = '\n</div>'.repeat(diff);
        
        // Append before {/* Script Logic */} if it exists
        if (innerJSX.includes('{/*  Script Logic  */}')) {
            innerJSX = innerJSX.replace(/\{\/\*\s*Script Logic\s*\*\/\}/, divsToAppend + '\n{/* Script Logic */}');
        } else {
            innerJSX += divsToAppend;
        }
    } else if (closeCount > openCount) {
        let diff = closeCount - openCount;
        // Remove trailing </div> from innerJSX
        while (diff > 0) {
            const lastDivIdx = innerJSX.lastIndexOf('</div>');
            if (lastDivIdx !== -1) {
                innerJSX = innerJSX.substring(0, lastDivIdx) + innerJSX.substring(lastDivIdx + 6);
            }
            diff--;
        }
    }
    
    // Put back the innerJSX
    const newContent = content.substring(0, match.index) + 'return (\n    <>\n' + innerJSX + '\n    </>\n  );' + content.substring(match.index + match[0].length);
    
    fs.writeFileSync(filePath, newContent);
    console.log(`Balanced ${file}: +${openCount} -${closeCount}`);
});
