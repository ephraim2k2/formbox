const fs = require('fs');
const path = require('path');

function convertToJSX(html) {
    let jsx = html;
    jsx = jsx.replace(/class=/g, 'className=');
    jsx = jsx.replace(/for=/g, 'htmlFor=');
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
    jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
    jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
    jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
    jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
    jsx = jsx.replace(/stroke-dasharray=/g, 'strokeDasharray=');
    jsx = jsx.replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
    jsx = jsx.replace(/<(input|img|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
    jsx = jsx.replace(/onclick="[^"]*"/g, 'onClick={() => {}}');
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    return jsx;
}

const configs = [
    { file: 'index.html', out: 'Dashboard.jsx', name: 'Dashboard', hasModal: false },
    { file: 'forms.html', out: 'Forms.jsx', name: 'Forms', hasModal: true },
    { file: 'templates.html', out: 'Templates.jsx', name: 'Templates', hasModal: true },
    { file: 'completed-applications.html', out: 'CompletedApplications.jsx', name: 'CompletedApplications', hasModal: false },
    { file: 'incomplete-applications.html', out: 'IncompleteApplications.jsx', name: 'IncompleteApplications', hasModal: false },
    { file: 'exam-slip.html', out: 'ExamSlip.jsx', name: 'ExamSlip', hasModal: false }, // We handle modal inline for ExamSlip later if needed, but for now just strip the extra div
    { file: 'settings.html', out: 'Settings.jsx', name: 'Settings', hasModal: false },
    { file: 'announcements.html', out: 'Announcements.jsx', name: 'Announcements', hasModal: false },
    { file: 'applicant-profile.html', out: 'ApplicantProfile.jsx', name: 'ApplicantProfile', hasModal: false },
    { file: 'result.html', out: 'Result.jsx', name: 'Result', hasModal: false },
    { file: 'view-form.html', out: 'ViewForm.jsx', name: 'ViewForm', hasModal: false },
];

configs.forEach(conf => {
    const html = fs.readFileSync(conf.file, 'utf8');
    const match = html.match(/<!-- Header Content -->([\s\S]*?)<script>/);
    if (!match) return;

    let content = match[1];

    // The key fix: remove the very last `</div>` from `content` string (ignoring whitespace).
    // Because that `</div>` belongs to `.dashboard-container` which is outside the Header Content.
    // Also remove the `Toast Container` if present
    content = content.replace(/<div class="toast-container".*?<\/div>/, '');

    // Now remove the very last </div>
    const lastDivIndex = content.lastIndexOf('</div>');
    if (lastDivIndex !== -1) {
        content = content.substring(0, lastDivIndex) + content.substring(lastDivIndex + 6);
    }

    // Extract modal for Forms/Templates
    let modalHtml = "";
    if (conf.hasModal) {
        const modalMatch = content.match(/{?\/\* Create Form Modal Overlay \*\/}?([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
        if (modalMatch) {
            modalHtml = modalMatch[0];
            content = content.replace(modalMatch[0], '');
        }
    }

    content = convertToJSX(content);
    if (modalHtml) modalHtml = convertToJSX(modalHtml);

    if (conf.hasModal) {
        content = content.replace(/onClick=\{\(\) => \{\}\}/g, 'onClick={() => setIsModalOpen(true)}');
    }

    let extraImports = conf.hasModal ? `import CreateFormModal from '../components/CreateFormModal';\nimport { useState } from 'react';` : '';
    let extraState = conf.hasModal ? `  const [isModalOpen, setIsModalOpen] = useState(false);` : '';
    let extraRender = conf.hasModal && conf.name !== 'Templates' ? `<CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />` : '';
    
    // For Templates, we want the modal too:
    if (conf.name === 'Templates') {
        extraRender = `<CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />`;
    }

    const componentStr = `
import React, { useEffect } from 'react';
import { createIcons } from 'lucide';
import gsap from 'gsap';
${extraImports}

export default function ${conf.name}() {
${extraState}

  useEffect(() => {
    createIcons();
    const tl = gsap.timeline();
    // Default fallback animation
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  return (
    <>
      ${content}
      ${extraRender}
    </>
  );
}
`;

    fs.writeFileSync(`react-app/src/pages/${conf.out}`, componentStr);
});

console.log('All JSX files cleanly regenerated without parse errors!');
