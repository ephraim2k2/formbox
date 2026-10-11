const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = '/Users/mac/Desktop/formboxx';
const cssOutPath = path.join(rootDir, 'react-app/src/pages.css');

const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let combinedCSS = '';

htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content);
    
    $('style').each((i, el) => {
        combinedCSS += `\n/* --- Styles from ${file} --- */\n`;
        combinedCSS += $(el).html();
    });
});

fs.writeFileSync(cssOutPath, combinedCSS);
console.log('Extracted all inline styles to pages.css');
