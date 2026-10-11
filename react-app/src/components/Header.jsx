import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, RefreshCcw, Moon, Sun, Bell, Command, Search } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import ProfileDropdown from './ProfileDropdown';

export default function Header({ onOpenCommandPalette }) {
  const [isDark, setIsDark] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'enabled') {
      setIsDark(true);
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-actions')) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('darkMode', 'disabled');
      setIsDark(false);
    } else {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('darkMode', 'enabled');
      setIsDark(true);
    }
  };

  return (
    <nav className="navbar" style={{ opacity: 1, transform: 'none' }}>
      <div 
        id="tour-brand" 
        className="logo" 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', padding: '6px 16px 6px 12px', cursor: 'pointer' }}
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
          <polygon points="12 4 3 9 12 14 21 9 12 4" stroke="#0052cc" fill="white"></polygon>
          <polyline points="3 13 12 18 21 13" stroke="#ffcc00"></polyline>
          <polyline points="3 17 12 22 21 17" stroke="#0052cc"></polyline>
        </svg>
        <div style={{ display: 'flex' }}>
          <span style={{ color: '#0052cc' }}>form</span><span style={{ color: '#ffcc00' }}>box</span>
        </div>
      </div>

      <div className="nav-links">
        <NavLink id="tour-nav-dashboard" to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>Dashboard</NavLink>
        <NavLink id="tour-nav-forms" to="/forms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>Forms</NavLink>
        
        <div id="tour-nav-applications" className="nav-dropdown">
          <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Applications <ChevronDown size={14} />
          </div>
          <div className="nav-dropdown-content">
            <NavLink to="/completed" className="mega-menu-item">
              <div className="mega-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div className="mega-text-box">
                <div className="mega-title">Completed Applications</div>
                <div className="mega-subtitle">Successfully submitted forms</div>
              </div>
            </NavLink>
            <NavLink to="/abandoned" className="mega-menu-item">
              <div className="mega-icon-box" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              </div>
              <div className="mega-text-box">
                <div className="mega-title">Abandoned Applications</div>
                <div className="mega-subtitle">Users who dropped off</div>
              </div>
            </NavLink>
            <NavLink to="/exam-slip" className="mega-menu-item">
              <div className="mega-icon-box" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="mega-text-box">
                <div className="mega-title">Exam Slips</div>
                <div className="mega-subtitle">Generate & print exam slips</div>
              </div>
            </NavLink>
          </div>
        </div>

        <div id="tour-nav-payments" className="nav-dropdown">
          <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Payments <ChevronDown size={14} />
          </div>
          <div className="nav-dropdown-content">
            <NavLink to="/requery" className="mega-menu-item">
              <div className="mega-icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <RefreshCcw size={18} />
              </div>
              <div className="mega-text-box">
                <div className="mega-title">Requery Payment</div>
                <div className="mega-subtitle">Verify payment status</div>
              </div>
            </NavLink>
          </div>
        </div>
        <NavLink id="tour-nav-announcements" to="/announcements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>Announcement</NavLink>
        <NavLink id="tour-nav-results" to="/result" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>Results</NavLink>
      </div>

      <div className="user-actions" style={{ position: 'relative' }}>
        {/* Quick Search / Command Palette Trigger */}
        <button 
          type="button"
          id="tour-cmd-trigger"
          className="cmd-trigger-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof onOpenCommandPalette === 'function') {
              onOpenCommandPalette();
            }
            window.dispatchEvent(new CustomEvent('formboxx:open-command-palette'));
          }}
          title="Command Palette & Universal Search (⌘K / Ctrl+K)"
          aria-label="Open command palette"
        >
          <Search size={14} />
          <span style={{ fontWeight: 500 }}>Search...</span>
          <kbd className="cmd-trigger-kbd">⌘K</kbd>
        </button>

        <button id="tour-theme-toggle" className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification Bell Button */}
        <button 
          id="tour-notif-bell"
          className="icon-btn" 
          onClick={() => {
            setIsNotifOpen(!isNotifOpen);
            setIsProfileOpen(false);
          }}
          style={{ position: 'relative' }}
          aria-label="View notifications"
        >
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#0052cc',
            border: '2px solid var(--card-bg)'
          }} />
        </button>

        {/* Notification Dropdown Component */}
        <NotificationCenter 
          isOpen={isNotifOpen} 
          onClose={() => setIsNotifOpen(false)} 
        />

        {/* User Profile Avatar with Online Status */}
        <div 
          id="tour-user-avatar"
          className="user-avatar" 
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsNotifOpen(false);
          }}
          style={{ cursor: 'pointer', position: 'relative' }}
          title="User Account Menu"
        >
          <span>AD</span>
        </div>

        {/* Profile Dropdown Component */}
        <ProfileDropdown 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      </div>
    </nav>
  );
}
