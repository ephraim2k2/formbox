const fs = require('fs');

function convertToJSX(html) {
    let jsx = html;
    
    // Convert class to className
    jsx = jsx.replace(/class=/g, 'className=');
    
    // Convert for to htmlFor
    jsx = jsx.replace(/for=/g, 'htmlFor=');
    
    // Convert style="string" to style={{}}
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
        const styles = styleString.split(';').filter(s => s.trim());
        const styleObj = {};
        styles.forEach(s => {
            const [key, value] = s.split(':').map(str => str.trim());
            if (key && value) {
                const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
                styleObj[camelKey] = value;
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });
    
    // Convert SVG attributes
    jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
    jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
    jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    
    // Convert void elements (close them)
    jsx = jsx.replace(/<(input|img|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
    
    // Remove onclicks
    jsx = jsx.replace(/onclick="[^"]*"/g, 'onClick={() => {}}');
    
    // Convert HTML comments to JSX comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    
    return jsx;
}

const html = fs.readFileSync('completed-applications.html', 'utf8');

const match = html.match(/<!-- Header Content -->([\s\S]*?)<script>/);
if (match) {
    let content = match[1];
    
    content = convertToJSX(content);

    const componentStr = `
import React, { useEffect } from 'react';
import { createIcons } from 'lucide';
import gsap from 'gsap';

export default function CompletedApplications() {
  useEffect(() => {
    createIcons();
    
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.filter-bar', { y: 20, opacity: 0 });
    gsap.set('.table-wrapper', { y: 30, opacity: 0 });

    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.filter-bar', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.table-wrapper', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
  }, []);

  return (
    <>
      ${content}
    </>
  );
}
`;

    fs.mkdirSync('react-app/src/pages', { recursive: true });
    fs.writeFileSync('react-app/src/pages/CompletedApplications.jsx', componentStr);
    console.log('CompletedApplications converted successfully!');
} else {
    console.log('Match not found');
}
