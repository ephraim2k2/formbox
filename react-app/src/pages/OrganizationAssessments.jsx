import React, { useEffect, useState } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';

/*
 * Organization-only page: Assessment Invitations.
 * Independent from the school ExamSlip page so each role can evolve on its own.
 * Sample data is static; swap for API data when the backend is connected.
 */

const INVITES = [
  {
    id: 'APP-0016',
    name: 'Chukwudi Ike',
    initials: 'CI',
    programme: 'Graduate Trainee 2026',
    contact: 'ike.chukwudi@example.com',
    venue: 'Lagos Assessment Centre',
    address: 'Plot 12, Admiralty Way, Lekki Phase 1, Lagos.',
    date: 'Oct 15, 2026',
    time: '10:00 AM',
    status: 'issued',
  },
  {
    id: 'APP-73921',
    name: 'Sarah Johnson',
    initials: 'SJ',
    programme: 'Experienced Hire – Finance',
    contact: 'sarah.johnson@example.com',
    venue: 'Abuja Assessment Hub',
    address: 'Block C, Central Business District, Abuja.',
    date: 'Oct 12, 2026',
    time: '11:30 AM',
    status: 'pending',
  },
  {
    id: 'APP-55410',
    name: 'Emeka Uchenna',
    initials: 'EU',
    programme: 'Tech Fellowship Cohort 4',
    contact: 'emeka.uchenna@example.com',
    venue: 'Port Harcourt Assessment Centre',
    address: '24 Aba Road, Port Harcourt.',
    date: 'Oct 13, 2026',
    time: '09:00 AM',
    status: 'issued',
  },
];

export default function OrganizationAssessments() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Assessment Invitations</h1>
            <h2>Issue and manage assessment invites with venue and schedule details</h2>
          </div>
        </div>
      </div>

      <div className="applications-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input type="text" placeholder="Search by applicant, ID or assessment centre..." />
          </div>
          <div className="filter-group">
            <select className="filter-select">
              <option value="all">All Statuses</option>
              <option value="issued">Issued</option>
              <option value="pending">Pending</option>
            </select>
            <button className="btn-primary">
              <LucideIcon name="send" style={{ width: '16px', height: '16px' }} /> Issue All
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Applicant</th>
                <th>Programme</th>
                <th>Assessment Centre &amp; Time</th>
                <th>Invite Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {INVITES.map((inv, idx) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: '500', color: 'var(--text-light)' }}>{idx + 1}</td>
                  <td>
                    <div className="user-meta">
                      <div className="user-avatar-sm">{inv.initials}</div>
                      <div className="user-info">
                        <span className="name">{inv.name}</span>
                        <span className="email">ID: {inv.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
                      <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{inv.programme}</span>
                      <span style={{ color: 'var(--text-light)' }}>{inv.contact}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
                      <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{inv.venue}</span>
                      <span style={{ color: 'var(--text-light)' }}>{inv.date} • {inv.time}</span>
                    </div>
                  </td>
                  <td>
                    {inv.status === 'issued' ? (
                      <span className="status-badge status-generated">
                        <LucideIcon name="check-circle" style={{ width: '12px', height: '12px' }} /> Issued
                      </span>
                    ) : (
                      <span className="status-badge status-pending">
                        <LucideIcon name="clock" style={{ width: '12px', height: '12px' }} /> Pending
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {inv.status === 'issued' ? (
                        <>
                          <button className="btn-action" title="View Invitation" onClick={() => setSelected(inv)}>
                            <LucideIcon name="eye" style={{ width: '14px', height: '14px' }} />
                          </button>
                          <button className="btn-action" title="Download PDF">
                            <LucideIcon name="download" style={{ width: '14px', height: '14px' }} />
                          </button>
                        </>
                      ) : (
                        <button className="btn-generate">
                          <LucideIcon name="send" style={{ width: '14px', height: '14px' }} /> Issue
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-info">Showing 1 to {INVITES.length} of {INVITES.length} entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn"><LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} /></button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="modal-overlay active" onClick={() => setSelected(null)}>
          <div className="exam-slip-modal modal-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none', maxWidth: '800px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: 'flex-end' }}>
              <button className="modal-print-btn" onClick={() => window.print()}>
                <LucideIcon name="printer" style={{ width: '14px', height: '14px' }} /> Print
              </button>
              <button className="modal-close-btn" onClick={() => setSelected(null)}>
                <LucideIcon name="x" style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            <div className="slip-modal" style={{ margin: 0, width: '100%', background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <div className="slip-header" style={{ background: '#0052cc', color: 'white', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="slip-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="building-2" style={{ width: '26px', height: '26px', color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>Your Organization</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Assessment Invitation</div>
                  </div>
                </div>
                <div className="slip-title" style={{ textAlign: 'right' }}>
                  <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>{selected.programme}</h1>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{selected.id}</p>
                </div>
              </div>

              <div className="slip-body">
                <div className="slip-left">
                  <div className="candidate-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff6ff', color: '#3b82f6', fontSize: '28px', fontWeight: 700 }}>
                    {selected.initials}
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
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{selected.name}</h2>
                    <span style={{ fontSize: '14px', color: '#64748b', fontFamily: 'monospace', fontWeight: 600 }}>Applicant ID: {selected.id}</span>
                  </div>

                  <div className="info-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    <div className="info-group">
                      <span className="info-label">Programme</span>
                      <span className="info-value" style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{selected.programme}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Applicant ID</span>
                      <span className="info-value highlight" style={{ fontSize: '15px', fontWeight: 700, color: '#0052cc' }}>{selected.id}</span>
                    </div>
                    <div className="info-group" style={{ gridColumn: 'span 2' }}>
                      <span className="info-label">Assessment Centre</span>
                      <span className="info-value" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>{selected.venue} — {selected.address}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Assessment Date</span>
                      <span className="info-value red" style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444' }}>{selected.date}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Time</span>
                      <span className="info-value red" style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444' }}>{selected.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slip-footer">
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ color: '#f43f5e', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase' }}>IMPORTANT NOTE: </span>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '13px', textTransform: 'uppercase' }}>
                    This invitation confirms your assessment slot. Please bring it to the assessment centre.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '12px', lineHeight: 1.6, flex: 1, minWidth: '280px' }}>
                    <li>Please arrive at the assessment centre at least <strong>15 minutes</strong> before the scheduled time.</li>
                    <li>Bring a printed or digital copy of this invitation alongside a valid photo ID.</li>
                    <li>Mobile phones must be switched off during the assessment.</li>
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
