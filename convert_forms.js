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

const html = fs.readFileSync('forms.html', 'utf8');

// Extract the dashboard content (after the nav)
const match = html.match(/<!-- Header Content -->([\s\S]*?)<script>/);
if (match) {
    let content = match[1];
    
    // We need to separate the Create Form Modal from the main content
    const modalMatch = content.match(/{?\/\* Create Form Modal Overlay \*\/}?([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
    let modalHtml = "";
    if (modalMatch) {
       modalHtml = modalMatch[0];
       content = content.replace(modalMatch[0], '');
    }

    content = convertToJSX(content);
    modalHtml = convertToJSX(modalHtml);
    
    // Replace onclick="openCreateFormModal()" with onClick={() => setIsModalOpen(true)}
    content = content.replace(/onClick=\{\(\) => \{\}\}/g, 'onClick={() => setIsModalOpen(true)}');

    const componentStr = `
import React, { useEffect, useState } from 'react';
import { createIcons } from 'lucide';
import gsap from 'gsap';
import CreateFormModal from '../components/CreateFormModal';

export default function Forms() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
`;

    const modalComponentStr = `
import React, { useEffect } from 'react';
import { createIcons } from 'lucide';

export default function CreateFormModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      createIcons();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    ${modalHtml.replace('onClick={() => {}}', 'onClick={(e) => { if(e.target.id === "createFormModalOverlay") onClose(); }}').replace(/onClick=\{\(\) => \{\}\}/, 'onClick={onClose}')}
  );
}
`;
    
    fs.mkdirSync('react-app/src/pages', { recursive: true });
    fs.mkdirSync('react-app/src/components', { recursive: true });
    fs.writeFileSync('react-app/src/pages/Forms.jsx', componentStr);
    fs.writeFileSync('react-app/src/components/CreateFormModal.jsx', modalComponentStr);
    console.log('Forms converted successfully!');
} else {
    console.log('Match not found');
}
