import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import './CreateFormModal.css';

export default function CreateFormModal({ isOpen, onClose }) {
  // Main wizard steps for the creation flow
  const [currentStep, setCurrentStep] = useState(1);

  // Form Configuration State
  const [formType, setFormType] = useState('stepper'); // 'single' | 'stepper'
  const [formTitle, setFormTitle] = useState('');
  const [category, setCategory] = useState('General Admission');
  const [otherCategory, setOtherCategory] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [applicationFee, setApplicationFee] = useState('');
  const [description, setDescription] = useState('');
  const [requireDocs, setRequireDocs] = useState(true);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Stepper steps configuration (dynamic)
  const [stepperSteps, setStepperSteps] = useState([
    { id: 1, title: 'Personal Information', description: 'Bio-data, contact address and guardian info' },
    { id: 2, title: 'Academic History', description: 'Previous school, certificates and transcripts' },
    { id: 3, title: 'Documents & Verification', description: 'Birth certificate, passport photo and ID' },
    { id: 4, title: 'Review & Declaration', description: 'Applicant confirmation and fee submission' }
  ]);

  // Dynamic Form Fields state
  const [formFields, setFormFields] = useState([
    { id: 1, label: 'Full Legal Name', type: 'text', stepId: 1, required: true },
    { id: 2, label: 'Date of Birth', type: 'date', stepId: 1, required: true },
    { id: 3, label: 'Email Address', type: 'email', stepId: 1, required: true },
    { id: 4, label: 'Previous School Name', type: 'text', stepId: 2, required: true },
    { id: 5, label: 'Passport Photograph', type: 'file', stepId: 3, required: true }
  ]);

  const [activeStepTab, setActiveStepTab] = useState(1);

  if (!isOpen) return null;

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

  const handlePublish = () => {
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      onClose();
      alert(`🎉 Form "${formTitle || 'New Application Form'}" successfully published as a ${formType === 'stepper' ? `${stepperSteps.length}-Step Stepper` : 'Single Page'} form!`);
    }, 700);
  };

  const displayedFields = formType === 'stepper' 
    ? formFields.filter(f => f.stepId === activeStepTab)
    : formFields;

  return (
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
                <p>Configure form mode, structure, steps and fields</p>
              </div>
            </div>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <LucideIcon name="x" style={{ width: 18, height: 18 }} />
            </button>
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
                <span className="step-info-title">Form Format & Basics</span>
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
                <span className="step-info-title">Settings & Publish</span>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="modal-scroll-content">
          {/* STEP 1: Form Format & Basics */}
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
                    placeholder="e.g. 2026/2027 Academic Session Admission" 
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
                    <option>General Admission</option>
                    <option>Scholarship Application</option>
                    <option>Staff Recruitment</option>
                    <option>Hostel Accommodation</option>
                    <option>Student Survey</option>
                    <option value="Other">Other</option>
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
                    Leave empty or set to 0 if no payment is required.
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
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
            <div>
              {formType === 'stepper' ? (
                <>
                  {/* Stepper Steps Configuration */}
                  <div className="stepper-editor-box">
                    <div className="stepper-editor-header">
                      <h4>
                        <LucideIcon name="layers" style={{ width: 16, height: 16, color: '#0052cc' }} />
                        Configure Form Steps ({stepperSteps.length} Steps)
                      </h4>
                      <button 
                        type="button" 
                        className="add-step-btn"
                        onClick={handleAddStepperStep}
                      >
                        <LucideIcon name="plus" style={{ width: 14, height: 14 }} />
                        Add New Step
                      </button>
                    </div>

                    <div className="stepper-list">
                      {stepperSteps.map((s, index) => (
                        <div key={s.id} className="stepper-row-item">
                          <span className="step-num-badge">{index + 1}</span>
                          <input 
                            type="text" 
                            className="step-title-input"
                            value={s.title}
                            placeholder="Step Title"
                            onChange={(e) => handleUpdateStepTitle(s.id, e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="step-desc-input"
                            value={s.description}
                            placeholder="Step subtitle or instructions"
                            onChange={(e) => handleUpdateStepDesc(s.id, e.target.value)}
                          />
                          <button 
                            type="button" 
                            className="remove-step-btn"
                            title="Remove step"
                            onClick={() => handleRemoveStepperStep(s.id)}
                          >
                            <LucideIcon name="trash-2" style={{ width: 15, height: 15 }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Selector Tabs for Field Building */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>
                      Assigning Fields to Steps
                    </label>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: 'auto', paddingBottom: 6 }}>
                      {stepperSteps.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveStepTab(s.id)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600,
                            border: activeStepTab === s.id ? '1.5px solid #0052cc' : '1px solid var(--border-color)',
                            background: activeStepTab === s.id ? 'rgba(0, 82, 204, 0.08)' : 'var(--card-bg)',
                            color: activeStepTab === s.id ? '#0052cc' : 'var(--text-dark)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <span>Step {idx + 1}: {s.title}</span>
                          <span style={{ fontSize: 11, opacity: 0.7 }}>
                            ({formFields.filter(f => f.stepId === s.id).length})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>
                    Single Page Form Fields
                  </label>
                  <p style={{ fontSize: 12, color: 'var(--text-light)', margin: '2px 0 0' }}>
                    All fields below will appear on one continuous form.
                  </p>
                </div>
              )}

              {/* Add Fields Toolbar */}
              <div className="fields-builder-area">
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-light)', marginBottom: 8 }}>
                  + Add Input Field
                </div>
                <div className="fields-builder-toolbar">
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('text')}>
                    <LucideIcon name="type" style={{ width: 14, height: 14 }} /> Text
                  </button>
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('email')}>
                    <LucideIcon name="mail" style={{ width: 14, height: 14 }} /> Email
                  </button>
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('number')}>
                    <LucideIcon name="hash" style={{ width: 14, height: 14 }} /> Number
                  </button>
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('date')}>
                    <LucideIcon name="calendar" style={{ width: 14, height: 14 }} /> Date
                  </button>
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('select')}>
                    <LucideIcon name="list" style={{ width: 14, height: 14 }} /> Dropdown
                  </button>
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('file')}>
                    <LucideIcon name="upload-cloud" style={{ width: 14, height: 14 }} /> File Upload
                  </button>
                  <button type="button" className="add-field-chip" onClick={() => handleAddField('textarea')}>
                    <LucideIcon name="align-left" style={{ width: 14, height: 14 }} /> Textarea
                  </button>
                </div>

                {/* Field List Container */}
                <div className="fields-list-container">
                  {displayedFields.length === 0 ? (
                    <div style={{ padding: 24, textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: 12, color: 'var(--text-light)', fontSize: 13 }}>
                      No fields in this step yet. Click any button above to add one!
                    </div>
                  ) : (
                    displayedFields.map((field) => (
                      <div key={field.id} className="field-builder-card">
                        <div className="field-card-left">
                          <span className="field-type-tag">{field.type}</span>
                          <input 
                            type="text" 
                            className="field-inline-label-input"
                            value={field.label}
                            onChange={(e) => handleUpdateFieldLabel(field.id, e.target.value)}
                          />
                        </div>
                        <div className="field-card-actions">
                          <label className="req-toggle">
                            <input 
                              type="checkbox" 
                              checked={field.required}
                              onChange={() => handleToggleFieldRequired(field.id)}
                            />
                            <span>Required</span>
                          </label>
                          <button 
                            type="button" 
                            className="remove-step-btn"
                            onClick={() => handleRemoveField(field.id)}
                            title="Delete Field"
                          >
                            <LucideIcon name="trash" style={{ width: 14, height: 14 }} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Final Settings */}
          {currentStep === 3 && (
            <div>
              {/* Summary Card */}
              <div className="review-card-summary">
                <div className="summary-headline">
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#0052cc', textTransform: 'uppercase' }}>
                      {formType === 'stepper' ? `Multi-Step Form (${stepperSteps.length} Steps)` : 'Single Page Form'}
                    </span>
                    <div className="summary-title">{formTitle || 'Untitled Admission Form'}</div>
                  </div>
                  <span style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                    Ready to Publish
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12, fontSize: 12 }}>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Category:</span>{' '}
                    <strong>{category === 'Other' ? otherCategory || 'Other' : category}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Amount to be Paid:</span>{' '}
                    <strong style={{ color: applicationFee && Number(applicationFee) > 0 ? '#0052cc' : '#10b981' }}>
                      {applicationFee && Number(applicationFee) > 0 ? `₦${Number(applicationFee).toLocaleString()}` : 'Free (₦0.00)'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Total Fields:</span>{' '}
                    <strong>{formFields.length} fields</strong>
                  </div>
                </div>

                {formType === 'stepper' && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dark)' }}>
                      Stepper Workflow Preview:
                    </div>
                    <div className="summary-stepper-preview">
                      {stepperSteps.map((s, idx) => (
                        <div key={s.id} className="preview-step-pill">
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#0052cc', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                            {idx + 1}
                          </span>
                          <span>{s.title}</span>
                          <span style={{ color: 'var(--text-light)', fontSize: 11 }}>
                            ({formFields.filter(f => f.stepId === s.id).length} fields)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="form-toggle-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', marginTop: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-dark)' }}>Require Document Uploads</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Applicants must upload verification files before final submission.</div>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={requireDocs} onChange={(e) => setRequireDocs(e.target.checked)} />
                  <span className="slider round" />
                </label>
              </div>

              <div className="form-toggle-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', marginTop: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-dark)' }}>Save as Reusable Template</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Make this stepper structure accessible under the Templates Library.</div>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={saveAsTemplate} onChange={(e) => setSaveAsTemplate(e.target.checked)} />
                  <span className="slider round" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer-stepper">
          <div className="footer-left-hint">
            {currentStep === 1 && 'Configure title, dates & structure mode'}
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

            {currentStep < 3 ? (
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => {
                  if (currentStep === 1 && !formTitle.trim()) {
                    setFormTitle('New Academic Application Form');
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
  );
}
