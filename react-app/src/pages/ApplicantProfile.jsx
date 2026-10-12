
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';

export default function ApplicantProfile() {
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
                    <button onClick={() => navigate(-1)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '12px', fontSize: '13px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <LucideIcon name="arrow-left" style={{ width: '16px', height: '16px' }} /> Back
                    </button>
                    <h2 id="pageSubtitle">Applicant Profile & Details</h2>
                    {/*  <h1 id="pageTitle">David Olamide</h1>  */}
                </div>
            </div>
        </div>

        {/*  Main Content Grid  */}
        <div className="applications-layout">

            
        
        <div className="profile-layout profile-layout-grid">
            {/*  Left Column: Profile Card  */}
            <div className="profile-sidebar">
                <div className="card" style={{"padding":"24px","display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","borderRadius":"16px","background":"var(--card-bg)","border":"1px solid var(--border-color)"}}>
                    <div style={{"width":"96px","height":"96px","borderRadius":"50%","background":"rgba(139, 92, 246, 0.1)","color":"#8b5cf6","display":"flex","alignItems":"center","justifyContent":"center","fontSize":"32px","fontWeight":"600","marginBottom":"16px"}}>
                        DO
                    </div>
                    <h3 style={{"fontSize":"18px","fontWeight":"700","color":"var(--text-dark)","marginBottom":"4px"}}>David Olamide</h3>
                    <p style={{"color":"var(--text-light)","fontSize":"13px","marginBottom":"16px"}}>2026 Academic Session Admission</p>
                    
                    <span className="status-badge" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981","marginBottom":"24px"}}>
                        <LucideIcon name="check-circle" style={{"width":"12px","height":"12px"}} /> Admission Offered
                    </span>

                    <div style={{"width":"100%","borderTop":"1px solid var(--border-color)","marginBottom":"24px"}}></div>
                    
                    <div style={{"width":"100%","textAlign":"left","display":"flex","flexDirection":"column","gap":"16px"}}>
                        <div>
                            <div style={{"fontSize":"11px","color":"var(--text-light)","fontWeight":"500","marginBottom":"4px"}}>Applicant ID</div>
                            <div style={{"fontSize":"13px","color":"var(--text-dark)","fontWeight":"600","fontFamily":"monospace"}}>APP-2026-0842</div>
                        </div>
                        <div>
                            <div style={{"fontSize":"11px","color":"var(--text-light)","fontWeight":"500","marginBottom":"4px"}}>Date of Birth</div>
                            <div style={{"fontSize":"13px","color":"var(--text-dark)","fontWeight":"500"}}>March 14, 2010</div>
                        </div>
                        <div>
                            <div style={{"fontSize":"11px","color":"var(--text-light)","fontWeight":"500","marginBottom":"4px"}}>Gender</div>
                            <div style={{"fontSize":"13px","color":"var(--text-dark)","fontWeight":"500"}}>Male</div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{"padding":"24px","borderRadius":"16px","background":"var(--card-bg)","border":"1px solid var(--border-color)","marginTop":"24px"}}>
                    <h4 style={{"fontSize":"14px","fontWeight":"600","color":"var(--text-dark)","marginBottom":"16px"}}>Father's Info</h4>
                    <div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"32px","height":"32px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="user" style={{"width":"16px","height":"16px"}} />
                            </div>
                            <div>
                                <div style={{"fontSize":"13px","fontWeight":"600","color":"var(--text-dark)"}}>Mr. Olamide</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>Father</div>
                            </div>
                        </div>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"32px","height":"32px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="mail" style={{"width":"16px","height":"16px"}} />
                            </div>
                            <div>
                                <a href="mailto:mr.olamide@example.com" style={{"fontSize":"13px","fontWeight":"500","color":"#10b981","textDecoration":"none"}}>mr.olamide@example.com</a>
                            </div>
                        </div>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"32px","height":"32px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="phone" style={{"width":"16px","height":"16px"}} />
                            </div>
                            <div>
                                <div style={{"fontSize":"13px","fontWeight":"500","color":"var(--text-dark)","fontFamily":"monospace"}}>+234 800 000 0000</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{"padding":"24px","borderRadius":"16px","background":"var(--card-bg)","border":"1px solid var(--border-color)","marginTop":"24px"}}>
                    <h4 style={{"fontSize":"14px","fontWeight":"600","color":"var(--text-dark)","marginBottom":"16px"}}>Mother's Info</h4>
                    <div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"32px","height":"32px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="user" style={{"width":"16px","height":"16px"}} />
                            </div>
                            <div>
                                <div style={{"fontSize":"13px","fontWeight":"600","color":"var(--text-dark)"}}>Mrs. Olamide</div>
                                <div style={{"fontSize":"11px","color":"var(--text-light)"}}>Mother</div>
                            </div>
                        </div>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"32px","height":"32px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="mail" style={{"width":"16px","height":"16px"}} />
                            </div>
                            <div>
                                <a href="mailto:mrs.olamide@example.com" style={{"fontSize":"13px","fontWeight":"500","color":"#10b981","textDecoration":"none"}}>mrs.olamide@example.com</a>
                            </div>
                        </div>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"32px","height":"32px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="phone" style={{"width":"16px","height":"16px"}} />
                            </div>
                            <div>
                                <div style={{"fontSize":"13px","fontWeight":"500","color":"var(--text-dark)","fontFamily":"monospace"}}>+234 800 000 0001</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Right Column: Details Tabs  */}
            <div className="profile-content">
                <div className="card" style={{"padding":"24px","borderRadius":"16px","background":"var(--card-bg)","border":"1px solid var(--border-color)","marginBottom":"24px"}}>
                    <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","marginBottom":"20px"}}>
                        <h4 style={{"fontSize":"16px","fontWeight":"600","color":"var(--text-dark)"}}>Submitted Form Data</h4>
                        <button className="btn-action" style={{"padding":"6px 12px"}}><LucideIcon name="printer" style={{"width":"14px","height":"14px"}} /> Print Application</button>
                    </div>
                    
                    <div className="profile-info-grid">
                        <div>
                            <div style={{"fontSize":"11px","color":"var(--text-light)","fontWeight":"500","marginBottom":"4px"}}>Previous School</div>
                            <div style={{"fontSize":"13px","color":"var(--text-dark)","fontWeight":"500","padding":"12px","background":"rgba(0,0,0,0.02)","borderRadius":"8px","border":"1px solid var(--border-color)"}}>Lagos High School</div>
                        </div>
                        <div>
                            <div style={{"fontSize":"11px","color":"var(--text-light)","fontWeight":"500","marginBottom":"4px"}}>Class Applied For</div>
                            <div style={{"fontSize":"13px","color":"var(--text-dark)","fontWeight":"500","padding":"12px","background":"rgba(0,0,0,0.02)","borderRadius":"8px","border":"1px solid var(--border-color)"}}>Senior Secondary 1 (SS1)</div>
                        </div>
                        <div style={{"gridColumn":"span 2"}}>
                            <div style={{"fontSize":"11px","color":"var(--text-light)","fontWeight":"500","marginBottom":"4px"}}>Home Address</div>
                            <div style={{"fontSize":"13px","color":"var(--text-dark)","fontWeight":"500","padding":"12px","background":"rgba(0,0,0,0.02)","borderRadius":"8px","border":"1px solid var(--border-color)"}}>124 Broad Street, Lagos Island, Lagos, Nigeria</div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{"padding":"24px","borderRadius":"16px","background":"var(--card-bg)","border":"1px solid var(--border-color)","marginBottom":"24px"}}>
                    <h4 style={{"fontSize":"16px","fontWeight":"600","color":"var(--text-dark)","marginBottom":"20px"}}>Uploaded Documents</h4>
                    <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
                        <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","padding":"16px","border":"1px solid var(--border-color)","borderRadius":"12px","transition":"all 0.2s"}}>
                            <div style={{"display":"flex","alignItems":"center","gap":"16px"}}>
                                <div style={{"width":"40px","height":"40px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                    <LucideIcon name="file-text" style={{"width":"20px","height":"20px"}} />
                                </div>
                                <div>
                                    <div style={{"fontSize":"13px","fontWeight":"600","color":"var(--text-dark)"}}>Birth Certificate.pdf</div>
                                    <div style={{"fontSize":"11px","color":"var(--text-light)"}}>1.2 MB</div>
                                </div>
                            </div>
                            <button className="btn-action" style={{"padding":"8px","borderRadius":"8px"}}><LucideIcon name="download" style={{"width":"16px","height":"16px"}} /></button>
                        </div>

                        <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","padding":"16px","border":"1px solid var(--border-color)","borderRadius":"12px","transition":"all 0.2s"}}>
                            <div style={{"display":"flex","alignItems":"center","gap":"16px"}}>
                                <div style={{"width":"40px","height":"40px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                    <LucideIcon name="image" style={{"width":"20px","height":"20px"}} />
                                </div>
                                <div>
                                    <div style={{"fontSize":"13px","fontWeight":"600","color":"var(--text-dark)"}}>Passport Photograph.jpg</div>
                                    <div style={{"fontSize":"11px","color":"var(--text-light)"}}>845 KB</div>
                                </div>
                            </div>
                            <button className="btn-action" style={{"padding":"8px","borderRadius":"8px"}}><LucideIcon name="download" style={{"width":"16px","height":"16px"}} /></button>
                        </div>
                    </div>
                </div>

                <div className="card" style={{"padding":"24px","borderRadius":"16px","background":"var(--card-bg)","border":"1px solid var(--border-color)"}}>
                    <h4 style={{"fontSize":"16px","fontWeight":"600","color":"var(--text-dark)","marginBottom":"20px"}}>Payment History</h4>
                    <div style={{"width":"100%","overflowX":"auto"}}>
                        <table className="modern-table" style={{"width":"100%"}}>
                            <thead>
                                <tr>
                                    <th style={{"padding":"12px 16px","fontSize":"11px"}}>FEE TYPE</th>
                                    <th style={{"padding":"12px 16px","fontSize":"11px"}}>AMOUNT</th>
                                    <th style={{"padding":"12px 16px","fontSize":"11px"}}>DATE</th>
                                    <th style={{"padding":"12px 16px","fontSize":"11px"}}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{"padding":"16px","fontSize":"13px","fontWeight":"500"}}>Application Form Fee</td>
                                    <td style={{"padding":"16px","fontSize":"13px","fontFamily":"monospace","fontWeight":"600"}}>₦15,000</td>
                                    <td style={{"padding":"16px","fontSize":"12px","color":"var(--text-light)"}}>Oct 08, 2026</td>
                                    <td style={{"padding":"16px"}}>
                                        <span className="status-badge" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981","padding":"4px 8px","fontSize":"10px"}}>Paid</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    
    

    {/*  Script Logic  */}
    </>
  );
}
