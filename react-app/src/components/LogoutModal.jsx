import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LogOut, AlertTriangle, X, HelpCircle } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import './LogoutModal.css';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  const { workspaceName, isOrganization, terms } = useWorkspace();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoggingOut) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoggingOut, onClose]);

  // Reset loading state when opened / closed
  useEffect(() => {
    if (!isOpen) {
      setIsLoggingOut(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      if (typeof onConfirm === 'function') {
        onConfirm();
      }
    }, 450);
  };

  const modalContent = (
    <div className="logout-modal-backdrop" onClick={!isLoggingOut ? onClose : undefined}>
      <div 
        className="logout-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
      >
        {/* Top Header Row with Icon & Close */}
        <div className="logout-modal-header">
          <div className="logout-icon-bubble">
            <LogOut size={22} className="logout-icon-danger" />
          </div>
          <button 
            type="button" 
            className="logout-modal-close-btn" 
            onClick={onClose}
            disabled={isLoggingOut}
            aria-label="Cancel and close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Verification Question & Title */}
        <div className="logout-modal-body">
          <div className="logout-verification-badge">
            <HelpCircle size={13} />
            <span>Verification Question</span>
          </div>
          <h2 id="logout-modal-title" className="logout-modal-title">
            Are you sure you want to log out?
          </h2>
          <p className="logout-modal-desc">
            You are about to end your current session. Please verify that you wish to sign out of the system.
          </p>

          {/* User Account Info Card */}
          <div className="logout-user-card">
            <div 
              className="logout-user-avatar"
              style={{
                background: isOrganization ? '#7c3aed' : '#0052cc'
              }}
            >
              <span>{terms.adminProfile.initials}</span>
            </div>
            <div className="logout-user-meta">
              <div className="logout-user-name">{workspaceName}</div>
              <div className="logout-user-email">{terms.adminProfile.email}</div>
              <div className="logout-user-tags">
                <span 
                  className="logout-role-pill" 
                  style={{
                    background: isOrganization ? 'rgba(124, 58, 237, 0.12)' : 'rgba(0, 82, 204, 0.1)',
                    color: isOrganization ? '#7c3aed' : '#0052cc'
                  }}
                >
                  {terms.adminProfile.role}
                </span>
                <span className="logout-workspace-pill">
                  {terms.workspaceLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Safety Notice */}
          <div className="logout-safety-note">
            <AlertTriangle size={15} className="logout-safety-icon" />
            <span>
              Any unsaved form changes or drafts will be closed. You can sign back in anytime with your admin credentials.
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="logout-modal-footer">
          <button
            type="button"
            className="logout-btn-cancel"
            onClick={onClose}
            disabled={isLoggingOut}
          >
            Stay Logged In
          </button>
          <button
            type="button"
            className="logout-btn-confirm"
            onClick={handleConfirm}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <span className="logout-loading-content">
                <span className="logout-spinner" />
                <span>Signing Out...</span>
              </span>
            ) : (
              <>
                <LogOut size={16} />
                <span>Yes, Log Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

