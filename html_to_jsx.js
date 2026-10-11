const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const pagesDir = path.join(__dirname, 'react-app', 'src', 'pages');
const compDir = path.join(__dirname, 'react-app', 'src', 'components');

if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function convertStyleStringToObject(styleStr) {
    if (!styleStr) return "{}";
    const rules = styleStr.split(';').filter(r => r.trim() !== '');
    const objProps = rules.map(rule => {
        const parts = rule.split(':');
        if (parts.length < 2) return '';
        const key = kebabToCamel(parts[0].trim());
        const val = parts.slice(1).join(':').trim().replace(/"/g, "'");
        return `"${key}": "${val}"`;
    }).filter(p => p !== '');
    return `{${objProps.join(', ')}}`;
}

// Convert HTML to JSX string
function htmlToJsx(html) {
    // Basic replacements
    let jsx = html
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/onclick=/g, 'onClick=')
        .replace(/onchange=/g, 'onChange=')
        .replace(/onsubmit=/g, 'onSubmit=')
        .replace(/tabindex=/g, 'tabIndex=')
        .replace(/readonly/g, 'readOnly')
        .replace(/colspan=/g, 'colSpan=')
        .replace(/rowspan=/g, 'rowSpan=');

    // Self close tags
    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    voidElements.forEach(tag => {
        const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
        jsx = jsx.replace(regex, `<${tag}$1 />`);
    });
    
    // Sometimes input is already self closed, the above regex (?<!/)> ensures we don't double close if it ends with />
    // But what if it ends with " "? Let's just fix it simply:
    // Regex for unclosed void tags:
    voidElements.forEach(tag => {
        const regex = new RegExp(`<${tag}\\b([^>]*?)(?<!/)>`, 'gi');
        jsx = jsx.replace(regex, `<${tag}$1 />`);
    });

    // Fix style strings
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
        return `style={${convertStyleStringToObject(styleStr)}}`;
    });

    return jsx;
}

