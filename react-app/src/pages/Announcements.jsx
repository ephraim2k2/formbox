
import React, { useEffect } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';

import { useState } from 'react';

export default function Announcements() {
  const [activeTab, setActiveTab] = useState('compose');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [composeData, setComposeData] = useState({ audience: '', subject: '', message: '' });

  const openTemplate = (title, body) => {
      setSelectedTemplate({ audience: 'all', subject: title, message: body });
  };
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
                    <h1 id="pageTitle">New Announcement</h1>
                    <h2 id="pageSubtitle">Communicate directly with your applicant groups</h2>
                </div>
            </div>
        </div>

        {/*  Main Content Grid  */}
        <div className="announcement-layout">

            {/*  Sidebar  */}
            <div className="announcement-sidebar">
                <div className={`sidebar-item ${activeTab === 'compose' ? 'active' : ''}`} onClick={() => setActiveTab('compose')}>
                    <LucideIcon name="edit-3" style={{"width":"18px","height":"18px"}} /> Compose
                </div>
                <div className={`sidebar-item ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>
                    <LucideIcon name="layout-template" style={{"width":"18px","height":"18px"}} /> Templates
                </div>
                <div className={`sidebar-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                    <LucideIcon name="history" style={{"width":"18px","height":"18px"}} /> History
                </div>
            </div>

            {/*  Content Area  */}
            <div className="announcement-content">

                {/*  Tab: Compose  */}
                <div id="tab-compose" className={`tab-pane ${activeTab === 'compose' ? 'active' : ''}`}>
                    <div className="composer-container" id="composerCard">

                        <div className="form-group">
                            <label htmlFor="audience">Target Audience</label>
                            <select id="audience" className="form-control" value={composeData.audience} onChange={(e) => setComposeData({...composeData, audience: e.target.value})}>
                                <option value="" disabled>Select who will receive this message...</option>
                                <option value="all">All Candidates</option>
                                <option value="admitted">Admitted Candidates</option>
                                <option value="pending">Pending Reviews</option>
                                <option value="rejected">Rejected Candidates</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Announcement Subject</label>
                            <input type="text" id="subject" className="form-control"
                                placeholder="E.g., Important update regarding your application status" value={composeData.subject} onChange={(e) => setComposeData({...composeData, subject: e.target.value})} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message Body</label>
                            <textarea id="message" className="form-control"
                                placeholder="Write your announcement here..." value={composeData.message} onChange={(e) => setComposeData({...composeData, message: e.target.value})}></textarea>
                        </div>

                        <div className="composer-actions">
                            <button className="btn-secondary">Save as Draft</button>
                            <button className="btn-primary">
                                <LucideIcon name="send" style={{"width":"18px","height":"18px"}} /> Send Announcement
                            </button>
                        </div>
                    </div>
                </div>

            {/*  Tab: Templates  */}
            <div id="tab-templates" className={`tab-pane ${activeTab === 'templates' ? 'active' : ''}`}>
                <div className="template-grid">
                    <div className="template-card" onClick={() => openTemplate('Application Status Update', 'Your application has moved to the next stage.')}>
                        <div className="template-title">Application Status Update</div>
                        <div className="template-desc">Standard template for notifying users that their application has
                            moved to the next stage.</div>
                    </div>
                    <div className="template-card" onClick={() => openTemplate('Missing Documents', 'Please upload the following missing documents to proceed.')}>
                        <div className="template-title">Missing Documents</div>
                        <div className="template-desc">Template for requesting additional files from pending or incomplete
                            applicants.</div>
                    </div>
                    <div className="template-card" onClick={() => openTemplate('Payment Reminder', 'This is a friendly reminder to complete your application fee payment.')}>
                        <div className="template-title">Payment Reminder</div>
                        <div className="template-desc">Friendly reminder for candidates who haven't completed their
                            application fee payment.</div>
                    </div>
                    <div className="template-card" onClick={() => openTemplate('Welcome / Onboarding', 'Welcome to the new academic session! Here are your next steps.')}>
                        <div className="template-title">Welcome / Onboarding</div>
                        <div className="template-desc">Welcome message sent to newly admitted candidates containing next
                            steps.</div>
                    </div>
                </div>
            </div>

            {/*  Tab: History  */}
            <div id="tab-history" className={`tab-pane ${activeTab === 'history' ? 'active' : ''}`}>
                <div className="history-list">
                    <div className="history-item">
                        <div>
                            <div className="history-title">Welcome to the Fall 2026 Cohort!</div>
                            <div className="history-meta">
                                <span>Target: Admitted Candidates</span>
                                <span>•</span>
                                <span>Sent: Oct 2, 2026 (10:00 AM)</span>
                            </div>
                        </div>
                        <div className="status-sent">Sent (420)</div>
                    </div>
                    <div className="history-item">
                        <div>
                            <div className="history-title">Action Required: Upload Missing Documents</div>
                            <div className="history-meta">
                                <span>Target: Pending Reviews</span>
                                <span>•</span>
                                <span>Sent: Sep 28, 2026 (2:15 PM)</span>
                            </div>
                        </div>
                        <div className="status-sent">Sent (85)</div>
                    </div>
                    <div className="history-item">
                        <div>
                            <div className="history-title">System Maintenance Notice</div>
                            <div className="history-meta">
                                <span>Target: All Candidates</span>
                                <span>•</span>
                                <span>Sent: Sep 15, 2026 (9:00 AM)</span>
                            </div>
                        </div>
                        <div className="status-sent">Sent (2,104)</div>
                    </div>
                </div>
            </div>
        </div> {/*  Close announcement-content  */}
    </div> {/*  Close announcement-layout  */}

    {/*  Template Preview Modal  */}
    <div className={`modal-overlay ${selectedTemplate ? 'active' : ''}`} id="templateModalOverlay" onClick={() => setSelectedTemplate(null)}>
        <div className="create-form-modal modal-container" id="templateModal" onClick={(e) => e.stopPropagation()} style={{"maxWidth":"600px"}}>
            <div className="modal-header">
                <h3>Preview Template</h3>
                <button className="close-btn modal-close" onClick={() => setSelectedTemplate(null)}>
                    <LucideIcon name="x" style={{"width":"20px","height":"20px"}} />
                </button>
            </div>
            {selectedTemplate && (
            <div className="modal-body">
                <div className="form-group">
                    <label>Target Audience</label>
                    <select id="modalAudience" className="form-control" value={selectedTemplate.audience} onChange={(e) => setSelectedTemplate({...selectedTemplate, audience: e.target.value})}>
                        <option value="all">All Candidates</option>
                        <option value="admitted">Admitted Candidates</option>
                        <option value="pending">Pending Reviews</option>
                        <option value="rejected">Rejected Candidates</option>
                    </select>
                </div>
                <div className="form-group" style={{marginTop: "16px"}}>
                    <label>Announcement Subject</label>
                    <input type="text" id="modalSubject" className="form-control" value={selectedTemplate.subject} onChange={(e) => setSelectedTemplate({...selectedTemplate, subject: e.target.value})} />
                </div>
                <div className="form-group" style={{marginTop: "16px"}}>
                    <label>Message Body</label>
                    <textarea id="modalMessage" className="form-control" style={{"minHeight":"150px"}} value={selectedTemplate.message} onChange={(e) => setSelectedTemplate({...selectedTemplate, message: e.target.value})}></textarea>
                </div>
                <div style={{"display":"flex","justifyContent":"flex-end","gap":"12px","marginTop":"24px"}}>
                    <button className="btn-secondary" onClick={() => setSelectedTemplate(null)}>Cancel</button>
                    <button className="btn-primary" onClick={() => {
                        setComposeData(selectedTemplate);
                        setSelectedTemplate(null);
                        setActiveTab('compose');
                    }}>Use Template</button>
                </div>
            </div>
            )}
        </div>
        </div>

    {/*  Theme Toggle Script  */}
    </>
  );
}
