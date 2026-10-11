
import React, { useEffect } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';
import CreateFormModal from '../components/CreateFormModal';
import { useState } from 'react';

export default function Templates() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <h1 id="pageTitle">Templates Library</h1>
                    <h2 id="pageSubtitle">Browse and use pre-built form templates</h2>
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
            
            </div>
        
            {/*  Cards View  */}
            <div className="cards-wrapper" id="cardsWrapper" style={{"display":"block","paddingTop":"10px"}}>
                                <div className="cards-grid">
                    {/*  Template 1  */}
                    <div className="form-card card">
                        <div className="card-header">
                            <span className="status-badge" style={{"background":"rgba(16, 185, 129, 0.1)","color":"#10b981"}}>
                                <LucideIcon name="star" style={{"width":"12px","height":"12px"}} /> Popular
                            </span>
                        </div>
                        <h3 className="card-title">Standard Admission Form</h3>
                        <p className="card-subtitle">General templates for new intakes.</p>
                        
                        <div className="card-actions" style={{"marginTop":"16px"}}>
                            <button className="btn-primary" style={{"flex":"1","border":"none","cursor":"pointer","borderRadius":"8px"}} onClick={() => setIsModalOpen(true)}><LucideIcon name="copy" style={{"width":"14px","height":"14px"}} /> Use Template</button>
                        </div>
                    </div>
                    
                    {/*  Template 2  */}
                    <div className="form-card card">
                        <div className="card-header">
                            <span className="status-badge" style={{"background":"rgba(59, 130, 246, 0.1)","color":"#3b82f6"}}>
                                <LucideIcon name="briefcase" style={{"width":"12px","height":"12px"}} /> HR
                            </span>
                        </div>
                        <h3 className="card-title">Staff Recruitment</h3>
                        <p className="card-subtitle">Standardized fields for job applicants.</p>
                        
                        <div className="card-actions" style={{"marginTop":"16px"}}>
                            <button className="btn-primary" style={{"flex":"1","border":"none","cursor":"pointer","borderRadius":"8px"}} onClick={() => setIsModalOpen(true)}><LucideIcon name="copy" style={{"width":"14px","height":"14px"}} /> Use Template</button>
                        </div>
                    </div>

                    {/*  Template 3  */}
                    <div className="form-card card">
                        <div className="card-header">
                            <span className="status-badge" style={{"background":"rgba(139, 92, 246, 0.1)","color":"#8b5cf6"}}>
                                <LucideIcon name="users" style={{"width":"12px","height":"12px"}} /> Survey
                            </span>
                        </div>
                        <h3 className="card-title">Parent Feedback Survey</h3>
                        <p className="card-subtitle">End-of-term feedback collection.</p>
                        
                        <div className="card-actions" style={{"marginTop":"16px"}}>
                            <button className="btn-primary" style={{"flex":"1","border":"none","cursor":"pointer","borderRadius":"8px"}} onClick={() => setIsModalOpen(true)}><LucideIcon name="copy" style={{"width":"14px","height":"14px"}} /> Use Template</button>
                        </div>
                    </div>
                </div>
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
{/* Script Logic */}
    
      <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