function processFile(filename, isLayout = false) {
    const htmlPath = path.join(__dirname, filename);
    if (!fs.existsSync(htmlPath)) return;
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    
    // Extract main content container
    // Some pages have .main-content, some .applications-layout, some .profile-container, etc.
    let container = document.querySelector('.main-content') || 
                    document.querySelector('.applications-layout') ||
                    document.querySelector('.profile-container') ||
                    document.querySelector('.settings-container');
                    
    if (!container) {
        // Fallback: take everything inside .main-wrapper except header
        const mainWrapper = document.querySelector('.main-wrapper');
        if (mainWrapper) {
            const clone = mainWrapper.cloneNode(true);
            const header = clone.querySelector('header');
            if (header) header.remove();
            container = clone;
        } else {
            container = document.querySelector('body');
        }
    }

    // Lucide Icons conversion
    const icons = new Set();
    const iconEls = container.querySelectorAll('i[data-lucide]');
    iconEls.forEach(el => {
        const iconName = el.getAttribute('data-lucide');
        const compName = iconName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
        icons.add(compName);
        
        // Convert to React component
        const iconComp = document.createElement(compName);
        if (el.getAttribute('style')) iconComp.setAttribute('style', el.getAttribute('style'));
        if (el.getAttribute('class')) iconComp.setAttribute('class', el.getAttribute('class'));
        
        el.replaceWith(iconComp);
    });

    // Generate JSX
    const innerHTML = container.innerHTML;
    let jsx = htmlToJsx(innerHTML);
    
    // React doesn't like custom tags like <CheckCircle> directly inside HTML string, JS DOM will lowerCase them.
    // So we need to fix the case of the icon components.
    icons.forEach(comp => {
        const lower = comp.toLowerCase();
        jsx = jsx.replace(new RegExp(`<${lower}`, 'g'), `<${comp}`);
        jsx = jsx.replace(new RegExp(`</${lower}>`, 'g'), `</${comp}>`);
    });

    // Component Name
    let componentName = filename.replace('.html', '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    if (componentName === 'Index') componentName = 'Dashboard';

    const importIcons = icons.size > 0 ? `import { ${Array.from(icons).join(', ')} } from 'lucide-react';\n` : '';

    const componentCode = `import React from 'react';\n${importIcons}\nexport default function ${componentName}() {\n  return (\n    <div className="page-container">\n      ${jsx}\n    </div>\n  );\n}\n`;
    
    fs.writeFileSync(path.join(pagesDir, `${componentName}.jsx`), componentCode);
    console.log(`Generated ${componentName}.jsx`);
}

// Pages to process
const pages = [
    'index.html',
    'forms.html',
    'completed-applications.html',
    'incomplete-applications.html',
    'requery.html',
    'announcements.html',
    'result.html',
    'settings.html',
    'candidate-dashboard.html',
    'applicant-profile.html',
    'view-form.html',
    'templates.html',
    'exam-slip.html'
];

pages.forEach(p => processFile(p));

// Also generate Layout.jsx from index.html
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const indexDom = new JSDOM(indexContent);
const doc = indexDom.window.document;
const sidebar = doc.querySelector('.sidebar');
const header = doc.querySelector('header');

let layoutHtml = '';
const layoutIcons = new Set();
[sidebar, header].forEach(el => {
    if (!el) return;
    const iconEls = el.querySelectorAll('i[data-lucide]');
    iconEls.forEach(iconEl => {
        const iconName = iconEl.getAttribute('data-lucide');
        const compName = iconName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
        layoutIcons.add(compName);
        const iconComp = doc.createElement(compName);
        if (iconEl.getAttribute('style')) iconComp.setAttribute('style', iconEl.getAttribute('style'));
        if (iconEl.getAttribute('class')) iconComp.setAttribute('class', iconEl.getAttribute('class'));
        iconEl.replaceWith(iconComp);
    });
});

let sidebarJsx = sidebar ? htmlToJsx(sidebar.outerHTML) : '';
let headerJsx = header ? htmlToJsx(header.outerHTML) : '';

layoutIcons.forEach(comp => {
    const lower = comp.toLowerCase();
    sidebarJsx = sidebarJsx.replace(new RegExp(`<${lower}`, 'g'), `<${comp}`);
    sidebarJsx = sidebarJsx.replace(new RegExp(`</${lower}>`, 'g'), `</${comp}>`);
    headerJsx = headerJsx.replace(new RegExp(`<${lower}`, 'g'), `<${comp}`);
    headerJsx = headerJsx.replace(new RegExp(`</${lower}>`, 'g'), `</${comp}>`);
});

const layoutImportIcons = layoutIcons.size > 0 ? `import { ${Array.from(layoutIcons).join(', ')} } from 'lucide-react';\n` : '';

const layoutCode = `import React from 'react';\nimport { Outlet, Link, useLocation } from 'react-router-dom';\n${layoutImportIcons}\nexport default function Layout() {\n  const location = useLocation();\n  // Active path logic can be added here\n  return (\n    <div className="app-container">\n      ${sidebarJsx}\n      <div className="main-wrapper">\n        ${headerJsx}\n        <Outlet />\n      </div>\n    </div>\n  );\n}\n`;

// Fix links in layout
let finalLayoutCode = layoutCode.replace(/href="([^"]+)"/g, (match, url) => {
    if (url.endsWith('.html')) {
        let route = url.replace('.html', '');
        if (route === 'index') route = '/';
        else route = '/' + route;
        return `to="${route}"`;
    }
    return match;
});
finalLayoutCode = finalLayoutCode.replace(/<a /g, '<Link ').replace(/<\/a>/g, '</Link>');

fs.writeFileSync(path.join(compDir, 'Layout.jsx'), finalLayoutCode);
console.log('Generated Layout.jsx');
