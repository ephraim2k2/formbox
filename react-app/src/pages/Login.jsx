import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Sun, 
  Moon,
  FileCheck2,
  ChevronDown,
  GraduationCap,
  Building2,
  HeartHandshake,
  Landmark
} from 'lucide-react';
import { useWorkspace, WORKSPACE_TERMS } from '../context/WorkspaceContext';
import './Login.css';

const SCHOOLS = [
  'Adventist Technical Secondary School',
  'Christ the King College, Gwagwalada',
  'Daughters of Divine Love Juniorate, Abakpa-Nike, Enugu',
  'Holy Rosary College, Enugu',
  'Holy Rosary Girls\' College, Gwagwalada',
  'Louisville Girls Secondary School',
  'Marist Schools',
  'Roseville Secondary School, Enugu',
];

const ORGS = [
  'Access Bank Plc',
  'Dangote Industries Ltd',
  'Flutterwave Inc.',
  'GTBank Foundation',
  'MTN Nigeria',
  'Nestlé Nigeria Plc',
  'Stanbic IBTC Holdings',
  'TechCabal Africa',
];

export default function Login() {
  const navigate = useNavigate();
  const { setWorkspace, isDark, toggleTheme } = useWorkspace();

  // Role toggle: 'school' | 'organization'
  const [role, setRole] = useState('school');

  const [entity, setEntity] = useState('');
  const [email, setEmail] = useState('admin@formbox.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const terms = WORKSPACE_TERMS[role];
  const entityList = role === 'school' ? SCHOOLS : ORGS;

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setEntity('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setWorkspace(role, entity);
      setIsLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <div className="login-page">
      {/* Ambient background glows */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />

      {/* Floating Theme Switcher Dock in Spacious Bottom-Left Corner */}
      <button 
        type="button" 
        className="login-floating-theme-switch" 
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <span className="floating-switch-icon-circle">
          {isDark ? <Sun size={15} className="text-amber" /> : <Moon size={15} />}
        </span>
        <span className="floating-switch-label">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>

      {/* Main Viewport Stage */}
      <div className="login-stage">
        {/* Left Column: Premium Login Form */}
        <div className="login-form-pane">
          <div className="form-content-wrap">
            {/* Logo Aligned with Form Fields */}
            <div className="login-brand form-brand" onClick={() => navigate('/')}>
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
            </div>

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

            {/* ── Workspace Role Toggle ─────────────────────────────── */}
            <div className="role-toggle-group" aria-label="Select workspace type">
              <button
                type="button"
                id="role-school"
                className={`role-toggle-btn ${role === 'school' ? 'active' : ''}`}
                onClick={() => handleRoleSwitch('school')}
              >
                <GraduationCap size={16} />
                <span>School</span>
              </button>
              <button
                type="button"
                id="role-organization"
                className={`role-toggle-btn ${role === 'organization' ? 'active' : ''}`}
                onClick={() => handleRoleSwitch('organization')}
              >
                <Building2 size={16} />
                <span>Organization</span>
              </button>
            </div>


            {/* Main Interactive Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Dynamic entity selector */}
              <div className="form-field-group">
                <label htmlFor="login-entity" className="field-label">
                  {terms.workspaceLabel}
                </label>
                <div className="select-with-icon">
                  {role === 'school'
                    ? <GraduationCap size={18} className="field-prefix-icon" />
                    : <Building2 size={18} className="field-prefix-icon" />
                  }
                  <select
                    id="login-entity"
                    required
                    className="styled-input styled-select"
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                  >
                    <option value="" disabled>{terms.entityPlaceholder}</option>
                    {entityList.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow-icon" />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="login-email" className="field-label">{terms.emailLabel}</label>
                <div className="input-with-icon">
                  <input
                    id="login-email"
                    type="email"
                    required
                    className="styled-input"
                    placeholder={terms.emailPlaceholder}
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
                    <span>Sign In to {terms.workspaceLabel} Dashboard</span>
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

                {/* Floating Live Metric Card 2 (Top Right) */}
                <div className="floating-metric-card top-right-card">
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

                {/* Architectural Portal Bottom Caption */}
                <div className="portal-hero-caption">
                  <div className="hero-caption-badge">
                    <Sparkles size={13} />
                    <span>One Platform. Every Workflow.</span>
                  </div>
                  <h2 className="hero-caption-title">
                    Create forms. Automate workflows. <br />
                    Get things done.
                  </h2>
                  <p className="hero-caption-desc">
                    Collect verified submissions, manage applications, and streamline processes from one secure platform.
                  </p>

                  {/* Verticals / Sectors */}
                  <div className="hero-caption-sectors">
                    <span className="sector-tag">
                      <GraduationCap size={13} /> Education
                    </span>
                    <span className="sector-tag">
                      <Building2 size={13} /> Corporate
                    </span>
                    <span className="sector-tag">
                      <HeartHandshake size={13} /> Nonprofits
                    </span>
                    <span className="sector-tag">
                      <Landmark size={13} /> Public Sector
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
