
import React, { useEffect } from 'react';
import LucideIcon from '../components/LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

export default function Result() {
  const { terms } = useWorkspace();

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
                    <h1>{terms.results}</h1>
                    <h2>{terms.resultsSubtitle}</h2>
                </div>
            </div>
        </div>

        {/*  Main Content Grid  */}
        <div className="main-content">
            
            <div style={{"display":"grid","gridTemplateColumns":"1fr","gap":"24px","gridColumn":"1 / -1","width":"100%"}}>
                
                {/*  Upload Results Card  */}
                <div className="card" style={{"padding":"24px"}}>
                    <div style={{"display":"flex","alignItems":"flex-start","justifyContent":"space-between","marginBottom":"24px"}}>
                        <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                            <div style={{"width":"40px","height":"40px","borderRadius":"8px","background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                <LucideIcon name="upload-cloud" />
                            </div>
                            <div>
                                <h3 style={{"margin":"0","fontSize":"16px","color":"var(--text-dark)"}}>{terms.uploadCardTitle}</h3>
                                <p style={{"margin":"4px 0 0 0","fontSize":"13px","color":"var(--text-light)"}}>{terms.uploadCardSubtitle}</p>
                            </div>
                        </div>
                        <button className="btn-download-template" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981","border":"none","padding":"8px 16px","fontSize":"13px","fontWeight":"500","borderRadius":"8px","display":"flex","alignItems":"center","gap":"6px","cursor":"pointer","transition":"0.2s"}}>
                            <LucideIcon name="download" style={{"width":"16px","height":"16px"}} /> Download Template
                        </button>
                    </div>
                    
                    <div className="upload-area" style={{"border":"2px dashed var(--border-color)","borderRadius":"12px","padding":"32px","textAlign":"center","background":"rgba(0,0,0,0.01)","cursor":"pointer","transition":"all 0.2s"}}>
                        <LucideIcon name="file-spreadsheet" style={{"width":"32px","height":"32px","color":"var(--text-light)","marginBottom":"12px"}} />
                        <div style={{"fontSize":"14px","fontWeight":"500","color":"var(--text-dark)","marginBottom":"4px"}}>Click to browse or drag and drop</div>
                        <div style={{"fontSize":"12px","color":"var(--text-light)"}}>Supported formats: .csv, .xlsx, .xls</div>
                        
                        <input type="file" style={{"display":"none"}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </div>
                    
                    <button className="btn-primary" style={{"width":"100%","marginTop":"24px","justifyContent":"center"}}>
                        <LucideIcon name="upload" /> {terms.processBtn}
                    </button>
                </div>

                {/*  Auto-Messaging Templates  */}
                <div className="results-templates-grid">
                    {/*  Admitted Template  */}
                    <div className="card" style={{"padding":"24px"}}>
                        <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"20px"}}>
                            <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                                <div style={{"width":"40px","height":"40px","borderRadius":"8px","background":"rgba(16, 185, 129, 0.1)","color":"#10b981","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                    <LucideIcon name="check-circle" />
                                </div>
                                <div>
                                    <h3 style={{"margin":"0","fontSize":"16px","color":"var(--text-dark)"}}>{terms.positiveTemplateTitle}</h3>
                                    <p style={{"margin":"4px 0 0 0","fontSize":"13px","color":"var(--text-light)"}}>Sent automatically upon upload</p>
                                </div>
                            </div>
                            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', background: '#000', color: '#fff', border: 'none' }}>
                                <LucideIcon name="save" style={{ width: '14px', height: '14px' }} /> Save
                            </button>
                        </div>
                        <div className="form-group">
                            <label style={{"display":"block","fontSize":"13px","fontWeight":"500","color":"var(--text-dark)","marginBottom":"8px"}}>Message Content</label>
                            <textarea className="form-input" rows="6" style={{"width":"100%","padding":"12px","border":"1px solid var(--border-color)","borderRadius":"8px","outline":"none","resize":"vertical","boxSizing":"border-box","lineHeight":"1.5","fontSize":"13px"}} defaultValue={terms.positiveMessage}></textarea>
                        </div>
                    </div>
                    
                    {/*  Not Admitted Template  */}
                    <div className="card" style={{"padding":"24px"}}>
                        <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"20px"}}>
                            <div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
                                <div style={{"width":"40px","height":"40px","borderRadius":"8px","background":"rgba(239, 68, 68, 0.1)","color":"#ef4444","display":"flex","alignItems":"center","justifyContent":"center"}}>
                                    <LucideIcon name="x-circle" />
                                </div>
                                <div>
                                    <h3 style={{"margin":"0","fontSize":"16px","color":"var(--text-dark)"}}>{terms.negativeTemplateTitle}</h3>
                                    <p style={{"margin":"4px 0 0 0","fontSize":"13px","color":"var(--text-light)"}}>Sent automatically upon upload</p>
                                </div>
                            </div>
                            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', background: '#000', color: '#fff', border: 'none' }}>
                                <LucideIcon name="save" style={{ width: '14px', height: '14px' }} /> Save
                            </button>
                        </div>
                        <div className="form-group">
                            <label style={{"display":"block","fontSize":"13px","fontWeight":"500","color":"var(--text-dark)","marginBottom":"8px"}}>Message Content</label>
                            <textarea className="form-input" rows="6" style={{"width":"100%","padding":"12px","border":"1px solid var(--border-color)","borderRadius":"8px","outline":"none","resize":"vertical","boxSizing":"border-box","lineHeight":"1.5","fontSize":"13px"}} defaultValue={terms.negativeMessage}></textarea>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </>
  );
}
