import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  UploadCloud, 
  CreditCard, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import './FormPreviewModal.css';

export default function FormPreviewModal({ 
  isOpen, 
  onClose, 
  formConfig = {},
  onPublish = null,
  publishButtonLabel = 'Publish Form'
}) {
  const { workspaceName, isOrganization } = useWorkspace();
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const {
    formTitle = 'New Application Form',
    formType = 'stepper',
    category = isOrganization ? 'Graduate Recruitment' : 'General Admission',
    description = 'Please complete all required fields below and provide accurate supporting documentation.',
    openingDate = '',
    closingDate = '',
    applicationFee = '',
    requireDocs = true,
    stepperSteps = isOrganization ? [
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
    formFields = [
      { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
      { id: 2, label: 'Email Address', type: 'email', stepId: 1, required: true },
      { id: 3, label: 'Phone Number', type: 'text', stepId: 1, required: true },
      { id: 4, label: 'Educational Background', type: 'text', stepId: 2, required: true },
      { id: 5, label: 'Passport Photo / Profile', type: 'file', stepId: 3, required: true }
    ],
    paymentDestination = {
      preset: 'primary',
      bankName: isOrganization ? 'Access Bank Plc' : 'Zenith Bank Plc',
      accountNumber: '0123456789',
      accountName: isOrganization ? 'Access Bank Plc - Group Talent Payout' : 'Roseville Secondary School - Admissions Revenue',
      gateway: 'Pixpay Subaccount (Direct Split)',
      settlementSchedule: 'Instant Settlement'
    }
  } = formConfig;

  const feeAmount = applicationFee && Number(applicationFee) > 0 ? Number(applicationFee) : 0;
  const isPaid = feeAmount > 0;
  const currentStep = stepperSteps[activeStepIndex] || stepperSteps[0];
  const isLastStep = activeStepIndex === stepperSteps.length - 1;

  // Fields for current step in stepper mode, or all fields in single-page mode
  const displayedFields = formType === 'stepper' 
    ? formFields.filter(f => f.stepId === currentStep?.id)
    : formFields;

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className={`preview-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="preview-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className="preview-header-bar">
          <div className="preview-header-title">
            <span className="preview-badge-live">
              <Sparkles size={12} /> Interactive Preview
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-dark)' }}>
                {formTitle || 'Untitled Application Form'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                {formType === 'stepper' ? `Multi-Step Stepper (${stepperSteps.length} Steps)` : 'Single Page Mode'} • {category}
              </span>
            </div>
          </div>

          {/* Desktop vs Mobile Simulator Switcher */}
          <div className="preview-device-toggle">
            <button 
              type="button" 
              className={`preview-device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceMode('desktop')}
              title="Desktop Screen Preview"
            >
              <Monitor size={14} /> Desktop
            </button>
            <button 
              type="button" 
              className={`preview-device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setDeviceMode('mobile')}
              title="Mobile Smartphone Preview"
            >
              <Smartphone size={14} /> Mobile
            </button>
          </div>

          {/* Header Action Buttons */}
          <div className="preview-header-actions">
            {onPublish && (
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  onClose();
                  onPublish();
                }}
                style={{ padding: '8px 16px', fontSize: '12.5px', borderRadius: '30px' }}
              >
                <Check size={14} /> {publishButtonLabel}
              </button>
            )}
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
              style={{ padding: '8px 14px', fontSize: '12.5px', borderRadius: '30px', border: '1px solid var(--border-color)', background: 'transparent' }}
            >
              <X size={14} /> Close
            </button>
          </div>
        </div>

        {/* Viewport Container */}
        <div className={`preview-viewport-container ${deviceMode}`}>
          <div className={`preview-form-wrapper ${deviceMode}`}>
            {deviceMode === 'mobile' && <div className="preview-mobile-notch" />}

            {/* Branded Institution & Form Banner */}
            <div className="preview-branding-banner">
              <div>
                <div className="preview-institution-badge">
                  <Building2 size={13} /> {workspaceName}
                </div>
                <h2 className="preview-form-headline">{formTitle || 'Application Form'}</h2>
                <p className="preview-form-desc">{description || 'Please fill in all required fields accurately.'}</p>
                {(openingDate || closingDate) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '11px', color: 'var(--text-light)' }}>
                    <Calendar size={12} />
                    <span>Open: {openingDate || 'Immediate'} — Deadline: {closingDate || 'Open Continuous'}</span>
                  </div>
                )}
              </div>

              {/* Fee & Payout Destination Pill */}
              <div className="preview-fee-card">
                <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', color: isPaid ? '#0052cc' : '#10b981' }}>
                  {isPaid ? 'Application Fee' : 'Admission Status'}
                </div>
                <div className="preview-fee-amount">
                  {isPaid ? `₦${feeAmount.toLocaleString()}` : 'Free'}
                </div>
                {isPaid && (
                  <div className="preview-fee-dest" title={`Payout routes to ${paymentDestination.bankName} (${paymentDestination.accountNumber})`}>
                    → {paymentDestination.bankName}
                  </div>
                )}
              </div>
            </div>

            {/* Stepper Navigation (if Stepper Mode) */}
            {formType === 'stepper' && (
              <div className="preview-stepper-nav">
                {stepperSteps.map((step, idx) => (
                  <button 
                    key={step.id}
                    type="button"
                    className={`preview-step-tab ${idx === activeStepIndex ? 'active' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    <span className="preview-step-num">{idx + 1}</span>
                    <span>{step.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Stepper Step Info Header */}
            {formType === 'stepper' && currentStep && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>
                  {currentStep.title}
                </h4>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-light)' }}>
                  {currentStep.description}
                </p>
              </div>
            )}

            {/* Rendered Input Fields */}
            <div className="preview-fields-grid">
              {displayedFields.map(field => (
                <div key={field.id} className="preview-field-box">
                  <label className="preview-field-label">
                    {field.label}
                    {field.required && <span className="preview-field-required">*</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea 
                      className="preview-input-sim" 
                      rows={3}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  ) : field.type === 'file' ? (
                    <div className="preview-file-dropzone">
                      <UploadCloud size={24} style={{ color: '#0052cc', marginBottom: '6px' }} />
                      <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-dark)' }}>
                        Click to select or drag & drop {field.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px' }}>
                        PDF, JPG, PNG or DOCX (Max 5MB)
                      </div>
                    </div>
                  ) : field.type === 'select' ? (
                    <select 
                      className="preview-input-sim"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    >
                      <option value="">Select an option...</option>
                      <option value="opt1">Option 1</option>
                      <option value="opt2">Option 2</option>
                    </select>
                  ) : (
                    <input 
                      type={field.type || 'text'}
                      className="preview-input-sim" 
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Document Uploads Preview (on Step 3 / Document step or when enabled) */}
            {requireDocs && (formType === 'single' || currentStep?.title.toLowerCase().includes('document') || isLastStep) && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 82, 204, 0.03)', borderRadius: '14px', border: '1px solid rgba(0, 82, 204, 0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' }}>
                  <ShieldCheck size={16} color="#0052cc" /> Supporting Verification Documents
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-light)' }}>
                  All candidates must attach valid identity credentials prior to final checkout.
                </div>
              </div>
            )}

            {/* Payment & Settlement Destination Invoice (Shown on final review step if paid) */}
            {isPaid && (formType === 'single' || isLastStep) && (
              <div className="preview-settlement-invoice">
                <div className="preview-invoice-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={18} color="#0052cc" />
                    <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-dark)' }}>
                      Fee Payment & Settlement Details
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '12px' }}>
                    Verified Gateway Routing
                  </span>
                </div>

                <div className="preview-invoice-row">
                  <span>Application Processing Fee:</span>
                  <strong style={{ color: 'var(--text-dark)' }}>₦{feeAmount.toLocaleString()}.00</strong>
                </div>
                <div className="preview-invoice-row">
                  <span>Payment Gateway Processing:</span>
                  <span>₦0.00 (Waived)</span>
                </div>
                <div className="preview-invoice-row total">
                  <span>Total Amount Due:</span>
                  <span style={{ color: '#0052cc', fontSize: '16px' }}>₦{feeAmount.toLocaleString()}.00</span>
                </div>

                {/* Where payment is coming to */}
                <div className="preview-payout-dest-pill">
                  <Wallet size={16} color="#0052cc" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase' }}>
                      Settlement Payout Account
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {paymentDestination.bankName} • {paymentDestination.accountNumber} ({paymentDestination.accountName})
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#10b981', marginTop: '2px' }}>
                      Route: {paymentDestination.gateway} • {paymentDestination.settlementSchedule}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Declaration Checkbox (on final step or single page) */}
            {(formType === 'single' || isLastStep) && (
              <div style={{ marginTop: '22px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  id="preview-agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: '3px', cursor: 'pointer' }}
                />
                <label htmlFor="preview-agree" style={{ fontSize: '12px', color: 'var(--text-light)', cursor: 'pointer' }}>
                  I confirm that all particulars supplied in this form are correct and complete to the best of my knowledge.
                </label>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            {formType === 'stepper' && (
              <div className="preview-form-footer-nav">
                <button 
                  type="button" 
                  className="preview-btn-nav prev"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  style={{ opacity: activeStepIndex === 0 ? 0.4 : 1, cursor: activeStepIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                {isLastStep ? (
                  <button 
                    type="button" 
                    className="preview-btn-nav next"
                    onClick={() => alert('Applicant submission successfully simulated! In production, this finalizes the entry and logs the transaction.')}
                  >
                    <span>{isPaid ? `Pay ₦${feeAmount.toLocaleString()} & Submit` : 'Submit Application'}</span>
                    <CheckCircle2 size={14} />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className="preview-btn-nav next"
                    onClick={() => setActiveStepIndex(prev => Math.min(stepperSteps.length - 1, prev + 1))}
                  >
                    <span>Next Step</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

