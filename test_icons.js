const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Start server just in case
  const { spawn } = require('child_process');
  const server = spawn('npm', ['run', 'dev'], { cwd: './react-app' });
  
  await new Promise(r => setTimeout(r, 3000));
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 2000));
  
  const iconCount = await page.evaluate(() => document.querySelectorAll('svg.lucide').length);
  const dataLucideCount = await page.evaluate(() => document.querySelectorAll('[data-lucide]').length);
  console.log('SVG icons:', iconCount);
  console.log('Elements with data-lucide:', dataLucideCount);
  
  server.kill();
  await browser.close();
})();
