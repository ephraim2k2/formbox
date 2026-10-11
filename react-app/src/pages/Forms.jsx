
import React, { useEffect } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';
import CreateFormModal from '../components/CreateFormModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Forms() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    
    const tl = gsap.timeline();
    // Default fallback animation
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    if (viewMode === 'grid') {
      gsap.fromTo('.form-card', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    } else {
      gsap.fromTo('.modern-table tbody tr', 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [viewMode]);

  return (
    <>
<div className="header-content">
            <div className="welcome-section">
                <div className="welcome-text">
                    <h1 id="pageTitle">Forms Library</h1>
                    <h2 id="pageSubtitle">Manage school application forms</h2>
                </div>
            </div>
        </div>

        {/*  Main Content Grid  */}
        <div className="applications-layout">

            
        <div className="filter-bar">
            <div className="search-box">
                <LucideIcon name="search" style={{"width":"16px","height":"16px"}} />
                <input type="text" placeholder="Search forms by name..." />
            </div>
            <div className="filter-group">
                <div className="view-toggle" style={{"display":"flex","background":"var(--card-bg)","border":"1px solid var(--border-color)","borderRadius":"8px","overflow":"hidden","marginRight":"8px"}}>
                    <button id="btnListView" className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`} style={{border:"none",borderRadius:"0",padding:"0 12px",width:"auto",height:"34px",...(viewMode === 'list' ? {background:"rgba(0, 82, 204, 0.1)",color:"#0052cc"} : {})}} onClick={() => setViewMode('list')}>
                        <LucideIcon name="list" style={{"width":"16px","height":"16px"}} />
                    </button>
                    <button id="btnCardView" className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`} style={{border:"none",borderRadius:"0",padding:"0 12px",width:"auto",height:"34px",...(viewMode === 'grid' ? {background:"rgba(0, 82, 204, 0.1)",color:"#0052cc"} : {})}} onClick={() => setViewMode('grid')}>
                        <LucideIcon name="grid" style={{"width":"16px","height":"16px"}} />
                    </button>
                </div>
                <select className="filter-select">
                    <option>All Statuses</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
                <button className="btn-primary"  onClick={() => setIsModalOpen(true)}>
                    <LucideIcon name="plus" style={{"width":"16px","height":"16px"}} /> Create New Form
                </button>
            </div>
        </div>


            {/*  Table  */}
            <div className="table-wrapper" style={{ display: viewMode === 'list' ? 'block' : 'none' }}>
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Form Title</th>
                            <th>Submissions</th>
                            <th>Date Created</th>
                            <th>Last Submission</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column"}}>
                                    <span style={{"fontWeight":"600","color":"var(--text-dark)","fontSize":"13px"}}>2026 Academic Session Admission</span>
                                    <span style={{"color":"var(--text-light)","fontSize":"11px","marginTop":"2px"}}>General Admission</span>
                                </div>
                            </td>
                            <td>
                                <span style={{"fontWeight":"600","color":"#0052cc","fontSize":"13px"}}>1,245</span>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Sep 01, 2026</span>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Oct 08, 2026</span>
                                    <span style={{"color":"var(--text-light)"}}>11:42 AM</span>
                                </div>
                            </td>
                            <td>
                                <span className="status-badge" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981"}}>
                                    <LucideIcon name="check-circle" style={{"width":"12px","height":"12px"}} /> Completed
                                </span>
                            </td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Form" onClick={() => navigate('/view-form')}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Edit Form">
                                        <LucideIcon name="edit" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Share Link">
                                        <LucideIcon name="share-2" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Delete Form" style={{"color":"#ef4444","borderColor":"rgba(239, 68, 68, 0.2)"}}>
                                        <LucideIcon name="trash-2" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column"}}>
                                    <span style={{"fontWeight":"600","color":"var(--text-dark)","fontSize":"13px"}}>Staff Recruitment Application</span>
                                    <span style={{"color":"var(--text-light)","fontSize":"11px","marginTop":"2px"}}>HR Dept</span>
                                </div>
                            </td>
                            <td>
                                <span style={{"fontWeight":"600","color":"#0052cc","fontSize":"13px"}}>342</span>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Sep 15, 2026</span>
                                </div>
                            </td>
                            <td>
                                <div style={{"display":"flex","flexDirection":"column","fontSize":"12px"}}>
                                    <span style={{"fontWeight":"500","color":"var(--text-dark)"}}>Oct 07, 2026</span>
                                    <span style={{"color":"var(--text-light)"}}>04:15 PM</span>
                                </div>
                            </td>
                            <td>
                                <span className="status-badge" style={{"background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6"}}>
                                    <LucideIcon name="loader-2" style={{"width":"12px","height":"12px"}} /> In Progress
                                </span>
                            </td>
                            <td>
                                <div style={{"display":"flex","gap":"8px"}}>
                                    <button className="btn-action" title="View Form" onClick={() => navigate('/view-form')}>
                                        <LucideIcon name="eye" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Edit Form">
                                        <LucideIcon name="edit" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Share Link">
                                        <LucideIcon name="share-2" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                    <button className="btn-action" title="Delete Form" style={{"color":"#ef4444","borderColor":"rgba(239, 68, 68, 0.2)"}}>
                                        <LucideIcon name="trash-2" style={{"width":"14px","height":"14px"}} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="pagination-container" style={{"borderTop":"1px solid var(--border-color)"}}>
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
        
            {/*  Cards View  */}
            <div className="cards-wrapper" id="cardsWrapper" style={{"display": viewMode === 'grid' ? 'block' : 'none',"paddingTop":"10px"}}>
                <div className="cards-grid">
                    <div className="form-card card">
                        <div className="card-header">
                            <span className="status-badge" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981"}}>
                                <LucideIcon name="check-circle" style={{"width":"12px","height":"12px"}} /> Completed
                            </span>
                            <div style={{"display":"flex","gap":"8px"}}>
                                <button className="btn-action" title="Edit Form" style={{"padding":"6px","border":"none"}}><LucideIcon name="edit" style={{"width":"14px","height":"14px"}} /></button>
                                <button className="btn-action" title="Delete Form" style={{"padding":"6px","border":"none","color":"#ef4444"}}><LucideIcon name="trash-2" style={{"width":"14px","height":"14px"}} /></button>
                            </div>
                        </div>
                        <h3 className="card-title">2026 Academic Session Admission</h3>
                        <p className="card-subtitle">General Admission</p>
                        
                        <div className="card-stats">
                            <div className="stat-item">
                                <span className="stat-label">Submissions</span>
                                <span className="stat-value" style={{"color":"#0052cc"}}>1,245</span>
                            </div>
                        </div>
                        
                        <div className="card-meta">
                            <div><span className="meta-label">Created:</span> Sep 01, 2026</div>
                            <div><span className="meta-label">Last Sub:</span> Oct 08, 2026</div>
                        </div>
                        
                        <div className="card-actions">
                            <button className="btn-action" style={{"flex":"1"}} onClick={() => navigate('/view-form')}><LucideIcon name="eye" style={{"width":"14px","height":"14px"}} /> View Details</button>
                            <button className="btn-action" style={{"flex":"1"}}><LucideIcon name="share-2" style={{"width":"14px","height":"14px"}} /> Share Link</button>
                        </div>
                    </div>
                    
                    <div className="form-card card">
                        <div className="card-header">
                            <span className="status-badge" style={{"background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6"}}>
                                <LucideIcon name="loader-2" style={{"width":"12px","height":"12px"}} /> In Progress
                            </span>
                            <div style={{"display":"flex","gap":"8px"}}>
                                <button className="btn-action" title="Edit Form" style={{"padding":"6px","border":"none"}}><LucideIcon name="edit" style={{"width":"14px","height":"14px"}} /></button>
                                <button className="btn-action" title="Delete Form" style={{"padding":"6px","border":"none","color":"#ef4444"}}><LucideIcon name="trash-2" style={{"width":"14px","height":"14px"}} /></button>
                            </div>
                        </div>
                        <h3 className="card-title">Staff Recruitment Application</h3>
                        <p className="card-subtitle">HR Dept</p>
                        
                        <div className="card-stats">
                            <div className="stat-item">
                                <span className="stat-label">Submissions</span>
                                <span className="stat-value" style={{"color":"#0052cc"}}>342</span>
                            </div>
                        </div>
                        
                        <div className="card-meta">
                            <div><span className="meta-label">Created:</span> Sep 15, 2026</div>
                            <div><span className="meta-label">Last Sub:</span> Oct 07, 2026</div>
                        </div>
                        
                        <div className="card-actions">
                            <button className="btn-action" style={{"flex":"1"}} onClick={() => navigate('/view-form')}><LucideIcon name="eye" style={{"width":"14px","height":"14px"}} /> View Details</button>
                            <button className="btn-action" style={{"flex":"1"}}><LucideIcon name="share-2" style={{"width":"14px","height":"14px"}} /> Share Link</button>
                        </div>
                    </div>
                </div>
                
                {/*  Pagination for Cards View  */}
                <div className="pagination-container" style={{"marginTop":"24px","padding":"16px 24px","background":"var(--card-bg)","borderRadius":"16px","border":"1px solid var(--border-color)"}}>
                    <div className="pagination-info">Showing 1 to 10 of 50 entries</div>
                    <div className="pagination-controls">
                        <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{"width":"16px","height":"16px"}} /></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <span className="page-dots">...</span>
                        <button className="page-btn">5</button>
                        <button className="page-btn"><LucideIcon name="chevron-right" style={{"width":"16px","height":"16px"}} /></button>
                            </div>
    </div>
    
    
            </div>
    

    
</div>
{/* Script Logic */}
    
      <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
