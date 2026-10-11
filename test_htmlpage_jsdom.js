const { JSDOM } = require('jsdom');

const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    window.onload = () => {
        const root = document.getElementById('root');
        
        // Simulate HtmlPage.jsx
        root.innerHTML = '<i data-lucide="bell" class="bell-icon"></i><script>console.log("Inline script running"); lucide.createIcons();<\\/script>';
        
        // Extract and run scripts
        const scripts = [...root.querySelectorAll('script')];
        scripts.forEach(s => s.remove());
        
        for (const s of scripts) {
            const code = s.textContent;
            const el = document.createElement('script');
            el.textContent = \`(function(){ \${code} })();\`;
            document.body.appendChild(el);
            el.remove();
        }
        
        // The finally block
        setTimeout(() => {
            window.lucide?.createIcons();
            console.log("Root HTML:", root.innerHTML);
        }, 20);
    };
  </script>
</body>
</html>
`;

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });

setTimeout(() => {
    console.log("Done waiting");
}, 2000);
