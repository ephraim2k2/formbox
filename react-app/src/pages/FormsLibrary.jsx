import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, List, Grid, Copy, Link as LinkIcon, Edit, Trash2, 
  ChevronLeft, ChevronRight, Plus
} from 'lucide-react';
import gsap from 'gsap';

export default function FormsLibrary() {
  const [view, setView] = useState('list');

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.filter-bar', { y: 20, opacity: 0 });
    gsap.set('.table-wrapper', { y: 30, opacity: 0 });

    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.filter-bar', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .to('.table-wrapper', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
  }, []);

  useEffect(() => {
    if (view === 'card') {
      gsap.fromTo('.form-card', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [view]);

  return (
    <>
<header className="header-content" style={{ opacity: 1, transform: 'none' }}>
        <div>
          <p className="welcome-text">Manage school application forms</p>
          <h1 className="page-title">Forms Library 📝</h1>
        </div>
        <div className="action-buttons">
          <button className="btn-primary">
            <Plus size={18} /> Create new form
          </button>
        </div>
      </header>

      <div className="filter-bar" style={{ opacity: 1, transform: 'none' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flex: 1 }}>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search forms by name or category..." className="search-input" />
          </div>
          <button className="btn-secondary">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <select className="form-input" style={{ width: '180px' }}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>

          <div className="view-toggle" style={{ display: 'flex', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            <button 
              className={`icon-btn ${view === 'list' ? 'active' : ''}`}
              style={view === 'list' ? { border: 'none', borderRadius: 0, padding: '8px 12px', background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc' } : { border: 'none', borderRadius: 0, padding: '8px 12px', background: 'transparent', color: 'inherit' }}
              onClick={() => setView('list')}
            >
              <List size={16} />
            </button>
            <button 
              className={`icon-btn ${view === 'card' ? 'active' : ''}`}
              style={view === 'card' ? { border: 'none', borderRadius: 0, padding: '8px 12px', background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc' } : { border: 'none', borderRadius: 0, padding: '8px 12px', background: 'transparent', color: 'inherit' }}
              onClick={() => setView('card')}
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {view === 'list' ? (
        <div className="table-wrapper" style={{ opacity: 1, transform: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Form Title & Category</th>
                <th>Status</th>
                <th>Submissions</th>
                <th>Revenue (₦)</th>
                <th>Date Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--text-dark)' }}>2026 Academic Session Admission</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>General Admission</div>
                </td>
                <td><span className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Active</span></td>
                <td>1,245</td>
                <td>24,900,000</td>
                <td>Oct 12, 2025</td>
                <td>
                  <div className="action-cell">
                    <button className="btn-action" title="View Submissions"><List size={16} /></button>
                    <button className="btn-action" title="Copy Form Link"><LinkIcon size={16} /></button>
                    <button className="btn-action" title="Edit Form"><Edit size={16} /></button>
                    <button className="btn-action" style={{ color: '#ef4444' }} title="Delete Form"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
              {/* Additional table rows omitted for brevity */}
            </tbody>
          </table>
          <div className="pagination-container" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="pagination-info">Showing 1 to 10 of 50 entries</div>
            <div className="pagination-controls">
              <button className="page-btn" disabled><ChevronLeft size={16} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn">5</button>
              <button className="page-btn"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cards-wrapper" style={{ paddingTop: '10px' }}>
          <div className="cards-grid">
            <div className="form-card card">
              <div className="card-header">
                <span className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Active</span>
                <div className="card-actions-menu">
                  <button className="icon-btn"><Edit size={16} /></button>
                  <button className="icon-btn" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <h3 className="card-title">2026 Academic Session Admission</h3>
              <p className="card-subtitle">General Admission</p>
              
              <div className="card-stats">
                <div className="stat-item">
                  <span className="stat-label">Submissions</span>
                  <span className="stat-value" style={{ color: '#0052cc' }}>1,245</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Revenue</span>
                  <span className="stat-value" style={{ color: '#10b981' }}>₦24.9M</span>
                </div>
              </div>
              
              <div className="card-actions">
                <button className="btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '13px' }}><LinkIcon size={14} /> Link</button>
                <button className="btn-primary" style={{ flex: 1, padding: '8px', fontSize: '13px', border: 'none', cursor: 'pointer', borderRadius: '8px' }}><List size={14} /> View Submissions</button>
              </div>
            </div>
            {/* Additional cards omitted for brevity */}
          </div>
          
          <div className="pagination-container" style={{ marginTop: '24px', padding: '16px 24px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div className="pagination-info">Showing 1 to 10 of 50 entries</div>
            <div className="pagination-controls">
              <button className="page-btn" disabled><ChevronLeft size={16} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn">5</button>
              <button className="page-btn"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
