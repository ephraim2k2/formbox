import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Sun, 
  Moon,
  FileCheck2,
  Users,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@formbox.com');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('••••••••••••');

  const schoolsList = [
    'Adventist Technical Secondary School',
    'Christ the King College, Gwagwalada',
    'Daughters of Divine Love Juniorate, Abakpa-Nike, Enugu',
    'Holy Rosary College, Enugu',
    'Holy Rosary Girls\' College, Gwagwalada',
    'Louisville Girls Secondary School',
    'Marist Schools',
    'Roseville Secondary School, Enugu'
  ];
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('darkMode') === 'enabled');

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('darkMode', 'disabled');
      setIsDark(false);
    } else {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('darkMode', 'enabled');
      setIsDark(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <div className="login-page">
      {/* Ambient background glows */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />

      {/* Top Header Floating Controls */}
      <div className="login-top-bar">
        <div className="login-brand" onClick={() => navigate('/')}>
          <div className="brand-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="login-logo-svg">
              <polygon points="12 4 3 9 12 14 21 9 12 4" stroke="#0052cc" fill="white"></polygon>
              <polyline points="3 13 12 18 21 13" stroke="#ffcc00"></polyline>
              <polyline points="3 17 12 22 21 17" stroke="#0052cc"></polyline>
            </svg>
          </div>
          <div className="login-brand-text">
            <span className="brand-blue">form</span><span className="brand-gold">box</span>
          </div>
          {/* <span className="brand-badge">v2.4 Enterprise</span> */}
        </div>

        <div className="top-bar-actions">
          <button 
            type="button" 
            className="theme-switch-btn" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDark ? <Sun size={17} className="text-amber" /> : <Moon size={17} />}
          </button>
        </div>
      </div>

      {/* Main Viewport Stage */}
      <div className="login-stage">
        {/* Left Column: Premium Login Form */}
        <div className="login-form-pane">
          <div className="form-content-wrap">
            {/* Header Greeting */}
            <div className="login-header">
              <div className="pill-badge">
                <Sparkles size={13} className="sparkle-icon" />
                <span>Next-Gen Form Engine</span>
              </div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">
                Access your real-time analytics, automated workflows, and applicant databases.
              </p>
            </div>

            {/* Social Auth Providers */}
            <div className="social-auth-group">
              <button type="button" className="social-auth-btn" onClick={() => navigate('/')}>
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Subtle Divider */}
            <div className="login-divider">
              <span className="divider-line" />
              <span className="divider-text">Or sign in with email</span>
              <span className="divider-line" />
            </div>

            {/* Main Interactive Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-field-group">
                <label htmlFor="login-school" className="field-label">School</label>
                <div className="select-with-icon">
                  <GraduationCap size={18} className="field-prefix-icon" />
                  <select
                    id="login-school"
                    required
                    className="styled-input styled-select"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  >
                    <option value="" disabled>-- Select School --</option>
                    {schoolsList.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow-icon" />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="login-email" className="field-label">School Email</label>
                <div className="input-with-icon">
                  <input
                    id="login-email"
                    type="email"
                    required
                    className="styled-input"
                    placeholder="admin@formboxx.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field-group">
                <div className="field-label-row">
                  <label htmlFor="login-password" className="field-label">Password</label>
                  <a 
                    href="#forgot" 
                    className="forgot-link"
                    onClick={(e) => { e.preventDefault(); alert('Password reset verification link sent to your email.'); }}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="password-input-box">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="styled-input"
                    placeholder="Enter your security password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="remember-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-label-text">Keep me signed in for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-primary primary-login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="btn-loading-state">
                    <span className="spinner-dot" />
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Security Trust Badges */}
              <div className="form-trust-footer">
                <div className="trust-item">
                  <ShieldCheck size={14} className="trust-icon" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="trust-dot">•</div>
                <div className="trust-item">
                  <Zap size={14} className="trust-icon" />
                  <span>99.98% SLA Guaranteed</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Architectural Portal Stage */}
        <div className="login-visual-pane">
          <div className="portal-canvas-wrapper">
              {/* Cinematic Living Canvas with Video Illusion */}
              <div className="portal-cinematic-viewport">
                <img 
                  src="/login-student.jpg" 
                  alt="Candidate student with notebook" 
                  className="portal-bg-img living-camera"
                />

                {/* Animated Light Rays & Solar Pulse Overlay */}
                <div className="cinematic-sunflare-sweep" />

                {/* Drifting Clouds & Shimmer Illusion Layer */}
                <div className="cinematic-cloud-mist" />

                {/* Dynamic Vignette & Depth Lighting */}
                <div className="portal-glass-overlay" />

                {/* Floating Live Metric Card 1 (Top Left) */}
                <div className="floating-metric-card top-left-card">
                  <div className="metric-icon-bubble green">
                    <TrendingUp size={16} />
                  </div>
                  <div className="metric-text-block">
                    <div className="metric-headline">
                      <span className="metric-val">+24.8%</span>
                      <span className="metric-sub-tag">This Week</span>
                    </div>
                    <div className="metric-label">Daily Applicant Throughput</div>
                  </div>
                </div>

                {/* Floating Live Metric Card 2 (Bottom Right) */}
                <div className="floating-metric-card bottom-right-card">
                  <div className="metric-avatar-stack">
                    <div className="mini-avatar" style={{ background: '#3b82f6' }}>JD</div>
                    <div className="mini-avatar" style={{ background: '#10b981' }}>SA</div>
                    <div className="mini-avatar" style={{ background: '#f59e0b' }}>TK</div>
                  </div>
                  <div className="metric-text-block">
                    <div className="metric-headline">
                      <span className="metric-val">128,400+</span>
                    </div>
                    <div className="metric-label">Submissions Processed</div>
                  </div>
                </div>

                {/* Architectural Portal Top Caption */}
                <div className="portal-hero-caption">
                  <div className="hero-caption-badge">
                    <FileCheck2 size={13} />
                    <span>Universal Admissions Gateway</span>
                  </div>
                  <h2 className="hero-caption-title">
                    Build any application form. <br />
                    Collect verified submissions instantly.
                  </h2>
                  <p className="hero-caption-desc">
                    Accelerating university enrollments, corporate screenings, and scholarship reviews with automated workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
