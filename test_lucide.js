const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><html><body><i data-lucide="bell"></i><script src="https://unpkg.com/lucide@latest"></script></body></html>`, { runScripts: "dangerously", resources: "usable" });

window.onload = () => {
  try {
    console.log("lucide exists:", !!window.lucide);
    window.lucide.createIcons();
    console.log("After createIcons:", window.document.body.innerHTML);
  } catch (e) {
    console.log("Error:", e);
  }
};
