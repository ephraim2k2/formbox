import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import CreateFormModal from '../components/CreateFormModal';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

/*
 * Organization dashboard — built from the same design system as the school
 * dashboard (header-content, main-content grid, card / category-card / overview-card,
 * chart-* bars, blue insight card, list rows) so both roles feel consistent.
 * Sample data below is static; swap for API data when the backend is connected.
 */

const PIPELINE = [
  { id: 0, stage: 'Received', value: 1284 },
  { id: 1, stage: 'Under Review', value: 846 },
  { id: 2, stage: 'Shortlisted', value: 538 },
  { id: 3, stage: 'Assessment', value: 301 },
  { id: 4, stage: 'Approved', value: 412 },
];

const REVIEW_QUEUE = [
  { initials: 'AO', name: 'Amaka Obi', form: 'General Application Form', status: 'Pending', time: '2 days waiting' },
  { initials: 'JH', name: 'James Haruna', form: 'Membership Registration', status: 'Pending', time: '3 days waiting' },
  { initials: 'CE', name: 'Chidinma Eze', form: 'Grant Application Cycle 3', status: 'Pending', time: '5 days waiting' },
  { initials: 'TB', name: 'Tunde Bakare', form: 'Volunteer Recruitment Form', status: 'Pending', time: '1 day waiting' },
  { initials: 'NA', name: 'Ngozi Adeyemi', form: 'Certification Application', status: 'Pending', time: '4 days waiting' },
];

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const { terms } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeframe, setTimeframe] = useState('30D');
  const [hoveredBar, setHoveredBar] = useState(null);

  const multiplier = timeframe === '30D' ? 1 : timeframe === '7D' ? 0.25 : 3;
  const chartData = PIPELINE.map(p => ({ ...p, value: Math.floor(p.value * multiplier) }));
  const maxChartValue = Math.max(...chartData.map(d => d.value));
  const totalApplicants = chartData[0].value;

  const insightSlides = [
    {
      key: 'approval',
      subtitle: 'Approval Rate',
      icon: 'badge-check',
      iconColor: '#10b981',
      value: '32',
      headline: 'of applicants were approved',
      detail: '412 of 1,284 applicants · up 2.6 pts vs last month.',
    },
    {
      key: 'review',
      subtitle: 'Review Progress',
      icon: 'clipboard-check',
      iconColor: '#3b82f6',
      value: '89',
      headline: 'of received applications have been reviewed',
      detail: '146 still awaiting a decision from your team.',
    },
    {
      key: 'time',
      subtitle: 'Avg. Review Time',
      icon: 'zap',
      iconColor: '#22c55e',
      iconFill: true,
      value: '38',
      headline: 'faster average time to a decision',
      detail: 'Now 2.4 days, down from 3.9 days last month.',
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome Back, Admin <span className="wave">👋</span></h1>
            <h2>{terms.dashboardSubtitle}</h2>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn-secondary" style={{ background: '#000', color: '#fff', border: 'none' }} onClick={() => navigate('/templates')}>
            <LucideIcon name="layout-template" /> See all templates
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <LucideIcon name="file-plus" /> Create new form
          </button>
        </div>
      </div>

      {/*  Main Content Grid  */}
      <div className="main-content">

        {/*  Applicant Pipeline (overview card)  */}
        <div className="card overview-card">
          <div className="overview-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)' }}>Applicant Pipeline</div>
                <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <LucideIcon name="trending-up" style={{ width: '14px', height: '14px' }} /> +12.4%
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Total: <strong style={{ color: 'var(--text-dark)', fontWeight: '600' }}>{totalApplicants.toLocaleString()}</strong> applicants</span>
                <span style={{ opacity: '0.4' }}>•</span>
                <span>April 2026</span>
              </div>
            </div>
            <div style={{ display: 'flex', background: 'var(--btn-bg)', padding: '3px', borderRadius: '8px', gap: '2px' }}>
              {['30D', '7D', '90D'].map(t => (
                <button key={t} className={`metronic-tab ${timeframe === t ? 'active' : ''}`} onClick={() => setTimeframe(t)}
                  style={{ padding: '6px 14px', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '500', background: timeframe === t ? 'var(--card-bg)' : 'transparent', color: timeframe === t ? 'var(--text-dark)' : 'var(--text-light)', cursor: 'pointer', transition: 'all 0.2s' }}>{t}</button>
              ))}
            </div>
          </div>

          <div className="chart-container" id="mainChartContainer" style={{ height: '200px', flex: '1' }}>
            <div className="chart-grid-lines">
              <div className="chart-grid-line"></div>
              <div className="chart-grid-line"></div>
              <div className="chart-grid-line"></div>
              <div className="chart-grid-line"></div>
            </div>

            <div className="chart-bars-wrapper" id="chartBarsWrapper">
              {chartData.map((data) => {
                const heightPercent = (data.value / maxChartValue) * 88 + 12;
                const isActive = hoveredBar?.id === data.id;
                return (
                  <div
                    key={data.id}
                    className={`chart-bar ${isActive ? 'active' : ''}`}
                    style={{ height: `${heightPercent}%` }}
                    onMouseEnter={() => setHoveredBar(data)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {isActive && (
                      <div style={{ position: 'absolute', top: '-14px', left: '50%', width: '2px', height: '14px', background: '#3b82f6', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                        <div style={{ width: '8px', height: '8px', background: '#3b82f6', border: '2px solid #ffffff', borderRadius: '50%', position: 'absolute', top: '-4px', left: '-4px' }}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="chart-tooltip" id="chartTooltip"
              style={{
                opacity: hoveredBar ? '1' : '0',
                pointerEvents: 'none',
                transition: 'opacity 0.2s, left 0.2s',
                left: hoveredBar ? `calc(50% + ${(hoveredBar.id - 2) * 20}%)` : '50%'
              }}>
              <div className="tooltip-amount">
                <span>{hoveredBar ? hoveredBar.value.toLocaleString() : '0'}</span>
              </div>
              <div className="tooltip-date">{hoveredBar ? hoveredBar.stage : 'Stage'}</div>
            </div>
          </div>

          <div className="chart-labels" style={{ justifyContent: 'space-around' }}>
            {PIPELINE.map(p => (
              <span key={p.id}>{p.stage}</span>
            ))}
          </div>
        </div>

        {/*  Categories Grid (4 cards)  */}
        <div className="categories-grid">
          <div className="category-card">
            <div className="cat-header">
              <div className="cat-title">Application Forms</div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LucideIcon name="file-text" className="cat-icon" style={{ width: '20px', height: '20px', color: '#64748b' }} /></div>
            </div>
            <div>
              <div className="cat-amount">5</div>
            </div>
          </div>

          <div className="category-card">
            <div className="cat-header">
              <div className="cat-title">{terms.receivedLabel}</div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LucideIcon name="users" className="cat-icon" style={{ width: '20px', height: '20px', color: '#3b82f6' }} /></div>
            </div>
            <div>
              <div className="cat-amount">1,284 <span style={{ fontSize: '13px' }}>{terms.applicantsLabel}</span></div>
            </div>
          </div>

          <div className="category-card">
            <div className="cat-header">
              <div className="cat-title">Approved</div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LucideIcon name="badge-check" className="cat-icon" style={{ width: '20px', height: '20px', color: '#10b981' }} /></div>
            </div>
            <div>
              <div className="cat-amount">412</div>
            </div>
          </div>

          <div className="category-card">
            <div className="cat-header">
              <div className="cat-title">{terms.pendingLabel}</div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LucideIcon name="clock" className="cat-icon" style={{ width: '20px', height: '20px', color: '#ef4444' }} /></div>
            </div>
            <div>
              <div className="cat-amount">146</div>
            </div>
          </div>
        </div>

        {/*  Review Insights (blue slider card)  */}
        <div className="card recent-card"
          style={{ background: '#3b82f6', color: 'white', padding: '24px', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>

          <div
            style={{ position: 'absolute', top: '0', right: '0', width: '60%', height: '100%', backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 16px)', pointerEvents: 'none', maskImage: 'linear-gradient(to right, transparent, black 60%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 60%)' }}>
          </div>

          {insightSlides.map((s, idx) => (
            <div key={s.key} className="insight-slide" id={`slide-${idx + 1}`} style={{ display: currentSlide === idx ? 'flex' : 'none', flexDirection: 'column', flex: '1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '500' }}>Review Insights</div>
                  <div style={{ fontSize: '14px', opacity: '0.8', marginTop: '4px' }}>{s.subtitle}</div>
                </div>
                <div
                  style={{ width: '44px', height: '44px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LucideIcon name={s.icon} style={{ color: s.iconColor, width: '22px', height: '22px', ...(s.iconFill ? { fill: s.iconColor } : {}) }} />
                </div>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <div style={{ fontSize: '58px', fontWeight: '500', lineHeight: '1' }}>{s.value}</div>
                <div style={{ fontSize: '29px', opacity: '0.8' }}>%</div>
                <LucideIcon name="arrow-up-right" style={{ width: '24px', height: '24px', opacity: '0.8' }} />
              </div>
              <div style={{ marginTop: '16px', fontSize: '14px', lineHeight: '1.4', minHeight: '50px' }}>
                <span style={{ fontWeight: '500' }}>{s.headline}</span><br />
                <span style={{ opacity: '0.7' }}>{s.detail}</span>
              </div>
              <div
                style={{ marginTop: '16px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                onClick={() => navigate('/completed')}>
                View Applicants <LucideIcon name="arrow-right" style={{ width: '16px', height: '16px', opacity: '0.7' }} />
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            {[0, 1, 2].map(i => (
              <div key={i} className="slider-dot" onClick={() => setCurrentSlide(i)}
                style={{ height: '4px', flex: '1', background: currentSlide === i ? 'white' : 'rgba(255,255,255,0.4)', borderRadius: '2px', cursor: 'pointer', transition: 'background 0.3s' }}>
              </div>
            ))}
          </div>
        </div>

        {/*  Review Queue  */}
        <div className="card investment-card">
          <div className="card-header">
            <div className="card-title" style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)', margin: 0 }}>Review Queue</div>
            <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); navigate('/completed'); }}>View All</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', overflowY: 'auto', maxHeight: '250px', paddingRight: '8px' }}>
            {REVIEW_QUEUE.map((item, idx) => {
              const isLast = idx === REVIEW_QUEUE.length - 1;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: isLast ? '8px' : '16px', borderBottom: isLast ? 'none' : '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>{item.initials}</div>
                    <div>
                      <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{item.form}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#f59e0b' }}>{item.status}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '2px' }}>{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
      <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
