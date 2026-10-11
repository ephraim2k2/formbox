import React, { useEffect } from 'react';
import LucideIcon from './LucideIcon';

export default function CreateFormModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {

    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" id="createFormModalOverlay" onClick={onClose}>
        <div className="create-form-modal" id="createFormModal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h3>Create New Form</h3>
                <button className="close-btn" onClick={onClose}><LucideIcon name="x" style={{width: '20px', height: '20px'}} /></button>
            </div>
            <div className="modal-body">
                <div className="form-row">
                    <div className="form-group" style={{flex: 2}}>
                        <label>Form Title</label>
                        <input type="text" placeholder="e.g. 2026 Academic Session Admission" className="form-input" id="modalFormTitle" />
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                        <label>Category</label>
                        <select className="form-input" id="modalFormCategory" onChange={(e) => {
                            const input = document.getElementById('otherCategoryInput');
                            if (input) input.style.display = e.target.value === 'Other' ? 'block' : 'none';
                        }}>
                            <option>General Admission</option>
                            <option>Recruitment</option>
                            <option>Survey</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" className="form-input" placeholder="Type category name..." style={{display: 'none', marginTop: '8px'}} id="otherCategoryInput" />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group" style={{flex: 1}}>
                        <label>Opening Date</label>
                        <input type="date" className="form-input" />
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                        <label>Closing Date</label>
                        <input type="date" className="form-input" />
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Application Fee (Optional)</label>
                    <div style={{position: 'relative'}}>
                        <span style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontWeight: '600'}}>₦</span>
                        <input type="number" placeholder="0.00" className="form-input" style={{paddingLeft: '36px'}} />
                    </div>
                </div>
                
                <div className="form-group">
                    <label>Description & Instructions</label>
                    <textarea className="form-input" placeholder="Provide instructions for applicants..." rows={4} style={{resize: 'vertical'}} id="modalFormDesc"></textarea>
                </div>
                
                <div className="form-toggle-row" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', marginTop: '8px'}}>
                    <div>
                        <div style={{fontWeight: '600', fontSize: '13px', color: 'var(--text-dark)'}}>Require Document Uploads</div>
                        <div style={{fontSize: '11px', color: 'var(--text-light)'}}>Applicants must upload a birth certificate or passport.</div>
                    </div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                </div>
                
                <div className="form-toggle-row" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', marginTop: '12px'}}>
                    <div>
                        <div style={{fontWeight: '600', fontSize: '13px', color: 'var(--text-dark)'}}>Save as Template</div>
                        <div style={{fontSize: '11px', color: 'var(--text-light)'}}>Make this form reusable for future configurations.</div>
                    </div>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '24px', borderTop: '1px solid var(--border-color)', background: 'var(--card-bg)'}}>
                <button className="btn-secondary" onClick={onClose} style={{border: '1px solid var(--border-color)', background: 'transparent', padding: '10px 20px', cursor: 'pointer'}}>Cancel</button>
                <button className="btn-primary" onClick={onClose} style={{padding: '10px 24px', fontSize: '13px', cursor: 'pointer'}}><LucideIcon name="check" style={{width: '16px', height: '16px'}} /> Publish Form</button>
            </div>
        </div>
    </div>
  );
}
