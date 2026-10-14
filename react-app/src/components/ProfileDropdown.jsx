import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Shield, LogOut, Sparkles, Crown, Sun, Moon } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import './ProfileDropdown.css';

export default function ProfileDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { workspaceName, isOrganization, terms, currentPlan, isDark, toggleTheme, requestLogout } = useWorkspace();

  if (!isOpen) return null;

  return (
    <div className="profile-dropdown">
      <div className="profile-user-info">
        <div className="profile-avatar-large" style={{
          background: isOrganization ? '#7c3aed' : '#0052cc'
        }}>
          <span>{terms.adminProfile.initials}</span>
          <span className="profile-online-badge" />
        </div>
        <div className="profile-details">
          <div className="profile-name">{workspaceName}</div>
          <div className="profile-email">{terms.adminProfile.email}</div>
          <span className="profile-role-tag" style={{
            background: isOrganization ? 'rgba(124, 58, 237, 0.1)' : 'rgba(0, 82, 204, 0.1)',
            color: isOrganization ? '#7c3aed' : '#0052cc'
          }}>
            {terms.adminProfile.role}
          </span>
        </div>
      </div>

      <div className="profile-menu-divider" />

      <div className="profile-menu-list">
        <button 
          className="profile-menu-item"
          onClick={() => {
            onClose();
            navigate('/pricing');
          }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Crown size={15} style={{ color: '#f59e0b' }} />
            <span>Plans & Billing</span>
          </div>
          <span style={{
            fontSize: '10.5px',
            fontWeight: 700,
            background: isOrganization ? 'rgba(124, 58, 237, 0.12)' : 'rgba(0, 82, 204, 0.1)',
            color: isOrganization ? '#7c3aed' : '#0052cc',
            padding: '2px 7px',
            borderRadius: '12px'
          }}>
            {currentPlan?.name || 'Pro Plan'}
          </span>
        </button>

        <button 
          className="profile-menu-item"
          onClick={() => {
            onClose();
            navigate('/settings');
          }}
        >
          <User size={15} />
          <span>Admin Profile</span>
        </button>

        <button 
          className="profile-menu-item"
          onClick={() => {
            onClose();
            navigate('/settings');
          }}
        >
          <Settings size={15} />
          <span>System Settings</span>
        </button>

        <button 
          className="profile-menu-item"
          onClick={() => {
            onClose();
            navigate('/settings');
          }}
        >
          <Shield size={15} />
          <span>Security & 2FA</span>
        </button>

        <button 
          className="profile-menu-item"
          onClick={() => {
            onClose();
            navigate('/');
            window.dispatchEvent(new CustomEvent('formboxx:start-tour'));
          }}
        >
          <Sparkles size={15} style={{ color: '#0052cc' }} />
          <span>Quick Tour</span>
        </button>
      </div>

      <div className="profile-menu-divider" />

      {/* Theme / Appearance Switcher */}
      <div className="profile-theme-section">
        <div className="profile-theme-row">
          <div className="profile-theme-title">
            {isDark ? <Moon size={14} style={{ color: '#a78bfa' }} /> : <Sun size={14} style={{ color: '#f59e0b' }} />}
            <span>Theme</span>
          </div>
          <div className="profile-theme-pills">
            <button 
              type="button"
              className={`profile-theme-pill ${!isDark ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isDark) toggleTheme();
              }}
              title="Switch to Light Mode"
            >
              <Sun size={12} />
              <span>Light</span>
            </button>
            <button 
              type="button"
              className={`profile-theme-pill ${isDark ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDark) toggleTheme();
              }}
              title="Switch to Dark Mode"
            >
              <Moon size={12} />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>

      <div className="profile-menu-divider" />

      <div className="profile-footer">
        <button 
          className="profile-logout-btn"
          onClick={() => {
            onClose();
            requestLogout();
          }}
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
