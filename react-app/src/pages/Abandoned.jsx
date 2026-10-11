import React, { useEffect } from 'react';
import { Search, Filter, Mail, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import gsap from 'gsap';

export default function Abandoned() {
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
          <p className="welcome-text">Follow up on applications that were not completed</p>
          <h1 className="page-title">Abandoned Applications ⚠️</h1>
        </div>
      </header>

      <div className="filter-bar" style={{ opacity: 1, transform: 'none' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flex: 1 }}>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search by name, email, or form..." className="search-input" />
          </div>
          <button className="btn-secondary">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <select className="form-input" style={{ width: '220px' }}>
            <option>All Abandonment Stages</option>
            <option>Stopped at Payment</option>
            <option>Stopped at Documents</option>
            <option>Stopped at Personal Info</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper" style={{ opacity: 1, transform: 'none' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Applicant Name & Contact</th>
              <th>Form Title</th>
              <th>Drop-off Stage</th>
              <th>Last Active</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <td>
                <div style={{ fontWeight: 500, color: 'var(--text-dark)' }}>Sarah Adekola</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>sarah.a@example.com</div>
              </td>
              <td>2026 Academic Session</td>
              <td>
                <span className="status-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  <AlertCircle size={12} style={{ marginRight: '4px' }} /> Payment Page
                </span>
              </td>
              <td>2 hours ago</td>
              <td>
                <div className="action-cell">
                  <button className="btn-action" title="Send Reminder Email"><Mail size={16} /></button>
                  <button className="btn-action" style={{ color: '#ef4444' }} title="Delete Record"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr>
              <td>
                <div style={{ fontWeight: 500, color: 'var(--text-dark)' }}>Michael Ezenwa</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>m.ezenwa@example.com</div>
              </td>
              <td>Staff Recruitment</td>
              <td>
                <span className="status-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <AlertCircle size={12} style={{ marginRight: '4px' }} /> Document Upload
                </span>
              </td>
              <td>1 day ago</td>
              <td>
                <div className="action-cell">
                  <button className="btn-action" title="Send Reminder Email"><Mail size={16} /></button>
                  <button className="btn-action" style={{ color: '#ef4444' }} title="Delete Record"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="pagination-container" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="pagination-info">Showing 1 to 2 of 45 entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <span className="page-dots">...</span>
            <button className="page-btn">5</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
</div>
    </>
  );
}
