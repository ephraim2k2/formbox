import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Send, 
  Eye, 
  BellRing, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Lock, 
  X, 
  User, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import gsap from 'gsap';
import './IncompleteApplications.css';

export default function IncompleteApplications() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [progressFilter, setProgressFilter] = useState('all');
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.to('.header-content', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const draftsData = [
    {
      id: 1,
      student: 'Tobi Olamide',
      initials: 'TO',
      parent: 'Mr. Olamide',
      email: 'mr.olamide@example.com',
      phone: '+234 800 000 0000',
      progress: 80,
      stageNumber: 4,
      stageName: 'Document Uploads',
      stageDetail: 'Pending Birth Certificate & Medical Form',
      lastSaved: 'Oct 07, 2026',
      program: '2026 Academic Session Admission',
      steps: [
        { num: 1, name: 'Personal Details', status: 'completed' },
        { num: 2, name: 'Parent & Guardian Info', status: 'completed' },
        { num: 3, name: 'Academic Records', status: 'completed' },
        { num: 4, name: 'Document Uploads', status: 'stopped', pending: 'Birth Certificate (PDF), Medical Fitness Report' },
        { num: 5, name: 'Fee Payment & Submission', status: 'locked' }
      ]
    },
    {
      id: 2,
      student: 'Emma Johnson',
      initials: 'EJ',
      parent: 'Mrs. Johnson',
      email: 'mrs.johnson@example.com',
      phone: '+234 811 111 1111',
      progress: 45,
      stageNumber: 2,
      stageName: 'Parent & Guardian Details',
      stageDetail: 'Emergency Contact & Home Address pending',
      lastSaved: 'Oct 05, 2026',
      program: 'Staff Recruitment & Onboarding',
      steps: [
        { num: 1, name: 'Personal Details', status: 'completed' },
        { num: 2, name: 'Parent & Guardian Info', status: 'stopped', pending: 'Emergency Contact Phone, Verified Home Address' },
        { num: 3, name: 'Academic Records', status: 'locked' },
        { num: 4, name: 'Document Uploads', status: 'locked' },
        { num: 5, name: 'Fee Payment & Submission', status: 'locked' }
      ]
    },
    {
      id: 3,
      student: 'Chioma Uchenna',
      initials: 'CU',
      parent: 'Dr. Uchenna',
      email: 'dr.uchenna@example.com',
      phone: '+234 822 222 2222',
      progress: 15,
      stageNumber: 1,
      stageName: 'Personal Information',
      stageDetail: 'Date of Birth & State of Origin incomplete',
      lastSaved: 'Sep 30, 2026',
      program: 'Undergraduate Transfer Form',
      steps: [
        { num: 1, name: 'Personal Details', status: 'stopped', pending: 'Date of birth, LGA & State of Origin' },
        { num: 2, name: 'Parent & Guardian Info', status: 'locked' },
        { num: 3, name: 'Academic Records', status: 'locked' },
        { num: 4, name: 'Document Uploads', status: 'locked' },
        { num: 5, name: 'Fee Payment & Submission', status: 'locked' }
      ]
    },
    {
      id: 4,
      student: 'Babatunde Raji',
      initials: 'BR',
      parent: 'Alhaji Raji',
      email: 'raji.fam@example.com',
      phone: '+234 802 333 7777',
      progress: 90,
      stageNumber: 5,
      stageName: 'Fee Payment & Checkout',
      stageDetail: 'Payment window timed out at Remita gateway',
      lastSaved: 'Oct 08, 2026',
      program: 'Pre-Degree Science Entrance',
      steps: [
        { num: 1, name: 'Personal Details', status: 'completed' },
        { num: 2, name: 'Parent & Guardian Info', status: 'completed' },
        { num: 3, name: 'Academic Records', status: 'completed' },
        { num: 4, name: 'Document Uploads', status: 'completed' },
        { num: 5, name: 'Fee Payment & Submission', status: 'stopped', pending: 'Form Fee Authentication (₦15,000)' }
      ]
    },
    {
      id: 5,
      student: 'Favour Nwosu',
      initials: 'FN',
      parent: 'Barr. Nwosu',
      email: 'barr.nwosu@example.com',
      phone: '+234 803 888 9999',
      progress: 60,
      stageNumber: 3,
      stageName: 'Academic History',
      stageDetail: 'Previous school transcript upload missing',
      lastSaved: 'Oct 04, 2026',
      program: 'Hostel Accommodation Application',
      steps: [
        { num: 1, name: 'Personal Details', status: 'completed' },
        { num: 2, name: 'Parent & Guardian Info', status: 'completed' },
        { num: 3, name: 'Academic Records', status: 'stopped', pending: 'Junior Secondary Transcript & Grade Summary' },
        { num: 4, name: 'Document Uploads', status: 'locked' },
        { num: 5, name: 'Fee Payment & Submission', status: 'locked' }
      ]
    },
    {
      id: 6,
      student: 'Daniel Adeleke',
      initials: 'DA',
      parent: 'Chief Adeleke',
      email: 'adeleke.group@example.com',
      phone: '+234 814 555 4321',
      progress: 35,
      stageNumber: 2,
      stageName: 'Parent & Guardian Details',
      stageDetail: 'Mother contact number & signature missing',
      lastSaved: 'Oct 02, 2026',
      program: 'Merit-Based Scholarship Application',
      steps: [
        { num: 1, name: 'Personal Details', status: 'completed' },
        { num: 2, name: 'Parent & Guardian Info', status: 'stopped', pending: 'Mother contact phone number, Digital signature' },
        { num: 3, name: 'Academic Records', status: 'locked' },
        { num: 4, name: 'Document Uploads', status: 'locked' },
        { num: 5, name: 'Fee Payment & Submission', status: 'locked' }
      ]
    }
  ];

  const filteredDrafts = draftsData.filter(item => {
    const q = search.toLowerCase();
    const matchesSearch = 
      item.student.toLowerCase().includes(q) ||
      item.parent.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.stageName.toLowerCase().includes(q) ||
      item.stageDetail.toLowerCase().includes(q);

    const matchesStage = 
      stageFilter === 'all' || item.stageNumber.toString() === stageFilter;

    let matchesProgress = true;
    if (progressFilter === 'high') matchesProgress = item.progress >= 75;
    else if (progressFilter === 'medium') matchesProgress = item.progress >= 25 && item.progress < 75;
    else if (progressFilter === 'low') matchesProgress = item.progress < 25;

    return matchesSearch && matchesStage && matchesProgress;
  });

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Incomplete Applications</h1>
            <h2>Track forms saved as drafts, identify drop-off stages, and send completion reminders</h2>
          </div>
        </div>
      </div>

      <div className="applications-layout">
        {/* Filter Bar with Stage and Progress selectors */}
        <div className="filter-bar">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by student, parent, email, or stage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            {/* Filter by Stage Stopped */}
            <select 
              className="filter-select"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              title="Filter by Drop-Off Stage"
            >
              <option value="all">All Stages</option>
              <option value="1">Stage 1: Personal Details</option>
              <option value="2">Stage 2: Parent & Guardian</option>
              <option value="3">Stage 3: Academic History</option>
              <option value="4">Stage 4: Document Uploads</option>
              <option value="5">Stage 5: Fee Payment</option>
            </select>

            {/* Filter by Progress % */}
            <select 
              className="filter-select"
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              title="Filter by Completion Percentage"
            >
              <option value="all">All Progress</option>
              <option value="high">High (&gt;75%)</option>
              <option value="medium">Medium (25-75%)</option>
              <option value="low">Low (&lt;25%)</option>
            </select>

            <button 
              className="btn-primary"
              onClick={() => showToast(`Sent completion reminders to all ${filteredDrafts.length} incomplete candidates!`)}
            >
              <Send size={15} /> Remind All ({filteredDrafts.length})
            </button>
          </div>
        </div>

        {/* Incomplete Candidates Table */}
        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Student</th>
                <th>Parent</th>
                <th>Parent Email</th>
                <th>Parent Phone</th>
                <th style={{ minWidth: '220px' }}>Stopped At Stage</th>
                <th style={{ minWidth: '150px' }}>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrafts.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-light)' }}>
                    No incomplete application drafts match your filters.
                  </td>
                </tr>
              ) : (
                filteredDrafts.map((draft, idx) => (
                  <tr key={draft.id}>
                    <td style={{ fontWeight: '500', color: 'var(--text-light)' }}>{idx + 1}</td>
                    
                    {/* Student Info */}
                    <td>
                      <div className="user-meta">
                        <div className="user-avatar-sm">{draft.initials}</div>
                        <div className="user-info">
                          <span className="name">{draft.student}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px' }}>
                            {draft.program}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Parent Info */}
                    <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{draft.parent}</td>

                    {/* Parent Email */}
                    <td>
                      <a href={`mailto:${draft.email}`} style={{ color: '#0052cc', textDecoration: 'none' }}>
                        {draft.email}
                      </a>
                    </td>

                    {/* Parent Phone */}
                    <td style={{ fontFamily: 'monospace', color: 'var(--text-light)' }}>
                      {draft.phone}
                    </td>

                    {/* STOPPED AT STAGE COLUMN */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span className={`stage-tag stage-${draft.stageNumber}`}>
                          <span className="stage-step-num">Stage {draft.stageNumber}</span>
                          <span>{draft.stageName}</span>
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px', lineHeight: '1.3' }}>
                          {draft.stageDetail}
                        </span>
                      </div>
                    </td>

                    {/* PROGRESS COLUMN */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', color: 'var(--text-light)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>
                          {draft.progress}% Complete
                        </span>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar-fill" 
                            style={{ 
                              width: `${draft.progress}%`,
                              background: draft.progress >= 75 ? '#10b981' : draft.progress >= 40 ? '#f59e0b' : '#ef4444'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '10px', marginTop: '4px' }}>
                          Last saved: {draft.lastSaved}
                        </span>
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn-remind" 
                          onClick={() => showToast(`Reminder notification dispatched to ${draft.email} for ${draft.stageName}!`)}
                          title={`Send reminder to ${draft.parent}`}
                        >
                          <BellRing size={14} /> Remind
                        </button>
                        <button 
                          className="btn-action" 
                          title="Inspect Drop-Off Stage Breakdown"
                          onClick={() => setSelectedDraft(draft)}
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="pagination-container">
          <div className="pagination-info">Showing 1 to {filteredDrafts.length} of {draftsData.length} draft entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* DRAFT INSPECTOR STAGE MODAL */}
      {selectedDraft && (
        <div className="draft-modal-overlay" onClick={() => setSelectedDraft(null)}>
          <div className="draft-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="draft-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="user-avatar-sm" style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                  {selectedDraft.initials}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    {selectedDraft.student}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                    {selectedDraft.program}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDraft(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '4px' }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="draft-modal-body">
              {/* Overview banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', textTransform: 'uppercase' }}>
                    Form Drop-Off Detected
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-dark)', marginTop: '2px' }}>
                    Stopped at Stage {selectedDraft.stageNumber}: {selectedDraft.stageName}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#f59e0b' }}>
                    {selectedDraft.progress}%
                  </span>
                  <div style={{ fontSize: '10px', color: 'var(--text-light)' }}>Completed</div>
                </div>
              </div>

              {/* Contact info cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--btn-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Mail size={16} style={{ color: '#0052cc' }} />
                  <div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-light)' }}>Parent Email</div>
                    <div style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--text-dark)' }}>{selectedDraft.email}</div>
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--btn-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Phone size={16} style={{ color: '#10b981' }} />
                  <div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-light)' }}>Parent Phone</div>
                    <div style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--text-dark)' }}>{selectedDraft.phone}</div>
                  </div>
                </div>
              </div>

              {/* Detailed Stage Stepper Breakdown */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', margin: '0 0 10px 0' }}>
                  Multi-Stage Form Breakdown
                </h4>
                <div className="draft-stepper">
                  {selectedDraft.steps.map((st) => (
                    <div 
                      key={st.num} 
                      className={`draft-step-item ${st.status}`}
                    >
                      <div className={`draft-step-badge-icon ${st.status}`}>
                        {st.status === 'completed' && <CheckCircle2 size={16} />}
                        {st.status === 'stopped' && <AlertCircle size={16} />}
                        {st.status === 'locked' && <Lock size={14} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>
                            Stage {st.num}: {st.name}
                          </span>
                          <span style={{
                            fontSize: '10.5px',
                            fontWeight: '600',
                            color: st.status === 'completed' ? '#10b981' : st.status === 'stopped' ? '#d97706' : 'var(--text-light)'
                          }}>
                            {st.status === 'completed' ? 'Completed' : st.status === 'stopped' ? 'Stopped Here' : 'Not Started'}
                          </span>
                        </div>
                        {st.pending && (
                          <div style={{ fontSize: '11.5px', color: '#d97706', marginTop: '4px', fontWeight: '500' }}>
                            Missing: {st.pending}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="draft-modal-footer">
              <button 
                className="btn-action"
                style={{ padding: '8px 16px' }}
                onClick={() => setSelectedDraft(null)}
              >
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  showToast(`Targeted email sent to ${selectedDraft.email} reminding them to finish Stage ${selectedDraft.stageNumber} (${selectedDraft.stageName})!`);
                  setSelectedDraft(null);
                }}
              >
                <Send size={14} /> Send Stage Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
