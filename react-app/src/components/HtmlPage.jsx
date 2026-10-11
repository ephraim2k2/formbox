import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLoader from './PageLoader';

const MIN_LOADER_MS = 450;

// Cache page HTML so navigation is instant after first load
const cache = {};
const loadPage = (file) =>
  (cache[file] ??= fetch(`/pages/${file}`).then((r) => r.text()));

// Prefetch all pages in the background
[
  'index', 'forms', 'templates', 'completed-applications', 'incomplete-applications',
  'requery', 'settings', 'announcements', 'applicant-profile', 'exam-slip', 'view-form',
  'result', 'candidate-dashboard'
].forEach((p) => setTimeout(() => loadPage(`${p}.html`), 300));

// Map a route path to the original HTML file
function fileFromPath(pathname) {
  const name = pathname.replace(/^\/+|\/+$/g, '');
  if (!name || name === 'index' || name === 'index.html') return 'index.html';
  return name.endsWith('.html') ? name : `${name}.html`;
}

// Map an original "foo.html?x=1" link to a router path "/foo?x=1"
function routeFromHref(href) {
  const [file, rest = ''] = href.split(/(?=[?#])/);
  const name = file.replace(/^\.?\//, '').replace(/\.html$/, '');
  return (name === 'index' || name === '' ? '/' : `/${name}`) + rest;
}

const isInternal = (href) =>
  href && /\.html([?#].*)?$/.test(href) && !/^(https?:)?\/\//.test(href);

function runScript(code) {
  // Wrap in an IIFE to avoid const/let redeclaration errors between pages,
  // and expose top-level function declarations for inline onclick handlers.
  const fnNames = [...code.matchAll(/^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]);
  const expose = fnNames.map((n) => `try{window.${n}=${n};}catch(e){}`).join('');
  const el = document.createElement('script');
  el.textContent = `(function(){\n${code}\n;${expose}})();`;
  document.body.appendChild(el);
  el.remove();
}

export default function HtmlPage() {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const file = fileFromPath(location.pathname);
    const headStyles = [];
    const startedAt = performance.now();
    setLoading(true);

    loadPage(file)
      .then(async (html) => {
        if (cancelled || !ref.current) return;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        document.title = doc.title || 'Formbox';

        // Page-specific <style> blocks from <head>
        doc.head.querySelectorAll('style').forEach((s) => {
          const st = document.createElement('style');
          st.textContent = s.textContent;
          document.head.appendChild(st);
          headStyles.push(st);
        });

        // Collect & strip scripts, then inject markup
        const scripts = [...doc.body.querySelectorAll('script')];
        scripts.forEach((s) => s.remove());
        ref.current.innerHTML = doc.body.innerHTML;
        const wasDark = document.body.classList.contains('dark-theme');
        document.body.className = doc.body.className;
        if (wasDark) document.body.classList.add('dark-theme');

        // Rewrite internal links to router paths
        ref.current.querySelectorAll('a[href]').forEach((a) => {
          const href = a.getAttribute('href');
          if (isInternal(href)) a.setAttribute('href', routeFromHref(href));
        });

        // Run DOMContentLoaded/load listeners immediately while page scripts execute
        const origDoc = document.addEventListener.bind(document);
        const origWin = window.addEventListener.bind(window);
        document.addEventListener = (t, fn, o) =>
          t === 'DOMContentLoaded' ? setTimeout(fn, 0) : origDoc(t, fn, o);
        window.addEventListener = (t, fn, o) =>
          t === 'load' || t === 'DOMContentLoaded' ? setTimeout(fn, 0) : origWin(t, fn, o);

        try {
          for (const s of scripts) {
            const src = s.getAttribute('src');
            if (src) {
              if (/lucide|gsap/.test(src)) continue; // loaded globally
              await new Promise((res) => {
                const el = document.createElement('script');
                el.src = src;
                el.onload = el.onerror = res;
                document.body.appendChild(el);
              });
            } else {
              runScript(s.textContent);
            }
          }
        } finally {
          setTimeout(() => {
            document.addEventListener = origDoc;
            window.addEventListener = origWin;
            if (window.lucide) {
              window.lucide.createIcons({
                nameAttr: 'data-lucide',
                icons: window.lucide.icons
              });
            }
            console.log("Lucide icons created. Found SVGs:", document.querySelectorAll('svg.lucide').length);
            // Reveal only once styles, theme, icons & GSAP initial states are applied
            requestAnimationFrame(() => {
              if (!cancelled && ref.current) ref.current.style.visibility = 'visible';
            });
            const wait = Math.max(0, MIN_LOADER_MS - (performance.now() - startedAt));
            setTimeout(() => !cancelled && setLoading(false), wait);
          }, 20);
        }
        window.scrollTo(0, 0);
      });

    return () => {
      cancelled = true;
      // Hide old page before removing its styles so it never shows unstyled
      if (ref.current) ref.current.style.visibility = 'hidden';
      headStyles.forEach((s) => s.remove());
    };
  }, [location.pathname, location.search]);

  // SPA navigation for internal links
  const onClick = (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute('href');
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <>
      <PageLoader visible={loading} />
      <div ref={ref} onClick={onClick} style={{ visibility: 'hidden' }} />
    </>
  );
}
