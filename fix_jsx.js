const fs = require('fs');
const path = require('path');

const dir = 'react-app/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'Requery.jsx');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // The issue is an extra `</div>` just before `{/*  Script Logic  */}` or `</>` or `<CreateFormModal`
    // Let's use a regex to remove the LAST `</div>` that occurs before `</>` in the return statement.
    // Actually, looking at the errors:
    // `    </div>\n    {/*  Create Form Modal Overlay  */}`
    // `    </div>\n    {/*  Script Logic  */}`
    // Let's replace `</div>\n    {/*  Script Logic` with `\n    {/*  Script Logic`
    content = content.replace(/<\/div>\s*\{\/\*\s*Script Logic/g, '{/* Script Logic');
    
    // For Dashboard.jsx and others that have Create Form Modal Overlay:
    content = content.replace(/<\/div>\s*\{\/\*\s*Create Form/g, '{/* Create Form');
    
    // For files where the extra div is just before `</>`
    content = content.replace(/<\/div>\s*<\/>/g, '</>');
    
    // For templates.jsx:
    content = content.replace(/<\/div>\s*<CreateFormModal/g, '<CreateFormModal');
    
    // Let's just blindly remove the last `</div>` before `</>` if it's there? No, the regexes above should catch it.
    // Let's review the exact errors:
    // Templates.jsx: `    </div>\n\n    </div>\n\n    <CreateFormModal` - Wait, in Templates there are TWO extra divs? No, it says Adjacent JSX elements must be wrapped.
    
    fs.writeFileSync(filePath, content);
});

console.log('Fixed JSX files');
