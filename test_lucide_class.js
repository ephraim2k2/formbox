const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><html><body><i data-lucide="bell" class="my-icon" style="color: red;"></i><script src="https://unpkg.com/lucide@latest"></script></body></html>`, { runScripts: "dangerously", resources: "usable" });

window.onload = () => {
  try {
    window.lucide.createIcons();
    console.log("After createIcons:", window.document.body.innerHTML);
  } catch (e) {
    console.log("Error:", e);
  }
};
