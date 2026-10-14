import React, { useEffect, useState } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';
import CreateFormModal from '../components/CreateFormModal';
import FormPreviewModal from '../components/FormPreviewModal';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '../context/WorkspaceContext';

const SCHOOL_FORMS = [
  {
    id: 1,
    title: '2026 Academic Session Admission',
    category: 'General Admission',
    submissions: 1245,
    created: 'Sep 01, 2026',
    lastSub: 'Oct 08, 2026 11:42 AM',
    status: 'Completed',
    statusColor: '#10b981',
    statusBg: 'rgba(16, 185, 129, 0.1)',
    statusIcon: 'check-circle'
  },
  {
    id: 2,
    title: 'Staff Recruitment Application',
    category: 'HR Dept',
    submissions: 342,
    created: 'Sep 15, 2026',
    lastSub: 'Oct 07, 2026 04:15 PM',
    status: 'In Progress',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59, 130, 246, 0.1)',
    statusIcon: 'loader-2'
  },
  {
    id: 3,
    title: 'Merit-Based Scholarship Application',
    category: 'Financial Aid',
    submissions: 518,
    created: 'Sep 10, 2026',
    lastSub: 'Oct 08, 2026 09:10 AM',
    status: 'Completed',
    statusColor: '#10b981',
    statusBg: 'rgba(16, 185, 129, 0.1)',
    statusIcon: 'check-circle'
  },
  {
    id: 4,
    title: 'Hostel Accommodation Request',
    category: 'Student Welfare',
    submissions: 186,
    created: 'Sep 20, 2026',
    lastSub: 'Oct 06, 2026 02:30 PM',
    status: 'In Progress',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59, 130, 246, 0.1)',
    statusIcon: 'loader-2'
  },
  {
    id: 5,
    title: 'Mid-Year Transfer Student Intake',
    category: 'Admissions Office',
    submissions: 94,
    created: 'Sep 25, 2026',
    lastSub: 'Oct 05, 2026 12:05 PM',
    status: 'In Progress',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59, 130, 246, 0.1)',
    statusIcon: 'loader-2'
  }
];

const ORG_FORMS = [
  {
    id: 1,
    title: 'Graduate Trainee Programme 2026',
    category: 'Talent Acquisition',
    submissions: 1840,
    created: 'Sep 01, 2026',
    lastSub: 'Oct 08, 2026 11:42 AM',
    status: 'Completed',
    statusColor: '#10b981',
    statusBg: 'rgba(16, 185, 129, 0.1)',
    statusIcon: 'check-circle'
  },
  {
    id: 2,
    title: 'Experienced Hire – Technology & Engineering',
    category: 'Engineering Division',
    submissions: 412,
    created: 'Sep 15, 2026',
    lastSub: 'Oct 07, 2026 04:15 PM',
    status: 'In Progress',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59, 130, 246, 0.1)',
    statusIcon: 'loader-2'
  },
  {
    id: 3,
    title: 'Fellowship & Innovation Grant 2026',
    category: 'CSR & Grants',
    submissions: 625,
    created: 'Sep 10, 2026',
    lastSub: 'Oct 08, 2026 09:10 AM',
    status: 'Completed',
    statusColor: '#10b981',
    statusBg: 'rgba(16, 185, 129, 0.1)',
    statusIcon: 'check-circle'
  },
  {
    id: 4,
    title: 'Vendor & Contractor Onboarding',
    category: 'Procurement Dept',
    submissions: 149,
    created: 'Sep 20, 2026',
    lastSub: 'Oct 06, 2026 02:30 PM',
    status: 'In Progress',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59, 130, 246, 0.1)',
    statusIcon: 'loader-2'
  },
  {
    id: 5,
    title: 'Executive Leadership Development Track',
    category: 'People & Culture',
    submissions: 88,
    created: 'Sep 25, 2026',
    lastSub: 'Oct 05, 2026 12:05 PM',
    status: 'In Progress',
    statusColor: '#3b82f6',
    statusBg: 'rgba(59, 130, 246, 0.1)',
    statusIcon: 'loader-2'
  }
];

