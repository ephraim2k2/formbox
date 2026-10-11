import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  FileDown,
  Search,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Bell,
  CreditCard,
  Building,
  CheckCircle,
  X,
  ExternalLink,
  Calendar,
  AlertCircle,
  Megaphone,
  Download,
  Eye,
  Check
} from 'lucide-react';
import './CandidateDashboard.css';

export default function CandidateDashboard() {
  const navigate = useNavigate();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // Tree collapse state
  const [bankingOpen, setBankingOpen] = useState(false);
  const [cashOpen, setCashOpen] = useState(true);

  // Modals state
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Last month');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Real announcements from admin
  const adminAnnouncements = [
    {
      id: 1,
      title: '2026 CBT Screening Examination Schedule & Venue Allocation',
      category: 'Exam Schedule',
      badge: '+10% Weight',
      pillar: 'purple',
      date: 'Oct 10, 2026 • 09:30 AM',
      amountRef: '$12.432',
      summary: 'The Computer-Based Screening Examination for 2026 admissions has been finalized for November 15, 2026 at Lagos Tech Hub.',
      fullText: 'Please be informed that the 2026 Academic Session Screening Examination has been officially scheduled for Sunday, November 15, 2026. All candidates are required to print their official Exam Slip, which includes venue hall allocations, biometric seating numbers, and examination instructions. Electronic devices and cellular phones are strictly prohibited within the CBT hall. Please arrive at the venue 30 minutes before your scheduled commencement time.'
    },
    {
      id: 2,
      title: 'Action Required: Verification of Uploaded Birth & Academic Documents',
      category: 'Verification',
      badge: 'Urgent',
      pillar: 'black',
      date: 'Oct 05, 2026 • 02:15 PM',
      amountRef: '$22.548',
      summary: 'Candidates with pending birth certificates or previous school transcripts must complete their uploads before portal closure.',
      fullText: 'The admissions processing office is currently concluding digital verification of submitted credentials. If your application status reflects "Pending Document Verification", please ensure high-resolution scans of your original birth certificate and secondary academic transcript are uploaded promptly. The document verification portal will close on October 25, 2026.'
    },
    {
      id: 3,
      title: 'General Orientation & Matriculation Preparation Briefing',
      category: 'General',
      badge: 'Advisory',
      pillar: 'striped',
      date: 'Oct 02, 2026 • 10:00 AM',
      amountRef: '$16.864',
      summary: 'Welcome to Ephraim High School admissions portal. Monitor your application status, test dates, and fee receipts directly here.',
      fullText: 'We welcome all prospective students and parents to the centralized Formbox portal. Here, you can easily track your real-time application processing, review administrative notices, download transaction receipts, and verify official examination dates. Should you encounter any questions, reach out via the support email in your portal footer.'
    }
  ];

  const handleOpenNotice = (notice) => {
    setSelectedNotice(notice);
    setShowNoticeModal(true);
  };

  return (
    <div className="candidate-portal-wrapper">
      <div className="candidate-portal-container">

        {/* --- Top Navigation Bar (Independent from Admin) --- */}
        <header className="candidate-navbar">
          {/* Brand Logo - Infinity Capsule */}
          <div className="candidate-brand-logo" onClick={() => navigate('/candidate-dashboard')}>
            <div className="candidate-infinity-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.178 8c-1.396 0-2.617.72-3.324 1.797L12 14.167 9.146 9.797C8.439 8.72 7.218 8 5.822 8 3.71 8 2 9.79 2 12s1.71 4 3.822 4c1.396 0 2.617-.72 3.324-1.797L12 9.833l2.854 4.37c.707 1.077 1.928 1.797 3.324 1.797 2.112 0 3.822-1.79 3.822-4s-1.71-4-3.822-4zm-12.356 6c-1.005 0-1.822-.897-1.822-2s.817-2 1.822-2c.677 0 1.272.41 1.574 1.025L8.03 12.002l-.634.975c-.302.615-.897 1.023-1.574 1.023zm12.356 0c-.677 0-1.272-.408-1.574-1.023l-.634-.977.634-.977c.302-.615.897-1.023 1.574-1.023 1.005 0 1.822.897 1.822 2s-.817 2-1.822 2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Centered Navigation Pills */}
          <nav className="candidate-nav-pills">
            {['Courses', 'Dashboard', 'Schedule', 'Support'].map((tab) => (
              <button
                key={tab}
                className={`candidate-nav-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Schedule') {
                    handleOpenNotice(adminAnnouncements[0]);
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Avatar */}
          <div className="candidate-nav-actions">
            <button
              className="candidate-icon-btn"
              title="Settings"
              onClick={() => alert('Candidate profile settings')}
            >
              <Settings size={18} />
            </button>
            <button
              className="candidate-icon-btn"
              title="Notifications"
              onClick={() => {
                setSelectedNotice(adminAnnouncements[0]);
                setShowNoticeModal(true);
              }}
            >
              <Bell size={18} />
              <span className="candidate-notif-dot" />
            </button>
            <div
              className="candidate-avatar"
              title="William - Candidate Profile"
              onClick={() => alert('Logged in as William (APP-2026-0842)')}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="William"
              />
            </div>
          </div>
        </header>

        {/* --- Greeting Row --- */}
        <section className="candidate-header-row">
          <h1 className="candidate-greeting-title">Good morning, William!</h1>
          <button
            className="candidate-btn-black"
            onClick={() => setShowPaymentModal(true)}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>New payment</span>
          </button>
        </section>

        {/* --- Filter & Search Sub-bar --- */}
        <section className="candidate-subbar">
          <div className="candidate-filter-left">
            <button className="candidate-sub-pill" onClick={() => alert('Filter options')}>
              <SlidersHorizontal size={14} />
              <span>Filter</span>
            </button>
            <div style={{ position: 'relative' }}>
              <button
                className="candidate-sub-pill"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              >
                <span>{timeFilter}</span>
                <ChevronDown size={14} />
              </button>
              {showTimeDropdown && (
                <div className="candidate-dropdown-menu">
                  {['Last 7 days', 'Last month', 'Past 30 days', '2026 Session'].map((opt) => (
                    <div
                      key={opt}
                      className="candidate-dropdown-item"
                      onClick={() => {
                        setTimeFilter(opt);
                        setShowTimeDropdown(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="candidate-sub-pill"
              onClick={() => alert('Exporting candidate statement and examination docket...')}
            >
              <FileDown size={14} />
              <span>Export</span>
            </button>
          </div>

          <div className="candidate-filter-right">
            <div className="candidate-search-pill">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="candidate-icon-btn" title="More options">
              <MoreVertical size={16} />
            </button>
          </div>
        </section>

        {/* --- Main 3-Column Dashboard Grid --- */}
        <main className="candidate-grid-layout">

          {/* COLUMN 1: My accounts */}
          <div className="candidate-col">
            <div className="cand-card">
              <div className="cand-card-header">
                <h2 className="cand-card-title">My accounts</h2>
                <button
                  className="cand-add-card-btn"
                  onClick={() => setShowAddCardModal(true)}
                >
                  <Plus size={13} strokeWidth={2.5} />
                  <span>Add card</span>
                </button>
              </div>

              {/* Dual-Tone Virtual Card Widget */}
              <div className="virtual-card-wrapper">
                <div className="virtual-card-left">
                  <div className="card-circles-logo">
                    <div className="card-circle one" />
                    <div className="card-circle two" />
                  </div>
                  <div className="virtual-card-number-sub">
                    ••••6720
                  </div>
                </div>

                <div className="virtual-card-right">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="virtual-card-brand-text">VISA</span>
                    {/* Contactless waves */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                      <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                      <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                    </svg>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <span className="virtual-card-number">***4329</span>
                    <span className="virtual-card-expiry">09/26</span>
                  </div>
                </div>
              </div>

              {/* Net worth summary row */}
              <div className="net-worth-row">
                <div className="net-worth-label">
                  <CreditCard size={17} strokeWidth={2} color="#64748b" />
                  <span>Net worth</span>
                </div>
                <div className="net-worth-val">$16,531.54</div>
              </div>

              {/* Tree hierarchy of balances */}
              <div className="account-tree-list">
                {/* Banking Group */}
                <div className="account-tree-item" onClick={() => setBankingOpen(!bankingOpen)} style={{ cursor: 'pointer' }}>
                  <div className="account-tree-name">
                    {bankingOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>Banking</span>
                  </div>
                  <div className="account-tree-amount">$9,681.49</div>
                </div>
                {bankingOpen && (
                  <div className="account-sub-items">
                    <div className="account-sub-row">
                      <span>Primary checking</span>
                      <span className="account-sub-amount">$7,200.00</span>
                    </div>
                    <div className="account-sub-row">
                      <span>College reserve</span>
                      <span className="account-sub-amount">$2,481.49</span>
                    </div>
                  </div>
                )}

                {/* Cash & checking Group */}
                <div className="account-tree-item" onClick={() => setCashOpen(!cashOpen)} style={{ cursor: 'pointer' }}>
                  <div className="account-tree-name">
                    {cashOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>Cash & checking</span>
                  </div>
                  <div className="account-tree-amount">$7,583.00</div>
                </div>
                {cashOpen && (
                  <div className="account-sub-items">
                    <div className="account-sub-row">
                      <span>WISE</span>
                      <span className="account-sub-amount">$5,299.52</span>
                    </div>
                    <div className="account-sub-row">
                      <span>Savings goal</span>
                      <span className="account-sub-amount">$958.00</span>
                    </div>
                    <div className="account-sub-row">
                      <span>Available balance</span>
                      <span className="account-sub-amount">$7,602.15</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Spending plan (Notice Board) + Income Chart */}
          <div className="candidate-col">
            {/* Top Card: Spending plan & Admin Announcements */}
            <div className="cand-card">
              <div className="cand-card-header">
                <h2 className="cand-card-title">Spending plan</h2>
                <button
                  className="cand-link-btn"
                  onClick={() => {
                    setSelectedNotice(adminAnnouncements[0]);
                    setShowNoticeModal(true);
                  }}
                >
                  <span>View details</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Big Stat */}
              <div className="spending-big-stat">
                <span className="stat-currency-large">$37k</span>
                <span className="stat-currency-label">Expenses for the month</span>
              </div>

              {/* 3 Status Pillars (Representing Admin Notices & Budget) */}
              <div className="spending-bars-row">
                {/* Pillar 1: Black bar ($22.548) */}
                <div
                  className="spending-bar-col"
                  onClick={() => handleOpenNotice(adminAnnouncements[1])}
                  title="Click to view Admin Document Verification Notice"
                >
                  <span className="spending-bar-val">$22.548</span>
                  <div className="spending-bar-pill black" />
                </div>

                {/* Pillar 2: Purple bar with badge ($12.432) */}
                <div
                  className="spending-bar-col"
                  onClick={() => handleOpenNotice(adminAnnouncements[0])}
                  title="Click to view 2026 CBT Screening Notice"
                >
                  <span className="spending-bar-val">$12.432</span>
                  <div className="spending-bar-pill purple">
                    <span className="bar-center-badge">+10%</span>
                  </div>
                </div>

                {/* Pillar 3: Striped bar ($16.864) */}
                <div
                  className="spending-bar-col"
                  onClick={() => handleOpenNotice(adminAnnouncements[2])}
                  title="Click to view Orientation Advisory"
                >
                  <span className="spending-bar-val">$16.864</span>
                  <div className="spending-bar-pill striped" />
                </div>
              </div>
            </div>

            {/* Bottom Card: Income Sparkline */}
            <div className="cand-card">
              <div className="income-top-row">
                <span className="income-title-text">Income</span>
                <div className="income-dropdown-pill">
                  <span>Past 30 days</span>
                  <ChevronDown size={13} />
                </div>
              </div>

              <div className="income-val-row">
                <span className="income-big-val">$3,800</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="income-badge-green">
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                  <span>16.4%</span>
                </span>
              </div>

              {/* Smooth Rising Spline SVG with Date Pin */}
              <div className="sparkline-svg-container">
                <svg
                  width="100%"
                  height="70"
                  viewBox="0 0 320 70"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
                >
                  <path
                    d="M 0,65 C 60,65 110,60 160,42 C 210,24 250,15 320,10"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Highlight Pin Dot */}
                  <circle cx="175" cy="38" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                </svg>
                {/* Floating Date Marker Pin */}
                <div className="sparkline-date-pin" style={{ left: '50%', top: '14px' }}>
                  Feb 12
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Gauge Card + Vibrant Purple Card */}
          <div className="candidate-col">
            {/* Top Card: Semicircle Gauge Card */}
            <div className="cand-card" style={{ paddingBottom: '20px' }}>
              <div className="gauge-card-body">
                <div className="gauge-svg-wrapper">
                  <svg width="220" height="120" viewBox="0 0 220 120">
                    <defs>
                      <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ff5722" />
                        <stop offset="100%" stopColor="#ff7043" />
                      </linearGradient>
                      <linearGradient id="yellowGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>

                    {/* Arc 1: Red-Orange (Left ~45%) */}
                    <path
                      d="M 22,110 A 88,88 0 0 1 80,30"
                      fill="none"
                      stroke="#ff5722"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />

                    {/* Arc 2: Yellow (Center-Top ~25%) */}
                    <path
                      d="M 94,25 A 88,88 0 0 1 142,26"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />

                    {/* Arc 3: Purple (Right ~30%) */}
                    <path
                      d="M 156,32 A 88,88 0 0 1 198,110"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Centered Value */}
                  <div className="gauge-center-content">
                    <div className="gauge-center-val">$4,682</div>
                    <div className="gauge-center-label">Available</div>
                  </div>
                </div>

                {/* Legend Row */}
                <div className="gauge-legend-row">
                  <div className="gauge-legend-item">
                    <span className="gauge-dot orange" />
                    <span>Available</span>
                  </div>
                  <div className="gauge-legend-item">
                    <span className="gauge-dot yellow" />
                    <span>Planned</span>
                  </div>
                  <div className="gauge-legend-item">
                    <span className="gauge-dot purple" />
                    <span>Other</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card: Vibrant Indigo-Purple Card */}
            <div className="purple-metric-card">
              <div className="purple-card-top">
                <span className="purple-card-title">Fitness first</span>
                <div className="purple-card-dropdown">
                  <span>Past 30 days</span>
                  <ChevronDown size={12} />
                </div>
              </div>

              <div className="purple-card-content">
                <span className="purple-big-val">$89</span>
                <span className="purple-badge-white">
                  <ArrowDownRight size={13} strokeWidth={2.5} />
                  <span>21.8%</span>
                </span>
              </div>

              {/* Date pin */}
              <div className="purple-date-pin">
                Feb 18
              </div>

              {/* Glowing white sparkline curve */}
              <div className="purple-card-sparkline">
                <svg
                  width="100%"
                  height="80"
                  viewBox="0 0 320 80"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
                >
                  <path
                    d="M 0,70 C 80,70 140,68 180,50 C 220,32 250,20 320,18"
                    stroke="rgba(255, 255, 255, 0.85)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle cx="255" cy="22" r="4" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>
        </main>

        {/* --- Notice Board Modal (Detailed Admin Announcements) --- */}
        {showNoticeModal && (
          <div className="cand-modal-overlay" onClick={() => setShowNoticeModal(false)}>
            <div className="cand-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Megaphone size={18} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700 }}>Admin Notice Board</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Announcements and official communications</p>
                  </div>
                </div>
                <button
                  className="candidate-icon-btn"
                  onClick={() => setShowNoticeModal(false)}
                  style={{ width: '32px', height: '32px' }}
                >
                  <X size={16} />
                </button>
              </div>

              {selectedNotice ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: '#6366f1', color: '#fff' }}>
                      {selectedNotice.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{selectedNotice.date}</span>
                  </div>

                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                    {selectedNotice.title}
                  </h4>

                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', fontSize: '13.5px', lineHeight: 1.6, color: '#334155', border: '1px solid rgba(0,0,0,0.05)' }}>
                    {selectedNotice.fullText}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                    <button
                      className="candidate-sub-pill"
                      onClick={() => setSelectedNotice(null)}
                    >
                      View all notices
                    </button>
                    <button
                      className="candidate-btn-black"
                      onClick={() => setShowNoticeModal(false)}
                      style={{ padding: '8px 18px', fontSize: '12.5px' }}
                    >
                      Acknowledge & Close
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto' }}>
                  {adminAnnouncements.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNotice(n)}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1' }}>{n.category}</span>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{n.date}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0f172a' }}>{n.title}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{n.summary}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- New Payment Modal --- */}
        {showPaymentModal && (
          <div className="cand-modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <div className="cand-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700 }}>Make New Payment</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Candidate Application & Acceptance Fees</p>
                  </div>
                </div>
                <button className="candidate-icon-btn" onClick={() => setShowPaymentModal(false)} style={{ width: '32px', height: '32px' }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155' }}>Select Payment Category</label>
                <select style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit' }}>
                  <option>2026 Session Acceptance Fee ($500.00)</option>
                  <option>CBT Examination Screening Fee ($50.00)</option>
                  <option>Academic Document Verification ($35.00)</option>
                  <option>Hostel Accommodation Deposit ($300.00)</option>
                </select>

                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155' }}>Payment Method</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #6366f1', background: 'rgba(99,102,241,0.04)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={18} color="#6366f1" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700 }}>Visa ending 4329</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>Exp 09/26</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building size={18} color="#64748b" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>WISE Bank Transfer</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>Instant routing</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button className="candidate-sub-pill" onClick={() => setShowPaymentModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="candidate-btn-black"
                    onClick={() => {
                      alert('Payment processed successfully! Receipt generated.');
                      setShowPaymentModal(false);
                    }}
                  >
                    Confirm & Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Add Card Modal --- */}
        {showAddCardModal && (
          <div className="cand-modal-overlay" onClick={() => setShowAddCardModal(false)}>
            <div className="cand-modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700 }}>Link New Payment Card</h3>
                <button className="candidate-icon-btn" onClick={() => setShowAddCardModal(false)} style={{ width: '32px', height: '32px' }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
                <input
                  type="text"
                  placeholder="Card Number (•••• •••• •••• ••••)"
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    style={{ width: '90px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button className="candidate-sub-pill" onClick={() => setShowAddCardModal(false)}>Cancel</button>
                  <button
                    className="candidate-btn-black"
                    onClick={() => {
                      alert('Card saved securely!');
                      setShowAddCardModal(false);
                    }}
                  >
                    Save Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
