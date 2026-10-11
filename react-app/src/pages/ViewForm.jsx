
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';

export default function ViewForm() {
  const navigate = useNavigate();

  useEffect(() => {
    
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
                    <button onClick={() => navigate('/forms')} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '12px', fontSize: '13px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <LucideIcon name="arrow-left" style={{ width: '16px', height: '16px' }} /> Back to Forms
                    </button>
                    <h2 id="pageSubtitle">Submissions for General Admission</h2>
                    <h1 id="pageTitle">2026 Academic Session Admission</h1>
                </div>
            </div>
        </div>

        {/*  Main Content Grid  */}
        <div className="applications-layout">

            
        <div className="filter-bar">
            <div className="search-box">
                <LucideIcon name="search" style={{"width":"16px","height":"16px"}} />
                <input type="text" placeholder="Search submissions by student name..." />
            </div>
            <div className="filter-group">
                <button className="btn-primary" >
                    <LucideIcon name="download" style={{"width":"16px","height":"16px"}} /> Export to CSV
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
                            <th>Parent</th>
                            <th>Parent Email</th>
                            <th>Parent Phone Number</th>
                            <th>Payment Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td style={{"fontWeight":"500","color":"var(--text-light)"}}>1</td>
                            <td>
                                <div className="user-meta">
                                    <div className="user-avatar-sm">DO</div>
                                    <div className="user-info">
                                        <span className="name">David Olamide</span>
                                    </div>
                                </div>
                            </td>
                            <td style={{"fontWeight":"500","color":"var(--text-dark)"}}>Mr. Olamide</td>
                            <td><a href="mailto:mr.olamide@example.com"
                                    style={{"color":"#0052cc","textDecoration":"none"}}>mr.olamide@example.com</a></td>
                            <td style={{"fontFamily":"monospace","color":"var(--text-light)"}}>+234 800 000 0000</td>
                            <td>Oct 08, 2026</td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Details" onClick={() => navigate('/applicant-profile')}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Download Receipt">
                                        <LucideIcon name="download" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{"fontWeight":"500","color":"var(--text-light)"}}>2</td>
                            <td>
                                <div className="user-meta">
                                    <div className="user-avatar-sm">SJ</div>
                                    <div className="user-info">
                                        <span className="name">Sarah Johnson</span>
                                    </div>
                                </div>
                            </td>
                            <td style={{"fontWeight":"500","color":"var(--text-dark)"}}>Mrs. Johnson</td>
                            <td><a href="mailto:mrs.johnson@example.com"
                                    style={{"color":"#0052cc","textDecoration":"none"}}>mrs.johnson@example.com</a></td>
                            <td style={{"fontFamily":"monospace","color":"var(--text-light)"}}>+234 811 111 1111</td>
                            <td>Oct 07, 2026</td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Details" onClick={() => navigate('/applicant-profile')}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Download Receipt">
                                        <LucideIcon name="download" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td style={{"fontWeight":"500","color":"var(--text-light)"}}>3</td>
                            <td>
                                <div className="user-meta">
                                    <div className="user-avatar-sm">EU</div>
                                    <div className="user-info">
                                        <span className="name">Emeka Uchenna</span>
                                    </div>
                                </div>
                            </td>
                            <td style={{"fontWeight":"500","color":"var(--text-dark)"}}>Dr. Uchenna</td>
                            <td><a href="mailto:dr.uchenna@example.com"
                                    style={{"color":"#0052cc","textDecoration":"none"}}>dr.uchenna@example.com</a></td>
                            <td style={{"fontFamily":"monospace","color":"var(--text-light)"}}>+234 822 222 2222</td>
                            <td>Oct 06, 2026</td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Details" onClick={() => navigate('/applicant-profile')}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Download Receipt">
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
    

    {/*  Script Logic  */}
    </>
  );
}
