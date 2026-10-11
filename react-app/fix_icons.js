const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace createIcons import
    content = content.replace(/import \{ createIcons \} from 'lucide';/g, "import LucideIcon from '../components/LucideIcon';");
    content = content.replace(/createIcons\(\);/g, "");

    // Replace <i data-lucide="name" ...></i>
    content = content.replace(/<i\s+data-lucide="([^"]+)"([^>]*)>(.*?)<\/i>/g, (match, name, rest) => {
        return `<LucideIcon name="${name}"${rest} />`;
    });
    // Self-closing
    content = content.replace(/<i\s+data-lucide="([^"]+)"([^>]*)\/>/g, (match, name, rest) => {
        return `<LucideIcon name="${name}"${rest} />`;
    });

    fs.writeFileSync(filePath, content);
});

console.log("Fixed pages.");
