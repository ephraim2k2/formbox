
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import CreateFormModal from '../components/CreateFormModal';
import gsap from 'gsap';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [timeframe, setTimeframe] = useState('30D');
  const [hoveredBar, setHoveredBar] = useState(null);

  const chartData = React.useMemo(() => {
      const forms = ['Admission', 'Registration', 'Job App', 'Scholarship', 'Survey', 'Feedback', 'Leave'];
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
                    <h2>Dashboard overview and form analytics</h2>
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
                    <span>Admission</span>
                    <span>Registration</span>
                    <span>Job App</span>
                    <span>Scholarship</span>
                    <span>Survey</span>
                    <span>Feedback</span>
                    <span>Leave</span>
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
                        <div className="cat-title">Received Applications</div>
                        <div style={{"width":"44px","height":"44px","borderRadius":"50%","background":"#eff6ff","display":"flex","alignItems":"center","justifyContent":"center"}}><LucideIcon name="users" className="cat-icon" style={{"width":"20px","height":"20px","color":"#3b82f6"}} /></div>
                    </div>
                    <div>
                        <div className="cat-amount">0 <span style={{"fontSize":"13px"}}>Applicants</span></div>
                    </div>
                </div>

                {/*  Fees Collected  */}
                <div className="category-card">
                    <div className="cat-header">
                        <div className="cat-title">Fees Collected</div>
                        <div style={{"width":"44px","height":"44px","borderRadius":"50%","background":"#ecfdf5","display":"flex","alignItems":"center","justifyContent":"center"}}><LucideIcon name="banknote" className="cat-icon" style={{"width":"20px","height":"20px","color":"#10b981"}} /></div>
                    </div>
                    <div>
                        <div className="cat-amount">₦0<span>.00</span></div>
                    </div>
                </div>

                {/*  Pending Applications  */}
                <div className="category-card">
                    <div className="cat-header">
                        <div className="cat-title">Pending Applications</div>
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

                {/*  Slide 1  */}
                <div className="insight-slide" id="slide-1" style={{"display": currentSlide === 0 ? "flex" : "none","flexDirection":"column","flex":"1"}}>
                    <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start"}}>
                        <div>
                            <div style={{"fontSize":"20px","fontWeight":"500"}}>Application Insights</div>
                            <div style={{"fontSize":"14px","opacity":"0.8","marginTop":"4px"}}>Submission Rate</div>
                        </div>
                        <div
                            style={{"width":"44px","height":"44px","background":"white","borderRadius":"50%","display":"flex","justifyContent":"center","alignItems":"center"}}>
                            <LucideIcon name="activity" style={{"color":"#3b82f6","width":"22px","height":"22px"}} />
                        </div>
                    </div>
                    <div style={{"marginTop":"16px","display":"flex","alignItems":"baseline","gap":"8px"}}>
                        <div style={{"fontSize":"58px","fontWeight":"500","lineHeight":"1"}}>82</div>
                        <div style={{"fontSize":"29px","opacity":"0.8"}}>%</div>
                        <LucideIcon name="arrow-up-right" style={{"width":"24px","height":"24px","opacity":"0.8"}} />
                    </div>
                    <div style={{"marginTop":"16px","fontSize":"14px","lineHeight":"1.4","minHeight":"50px"}}>
                        <span style={{"fontWeight":"500"}}>Increase in daily form submissions</span><br />
                        <span style={{"opacity":"0.7"}}>detected recently.</span>
                    </div>
                    <div
                        style={{"marginTop":"16px","fontSize":"14px","fontWeight":"500","display":"flex","alignItems":"center","gap":"6px","cursor":"pointer"}}>
                        View Analytics Report <LucideIcon name="arrow-right"
                            style={{"width":"16px","height":"16px","opacity":"0.7"}} />
                    </div>
                </div>

                {/*  Slide 2  */}
                <div className="insight-slide" id="slide-2" style={{"display": currentSlide === 1 ? "flex" : "none","flexDirection":"column","flex":"1"}}>
                    <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start"}}>
                        <div>
                            <div style={{"fontSize":"20px","fontWeight":"500"}}>Application Insights</div>
                            <div style={{"fontSize":"14px","opacity":"0.8","marginTop":"4px"}}>Completion Rate</div>
                        </div>
                        <div
                            style={{"width":"44px","height":"44px","background":"white","borderRadius":"50%","display":"flex","justifyContent":"center","alignItems":"center"}}>
                            <LucideIcon name="check-circle" style={{"color":"#10b981","width":"22px","height":"22px"}} />
                        </div>
                    </div>
                    <div style={{"marginTop":"16px","display":"flex","alignItems":"baseline","gap":"8px"}}>
                        <div style={{"fontSize":"58px","fontWeight":"500","lineHeight":"1"}}>96</div>
                        <div style={{"fontSize":"29px","opacity":"0.8"}}>%</div>
                        <LucideIcon name="arrow-up-right" style={{"width":"24px","height":"24px","opacity":"0.8"}} />
                    </div>
                    <div style={{"marginTop":"16px","fontSize":"14px","lineHeight":"1.4","minHeight":"50px"}}>
                        <span style={{"fontWeight":"500"}}>Forms are being completed</span> <br /><span
                            style={{"opacity":"0.7"}}>successfully without drop-offs.</span>
                    </div>
                    <div
                        style={{"marginTop":"16px","fontSize":"14px","fontWeight":"500","display":"flex","alignItems":"center","gap":"6px","cursor":"pointer"}}>
                        View Analytics Report <LucideIcon name="arrow-right"
                            style={{"width":"16px","height":"16px","opacity":"0.7"}} />
                    </div>
                </div>

                {/*  Slide 3  */}
                <div className="insight-slide" id="slide-3" style={{"display": currentSlide === 2 ? "flex" : "none","flexDirection":"column","flex":"1"}}>
                    <div style={{"display":"flex","justifyContent":"space-between","alignItems":"flex-start"}}>
                        <div>
                            <div style={{"fontSize":"20px","fontWeight":"500"}}>Application Insights</div>
                            <div style={{"fontSize":"14px","opacity":"0.8","marginTop":"4px"}}>AI-driven predictions</div>
                        </div>
                        <div
                            style={{"width":"44px","height":"44px","background":"white","borderRadius":"50%","display":"flex","justifyContent":"center","alignItems":"center"}}>
                            <LucideIcon name="zap" style={{"color":"#22c55e","fill":"#22c55e","width":"22px","height":"22px"}} />
                        </div>
                    </div>
                    <div style={{"marginTop":"16px","display":"flex","alignItems":"baseline","gap":"8px"}}>
                        <div style={{"fontSize":"58px","fontWeight":"500","lineHeight":"1"}}>45</div>
                        <div style={{"fontSize":"29px","opacity":"0.8"}}>%</div>
                        <LucideIcon name="arrow-up-right" style={{"width":"24px","height":"24px","opacity":"0.8"}} />
                    </div>
                    <div style={{"marginTop":"16px","fontSize":"14px","lineHeight":"1.4","minHeight":"50px"}}>
                        <span style={{"fontWeight":"500"}}>Improvement in average completion time</span><br />
                        <span style={{"opacity":"0.7"}}>detected recently.</span>
                    </div>
                    <div
                        style={{"marginTop":"16px","fontSize":"14px","fontWeight":"500","display":"flex","alignItems":"center","gap":"6px","cursor":"pointer"}}>
                        View Analytics Report <LucideIcon name="arrow-right"
                            style={{"width":"16px","height":"16px","opacity":"0.7"}} />
                    </div>
                </div>

                {/*  Slider dots  */}
                <div style={{"display":"flex","justifyContent":"center","gap":"8px","marginTop":"24px"}}>
                    <div className="slider-dot" onClick={() => setCurrentSlide(0)}
                        style={{"height":"4px","width":"32px","background": currentSlide === 0 ? "white" : "rgba(255,255,255,0.4)","borderRadius":"2px","cursor":"pointer","transition":"background 0.3s"}}>
                    </div>
                    <div className="slider-dot" onClick={() => setCurrentSlide(1)}
                        style={{"height":"4px","width":"32px","background": currentSlide === 1 ? "white" : "rgba(255,255,255,0.4)","borderRadius":"2px","cursor":"pointer","transition":"background 0.3s"}}>
                    </div>
                    <div className="slider-dot" onClick={() => setCurrentSlide(2)}
                        style={{"height":"4px","width":"32px","background": currentSlide === 2 ? "white" : "rgba(255,255,255,0.4)","borderRadius":"2px","cursor":"pointer","transition":"background 0.3s"}}>
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
                    {/*  Item 1  */}
                    <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","paddingBottom":"16px","borderBottom":"1px solid var(--border-color)"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"40px","height":"40px","borderRadius":"50%","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"600"}}>DO</div>
                            <div>
                                <div style={{"fontWeight":"500","color":"var(--text-dark)"}}>David Olamide</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>2026 Academic Session</div>
                            </div>
                        </div>
                        <div style={{"textAlign":"right"}}>
                            <div style={{"fontSize":"11px","fontWeight":"600","color":"#10b981"}}>Completed</div>
                            <div style={{"fontSize":"10px","color":"var(--text-light)","marginTop":"2px"}}>2 mins ago</div>
                        </div>
                    </div>

                    {/*  Item 2  */}
                    <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","paddingBottom":"16px","borderBottom":"1px solid var(--border-color)"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"40px","height":"40px","borderRadius":"50%","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"600"}}>SA</div>
                            <div>
                                <div style={{"fontWeight":"500","color":"var(--text-dark)"}}>Sarah Adekola</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>Staff Recruitment</div>
                            </div>
                        </div>
                        <div style={{"textAlign":"right"}}>
                            <div style={{"fontSize":"11px","fontWeight":"600","color":"#f59e0b"}}>Pending</div>
                            <div style={{"fontSize":"10px","color":"var(--text-light)","marginTop":"2px"}}>45 mins ago</div>
                        </div>
                    </div>

                    {/*  Item 3  */}
                    <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","paddingBottom":"16px","borderBottom":"1px solid var(--border-color)"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"40px","height":"40px","borderRadius":"50%","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"600"}}>ME</div>
                            <div>
                                <div style={{"fontWeight":"500","color":"var(--text-dark)"}}>Michael Ezenwa</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>Transfer Application</div>
                            </div>
                        </div>
                        <div style={{"textAlign":"right"}}>
                            <div style={{"fontSize":"11px","fontWeight":"600","color":"#10b981"}}>Completed</div>
                            <div style={{"fontSize":"10px","color":"var(--text-light)","marginTop":"2px"}}>2 hours ago</div>
                        </div>
                    </div>

                    {/*  Item 4  */}
                    <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","paddingBottom":"16px","borderBottom":"1px solid var(--border-color)"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"40px","height":"40px","borderRadius":"50%","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"600"}}>FN</div>
                            <div>
                                <div style={{"fontWeight":"500","color":"var(--text-dark)"}}>Favour Nwosu</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>Hostel Accommodation</div>
                            </div>
                        </div>
                        <div style={{"textAlign":"right"}}>
                            <div style={{"fontSize":"11px","fontWeight":"600","color":"#ef4444"}}>Rejected</div>
                            <div style={{"fontSize":"10px","color":"var(--text-light)","marginTop":"2px"}}>5 hours ago</div>
                        </div>
                    </div>

                    {/*  Item 5  */}
                    <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","paddingBottom":"8px"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"40px","height":"40px","borderRadius":"50%","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":"600"}}>TO</div>
                            <div>
                                <div style={{"fontWeight":"500","color":"var(--text-dark)"}}>Tunde Ojo</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>2026 Academic Session</div>
                            </div>
                        </div>
                        <div style={{"textAlign":"right"}}>
                            <div style={{"fontSize":"11px","fontWeight":"600","color":"#f59e0b"}}>Pending</div>
                            <div style={{"fontSize":"10px","color":"var(--text-light)","marginTop":"2px"}}>1 day ago</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
