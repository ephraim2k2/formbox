import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  LayoutTemplate, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Award,
  Printer,
  RefreshCcw,
  Wallet,
  Crown
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export default function Sidebar() {
  const { terms, workspaceName, isOrganization, requestLogout } = useWorkspace();
  const nav = terms.nav;

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <span>form<span style={{ color: '#0052cc' }}>box</span></span>
      </div>

      <div style={{ padding: '0 16px 12px 16px', fontSize: '11px', color: 'var(--text-light)', fontWeight: 600 }}>
        {isOrganization ? '🏢 ' : '🏫 '} {workspaceName}
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard style={{ width: '20px', height: '20px' }} /> Dashboard
        </NavLink>
        <NavLink to="/forms" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText style={{ width: '20px', height: '20px' }} /> Forms Library
        </NavLink>
        <NavLink to="/templates" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutTemplate style={{ width: '20px', height: '20px' }} /> Templates
        </NavLink>
        
        <div className="nav-group">{nav.group}</div>
        <NavLink to="/completed" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            {nav.completed}
          </div>
        </NavLink>
        <NavLink to="/abandoned" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
            {nav.incomplete}
          </div>
        </NavLink>
        <NavLink to={nav.slipPath} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Printer style={{ width: '20px', height: '20px' }} /> {nav.slipTitle}
        </NavLink>
        <NavLink to={nav.resultPath} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Award style={{ width: '20px', height: '20px' }} /> {nav.resultTitle}
        </NavLink>

        <div className="nav-group">{nav.payments}</div>
        <NavLink to="/payments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Wallet style={{ width: '20px', height: '20px' }} /> {nav.allPayments}
        </NavLink>
        <NavLink to="/requery" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <RefreshCcw style={{ width: '20px', height: '20px' }} /> {nav.requery}
        </NavLink>

        <div className="nav-group">System & Billing</div>
        <NavLink to="/announcements" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Bell style={{ width: '20px', height: '20px' }} /> {nav.announcements}
        </NavLink>
        <NavLink to="/pricing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Crown style={{ width: '20px', height: '20px', color: '#f59e0b' }} /> Pricing
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings style={{ width: '20px', height: '20px' }} /> Settings
        </NavLink>
      </nav>

      <div className="nav-menu" style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
        <div 
          className="nav-item" 
          style={{ color: '#ef4444', cursor: 'pointer' }}
          onClick={() => requestLogout()}
        >
          <LogOut style={{ width: '20px', height: '20px' }} /> Logout
        </div>
      </div>
    </aside>
  );
}
