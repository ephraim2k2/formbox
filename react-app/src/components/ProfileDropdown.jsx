import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Shield, LogOut, CheckCircle2, Sparkles } from 'lucide-react';
import './ProfileDropdown.css';

export default function ProfileDropdown({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="profile-dropdown">
      <div className="profile-user-info">
        <div className="profile-avatar-large">
          <span>AD</span>
          <span className="profile-online-badge" />
        </div>
        <div className="profile-details">
          <div className="profile-name">Ephraim Admin</div>
          <div className="profile-email">admin@formboxx.edu</div>
          <span className="profile-role-tag">Super Administrator</span>
        </div>
      </div>

      <div className="profile-menu-divider" />

      <div className="profile-menu-list">
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

      <div className="profile-footer">
        <button 
          className="profile-logout-btn"
          onClick={() => {
            onClose();
            navigate('/login');
          }}
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
