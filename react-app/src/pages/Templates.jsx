import React, { useEffect, useState } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';
import CreateFormModal from '../components/CreateFormModal';
import FormPreviewModal from '../components/FormPreviewModal';
import { useWorkspace } from '../context/WorkspaceContext';

const SCHOOL_TEMPLATES = [
  {
    id: 1,
    title: 'Standard Admission Form',
    category: 'General Intake',
    tag: 'Popular',
    tagColor: '#10b981',
    tagBg: 'rgba(16, 185, 129, 0.1)',
    icon: 'star',
    description: 'Comprehensive admission template for new student intakes, parent contact, and student bio-data.',
    applicationFee: 15000,
    formType: 'stepper',
    payoutBank: 'Zenith Bank Plc',
    payoutAccountNum: '1014892019',
    payoutAccountName: 'Roseville Secondary School - Admissions Revenue',
    stepperSteps: [
      { id: 1, title: 'Personal Information', description: 'Student bio-data, birth certificate & gender' },
      { id: 2, title: 'Parent & Guardian Details', description: 'Emergency contacts, email and home address' },
      { id: 3, title: 'Previous Academic Records', description: 'Junior secondary school transcript and grades' },
      { id: 4, title: 'Review & Fee Payment', description: 'Confirmation and gateway checkout' }
    ],
    formFields: [
      { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Date of Birth', type: 'date', stepId: 1, required: true },
      { id: 3, label: 'Parent / Guardian Full Name', type: 'text', stepId: 2, required: true },
      { id: 4, label: 'Parent Email Address', type: 'email', stepId: 2, required: true },
      { id: 5, label: 'Emergency Phone Number', type: 'text', stepId: 2, required: true },
      { id: 6, label: 'Last School Attended', type: 'text', stepId: 3, required: true },
      { id: 7, label: 'Birth Certificate (PDF/JPG)', type: 'file', stepId: 4, required: true }
    ]
  },
  {
    id: 2,
    title: 'Academic Staff Recruitment',
    category: 'HR Dept',
    tag: 'HR',
    tagColor: '#3b82f6',
    tagBg: 'rgba(59, 130, 246, 0.1)',
    icon: 'briefcase',
    description: 'Standardized fields for teachers, subject specialization, educational degrees, and references.',
    applicationFee: 0,
    formType: 'stepper',
    payoutBank: 'Zenith Bank Plc',
    payoutAccountNum: '1014892019',
    payoutAccountName: 'Roseville Secondary School - HR Account',
    stepperSteps: [
      { id: 1, title: 'Personal & Contact Details', description: 'Full name, email, phone and residence' },
      { id: 2, title: 'Teaching Credentials', description: 'Degrees, certifications and subject major' },
      { id: 3, title: 'Experience & References', description: 'Previous teaching employment and referees' }
    ],
    formFields: [
      { id: 1, label: 'Full Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Email Address', type: 'email', stepId: 1, required: true },
      { id: 3, label: 'Teaching Subject Specialization', type: 'text', stepId: 2, required: true },
      { id: 4, label: 'Years of Teaching Experience', type: 'number', stepId: 2, required: true },
      { id: 5, label: 'Curriculum Vitae (PDF)', type: 'file', stepId: 3, required: true }
    ]
  },
  {
    id: 3,
    title: 'Parent Feedback & Suggestions',
    category: 'Institutional',
    tag: 'Survey',
    tagColor: '#8b5cf6',
    tagBg: 'rgba(139, 92, 246, 0.1)',
    icon: 'users',
    description: 'End-of-term feedback collection, curriculum satisfaction ratings, and guardian suggestions.',
    applicationFee: 0,
    formType: 'single',
    payoutBank: 'Zenith Bank Plc',
    payoutAccountNum: '1014892019',
    payoutAccountName: 'Roseville Secondary School - Main Treasury',
    formFields: [
      { id: 1, label: 'Parent Name (Optional)', type: 'text', stepId: 1, required: false },
      { id: 2, label: 'Ward Class / Grade', type: 'text', stepId: 1, required: true },
      { id: 3, label: 'Academic Curriculum Feedback', type: 'textarea', stepId: 1, required: true },
      { id: 4, label: 'Facilities & Security Rating', type: 'select', stepId: 1, required: true }
    ]
  },
  {
    id: 4,
    title: 'Merit-Based Scholarship Form',
    category: 'Financial Aid',
    tag: 'Scholarship',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245, 158, 11, 0.1)',
    icon: 'award',
    description: 'Application for tuition fee assistance, academic honors, and family financial verification.',
    applicationFee: 0,
    formType: 'stepper',
    payoutBank: 'First Bank of Nigeria',
    payoutAccountNum: '3029182741',
    payoutAccountName: 'Roseville Education Endowment Fund',
    stepperSteps: [
      { id: 1, title: 'Student Academic Honors', description: 'GPA, prize history and extracurriculars' },
      { id: 2, title: 'Family Income & Means Test', description: 'Financial disclosure and tax receipts' },
      { id: 3, title: 'Essay & Recommendation', description: 'Personal statement and teacher referral' }
    ],
    formFields: [
      { id: 1, label: 'Applicant Student Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Current Grade Level', type: 'text', stepId: 1, required: true },
      { id: 3, label: 'Annual Household Income (₦)', type: 'number', stepId: 2, required: true },
      { id: 4, label: 'Personal Statement Essay (PDF)', type: 'file', stepId: 3, required: true }
    ]
  },
  {
    id: 5,
    title: 'Hostel Accommodation Request',
    category: 'Welfare',
    tag: 'Boarding',
    tagColor: '#06b6d4',
    tagBg: 'rgba(6, 182, 212, 0.1)',
    icon: 'home',
    description: 'Boarding room allocation preferences, medical allergies, dietary requirements, and emergency guardians.',
    applicationFee: 35000,
    formType: 'stepper',
    payoutBank: 'Access Bank Plc',
    payoutAccountNum: '0039281745',
    payoutAccountName: 'Roseville Secondary School - Boarding House Fund',
    stepperSteps: [
      { id: 1, title: 'Boarder Identification', description: 'Student details and class year' },
      { id: 2, title: 'Medical & Dietary Needs', description: 'Allergies, chronic conditions and medications' },
      { id: 3, title: 'Hostel Hall Selection & Fee', description: 'Room tier preference and deposit' }
    ],
    formFields: [
      { id: 1, label: 'Student Full Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Emergency Contact Phone', type: 'text', stepId: 1, required: true },
      { id: 3, label: 'Known Allergies or Diet Needs', type: 'textarea', stepId: 2, required: true },
      { id: 4, label: 'Medical Clearance Report', type: 'file', stepId: 2, required: true }
    ]
  },
  {
    id: 6,
    title: 'Transfer Student Intake',
    category: 'Admissions',
    tag: 'Transfer',
    tagColor: '#ec4899',
    tagBg: 'rgba(236, 72, 153, 0.1)',
    icon: 'repeat',
    description: 'Mid-term admission template for students transferring from other registered secondary schools.',
    applicationFee: 20000,
    formType: 'stepper',
    payoutBank: 'Zenith Bank Plc',
    payoutAccountNum: '1014892019',
    payoutAccountName: 'Roseville Secondary School - Admissions Revenue',
    stepperSteps: [
      { id: 1, title: 'Transfer Bio-data', description: 'Student identity and target grade' },
      { id: 2, title: 'Former School Clearance', description: 'Transcript, conduct certificate and principal letter' },
      { id: 3, title: 'Entrance Evaluation & Fee', description: 'Assessment test booking and processing' }
    ],
    formFields: [
      { id: 1, label: 'Student Full Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Previous School Name', type: 'text', stepId: 2, required: true },
      { id: 3, label: 'Official Transcript Upload', type: 'file', stepId: 2, required: true },
      { id: 4, label: 'Transfer Clearance Letter', type: 'file', stepId: 2, required: true }
    ]
  }
];

