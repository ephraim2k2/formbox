const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Start server
  const { spawn } = require('child_process');
  const server = spawn('npm', ['run', 'dev'], { cwd: './react-app' });
  
  await new Promise(r => setTimeout(r, 4000));
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173/');
  
  // Wait for the app to finish loading
  await new Promise(r => setTimeout(r, 3000));
  
  const results = await page.evaluate(() => {
    const iTags = document.querySelectorAll('i[data-lucide]').length;
    const svgTags = document.querySelectorAll('svg.lucide').length;
    const isLucideGlobal = !!window.lucide;
    return { iTags, svgTags, isLucideGlobal };
  });
  
  console.log('Results:', results);
  
  server.kill();
  await browser.close();
})();
