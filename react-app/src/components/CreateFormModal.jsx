import React, { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import FormPreviewModal from './FormPreviewModal';
import './CreateFormModal.css';

const NIGERIAN_BANKS = [
  'Access Bank Plc',
  'Zenith Bank Plc',
  'Guaranty Trust Bank (GTBank)',
  'First Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Stanbic IBTC Bank',
  'Fidelity Bank',
  'Sterling Bank',
  'Union Bank of Nigeria',
  'Wema Bank / ALAT',
  'Kuda Microfinance Bank',
  'Moniepoint Microfinance Bank',
  'OPay Digital Services'
];

const FIELD_TYPE_CONFIG = {
  text: { label: 'Short Text', icon: 'type', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  email: { label: 'Email', icon: 'mail', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },
  number: { label: 'Number', icon: 'hash', color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
  date: { label: 'Date', icon: 'calendar', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  select: { label: 'Dropdown', icon: 'chevron-down', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
  file: { label: 'File Upload', icon: 'upload-cloud', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.08)' },
  textarea: { label: 'Textarea', icon: 'align-left', color: '#64748b', bg: 'rgba(100, 116, 139, 0.08)' }
};

export default function CreateFormModal({ isOpen, onClose, initialData = null }) {
  const { isOrganization, workspaceName, payoutSettings } = useWorkspace();

  // Main wizard steps for the creation flow (1: Format & Basics, 2: Fields, 3: Settings & Publish)
  const [currentStep, setCurrentStep] = useState(1);

  // Form Configuration State
  const [formType, setFormType] = useState('stepper'); // 'single' | 'stepper'
  const [formTitle, setFormTitle] = useState('');
  const [category, setCategory] = useState(isOrganization ? 'Graduate Recruitment' : 'General Admission');
  const [otherCategory, setOtherCategory] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [applicationFee, setApplicationFee] = useState('');
  const [description, setDescription] = useState('');
  const [requireDocs, setRequireDocs] = useState(true);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const activeBank = payoutSettings?.bankName || (isOrganization ? 'Access Bank Plc' : 'Zenith Bank Plc');
  const activeAccountNum = payoutSettings?.accountNumber || (isOrganization ? '0123984561' : '1014892019');
  const activeAccountName = payoutSettings?.accountName || (isOrganization ? 'Access Bank Plc - Talent Scheme Operations' : 'Roseville Secondary School - Admissions Revenue');
  const activeGateway = payoutSettings?.gateway || 'Pixpay Subaccount (Split 100%)';
  const activeSchedule = payoutSettings?.settlementSchedule || 'Instant Settlement';

  // Payout Destination Presets
  const destinationPresets = isOrganization ? [
    {
      id: 'primary',
      title: 'Configured Settlement Account (Primary)',
      bankName: activeBank,
      accountNumber: activeAccountNum,
      accountName: activeAccountName,
      gateway: activeGateway,
      settlementSchedule: activeSchedule
    },
    {
      id: 'subaccount',
      title: 'Graduate Scheme Payout Subaccount',
      bankName: 'Zenith Bank Plc',
      accountNumber: '1012384759',
      accountName: 'Access Careers - Recruitment Fund',
      gateway: 'Remita Corporate Collection',
      settlementSchedule: 'Daily Sweep (11:59 PM)'
    },
    {
      id: 'tsa',
      title: 'Grants & Fellowship Dedicated Escrow',
      bankName: 'First Bank of Nigeria',
      accountNumber: '2039485712',
      accountName: 'Access Community Innovation Grants',
      gateway: 'Flutterwave Dedicated Subaccount',
      settlementSchedule: 'Weekly Settlement'
    },
    {
      id: 'custom',
      title: 'Custom Bank Account',
      bankName: 'Guaranty Trust Bank (GTBank)',
      accountNumber: '',
      accountName: '',
      gateway: 'Direct Bank Settlement',
      settlementSchedule: 'Instant Settlement'
    }
  ] : [
    {
      id: 'primary',
      title: 'Configured Settlement Account (Primary)',
      bankName: activeBank,
      accountNumber: activeAccountNum,
      accountName: activeAccountName,
      gateway: activeGateway,
      settlementSchedule: activeSchedule
    },
    {
      id: 'subaccount',
      title: 'Entrance Examination Processing Subaccount',
      bankName: 'Access Bank Plc',
      accountNumber: '0039281745',
      accountName: 'Roseville Secondary School - Exam Board',
      gateway: 'Pixpay Subaccount (Direct Split)',
      settlementSchedule: 'Daily Sweep (11:59 PM)'
    },
    {
      id: 'tsa',
      title: 'Scholarship & Welfare Endowment Account',
      bankName: 'First Bank of Nigeria',
      accountNumber: '3029182741',
      accountName: 'Roseville Education Endowment Fund',
      gateway: 'Interswitch WebPAY',
      settlementSchedule: 'Weekly Settlement'
    },
    {
      id: 'custom',
      title: 'Custom Bank Account',
      bankName: 'Guaranty Trust Bank (GTBank)',
      accountNumber: '',
      accountName: '',
      gateway: 'Direct Bank Settlement',
      settlementSchedule: 'Instant Settlement'
    }
  ];

  const [selectedDestPreset, setSelectedDestPreset] = useState('primary');
  const [payoutBank, setPayoutBank] = useState(activeBank);
  const [payoutAccountNum, setPayoutAccountNum] = useState(activeAccountNum);
  const [payoutAccountName, setPayoutAccountName] = useState(activeAccountName);
  const [payoutGateway, setPayoutGateway] = useState(activeGateway);
  const [payoutSchedule, setPayoutSchedule] = useState(activeSchedule);

  // Stepper steps configuration (dynamic)
  const [stepperSteps, setStepperSteps] = useState(() => isOrganization ? [
    { id: 1, title: 'Personal & Contact Info', description: 'Bio-data, phone, email and address' },
    { id: 2, title: 'Career & Qualifications', description: 'Employment history, resume and credentials' },
    { id: 3, title: 'Documents & Verification', description: 'Identification, degrees and references' },
    { id: 4, title: 'Review & Declaration', description: 'Applicant declaration and final submission' }
  ] : [
    { id: 1, title: 'Personal Information', description: 'Bio-data, contact address and guardian info' },
    { id: 2, title: 'Academic History', description: 'Previous school, certificates and transcripts' },
    { id: 3, title: 'Documents & Verification', description: 'Birth certificate, passport photo and ID' },
    { id: 4, title: 'Review & Declaration', description: 'Applicant confirmation and fee submission' }
  ]);

  // Dynamic Form Fields state
  const [formFields, setFormFields] = useState(() => isOrganization ? [
    { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
    { id: 2, label: 'Work / Personal Email', type: 'email', stepId: 1, required: true },
    { id: 3, label: 'Current Employer / Position', type: 'text', stepId: 2, required: true },
    { id: 4, label: 'Highest Academic Qualification', type: 'text', stepId: 2, required: true },
    { id: 5, label: 'Curriculum Vitae / Resume', type: 'file', stepId: 3, required: true }
  ] : [
    { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
    { id: 2, label: 'Date of Birth', type: 'date', stepId: 1, required: true },
    { id: 3, label: 'Email Address', type: 'email', stepId: 1, required: true },
    { id: 4, label: 'Previous School Name', type: 'text', stepId: 2, required: true },
    { id: 5, label: 'Passport Photograph', type: 'file', stepId: 3, required: true }
  ]);

  const [activeStepTab, setActiveStepTab] = useState(1);

  // Initialize from props or workspace defaults
  useEffect(() => {
    if (initialData) {
      if (initialData.title) setFormTitle(initialData.title);
      if (initialData.category) setCategory(initialData.category);
      if (initialData.description) setDescription(initialData.description);
      if (initialData.applicationFee !== undefined) setApplicationFee(initialData.applicationFee.toString());
      if (initialData.formType) setFormType(initialData.formType);
      if (initialData.stepperSteps) setStepperSteps(initialData.stepperSteps);
      if (initialData.formFields) setFormFields(initialData.formFields);
      if (initialData.payoutBank) setPayoutBank(initialData.payoutBank);
      if (initialData.payoutAccountNum) setPayoutAccountNum(initialData.payoutAccountNum);
      if (initialData.payoutAccountName) setPayoutAccountName(initialData.payoutAccountName);
      if (initialData.payoutGateway) setPayoutGateway(initialData.payoutGateway);
      return;
    }

    if (isOrganization) {
      setCategory('Graduate Recruitment');
      setStepperSteps([
        { id: 1, title: 'Personal & Contact Info', description: 'Bio-data, phone, email and address' },
        { id: 2, title: 'Career & Qualifications', description: 'Employment history, resume and credentials' },
        { id: 3, title: 'Documents & Verification', description: 'Identification, degrees and references' },
        { id: 4, title: 'Review & Declaration', description: 'Applicant declaration and final submission' }
      ]);
      setFormFields([
        { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
        { id: 2, label: 'Work / Personal Email', type: 'email', stepId: 1, required: true },
        { id: 3, label: 'Current Employer / Position', type: 'text', stepId: 2, required: true },
        { id: 4, label: 'Highest Academic Qualification', type: 'text', stepId: 2, required: true },
        { id: 5, label: 'Curriculum Vitae / Resume', type: 'file', stepId: 3, required: true }
      ]);
      setPayoutBank(activeBank);
      setPayoutAccountNum(activeAccountNum);
      setPayoutAccountName(activeAccountName);
      setPayoutGateway(activeGateway);
      setPayoutSchedule(activeSchedule);
    } else {
      setCategory('General Admission');
      setStepperSteps([
        { id: 1, title: 'Personal Information', description: 'Bio-data, contact address and guardian info' },
        { id: 2, title: 'Academic History', description: 'Previous school, certificates and transcripts' },
        { id: 3, title: 'Documents & Verification', description: 'Birth certificate, passport photo and ID' },
        { id: 4, title: 'Review & Declaration', description: 'Applicant confirmation and fee submission' }
      ]);
      setFormFields([
        { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
        { id: 2, label: 'Date of Birth', type: 'date', stepId: 1, required: true },
        { id: 3, label: 'Email Address', type: 'email', stepId: 1, required: true },
        { id: 4, label: 'Previous School Name', type: 'text', stepId: 2, required: true },
        { id: 5, label: 'Passport Photograph', type: 'file', stepId: 3, required: true }
      ]);
      setPayoutBank(activeBank);
      setPayoutAccountNum(activeAccountNum);
      setPayoutAccountName(activeAccountName);
      setPayoutGateway(activeGateway);
      setPayoutSchedule(activeSchedule);
    }
  }, [isOrganization, initialData, activeBank, activeAccountNum, activeAccountName, activeGateway, activeSchedule]);

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setSelectedDestPreset(preset.id);
    if (preset.id !== 'custom') {
      setPayoutBank(preset.bankName);
      setPayoutAccountNum(preset.accountNumber);
      setPayoutAccountName(preset.accountName);
      setPayoutGateway(preset.gateway);
      setPayoutSchedule(preset.settlementSchedule);
    }
  };

  const handleAddStepperStep = () => {
    const nextId = stepperSteps.length > 0 ? Math.max(...stepperSteps.map(s => s.id)) + 1 : 1;
    const newStep = {
      id: nextId,
      title: `Step ${stepperSteps.length + 1}`,
      description: 'Step instructions and fields'
    };
    setStepperSteps([...stepperSteps, newStep]);
  };

  const handleRemoveStepperStep = (id) => {
    if (stepperSteps.length <= 2) {
      alert('A multi-step form must have at least 2 steps.');
      return;
    }
    setStepperSteps(stepperSteps.filter(s => s.id !== id));
    setFormFields(formFields.filter(f => f.stepId !== id));
    if (activeStepTab === id) {
      const remaining = stepperSteps.filter(s => s.id !== id);
      if (remaining.length > 0) setActiveStepTab(remaining[0].id);
    }
  };

  const handleUpdateStepTitle = (id, newTitle) => {
    setStepperSteps(stepperSteps.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const handleUpdateStepDesc = (id, newDesc) => {
    setStepperSteps(stepperSteps.map(s => s.id === id ? { ...s, description: newDesc } : s));
  };

  const handleAddField = (type) => {
    const nextFieldId = Date.now();
    const typeLabels = {
      text: 'Short Text',
      email: 'Email Address',
      number: 'Number Input',
      date: 'Date Picker',
      select: 'Dropdown Select',
      file: 'Document Upload',
      textarea: 'Long Description'
    };
    const newField = {
      id: nextFieldId,
      label: typeLabels[type] || 'New Field',
      type: type,
      stepId: formType === 'stepper' ? activeStepTab : 1,
      required: true
    };
    setFormFields([...formFields, newField]);
  };

  const handleRemoveField = (id) => {
    setFormFields(formFields.filter(f => f.id !== id));
  };

  const handleUpdateFieldLabel = (id, label) => {
    setFormFields(formFields.map(f => f.id === id ? { ...f, label } : f));
  };

  const handleToggleFieldRequired = (id) => {
    setFormFields(formFields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  };

  const handleMoveField = (id, direction) => {
    const list = [...formFields];
    const index = list.findIndex(f => f.id === id);
    if (index === -1) return;

    if (formType === 'stepper') {
      const stepFields = list.filter(f => f.stepId === activeStepTab);
      const stepIdx = stepFields.findIndex(f => f.id === id);
      if (direction === 'up' && stepIdx > 0) {
        const prevField = stepFields[stepIdx - 1];
        const prevGlobalIdx = list.findIndex(f => f.id === prevField.id);
        const temp = list[index];
        list[index] = list[prevGlobalIdx];
        list[prevGlobalIdx] = temp;
        setFormFields(list);
      } else if (direction === 'down' && stepIdx < stepFields.length - 1) {
        const nextField = stepFields[stepIdx + 1];
        const nextGlobalIdx = list.findIndex(f => f.id === nextField.id);
        const temp = list[index];
        list[index] = list[nextGlobalIdx];
        list[nextGlobalIdx] = temp;
        setFormFields(list);
      }
    } else {
      if (direction === 'up' && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
        setFormFields(list);
      } else if (direction === 'down' && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
        setFormFields(list);
      }
    }
  };

  const handlePublish = () => {
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      onClose();
      alert(`🎉 Form "${formTitle || 'New Application Form'}" successfully published!\n\nSettlement Destination: ${payoutBank} • ${payoutAccountNum} (${payoutAccountName})\nMode: ${formType === 'stepper' ? `${stepperSteps.length}-Step Stepper` : 'Single Page'}`);
    }, 700);
  };

  const displayedFields = formType === 'stepper' 
    ? formFields.filter(f => f.stepId === activeStepTab)
    : formFields;

  const currentFormConfig = {
    formTitle: formTitle || (isOrganization ? 'Graduate Trainee Programme 2026' : '2026/2027 Academic Session Admission'),
    formType,
    category: category === 'Other' ? otherCategory || 'Special Intake' : category,
    description: description || 'Please complete all required fields below and provide accurate supporting documentation.',
    openingDate,
    closingDate,
    applicationFee,
    requireDocs,
    stepperSteps,
    formFields,
    paymentDestination: {
      preset: selectedDestPreset,
      bankName: payoutBank,
      accountNumber: payoutAccountNum,
      accountName: payoutAccountName,
      gateway: payoutGateway,
      settlementSchedule: payoutSchedule
    }
  };

  return (
    <>
      <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
        <div className="create-form-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header & Stepper Wizard Bar */}
          <div className="modal-header-stepper">
            <div className="modal-title-row">
              <div className="modal-title-left">
                <div className="modal-title-icon">
                  <LucideIcon name="layout" style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <h3>Create New Form</h3>
                  <p>Configure form mode, destination account, steps and fields</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Preview Button in Header */}
                <button 
                  type="button" 
                  onClick={() => setIsPreviewOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 20,
                    border: '1px solid var(--border-color)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-dark)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  title="Preview form before publishing"
                >
                  <LucideIcon name="eye" style={{ width: 14, height: 14, color: '#0052cc' }} />
                  <span>Preview</span>
                </button>

                <button className="close-btn" onClick={onClose} aria-label="Close">
                  <LucideIcon name="x" style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>

            {/* Creation Workflow Stepper Bar */}
            <div className="stepper-progress-bar">
              <button 
                type="button" 
                className={`stepper-step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}
                onClick={() => setCurrentStep(1)}
              >
                <div className="step-indicator">
                  {currentStep > 1 ? <LucideIcon name="check" style={{ width: 14, height: 14 }} /> : 1}
                </div>
                <div className="step-info">
                  <span className="step-info-label">Step 1</span>
                  <span className="step-info-title">Form Format & Payment Routing</span>
                </div>
              </button>

              <div className={`stepper-divider ${currentStep > 1 ? 'completed' : ''}`} />

              <button 
                type="button" 
                className={`stepper-step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
                onClick={() => setCurrentStep(2)}
              >
                <div className="step-indicator">
                  {currentStep > 2 ? <LucideIcon name="check" style={{ width: 14, height: 14 }} /> : 2}
                </div>
                <div className="step-info">
                  <span className="step-info-label">Step 2</span>
                  <span className="step-info-title">{formType === 'stepper' ? 'Stepper & Fields' : 'Form Fields'}</span>
                </div>
              </button>

              <div className={`stepper-divider ${currentStep > 2 ? 'completed' : ''}`} />

              <button 
                type="button" 
                className={`stepper-step ${currentStep === 3 ? 'active' : ''}`}
                onClick={() => setCurrentStep(3)}
              >
                <div className="step-indicator">3</div>
                <div className="step-info">
                  <span className="step-info-label">Step 3</span>
                  <span className="step-info-title">Review & Publish</span>
                </div>
              </button>
            </div>
          </div>

          {/* Modal Scroll Content */}
          <div className="modal-scroll-content">
            {/* STEP 1: Form Format, Basics & Payment Destination */}
            {currentStep === 1 && (
              <div>
                {/* Choose Form Format (Stepper vs Single Page) */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>
                    Form Structure Mode
                  </label>
                  <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>
                    Select whether this form should be split into multiple interactive steps or remain on a single page.
                  </div>
                </div>

                <div className="format-selector-row">
                  <div 
                    className={`format-card ${formType === 'stepper' ? 'selected' : ''}`}
                    onClick={() => setFormType('stepper')}
                  >
                    <div className="format-icon">
                      <LucideIcon name="git-merge" style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="format-details">
                      <h4>Multi-Step Stepper (Recommended)</h4>
                      <p>Guides applicants through distinct pages with a step-by-step progress bar.</p>
                    </div>
                  </div>

                  <div 
                    className={`format-card ${formType === 'single' ? 'selected' : ''}`}
                    onClick={() => setFormType('single')}
                  >
                    <div className="format-icon">
                      <LucideIcon name="file-text" style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="format-details">
                      <h4>Single Page Form</h4>
                      <p>Presents all input fields on one continuous scrollable page.</p>
                    </div>
                  </div>
                </div>

                {/* Form Title & Category */}
                <div className="form-row">
                  <div className="form-group" style={{ flex: 2 }}>
                    <label>Form Title <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="text" 
                      placeholder={isOrganization ? "e.g. Graduate Trainee Programme 2026" : "e.g. 2026/2027 Academic Session Admission"} 
                      className="form-input" 
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Category</label>
                    <select 
                      className="form-input" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {isOrganization ? (
                        <>
                          <option>Graduate Recruitment</option>
                          <option>Experienced Hire</option>
                          <option>Fellowship / Grant</option>
                          <option>Vendor Registration</option>
                          <option>Employee Onboarding</option>
                          <option>Customer Survey</option>
                          <option value="Other">Other</option>
                        </>
                      ) : (
                        <>
                          <option>General Admission</option>
                          <option>Scholarship Application</option>
                          <option>Staff Recruitment</option>
                          <option>Hostel Accommodation</option>
                          <option>Student Survey</option>
                          <option value="Other">Other</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {category === 'Other' && (
                  <div className="form-group" style={{ marginTop: -10 }}>
                    <label>Specify Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Athletic Tryouts" 
                      className="form-input"
                      value={otherCategory}
                      onChange={(e) => setOtherCategory(e.target.value)}
                    />
                  </div>
                )}

                {/* Dates & Fee */}
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Opening Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={openingDate}
                      onChange={(e) => setOpeningDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Closing Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={closingDate}
                      onChange={(e) => setClosingDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label>Amount to be Paid <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-light)' }}>(Optional)</span></label>
                      <span style={{ 
                        fontSize: 10.5, 
                        fontWeight: 600, 
                        padding: '2px 7px', 
                        borderRadius: 12, 
                        background: applicationFee && Number(applicationFee) > 0 ? 'rgba(0, 82, 204, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: applicationFee && Number(applicationFee) > 0 ? '#0052cc' : '#10b981'
                      }}>
                        {applicationFee && Number(applicationFee) > 0 ? 'Paid Form' : 'Free Form'}
                      </span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontWeight: 600 }}>₦</span>
                      <input 
                        type="number" 
                        min="0"
                        step="100"
                        placeholder="0.00 (Free if empty)" 
                        className="form-input" 
                        style={{ paddingLeft: 34 }} 
                        value={applicationFee}
                        onChange={(e) => setApplicationFee(e.target.value)}
                      />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>
                      Leave empty or 0 if free.
                    </span>
                  </div>
                </div>

                {/* PAYMENT DESTINATION SELECTION (Where money goes) */}
                <div className="payment-destination-box">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LucideIcon name="wallet" style={{ width: 15, height: 15 }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>
                          Payment Settlement Destination Account
                        </h4>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-light)' }}>
                          Pick which bank account and gateway route applicant form payments will come into
                        </p>
                      </div>
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: 12 }}>
                      {payoutSchedule}
                    </span>
                  </div>

                  {/* Destination Preset Cards */}
                  <div className="dest-preset-grid">
                    {destinationPresets.map(preset => (
                      <div 
                        key={preset.id}
                        className={`dest-preset-card ${selectedDestPreset === preset.id ? 'selected' : ''}`}
                        onClick={() => handleSelectPreset(preset)}
                      >
                        <LucideIcon name={preset.id === 'primary' ? 'building' : preset.id === 'custom' ? 'credit-card' : 'landmark'} style={{ width: 14, height: 14, color: '#0052cc', flexShrink: 0 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 11.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {preset.title}
                          </div>
                          {preset.id !== 'custom' && (
                            <div style={{ fontSize: 10.5, color: 'var(--text-light)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {preset.bankName} • {preset.accountNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Destination Detail Inputs */}
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1.2 }}>
                      <label>Settlement Destination Bank</label>
                      <select 
                        className="form-input"
                        value={payoutBank}
                        onChange={(e) => setPayoutBank(e.target.value)}
                      >
                        {NIGERIAN_BANKS.map(bank => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                      <label>NUBAN Account Number</label>
                      <input 
                        type="text"
                        maxLength={10}
                        placeholder="10-digit account"
                        className="form-input"
                        value={payoutAccountNum}
                        onChange={(e) => setPayoutAccountNum(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1.4 }}>
                      <label>Verified Account Name</label>
                      <input 
                        type="text"
                        placeholder="Account Name"
                        className="form-input"
                        value={payoutAccountName}
                        onChange={(e) => setPayoutAccountName(e.target.value)}
                      />
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Payment Collection Gateway</label>
                      <select 
                        className="form-input"
                        value={payoutGateway}
                        onChange={(e) => setPayoutGateway(e.target.value)}
                      >
                        <option>Pixpay Subaccount (Split 100%)</option>
                        <option>Pixpay Direct Settlement</option>
                        <option>Remita TSA Central Collection</option>
                        <option>Flutterwave Dedicated Subaccount</option>
                        <option>Direct Bank Transfer / Virtual NUBAN</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="form-group" style={{ marginTop: 14 }}>
                  <label>Form Description & Candidate Instructions</label>
                  <textarea 
                    className="form-input" 
                    placeholder="Provide guidance and requirements for applicants..." 
                    rows={3} 
                    style={{ resize: 'vertical' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Stepper Steps & Form Fields Designer */}
            {currentStep === 2 && (
              <div className="step2-designer-container">
                {formType === 'stepper' ? (
                  <>
                    {/* Stepper Steps Configuration */}
                    <div className="stepper-editor-box">
                      <div className="stepper-editor-header">
                        <div className="stepper-header-title">
                          <span className="stepper-header-icon">
                            <LucideIcon name="layers" style={{ width: 16, height: 16 }} />
                          </span>
                          <div>
                            <h4>Configure Form Steps ({stepperSteps.length} Stages)</h4>
                            <p className="stepper-header-subtitle">Define the multi-stage progression flow for applicants</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="add-step-btn"
                          onClick={handleAddStepperStep}
                        >
                          <LucideIcon name="plus" style={{ width: 14, height: 14 }} />
                          <span>Add New Step</span>
                        </button>
                      </div>

                      <div className="stepper-list">
                        {stepperSteps.map((s, index) => (
                          <div key={s.id} className="stepper-row-item">
                            <span className="step-num-badge">{index + 1}</span>
                            <div className="stepper-inputs-group">
                              <input 
                                type="text" 
                                className="step-title-input" 
                                placeholder="Step Title (e.g. Contact & Profile Links)"
                                value={s.title}
                                onChange={(e) => handleUpdateStepTitle(s.id, e.target.value)}
                              />
                              <input 
                                type="text" 
                                className="step-desc-input" 
                                placeholder="Short instruction or guidance for candidates..."
                                value={s.description}
                                onChange={(e) => handleUpdateStepDesc(s.id, e.target.value)}
                              />
                            </div>
                            <button 
                              type="button" 
                              className="remove-step-btn"
                              title="Delete Step"
                              onClick={() => handleRemoveStepperStep(s.id)}
                            >
                              <LucideIcon name="trash-2" style={{ width: 15, height: 15 }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stepper Tabs to Assign Fields to Steps */}
                    <div className="step-tabs-container">
                      <div className="step-tabs-header">
                        <div className="step-tabs-title-group">
                          <span className="step-tabs-icon-wrap">
                            <LucideIcon name="git-commit" style={{ width: 15, height: 15 }} />
                          </span>
                          <span className="step-tabs-title">Assign Fields by Step</span>
                        </div>
                        <span className="step-tabs-subtitle">
                          Select a step below to customize its questions:
                        </span>
                      </div>

                      <div className="step-tabs-pills">
                        {stepperSteps.map((s, idx) => {
                          const count = formFields.filter(f => f.stepId === s.id).length;
                          const isActive = activeStepTab === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              className={`step-tab-pill ${isActive ? 'active' : ''}`}
                              onClick={() => setActiveStepTab(s.id)}
                            >
                              <span className="tab-pill-badge">{idx + 1}</span>
                              <span className="tab-pill-title">{s.title || `Step ${idx + 1}`}</span>
                              <span className="tab-pill-count">
                                {count} {count === 1 ? 'field' : 'fields'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="single-mode-banner">
                    <div className="single-mode-icon">
                      <LucideIcon name="file-text" style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <div className="single-mode-title">Single Page Form Mode</div>
                      <div className="single-mode-desc">
                        All configured questions will render in a continuous candidate view without wizard stages.
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Fields Palette & Builder */}
                <div className="field-palette-box">
                  <div className="field-palette-header">
                    <div className="field-palette-title-group">
                      <LucideIcon name="plus-circle" style={{ width: 15, height: 15, color: '#0052cc' }} />
                      <span className="field-palette-title">
                        Add Input Field to {formType === 'stepper' 
                          ? `Step ${stepperSteps.findIndex(s => s.id === activeStepTab) + 1}: ${stepperSteps.find(s => s.id === activeStepTab)?.title || ''}`
                          : 'Form'}:
                      </span>
                    </div>
                    <span className="field-palette-hint">Click a component below to insert</span>
                  </div>

                  <div className="field-palette-buttons">
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('text')}>
                      <span className="palette-icon-wrap" style={{ color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)' }}>
                        <LucideIcon name="type" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>Short Text</span>
                    </button>
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('email')}>
                      <span className="palette-icon-wrap" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}>
                        <LucideIcon name="mail" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>Email</span>
                    </button>
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('number')}>
                      <span className="palette-icon-wrap" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                        <LucideIcon name="hash" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>Number</span>
                    </button>
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('date')}>
                      <span className="palette-icon-wrap" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                        <LucideIcon name="calendar" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>Date</span>
                    </button>
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('select')}>
                      <span className="palette-icon-wrap" style={{ color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)' }}>
                        <LucideIcon name="chevron-down" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>Dropdown</span>
                    </button>
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('file')}>
                      <span className="palette-icon-wrap" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)' }}>
                        <LucideIcon name="upload-cloud" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>File Upload</span>
                    </button>
                    <button type="button" className="palette-chip-btn" onClick={() => handleAddField('textarea')}>
                      <span className="palette-icon-wrap" style={{ color: '#64748b', background: 'rgba(100, 116, 139, 0.1)' }}>
                        <LucideIcon name="align-left" style={{ width: 13, height: 13 }} />
                      </span>
                      <span>Textarea</span>
                    </button>
                  </div>
                </div>

                {/* Configured Fields List */}
                <div className="fields-builder-list">
                  {displayedFields.length === 0 ? (
                    <div className="empty-fields-state">
                      <div className="empty-fields-icon-wrap">
                        <LucideIcon name="folder-plus" style={{ width: 28, height: 28, color: '#0052cc' }} />
                      </div>
                      <div className="empty-fields-title">No questions or fields in this step yet</div>
                      <p className="empty-fields-desc">
                        Click any component in the palette above to add your first question to this step.
                      </p>
                    </div>
                  ) : (
                    displayedFields.map((field, fieldIdx) => {
                      const config = FIELD_TYPE_CONFIG[field.type] || { label: field.type, icon: 'help-circle', color: '#0052cc', bg: 'rgba(0, 82, 204, 0.1)' };
                      return (
                        <div key={field.id} className="field-card-item">
                          <div className="field-card-drag-handle" title="Field Order">
                            <LucideIcon name="grip-vertical" style={{ width: 15, height: 15 }} />
                          </div>

                          <div className="field-type-pill" style={{ color: config.color, background: config.bg, borderColor: `${config.color}33` }}>
                            <LucideIcon name={config.icon} style={{ width: 12, height: 12 }} />
                            <span>{config.label}</span>
                          </div>

                          <div className="field-input-wrapper">
                            <input 
                              type="text" 
                              className="field-label-text-input" 
                              placeholder="Question or field label (e.g. Full Legal Name)..."
                              value={field.label}
                              onChange={(e) => handleUpdateFieldLabel(field.id, e.target.value)}
                            />
                          </div>

                          <div className="field-card-controls">
                            <button
                              type="button"
                              className={`field-req-pill ${field.required ? 'active' : ''}`}
                              onClick={() => handleToggleFieldRequired(field.id)}
                              title={field.required ? 'Mandatory Field' : 'Optional Field'}
                            >
                              <LucideIcon 
                                name={field.required ? 'check-circle-2' : 'circle'} 
                                style={{ width: 13, height: 13 }} 
                              />
                              <span>{field.required ? 'Required' : 'Optional'}</span>
                            </button>

                            <div className="field-reorder-group">
                              <button
                                type="button"
                                className="field-reorder-btn"
                                title="Move Up"
                                disabled={fieldIdx === 0}
                                onClick={() => handleMoveField(field.id, 'up')}
                              >
                                <LucideIcon name="chevron-up" style={{ width: 13, height: 13 }} />
                              </button>
                              <button
                                type="button"
                                className="field-reorder-btn"
                                title="Move Down"
                                disabled={fieldIdx === displayedFields.length - 1}
                                onClick={() => handleMoveField(field.id, 'down')}
                              >
                                <LucideIcon name="chevron-down" style={{ width: 13, height: 13 }} />
                              </button>
                            </div>

                            <button 
                              type="button" 
                              className="field-card-delete-btn"
                              title="Delete Field"
                              onClick={() => handleRemoveField(field.id)}
                            >
                              <LucideIcon name="trash-2" style={{ width: 14, height: 14 }} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Review, Settlement Verification & Publish */}
            {currentStep === 3 && (
              <div className="review-step-container">
                {/* Hero Header Card */}
                <div className="review-hero-card">
                  <div className="review-hero-header">
                    <div>
                      <div className="review-hero-meta">
                        <span className="review-format-tag">
                          {formType === 'stepper' ? `Multi-Step Form (${stepperSteps.length} Steps)` : 'Single Page Form'}
                        </span>
                        <span style={{ opacity: 0.3 }}>•</span>
                        <span style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>{workspaceName}</span>
                      </div>
                      <h3 className="review-hero-title">{formTitle || 'Untitled Application Form'}</h3>
                    </div>
                    <span className="review-status-badge">
                      <LucideIcon name="check-circle" style={{ width: 14, height: 14 }} /> Ready to Publish
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="review-stats-grid">
                    <div className="review-stat-tile">
                      <span className="review-stat-label">Structure</span>
                      <span className="review-stat-value">{formType === 'stepper' ? 'Stepper Wizard' : 'Single Page'}</span>
                    </div>
                    <div className="review-stat-tile">
                      <span className="review-stat-label">Category</span>
                      <span className="review-stat-value">{category === 'Other' ? otherCategory || 'Other' : category}</span>
                    </div>
                    <div className="review-stat-tile">
                      <span className="review-stat-label">Application Fee</span>
                      <span className="review-stat-value" style={{ color: applicationFee && Number(applicationFee) > 0 ? '#0052cc' : '#10b981' }}>
                        {applicationFee && Number(applicationFee) > 0 ? `₦${Number(applicationFee).toLocaleString()}` : 'Free (₦0.00)'}
                      </span>
                    </div>
                    <div className="review-stat-tile">
                      <span className="review-stat-label">Total Inputs</span>
                      <span className="review-stat-value">{formFields.length} configured fields</span>
                    </div>
                  </div>
                </div>

                {/* Stepper Stages Breakdown */}
                {formType === 'stepper' && (
                  <div className="review-block-card">
                    <div className="review-block-header">
                      <div className="review-block-title">
                        <LucideIcon name="layers" style={{ width: 16, height: 16, color: '#0052cc' }} />
                        <span>Workflow Stages ({stepperSteps.length} Steps)</span>
                      </div>
                    </div>
                    <div className="review-stepper-grid">
                      {stepperSteps.map((s, idx) => {
                        const stepFields = formFields.filter(f => f.stepId === s.id);
                        return (
                          <div key={s.id} className="review-step-card">
                            <span className="review-step-badge">{idx + 1}</span>
                            <div className="review-step-content">
                              <div className="review-step-name">{s.title}</div>
                              <div className="review-step-desc">{s.description}</div>
                              <div className="review-step-field-tags">
                                {stepFields.length === 0 ? (
                                  <span style={{ fontSize: 10, color: 'var(--text-light)' }}>No fields assigned</span>
                                ) : (
                                  stepFields.map(f => (
                                    <span key={f.id} className="review-field-tag">{f.label}</span>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Payment Settlement Routing Card */}
                <div className="review-block-card">
                  <div className="review-block-header">
                    <div className="review-block-title">
                      <LucideIcon name="wallet" style={{ width: 16, height: 16, color: '#0052cc' }} />
                      <span>Payment Settlement Routing</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: 10 }}>
                      {payoutSchedule}
                    </span>
                  </div>
                  <div className="review-payout-box">
                    <div className="review-payout-row">
                      <span className="review-payout-bank">{payoutBank} • {payoutAccountNum}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0052cc' }}>Verified Account</span>
                    </div>
                    <div className="review-payout-meta">
                      <span>Beneficiary: <strong>{payoutAccountName}</strong></span>
                      <span>•</span>
                      <span>Gateway: <strong>{payoutGateway}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Publishing Preferences Toggles */}
                <div className="review-block-card">
                  <div className="review-block-header">
                    <div className="review-block-title">
                      <LucideIcon name="sliders" style={{ width: 16, height: 16, color: '#0052cc' }} />
                      <span>Publishing Preferences</span>
                    </div>
                  </div>
                  <div className="review-toggles-grid">
                    <div className="review-toggle-card">
                      <div className="review-toggle-info">
                        <div className="review-toggle-title">Require Document Uploads</div>
                        <div className="review-toggle-desc">Applicants must attach verification files before submitting.</div>
                      </div>
                      <label className="switch">
                        <input type="checkbox" checked={requireDocs} onChange={(e) => setRequireDocs(e.target.checked)} />
                        <span className="slider round" />
                      </label>
                    </div>

                    <div className="review-toggle-card">
                      <div className="review-toggle-info">
                        <div className="review-toggle-title">Save as Reusable Template</div>
                        <div className="review-toggle-desc">Make this structure available in your Templates Library.</div>
                      </div>
                      <label className="switch">
                        <input type="checkbox" checked={saveAsTemplate} onChange={(e) => setSaveAsTemplate(e.target.checked)} />
                        <span className="slider round" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preview Callout Banner */}
                <div className="review-preview-cta">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>Want to test candidate view?</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-light)' }}>Preview this form in desktop or mobile mode before going live.</div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setIsPreviewOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-dark)' }}
                  >
                    <LucideIcon name="eye" style={{ width: 14, height: 14, color: '#0052cc' }} /> Preview Experience
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="modal-footer-stepper">
            <div className="footer-left-hint">
              {currentStep === 1 && 'Configure title, payout destination & structure mode'}
              {currentStep === 2 && `${formType === 'stepper' ? 'Organize steps & custom fields' : 'Add custom fields'}`}
              {currentStep === 3 && 'Final verification and publishing'}
            </div>

            <div className="footer-btn-group">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  style={{ border: '1px solid var(--border-color)', background: 'transparent', padding: '10px 18px', cursor: 'pointer', borderRadius: 30 }}
                >
                  Back
                </button>
              )}

              {/* Preview Button in Footer */}
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setIsPreviewOpen(true)}
                style={{ 
                  border: '1px solid var(--border-color)', 
                  background: 'transparent', 
                  padding: '10px 18px', 
                  cursor: 'pointer', 
                  borderRadius: 30,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
                title="Preview form before publishing"
              >
                <LucideIcon name="eye" style={{ width: 15, height: 15, color: '#0052cc' }} />
                <span>Preview Form</span>
              </button>

              {currentStep < 3 ? (
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={() => {
                    if (currentStep === 1 && !formTitle.trim()) {
                      setFormTitle(isOrganization ? 'Graduate Trainee Programme 2026' : 'New Academic Application Form');
                    }
                    setCurrentStep(prev => prev + 1);
                  }}
                  style={{ padding: '10px 22px', fontSize: 13, cursor: 'pointer', borderRadius: 30 }}
                >
                  <span>Continue</span>
                  <LucideIcon name="arrow-right" style={{ width: 15, height: 15 }} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handlePublish}
                  disabled={publishSuccess}
                  style={{ padding: '10px 24px', fontSize: 13, cursor: 'pointer', borderRadius: 30 }}
                >
                  <LucideIcon name="check" style={{ width: 16, height: 16 }} />
                  <span>{publishSuccess ? 'Publishing...' : 'Publish Form'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form Preview Modal */}
      <FormPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formConfig={currentFormConfig}
        onPublish={handlePublish}
        publishButtonLabel="Publish Form"
      />
    </>
  );
}
