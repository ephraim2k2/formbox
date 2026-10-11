import './PageLoader.css';

// Animated formbox logo: the three layers "stack" in sequence
export default function PageLoader({ visible }) {
  return (
    <div className={`fb-loader ${visible ? 'is-visible' : ''}`} aria-hidden={!visible} role="status">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="fbTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e6efff" />
          </linearGradient>
        </defs>
        <polyline className="fb-layer fb-l3" points="3 17 12 22 21 17" stroke="#0052cc" />
        <polyline className="fb-layer fb-l2" points="3 13 12 18 21 13" stroke="#ffcc00" />
        <polygon className="fb-layer fb-l1" points="12 4 3 9 12 14 21 9 12 4" stroke="#0052cc" fill="url(#fbTop)" />
      </svg>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