const ORG_TEMPLATES = [
  {
    id: 1,
    title: 'Graduate Trainee Application',
    category: 'Early Careers',
    tag: 'Popular',
    tagColor: '#10b981',
    tagBg: 'rgba(16, 185, 129, 0.1)',
    icon: 'star',
    description: 'Aptitude screening, university degree classification, CV submission, and NYSC certificate verification.',
    applicationFee: 0,
    formType: 'stepper',
    payoutBank: 'Access Bank Plc',
    payoutAccountNum: '0123984561',
    payoutAccountName: 'Access Bank Plc - Talent Scheme Operations',
    stepperSteps: [
      { id: 1, title: 'Personal & Contact Information', description: 'Full name, email, phone and location' },
      { id: 2, title: 'Academic Qualifications & NYSC', description: 'University, degree class, graduation year and NYSC status' },
      { id: 3, title: 'Resume & Credential Uploads', description: 'CV, degree certificate and passport photograph' },
      { id: 4, title: 'Declaration & Online Assessment', description: 'Confirm credentials and schedule online test' }
    ],
    formFields: [
      { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Email Address', type: 'email', stepId: 1, required: true },
      { id: 3, label: 'University / Institution', type: 'text', stepId: 2, required: true },
      { id: 4, label: 'Degree Classification (e.g. First Class, 2:1)', type: 'select', stepId: 2, required: true },
      { id: 5, label: 'NYSC Certificate Number / Exemption', type: 'text', stepId: 2, required: true },
      { id: 6, label: 'Curriculum Vitae / Resume (PDF)', type: 'file', stepId: 3, required: true }
    ]
  },
  {
    id: 2,
    title: 'Experienced Professional Hire',
    category: 'Recruitment',
    tag: 'Careers',
    tagColor: '#3b82f6',
    tagBg: 'rgba(59, 130, 246, 0.1)',
    icon: 'briefcase',
    description: 'Comprehensive employment history, project portfolio link, current notice period, and professional references.',
    applicationFee: 0,
    formType: 'stepper',
    payoutBank: 'Access Bank Plc',
    payoutAccountNum: '0123984561',
    payoutAccountName: 'Access Bank Plc - Group Talent Payout',
    stepperSteps: [
      { id: 1, title: 'Contact & Profile Links', description: 'Bio-data, LinkedIn URL and professional summaries' },
      { id: 2, title: 'Career History & Projects', description: 'Current role, key achievements and salary expectation' },
      { id: 3, title: 'Resume & Recommendations', description: 'Updated CV and two professional referee contacts' }
    ],
    formFields: [
      { id: 1, label: 'Full Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Current Job Title', type: 'text', stepId: 2, required: true },
      { id: 3, label: 'Total Years of Professional Experience', type: 'number', stepId: 2, required: true },
      { id: 4, label: 'Notice Period with Current Employer', type: 'text', stepId: 2, required: true },
      { id: 5, label: 'Curriculum Vitae / Portfolio', type: 'file', stepId: 3, required: true }
    ]
  },
  {
    id: 3,
    title: 'Fellowship & Innovation Grant',
    category: 'CSR & Grants',
    tag: 'Grants',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245, 158, 11, 0.1)',
    icon: 'award',
    description: 'Project proposal, milestone budget breakdown, track record of execution, and implementation timeline.',
    applicationFee: 0,
    formType: 'stepper',
    payoutBank: 'First Bank of Nigeria',
    payoutAccountNum: '2039485712',
    payoutAccountName: 'Access Community Innovation Grants',
    stepperSteps: [
      { id: 1, title: 'Lead Applicant / Team Profile', description: 'Principal investigator bio and registered entity' },
      { id: 2, title: 'Project Proposal & Impact', description: 'Problem statement, proposed innovation and beneficiaries' },
      { id: 3, title: 'Milestones & Budget Upload', description: 'Financial plan, audit statements and timeline' }
    ],
    formFields: [
      { id: 1, label: 'Project Title', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Grant Amount Requested (₦)', type: 'number', stepId: 2, required: true },
      { id: 3, label: 'Project Executive Summary', type: 'textarea', stepId: 2, required: true },
      { id: 4, label: 'Milestone Budget Proposal (PDF/Excel)', type: 'file', stepId: 3, required: true }
    ]
  },
  {
    id: 4,
    title: 'Employee Onboarding & KYC',
    category: 'People Ops',
    tag: 'HR',
    tagColor: '#8b5cf6',
    tagBg: 'rgba(139, 92, 246, 0.1)',
    icon: 'users',
    description: 'Tax identification, pension manager PIN, emergency contact, health disclosure, and direct deposit details.',
    applicationFee: 0,
    formType: 'stepper',
    payoutBank: 'Access Bank Plc',
    payoutAccountNum: '0123984561',
    payoutAccountName: 'Access Bank Plc - People Operations',
    stepperSteps: [
      { id: 1, title: 'Employee Personal Data', description: 'NIN, Date of birth and residential verification' },
      { id: 2, title: 'Payroll & Banking KYC', description: 'Salary account number, Bank name and Tax ID' },
      { id: 3, title: 'Statutory Pension & Next of Kin', description: 'RSA PIN, Pension fund manager and emergency person' }
    ],
    formFields: [
      { id: 1, label: 'Employee Full Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'National Identity Number (NIN)', type: 'text', stepId: 1, required: true },
      { id: 3, label: 'Salary Bank Account Number', type: 'text', stepId: 2, required: true },
      { id: 4, label: 'Tax Identification Number (TIN)', type: 'text', stepId: 2, required: true }
    ]
  },
  {
    id: 5,
    title: 'Vendor & Contractor Registration',
    category: 'Procurement',
    tag: 'Compliance',
    tagColor: '#06b6d4',
    tagBg: 'rgba(6, 182, 212, 0.1)',
    icon: 'building',
    description: 'Corporate CAC documentation, VAT registration, banking references, processing fee, and HSE compliance.',
    applicationFee: 50000,
    formType: 'stepper',
    payoutBank: 'Access Bank Plc',
    payoutAccountNum: '0123984561',
    payoutAccountName: 'Access Bank Plc - Corporate Procurement Account',
    stepperSteps: [
      { id: 1, title: 'Company Identity & CAC', description: 'Registered business name, RC number and TIN' },
      { id: 2, title: 'Technical Capability & HSE', description: 'Services offered, equipment list and health/safety policy' },
      { id: 3, title: 'Compliance Documents & Fee', description: 'CAC certificate, 3-year tax clearance and vetting fee' }
    ],
    formFields: [
      { id: 1, label: 'Registered Business Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'CAC Registration (RC/BN Number)', type: 'text', stepId: 1, required: true },
      { id: 3, label: 'Tax Clearance Certificate (PDF)', type: 'file', stepId: 3, required: true },
      { id: 4, label: 'Corporate Banking Reference Letter', type: 'file', stepId: 3, required: true }
    ]
  },
  {
    id: 6,
    title: 'Stakeholder Feedback & NPS Survey',
    category: 'Evaluation',
    tag: 'Survey',
    tagColor: '#ec4899',
    tagBg: 'rgba(236, 72, 153, 0.1)',
    icon: 'smile',
    description: 'Quarterly partner evaluation, programme satisfaction metrics, service delivery rating, and recommendations.',
    applicationFee: 0,
    formType: 'single',
    payoutBank: 'Access Bank Plc',
    payoutAccountNum: '0123984561',
    payoutAccountName: 'Access Bank Plc - Corporate Affairs',
    formFields: [
      { id: 1, label: 'Partner / Client Organization Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Service Quality Rating (1 - 10)', type: 'select', stepId: 1, required: true },
      { id: 3, label: 'Key Improvement Suggestions', type: 'textarea', stepId: 1, required: true }
    ]
  }
];

export default function Templates() {
  const { isOrganization } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const templatesList = isOrganization ? ORG_TEMPLATES : SCHOOL_TEMPLATES;

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  const filteredTemplates = templatesList.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviewTemplate = (tmpl) => {
    setSelectedTemplate(tmpl);
    setIsPreviewOpen(true);
  };

  const handleUseTemplate = (tmpl) => {
    setSelectedTemplate(tmpl);
    setIsPreviewOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1 id="pageTitle">Templates Library</h1>
            <h2 id="pageSubtitle">
              {isOrganization 
                ? 'Pre-built forms for recruitment, grants, onboarding & partnerships'
                : 'Browse and use pre-built admission, staff, and survey templates'
              }
            </h2>
          </div>
        </div>
      </div>

      <div className="applications-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input 
              type="text" 
              placeholder={isOrganization ? "Search templates (e.g., Graduate Trainee, Grant, Vendor)..." : "Search templates by name..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <button 
              className="btn-primary" 
              onClick={() => {
                setSelectedTemplate(null);
                setIsModalOpen(true);
              }}
            >
              <LucideIcon name="plus" style={{ width: '16px', height: '16px' }} /> Create Blank Form
            </button>
          </div>
        </div>

        {/* Cards View */}
        <div className="cards-wrapper" id="cardsWrapper" style={{ display: 'block', paddingTop: '10px' }}>
          <div className="cards-grid templates-grid">
            {filteredTemplates.map(tmpl => (
              <div key={tmpl.id} className="form-card card">
                <div className="card-header">
                  <span className="status-badge" style={{ background: tmpl.tagBg, color: tmpl.tagColor }}>
                    <LucideIcon name={tmpl.icon} style={{ width: '12px', height: '12px' }} /> {tmpl.tag}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: 500 }}>
                    {tmpl.category}
                  </span>
                </div>
                <h3 className="card-title">{tmpl.title}</h3>
                <p className="card-subtitle">{tmpl.description}</p>

                {/* Template Meta Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: '11.5px', color: 'var(--text-light)' }}>
                  <span>
                    Fee: <strong style={{ color: tmpl.applicationFee > 0 ? '#0052cc' : '#10b981' }}>
                      {tmpl.applicationFee > 0 ? `₦${tmpl.applicationFee.toLocaleString()}` : 'Free'}
                    </strong>
                  </span>
                  <span>
                    Mode: <strong>{tmpl.formType === 'stepper' ? `${tmpl.stepperSteps?.length || 4} Steps` : 'Single Page'}</strong>
                  </span>
                </div>
                
                <div className="card-actions" style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  {/* Preview Button */}
                  <button 
                    type="button"
                    className="btn-secondary" 
                    style={{ 
                      flex: 1, 
                      border: '1px solid var(--border-color)', 
                      background: 'var(--card-bg)', 
                      color: 'var(--text-dark)', 
                      cursor: 'pointer', 
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontSize: '12.5px',
                      fontWeight: 600,
                      padding: '8px 12px'
                    }}
                    onClick={() => handlePreviewTemplate(tmpl)}
                    title="Preview template before adopting"
                  >
                    <LucideIcon name="eye" style={{ width: '14px', height: '14px', color: '#0052cc' }} /> Preview
                  </button>

                  {/* Use Template Button */}
                  <button 
                    type="button"
                    className="btn-primary" 
                    style={{ flex: 1.2, border: 'none', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '12.5px', fontWeight: 600 }} 
                    onClick={() => handleUseTemplate(tmpl)}
                    title="Customize & publish this template"
                  >
                    <LucideIcon name="copy" style={{ width: '14px', height: '14px' }} /> Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-container" style={{ marginTop: '24px', padding: '16px 24px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div className="pagination-info">Showing {filteredTemplates.length} of {templatesList.length} templates</div>
            <div className="pagination-controls">
              <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn" disabled><LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Form Modal */}
      <CreateFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialData={selectedTemplate}
      />

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <FormPreviewModal 
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          formConfig={{
            formTitle: selectedTemplate.title,
            formType: selectedTemplate.formType || 'stepper',
            category: selectedTemplate.category,
            description: selectedTemplate.description,
            applicationFee: selectedTemplate.applicationFee || 0,
            requireDocs: true,
            stepperSteps: selectedTemplate.stepperSteps,
            formFields: selectedTemplate.formFields,
            paymentDestination: {
              preset: 'primary',
              bankName: selectedTemplate.payoutBank || (isOrganization ? 'Access Bank Plc' : 'Zenith Bank Plc'),
              accountNumber: selectedTemplate.payoutAccountNum || (isOrganization ? '0123984561' : '1014892019'),
              accountName: selectedTemplate.payoutAccountName || (isOrganization ? 'Access Bank Plc - Talent Scheme Operations' : 'Roseville Secondary School - Admissions Revenue'),
              gateway: 'Pixpay Subaccount (Direct Split)',
              settlementSchedule: 'Instant Settlement'
            }
          }}
          onPublish={() => handleUseTemplate(selectedTemplate)}
          publishButtonLabel="Use & Publish Template"
        />
      )}
    </>
  );
}
