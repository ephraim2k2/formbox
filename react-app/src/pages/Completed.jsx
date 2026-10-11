import React, { useEffect } from 'react';
import { Search, Filter, Eye, Download, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export default function Completed() {
  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.filter-bar', { y: 20, opacity: 0 });
    gsap.set('.table-wrapper', { y: 30, opacity: 0 });

    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.filter-bar', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .to('.table-wrapper', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
  }, []);

  return (
    <>
<header className="header-content" style={{ opacity: 1, transform: 'none' }}>
        <div>
          <p className="welcome-text">Review completely submitted and paid applications</p>
          <h1 className="page-title">Completed Applications </h1>
        </div>
        <div className="action-buttons">
          <button className="btn-secondary">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      <div className="filter-bar" style={{ opacity: 1, transform: 'none' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flex: 1 }}>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search applicants or IDs..." className="search-input" />
          </div>
          <button className="btn-secondary">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <select className="form-input" style={{ width: '220px' }}>
            <option>All Forms</option>
            <option>2026 Academic Session</option>
            <option>Staff Recruitment</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper" style={{ opacity: 1, transform: 'none' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Applicant Details</th>
              <th>Form Title</th>
              <th>Payment Status</th>
              <th>Submission Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td>
                <div style={{ fontWeight: 500, color: 'var(--text-dark)' }}>David Olamide</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>APP-2026-001</div>
              </td>
              <td>2026 Academic Session</td>
              <td>
                <span className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Paid (₦15,000)
                </span>
              </td>
              <td>Oct 24, 2025</td>
              <td>
                <div className="action-cell">
                  <button className="btn-action" title="View Full Profile"><Eye size={16} /></button>
                  <button className="btn-action" title="Download Documents"><Download size={16} /></button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr>
              <td>
                <div style={{ fontWeight: 500, color: 'var(--text-dark)' }}>Grace Adegoke</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>APP-REC-045</div>
              </td>
              <td>Staff Recruitment</td>
              <td>
                <span className="status-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                  Free Form
                </span>
              </td>
              <td>Oct 23, 2025</td>
              <td>
                <div className="action-cell">
                  <button className="btn-action" title="View Full Profile"><Eye size={16} /></button>
                  <button className="btn-action" title="Download Documents"><Download size={16} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="pagination-container" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="pagination-info">Showing 1 to 2 of 1,245 entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">63</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
</div>
    </>
  );
}