export default function Forms() {
  const navigate = useNavigate();
  const { isOrganization, terms } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewForm, setPreviewForm] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formsList = isOrganization ? ORG_FORMS : SCHOOL_FORMS;

  useEffect(() => {
    const tl = gsap.timeline();
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
  }, [viewMode, isOrganization]);

  const filteredForms = formsList.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || f.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1 id="pageTitle">Forms Library</h1>
            <h2 id="pageSubtitle">{terms.formsSubtitle}</h2>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="applications-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input 
              type="text" 
              placeholder={isOrganization ? "Search forms by title or category..." : "Search forms by name..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <div className="view-toggle" style={{ display: 'flex', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', marginRight: '8px' }}>
              <button 
                id="btnListView" 
                className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`} 
                style={{ border: 'none', borderRadius: 0, padding: '0 12px', width: 'auto', height: '34px', ...(viewMode === 'list' ? { background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc' } : {}) }} 
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <LucideIcon name="list" style={{ width: '16px', height: '16px' }} />
              </button>
              <button 
                id="btnCardView" 
                className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                style={{ border: 'none', borderRadius: 0, padding: '0 12px', width: 'auto', height: '34px', ...(viewMode === 'grid' ? { background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc' } : {}) }} 
                onClick={() => setViewMode('grid')}
                title="Grid Cards View"
              >
                <LucideIcon name="grid" style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <select 
              className="filter-select" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              <LucideIcon name="plus" style={{ width: '16px', height: '16px' }} /> Create New Form
            </button>
          </div>
        </div>

        {/* Table View */}
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
              {filteredForms.map(form => (
                <tr key={form.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '13px' }}>
                        {form.title}
                      </span>
                      <span style={{ color: 'var(--text-light)', fontSize: '11px', marginTop: '2px' }}>
                        {form.category}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#0052cc', fontSize: '13px' }}>
                      {form.submissions.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
                      <span style={{ fontWeight: 500, color: 'var(--text-dark)' }}>{form.created}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
                      <span style={{ fontWeight: 500, color: 'var(--text-dark)' }}>{form.lastSub}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge" style={{ background: form.statusBg, color: form.statusColor }}>
                      <LucideIcon name={form.statusIcon} style={{ width: '12px', height: '12px' }} /> {form.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-action" 
                        title="Preview Candidate Form" 
                        onClick={() => {
                          setPreviewForm(form);
                          setIsPreviewOpen(true);
                        }}
                      >
                        <LucideIcon name="eye" style={{ width: '14px', height: '14px', color: '#0052cc' }} />
                      </button>
                      <button className="btn-action" title="View Submissions" onClick={() => navigate('/view-form')}>
                        <LucideIcon name="list" style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button className="btn-action" title="Edit Form">
                        <LucideIcon name="edit" style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button className="btn-action" title="Share Link" onClick={() => alert(`Public link copied for ${form.title}!`)}>
                        <LucideIcon name="share-2" style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button className="btn-action" title="Delete Form" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <LucideIcon name="trash-2" style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredForms.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-light)' }}>
                    No forms found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="pagination-container" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="pagination-info">Showing 1 to {filteredForms.length} of {formsList.length} entries</div>
            <div className="pagination-controls">
              <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn"><LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} /></button>
            </div>
          </div>
        </div>

        {/* Cards View */}
        <div className="cards-wrapper" id="cardsWrapper" style={{ display: viewMode === 'grid' ? 'block' : 'none', paddingTop: '10px' }}>
          <div className="cards-grid">
            {filteredForms.map(form => (
              <div key={form.id} className="form-card card">
                <div className="card-header">
                  <span className="status-badge" style={{ background: form.statusBg, color: form.statusColor }}>
                    <LucideIcon name={form.statusIcon} style={{ width: '12px', height: '12px' }} /> {form.status}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-action" title="Edit Form" style={{ padding: '6px', border: 'none' }}>
                      <LucideIcon name="edit" style={{ width: '14px', height: '14px' }} />
                    </button>
                    <button className="btn-action" title="Delete Form" style={{ padding: '6px', border: 'none', color: '#ef4444' }}>
                      <LucideIcon name="trash-2" style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                </div>
                <h3 className="card-title">{form.title}</h3>
                <p className="card-subtitle">{form.category}</p>
                
                <div className="card-stats">
                  <div className="stat-item">
                    <span className="stat-label">Submissions</span>
                    <span className="stat-value" style={{ color: '#0052cc' }}>{form.submissions.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="card-meta">
                  <div><span className="meta-label">Created:</span> {form.created}</div>
                  <div><span className="meta-label">Last Sub:</span> {form.lastSub.split(' ')[0]}</div>
                </div>
                
                <div className="card-actions" style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-action" 
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} 
                    onClick={() => {
                      setPreviewForm(form);
                      setIsPreviewOpen(true);
                    }}
                    title="Preview Candidate Experience"
                  >
                    <LucideIcon name="eye" style={{ width: '14px', height: '14px', color: '#0052cc' }} /> Preview
                  </button>
                  <button className="btn-action" style={{ flex: 1.2 }} onClick={() => navigate('/view-form')}>
                    <LucideIcon name="list" style={{ width: '14px', height: '14px' }} /> Submissions
                  </button>
                  <button className="btn-action" style={{ padding: '0 10px' }} onClick={() => alert(`Public link copied for ${form.title}!`)}>
                    <LucideIcon name="share-2" style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {previewForm && (
        <FormPreviewModal 
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          formConfig={{
            formTitle: previewForm.title,
            formType: 'stepper',
            category: previewForm.category,
            description: `Official candidate registration and processing portal for ${previewForm.title}.`,
            applicationFee: isOrganization ? 0 : 15000,
            requireDocs: true,
            stepperSteps: isOrganization ? [
              { id: 1, title: 'Personal & Contact Info', description: 'Bio-data, phone, email and address' },
              { id: 2, title: 'Career & Qualifications', description: 'Employment history, resume and credentials' },
              { id: 3, title: 'Documents & Verification', description: 'Identification, degrees and references' },
              { id: 4, title: 'Review & Declaration', description: 'Applicant declaration and final submission' }
            ] : [
              { id: 1, title: 'Personal Information', description: 'Bio-data, contact address and guardian info' },
              { id: 2, title: 'Academic History', description: 'Previous school, certificates and transcripts' },
              { id: 3, title: 'Documents & Verification', description: 'Birth certificate, passport photo and ID' },
              { id: 4, title: 'Review & Declaration', description: 'Applicant confirmation and fee submission' }
            ],
            paymentDestination: {
              preset: 'primary',
              bankName: isOrganization ? 'Access Bank Plc' : 'Zenith Bank Plc',
              accountNumber: isOrganization ? '0123984561' : '1014892019',
              accountName: isOrganization ? 'Access Bank Plc - Talent Scheme Operations' : 'Roseville Secondary School - Admissions Revenue',
              gateway: 'Pixpay Subaccount (Split 100%)',
              settlementSchedule: 'Instant Settlement'
            }
          }}
          publishButtonLabel="Edit Form"
          onPublish={() => {
            setIsPreviewOpen(false);
            setIsModalOpen(true);
          }}
        />
      )}
    </>
  );
}
