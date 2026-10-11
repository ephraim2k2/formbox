
import React, { useEffect, useState } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';


export default function ExamSlip() {
  const [selectedSlip, setSelectedSlip] = useState(null);  useEffect(() => {
    
    const tl = gsap.timeline();
    // Default fallback animation
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  return (
    <>
<div className="header-content">
            <div className="welcome-section">
                <div className="welcome-text">
                    <h1>Candidate Exam Slips</h1>
                    <h2>Generate and print examination slips with allocated venues</h2>
                </div>
            </div>
        </div>

        {/*  Main Content Grid  */}
        <div className="applications-layout">

            <div className="filter-bar">
                <div className="search-box">
                    <LucideIcon name="search" style={{"width":"16px","height":"16px"}} />
                    <input type="text" placeholder="Search by name, ID or venue..." />
                </div>
                <div className="filter-group">
                    {/*  <select className="filter-select">
                        <option value="all">All Venues</option>
                        <option value="lagos">Lagos Center</option>
                        <option value="abuja">Abuja Hub</option>
                        <option value="ph">Port Harcourt</option>
                    </select>  */}
                    <select className="filter-select">
                        <option value="all">All Statuses</option>
                        <option value="generated">Generated</option>
                        <option value="pending">Pending</option>
                    </select>
                    <button className="btn-primary">
                        <LucideIcon name="printer" style={{"width":"16px","height":"16px"}} /> Generate All
                    </button>
                </div>
            </div>

            {/*  Table  */}
            <div className="table-wrapper">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Student</th>
                            <th>Parent Details</th>
                            <th>Venue & Time</th>
                            <th>Slip Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                                                <tr>
                            <td style={{"fontWeight":"500","color":"var(--text-light)"}}>1</td>
                            <td>
                                <div className="user-meta">
                                    <div className="user-avatar-sm" style={{"overflow":"hidden","padding":"0"}}>
                                        <img src="candidate_photo.png" alt="IC" style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                                    </div>
                                    <div className="user-info">
                                        <span className="name">Ike, Chukwudi Mike</span>
                                        <span className="email">ID: RSV-0016</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Mr. Ike</span>
                                    <span style={{"color":"var(--text-light)"}}>+234 803 123 4567</span>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Roseville Sec. School</span>
                                    <span style={{"color":"var(--text-light)"}}>June 30, 2025 • 09:00 AM</span>
                                </div>
                            </td>
                            <td>
                                <span className="status-badge status-generated">
                                    <LucideIcon name="check-circle" style={{"width":"12px","height":"12px"}} /> Generated
                                </span>
                            </td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Slip"
                                        onClick={() => setSelectedSlip({
                                            name: 'Ike, Chukwudi Mike',
                                            id: 'RSV-0016',
                                            venue: 'Roseville Secondary School, Plot S-1, Commercial Drive 1 Enugu Life Style & Golf City, Centenary City, Enugu.',
                                            date: 'June 30, 2025',
                                            time: '9:00 AM',
                                            photo: 'candidate_photo.png'
                                        })}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Download PDF">
                                        <LucideIcon name="download" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{"fontWeight":"500","color":"var(--text-light)"}}>2</td>
                            <td>
                                <div className="user-meta">
                                    <div className="user-avatar-sm" style={{"overflow":"hidden","padding":"0"}}>
                                        <img src="candidate_photo.png" alt="SJ" style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                                    </div>
                                    <div className="user-info">
                                        <span className="name">Sarah Johnson</span>
                                        <span className="email">ID: EXT-73921</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Mrs. Johnson</span>
                                    <span style={{"color":"var(--text-light)"}}>+234 811 111 1111</span>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Abuja Hub</span>
                                    <span style={{"color":"var(--text-light)"}}>Oct 12, 2026 • 11:30 AM</span>
                                </div>
                            </td>
                            <td>
                                <span className="status-badge status-pending">
                                    <LucideIcon name="clock" style={{"width":"12px","height":"12px"}} /> Pending
                                </span>
                            </td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-generate" onClick={() => {}}>
                                        <LucideIcon name="settings-2" style={{"width":"14px","height":"14px"}} /> Generate
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{"fontWeight":"500","color":"var(--text-light)"}}>3</td>
                            <td>
                                <div className="user-meta">
                                    <div className="user-avatar-sm" style={{"overflow":"hidden","padding":"0"}}>
                                        <img src="candidate_photo.png" alt="EU" style={{"width":"100%","height":"100%","objectFit":"cover"}} />
                                    </div>
                                    <div className="user-info">
                                        <span className="name">Emeka Uchenna</span>
                                        <span className="email">ID: EXT-55410</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Dr. Uchenna</span>
                                    <span style={{"color":"var(--text-light)"}}>+234 822 222 2222</span>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Port Harcourt</span>
                                    <span style={{"color":"var(--text-light)"}}>Oct 13, 2026 • 09:00 AM</span>
                                </div>
                            </td>
                            <td>
                                <span className="status-badge status-generated">
                                    <LucideIcon name="check-circle" style={{"width":"12px","height":"12px"}} /> Generated
                                </span>
                            </td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Slip"
                                        onClick={() => setSelectedSlip({
                                            name: 'Emeka Uchenna',
                                            id: 'EXT-55410',
                                            venue: 'Port Harcourt',
                                            date: 'Oct 13, 2026',
                                            time: '09:00 AM',
                                            photo: 'candidate_photo.png'
                                        })}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Download PDF">
                                        <LucideIcon name="download" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <div className="pagination-info">Showing 1 to 10 of 50 entries</div>
                <div className="pagination-controls">
                    <button className="page-btn" disabled><LucideIcon name="chevron-left"
                            style={{"width":"16px","height":"16px"}} /></button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span className="page-dots">...</span>
                    <button className="page-btn">5</button>
                    <button className="page-btn"><LucideIcon name="chevron-right"
                            style={{"width":"16px","height":"16px"}} /></button>
                </div>
            </div>

        </div>

        {selectedSlip && (
            <div className={`modal-overlay ${selectedSlip ? 'active' : ''}`} onClick={() => setSelectedSlip(null)}>
                <div className="exam-slip-modal modal-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none', maxWidth: '800px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: 'flex-end' }}>
                        <button className="modal-print-btn" onClick={() => window.print()}>
                            <LucideIcon name="printer" style={{ width: '14px', height: '14px' }} /> Print
                        </button>
                        <button className="modal-close-btn" onClick={() => setSelectedSlip(null)}>
                            <LucideIcon name="x" style={{ width: '18px', height: '18px' }} />
                        </button>
                    </div>

                    <div className="slip-modal" style={{ margin: 0, width: '100%', background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                        <div className="slip-header" style={{ background: '#0052cc', color: 'white', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="slip-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <img src="roseville_crest.png" alt="Roseville Academy Crest" style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                                <div>
                                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>Roseville Academy</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Candidate Examination Slip</div>
                                </div>
                            </div>
                            <div className="slip-title" style={{ textAlign: 'right' }}>
                                <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>2026 Academic Session</h1>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{selectedSlip.id}</p>
                            </div>
                        </div>

                        <div className="slip-body">
                            <div className="slip-left">
                                <div className="candidate-photo">
                                    <img src={selectedSlip.photo} alt="Candidate's Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="qr-placeholder">
                                    <svg viewBox="0 0 100 100" width="80" height="80">
                                        <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z" fill="#0f172a" />
                                        <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z" fill="#0f172a" />
                                        <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z" fill="#0f172a" />
                                        <rect x="20" y="20" width="10" height="10" fill="#0f172a" />
                                        <rect x="70" y="20" width="10" height="10" fill="#0f172a" />
                                        <rect x="20" y="70" width="10" height="10" fill="#0f172a" />
                                        <path d="M50,50 h10 v10 h-10 z M60,60 h10 v10 h-10 z M70,50 h10 v10 h-10 z M50,70 h10 v10 h-10 z M80,80 h10 v10 h-10 z M50,80 h10 v10 h-10 z M80,60 h10 v10 h-10 z" fill="#0f172a" />
                                        <path d="M45,10 h10 v10 h-10 z M45,25 h10 v10 h-10 z M10,45 h10 v10 h-10 z M25,45 h10 v10 h-10 z M80,45 h10 v10 h-10 z" fill="#0f172a" />
                                    </svg>
                                </div>
                            </div>

                            <div className="slip-right">
                                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                                    <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{selectedSlip.name}</h2>
                                    <span style={{ fontSize: '14px', color: '#64748b', fontFamily: 'monospace', fontWeight: 600 }}>Exam Number: {selectedSlip.id}</span>
                                </div>

                                <div className="info-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                                    <div className="info-group">
                                        <span className="info-label">Institution</span>
                                        <span className="info-value" style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Roseville Academy</span>
                                    </div>
                                    <div className="info-group">
                                        <span className="info-label">Exam Number</span>
                                        <span className="info-value highlight" style={{ fontSize: '15px', fontWeight: 700, color: '#0052cc' }}>{selectedSlip.id}</span>
                                    </div>
                                    <div className="info-group" style={{ gridColumn: 'span 2' }}>
                                        <span className="info-label">Exam Center</span>
                                        <span className="info-value" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>{selectedSlip.venue}</span>
                                    </div>
                                    <div className="info-group">
                                        <span className="info-label">Exam Date</span>
                                        <span className="info-value red" style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444' }}>{selectedSlip.date}</span>
                                    </div>
                                    <div className="info-group">
                                        <span className="info-label">Time</span>
                                        <span className="info-value red" style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444' }}>{selectedSlip.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="slip-footer">
                            <div style={{ marginBottom: '16px' }}>
                                <span style={{ color: '#f43f5e', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase' }}>IMPORTANT NOTE: </span>
                                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '13px', textTransform: 'uppercase' }}>THIS SLIP ADMITS THE CANDIDATE TO THE EXAMINATION. PLEASE BRING IT TO THE EXAMINATION HALL.</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '12px', lineHeight: 1.6, flex: 1, minWidth: '280px' }}>
                                    <li>Please arrive at the venue at least <strong>30 minutes</strong> before the scheduled time (09:00 AM).</li>
                                    <li>You must bring a printed copy of this slip alongside a valid ID card.</li>
                                    <li>Electronic devices are strictly prohibited in the exam hall.</li>
                                </ul>

                                <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '20px', borderLeft: '1px dashed #cbd5e1' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Powered By</div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                                            <polygon points="12 4 3 9 12 14 21 9 12 4" stroke="#0052cc" fill="white"></polygon>
                                            <polyline points="3 13 12 18 21 13" stroke="#ffcc00"></polyline>
                                            <polyline points="3 17 12 22 21 17" stroke="#0052cc"></polyline>
                                        </svg>
                                        <span style={{ fontSize: '19px', fontWeight: 800, color: '#0052cc', letterSpacing: '-0.5px' }}>form<span style={{ color: '#ffcc00' }}>box</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
}
