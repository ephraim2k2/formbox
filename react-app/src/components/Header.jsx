import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, RefreshCcw, Moon, Sun, Bell, Search, Menu, X, FileText, CheckCircle2, AlertCircle, Printer, Volume2, Award, LayoutDashboard, Wallet, Crown } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import ProfileDropdown from './ProfileDropdown';
import { useWorkspace } from '../context/WorkspaceContext';

export default function Header({ onOpenCommandPalette }) {
  const { terms, workspaceName, isOrganization, isDark, toggleTheme } = useWorkspace();
  const nav = terms.nav;
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileApplicationsOpen, setMobileApplicationsOpen] = useState(true);
  const [mobilePaymentsOpen, setMobilePaymentsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close menus & popovers when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsNotifOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-actions')) {
        setIsNotifOpen(false);
        setIsProfileOpen(false);
      }
      if (!e.target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <>
      <nav className="navbar" style={{ opacity: 1, transform: 'none' }}>
        <div 
          id="tour-brand" 
          className="logo" 
          onClick={() => window.location.href = '/'}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '32px', fontWeight: 700, letterSpacing: '-1px', padding: '6px 12px', cursor: 'pointer' }}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
            <polygon points="12 4 3 9 12 14 21 9 12 4" stroke="#0052cc" fill="white"></polygon>
            <polyline points="3 13 12 18 21 13" stroke="#ffcc00"></polyline>
            <polyline points="3 17 12 22 21 17" stroke="#0052cc"></polyline>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex' }}>
              <span style={{ color: '#0052cc' }}>form</span><span style={{ color: '#ffcc00' }}>box</span>
            </div>
            <div className="active-workspace-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '20px',
              background: isOrganization ? 'rgba(124, 58, 237, 0.1)' : 'rgba(0, 82, 204, 0.08)',
              color: isOrganization ? '#7c3aed' : '#0052cc',
              fontSize: '11px',
              fontWeight: 600,
              maxWidth: '180px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }} title={`Logged in as ${workspaceName} (${terms.workspaceLabel})`}>
              <span>{isOrganization ? '🏢' : '🏫'}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{workspaceName}</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <NavLink id="tour-nav-dashboard" to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>Dashboard</NavLink>
          <NavLink id="tour-nav-forms" to="/forms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>Forms</NavLink>
          
          <div id="tour-nav-applications" className={`nav-dropdown ${activeDropdown === 'applications' ? 'open' : ''}`}>
            <div 
              className={`nav-link ${['/completed', '/abandoned', nav.slipPath, nav.resultPath].includes(location.pathname) ? 'active' : ''}`} 
              onClick={(e) => toggleDropdown(e, 'applications')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              {nav.group} <ChevronDown size={14} style={{ transform: activeDropdown === 'applications' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            <div className="nav-dropdown-content">
              <NavLink to="/completed" className="mega-menu-item" onClick={() => setActiveDropdown(null)}>
                <div className="mega-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <CheckCircle2 size={18} />
                </div>
                <div className="mega-text-box">
                  <div className="mega-title">{nav.completed}</div>
                  <div className="mega-subtitle">{nav.completedSub}</div>
                </div>
              </NavLink>
              <NavLink to="/abandoned" className="mega-menu-item" onClick={() => setActiveDropdown(null)}>
                <div className="mega-icon-box" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  <AlertCircle size={18} />
                </div>
                <div className="mega-text-box">
                  <div className="mega-title">{nav.incomplete}</div>
                  <div className="mega-subtitle">{nav.incompleteSub}</div>
                </div>
              </NavLink>
              <NavLink to={nav.slipPath} className="mega-menu-item" onClick={() => setActiveDropdown(null)}>
                <div className="mega-icon-box" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                  <Printer size={18} />
                </div>
                <div className="mega-text-box">
                  <div className="mega-title">{nav.slipTitle}</div>
                  <div className="mega-subtitle">{nav.slipSub}</div>
                </div>
              </NavLink>
              <NavLink to={nav.resultPath} className="mega-menu-item" onClick={() => setActiveDropdown(null)}>
                <div className="mega-icon-box" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <Award size={18} />
                </div>
                <div className="mega-text-box">
                  <div className="mega-title">{nav.resultTitle}</div>
                  <div className="mega-subtitle">{nav.resultSub}</div>
                </div>
              </NavLink>
            </div>
          </div>

          <div id="tour-nav-payments" className={`nav-dropdown ${activeDropdown === 'payments' ? 'open' : ''}`}>
            <div 
              className={`nav-link ${['/payments', '/requery'].includes(location.pathname) ? 'active' : ''}`} 
              onClick={(e) => toggleDropdown(e, 'payments')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              {nav.payments} <ChevronDown size={14} style={{ transform: activeDropdown === 'payments' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            <div className="nav-dropdown-content">
              <NavLink to="/payments" className="mega-menu-item" onClick={() => setActiveDropdown(null)}>
                <div className="mega-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Wallet size={18} />
                </div>
                <div className="mega-text-box">
                  <div className="mega-title">{nav.allPayments}</div>
                  <div className="mega-subtitle">{nav.allPaymentsSub}</div>
                </div>
              </NavLink>
              <NavLink to="/requery" className="mega-menu-item" onClick={() => setActiveDropdown(null)}>
                <div className="mega-icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <RefreshCcw size={18} />
                </div>
                <div className="mega-text-box">
                  <div className="mega-title">{nav.requery}</div>
                  <div className="mega-subtitle">{nav.requerySub}</div>
                </div>
              </NavLink>
            </div>
          </div>
          <NavLink id="tour-nav-announcements" to="/announcements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>{nav.announcements}</NavLink>
          <NavLink id="tour-nav-pricing" to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>Pricing</NavLink>
        </div>

        {/* User Actions & Mobile Hamburger */}
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
            <Search size={16} />
            <span className="cmd-text-label" style={{ fontWeight: 500 }}>Search...</span>
            <kbd className="cmd-trigger-kbd">⌘K</kbd>
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
            style={{ 
              cursor: 'pointer', 
              position: 'relative',
              background: isOrganization ? '#7c3aed' : '#0052cc',
              color: '#fff',
              fontWeight: 600
            }}
            title={`Account: ${workspaceName} (${terms.workspaceLabel})`}
          >
            <span>{terms.adminProfile.initials}</span>
          </div>

          {/* Profile Dropdown Component */}
          <ProfileDropdown 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
          />

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            title="Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-inner">
            <NavLink 
              to="/" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink 
              to="/forms" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText size={18} />
              <span>Forms Library</span>
            </NavLink>

            {/* Mobile Applications Section */}
            <div className="mobile-nav-group">
              <div 
                className="mobile-nav-group-header"
                onClick={() => setMobileApplicationsOpen(!mobileApplicationsOpen)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontWeight: 600 }}>{nav.group}</span>
                </div>
                <ChevronDown size={16} style={{ transform: mobileApplicationsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>

              {mobileApplicationsOpen && (
                <div className="mobile-nav-sublist">
                  <NavLink 
                    to="/completed" 
                    className={({ isActive }) => `mobile-subnav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{nav.completed}</span>
                  </NavLink>
                  <NavLink 
                    to="/abandoned" 
                    className={({ isActive }) => `mobile-subnav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{nav.incomplete}</span>
                  </NavLink>
                   <NavLink 
                    to={nav.slipPath} 
                    className={({ isActive }) => `mobile-subnav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{nav.slipTitle}</span>
                  </NavLink>
                  <NavLink 
                    to={nav.resultPath} 
                    className={({ isActive }) => `mobile-subnav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{nav.resultTitle}</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Payments Section */}
            <div className="mobile-nav-group">
              <div 
                className="mobile-nav-group-header"
                onClick={() => setMobilePaymentsOpen(!mobilePaymentsOpen)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RefreshCcw size={18} color="#3b82f6" />
                  <span style={{ fontWeight: 600 }}>{nav.payments}</span>
                </div>
                <ChevronDown size={16} style={{ transform: mobilePaymentsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>

              {mobilePaymentsOpen && (
                <div className="mobile-nav-sublist">
                  <NavLink 
                    to="/payments" 
                    className={({ isActive }) => `mobile-subnav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{nav.allPayments}</span>
                  </NavLink>
                  <NavLink 
                    to="/requery" 
                    className={({ isActive }) => `mobile-subnav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{nav.requery}</span>
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink 
              to="/announcements" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Volume2 size={18} />
              <span>Announcements</span>
            </NavLink>

            <NavLink 
              to="/pricing" 
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Crown size={18} style={{ color: '#f59e0b' }} />
              <span>Pricing</span>
            </NavLink>

            {/* Mobile Drawer Theme Toggle */}
            <div 
              className="mobile-nav-item mobile-theme-item"
              onClick={() => toggleTheme()}
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '6px',
                borderTop: '1px solid var(--border-color, rgba(0,0,0,0.06))',
                paddingTop: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isDark ? <Sun size={18} className="text-amber" /> : <Moon size={18} />}
                <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '999px',
                background: isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 82, 204, 0.1)',
                color: isDark ? '#f59e0b' : '#0052cc'
              }}>
                {isDark ? 'Dark Active' : 'Light Active'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
