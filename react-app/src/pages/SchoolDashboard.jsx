
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import CreateFormModal from '../components/CreateFormModal';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

export default function SchoolDashboard() {
  const navigate = useNavigate();
  const { terms, workspaceName, workspaceType } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [timeframe, setTimeframe] = useState('30D');
  const [hoveredBar, setHoveredBar] = useState(null);

  const chartData = React.useMemo(() => {
      const forms = terms.chartForms;
      return forms.map((formName, i) => {
          const baseValue = 1500 + Math.sin(i * 1.5) * 800 + Math.random() * 500;
          let multiplier = timeframe === '30D' ? 1 : timeframe === '7D' ? 0.25 : 3;
          return {
              id: i,
              form: formName,
              value: Math.floor(baseValue * multiplier),
              growth: (Math.random() * 12 - 4).toFixed(1)
          };
      });
  }, [timeframe]);

  const maxChartValue = Math.max(...chartData.map(d => d.value));

  // Insight slider content (last 30 days vs previous 30 days).
  // Figures are internally consistent: 24,850 submissions matches the chart total.
  const insightSlides = [
    {
      key: 'conversion',
      subtitle: 'Submission Rate',
      icon: 'activity',
      iconColor: '#3b82f6',
      value: '82',
      headline: 'of form views converted to submissions',
      detail: '24,850 of 30,305 views · up 6.4 pts vs last month.',
    },
    {
      key: 'completion',
      subtitle: 'Completion Rate',
      icon: 'check-circle',
      iconColor: '#10b981',
      value: '96',
      headline: 'of started forms were fully completed',
      detail: 'Only 1,035 drop-offs out of 25,885 starts.',
    },
    {
      key: 'time',
      subtitle: 'Avg. Completion Time',
      icon: 'zap',
      iconColor: '#22c55e',
      iconFill: true,
      value: '45',
      headline: 'faster average form completion',
      detail: 'Now 6m 42s, down from 12m 11s last month.',
    },
  ];

  useEffect(() => {
    
    const tl = gsap.timeline();
    // Default fallback animation
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

            {/*  Overview Card  */}
            <div className="card overview-card">
                <div className="overview-header">
                    <div>
                        <div style={{"display":"flex","alignItems":"center","gap":"10px"}}>
                            <div style={{"fontSize":"16px","fontWeight":"600","color":"var(--text-dark)"}}>Traffic By Form
                            </div>
                            <span
                                style={{"background":"rgba(16, 185, 129, 0.12)","color":"#10b981","fontSize":"11px","fontWeight":"600","padding":"3px 8px","borderRadius":"6px","display":"inline-flex","alignItems":"center","gap":"4px"}}>
                                <LucideIcon name="trending-up" style={{"width":"14px","height":"14px"}} /> +18.4%
                            </span>
                        </div>
                        <div
                            style={{"fontSize":"12px","color":"var(--text-light)","marginTop":"4px","display":"flex","alignItems":"center","gap":"8px"}}>
                            <span>Total: <strong style={{"color":"var(--text-dark)","fontWeight":"600"}}>24,850</strong>
                                submissions</span>
                            <span style={{"opacity":"0.4"}}>•</span>
                            <span>April 2026</span>
                        </div>
                    </div>
                    <div style={{"display":"flex","background":"var(--btn-bg)","padding":"3px","borderRadius":"8px","gap":"2px"}}>
                        <button className={`metronic-tab ${timeframe === '30D' ? 'active' : ''}`} onClick={() => setTimeframe('30D')}
                            style={{padding: '6px 14px', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '500', background: timeframe === '30D' ? 'var(--card-bg)' : 'transparent', color: timeframe === '30D' ? 'var(--text-dark)' : 'var(--text-light)', cursor: 'pointer', transition: 'all 0.2s'}}>30D</button>
                        <button className={`metronic-tab ${timeframe === '7D' ? 'active' : ''}`} onClick={() => setTimeframe('7D')}
                            style={{padding: '6px 14px', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '500', background: timeframe === '7D' ? 'var(--card-bg)' : 'transparent', color: timeframe === '7D' ? 'var(--text-dark)' : 'var(--text-light)', cursor: 'pointer', transition: 'all 0.2s'}}>7D</button>
                        <button className={`metronic-tab ${timeframe === '90D' ? 'active' : ''}`} onClick={() => setTimeframe('90D')}
                            style={{padding: '6px 14px', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '500', background: timeframe === '90D' ? 'var(--card-bg)' : 'transparent', color: timeframe === '90D' ? 'var(--text-dark)' : 'var(--text-light)', cursor: 'pointer', transition: 'all 0.2s'}}>90D</button>
                    </div>
                </div>

                <div className="chart-container" id="mainChartContainer" style={{"height":"200px","flex":"1"}}>
                    {/*  Background Grid Lines  */}
                    <div className="chart-grid-lines">
                        <div className="chart-grid-line"></div>
                        <div className="chart-grid-line"></div>
                        <div className="chart-grid-line"></div>
                        <div className="chart-grid-line"></div>
                    </div>

                    {/*  Bars Wrapper  */}
                    <div className="chart-bars-wrapper" id="chartBarsWrapper">
                        {chartData.map((data, idx) => {
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

                    {/*  Dynamic Chart Tooltip  */}
                    <div className="chart-tooltip" id="chartTooltip"
                        style={{
                            opacity: hoveredBar ? '1' : '0',
                            pointerEvents: 'none',
                            transition: 'opacity 0.2s, left 0.2s',
                            left: hoveredBar ? `calc(50% + ${(hoveredBar.id - 3) * 14.28}%)` : '50%'
                        }}>
                        <div className="tooltip-amount">
                            <span>{hoveredBar ? hoveredBar.value.toLocaleString() : '0'}</span>
                            {hoveredBar && (
                                <div className="tooltip-growth" style={{
                                    color: hoveredBar.growth >= 0 ? '#10b981' : '#ef4444',
                                    background: hoveredBar.growth >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'
                                }}>
                                    <LucideIcon name={hoveredBar.growth >= 0 ? 'arrow-up-right' : 'arrow-down-right'}
                                        style={{width: '12px', height: '12px'}} /> <span>{Math.abs(hoveredBar.growth)}%</span>
                                </div>
                            )}
                        </div>
                        <div className="tooltip-date">{hoveredBar ? hoveredBar.form : 'Date'}</div>
                    </div>
                </div>

                <div className="chart-labels" style={{"justifyContent":"space-around"}}>
                    {terms.chartForms.map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>
            </div>

            {/*  Categories Grid (4 cards)  */}
            <div className="categories-grid">
                {/*  Application Form  */}
                <div className="category-card">
                    <div className="cat-header">
                        <div className="cat-title">Application Form</div>
                        <div style={{"width":"44px","height":"44px","borderRadius":"50%","background":"#f1f5f9","display":"flex","alignItems":"center","justifyContent":"center"}}><LucideIcon name="file-text" className="cat-icon" style={{"width":"20px","height":"20px","color":"#64748b"}} /></div>
                    </div>
                    <div>
                        <div className="cat-amount">1</div>
                    </div>
                </div>

                {/*  Received Applications  */}
                <div className="category-card">
                    <div className="cat-header">
                        <div className="cat-title">{terms.receivedLabel}</div>
                        <div style={{"width":"44px","height":"44px","borderRadius":"50%","background":"#eff6ff","display":"flex","alignItems":"center","justifyContent":"center"}}><LucideIcon name="users" className="cat-icon" style={{"width":"20px","height":"20px","color":"#3b82f6"}} /></div>
                    </div>
                    <div>
                        <div className="cat-amount">0 <span style={{"fontSize":"13px"}}>{terms.applicantsLabel}</span></div>
                    </div>
                </div>

                {/*  Fees Collected  */}
                <div className="category-card">
                    <div className="cat-header">
                        <div className="cat-title">{terms.feesLabel}</div>
                        <div style={{"width":"44px","height":"44px","borderRadius":"50%","background":"#ecfdf5","display":"flex","alignItems":"center","justifyContent":"center"}}><LucideIcon name="banknote" className="cat-icon" style={{"width":"20px","height":"20px","color":"#10b981"}} /></div>
                    </div>
                    <div>
                        <div className="cat-amount">₦0<span>.00</span></div>
                    </div>
                </div>

                {/*  Pending  */}
                <div className="category-card">
                    <div className="cat-header">
                        <div className="cat-title">{terms.pendingLabel}</div>
                        <div style={{"width":"44px","height":"44px","borderRadius":"50%","background":"#fef2f2","display":"flex","alignItems":"center","justifyContent":"center"}}><LucideIcon name="clock" className="cat-icon" style={{"width":"20px","height":"20px","color":"#ef4444"}} /></div>
                    </div>
                    <div>
                        <div className="cat-amount">0</div>
                    </div>
                </div>
            </div>

            {/*  Recent Transactions  */}
            {/*  Application Insights  */}
            <div className="card recent-card"
                style={{"background":"#3b82f6","color":"white","padding":"24px","justifyContent":"space-between","position":"relative","overflow":"hidden"}}>

                {/*  Right Side Pattern Lines  */}
                <div
                    style={{"position":"absolute","top":"0","right":"0","width":"60%","height":"100%","backgroundImage":"repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 16px)","pointerEvents":"none","maskImage":"linear-gradient(to right, transparent, black 60%)","WebkitMaskImage":"linear-gradient(to right, transparent, black 60%)"}}>
                </div>

                {insightSlides.map((s, idx) => (
                <div key={s.key} className="insight-slide" id={`slide-${idx + 1}`} style={{"display": currentSlide === idx ? "flex" : "none","flexDirection":"column","flex":"1"}}>
                    <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start"}}>
                        <div>
                            <div style={{"fontSize":"20px","fontWeight":"500"}}>Application Insights</div>
                            <div style={{"fontSize":"14px","opacity":"0.8","marginTop":"4px"}}>{s.subtitle}</div>
                        </div>
                        <div
                            style={{"width":"44px","height":"44px","background":"white","borderRadius":"50%","display":"flex","justifyContent":"center","alignItems":"center"}}>
                            <LucideIcon name={s.icon} style={{"color":s.iconColor,"width":"22px","height":"22px", ...(s.iconFill ? {"fill": s.iconColor} : {})}} />
                        </div>
                    </div>
                    <div style={{"marginTop":"16px","display":"flex","alignItems":"baseline","gap":"8px"}}>
                        <div style={{"fontSize":"58px","fontWeight":"500","lineHeight":"1"}}>{s.value}</div>
                        <div style={{"fontSize":"29px","opacity":"0.8"}}>%</div>
                        <LucideIcon name="arrow-up-right" style={{"width":"24px","height":"24px","opacity":"0.8"}} />
                    </div>
                    <div style={{"marginTop":"16px","fontSize":"14px","lineHeight":"1.4","minHeight":"50px"}}>
                        <span style={{"fontWeight":"500"}}>{s.headline}</span><br />
                        <span style={{"opacity":"0.7"}}>{s.detail}</span>
                    </div>
                    <div
                        style={{"marginTop":"16px","fontSize":"14px","fontWeight":"500","display":"flex","alignItems":"center","gap":"6px","cursor":"pointer"}}>
                        View Analytics Report <LucideIcon name="arrow-right"
                            style={{"width":"16px","height":"16px","opacity":"0.7"}} />
                    </div>
                </div>
                ))}
                {/*  Slider dots  */}
                <div style={{"display":"flex","gap":"8px","marginTop":"24px"}}>
                    <div className="slider-dot" onClick={() => setCurrentSlide(0)}
                        style={{"height":"4px","flex":"1","background": currentSlide === 0 ? "white" : "rgba(255,255,255,0.4)","borderRadius":"2px","cursor":"pointer","transition":"background 0.3s"}}>
                    </div>
                    <div className="slider-dot" onClick={() => setCurrentSlide(1)}
                        style={{"height":"4px","flex":"1","background": currentSlide === 1 ? "white" : "rgba(255,255,255,0.4)","borderRadius":"2px","cursor":"pointer","transition":"background 0.3s"}}>
                    </div>
                    <div className="slider-dot" onClick={() => setCurrentSlide(2)}
                        style={{"height":"4px","flex":"1","background": currentSlide === 2 ? "white" : "rgba(255,255,255,0.4)","borderRadius":"2px","cursor":"pointer","transition":"background 0.3s"}}>
                    </div>
                </div>
            </div>

            {/*  Recent Submissions  */}
            <div className="card investment-card">
                <div className="card-header">
                    <div className="card-title" style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)', margin: 0 }}>Recent Submissions</div>
                    <a href="#" className="view-all">View All</a>
                </div>

                <div style={{"display":"flex","flexDirection":"column","gap":"16px","marginTop":"16px","overflowY":"auto","maxHeight":"250px","paddingRight":"8px"}}>
                    {terms.recentSubmissions.map((sub, idx) => {
                        const isLast = idx === terms.recentSubmissions.length - 1;
                        const statusColor = sub.status === 'Completed' ? '#10b981' : sub.status === 'Rejected' ? '#ef4444' : '#f59e0b';
                        return (
                            <div key={idx} style={{"display":"flex","alignItems":"center","justifyContent":"space-between","paddingBottom": isLast ? '8px' : '16px',"borderBottom": isLast ? 'none' : '1px solid var(--border-color)'}}>
                                <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                                    <div style={{"width":"40px","height":"40px","borderRadius":"50%","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"600"}}>{sub.initials}</div>
                                    <div>
                                        <div style={{"fontWeight":"500","color":"var(--text-dark)"}}>{sub.name}</div>
                                        <div style={{"fontSize":"11px","color":"var(--text-light)"}}>{sub.form}</div>
                                    </div>
                                </div>
                                <div style={{"textAlign":"right"}}>
                                    <div style={{"fontSize":"11px","fontWeight":"600","color":statusColor}}>{sub.status}</div>
                                    <div style={{"fontSize":"10px","color":"var(--text-light)","marginTop":"2px"}}>{sub.time}</div>
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
