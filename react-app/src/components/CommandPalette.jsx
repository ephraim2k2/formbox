import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Command, 
  ArrowRight, 
  LayoutDashboard, 
  FileText, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Bell, 
  Award, 
  Settings, 
  Moon, 
  Sun, 
  PlusCircle, 
  Sparkles, 
  Ticket,
  User,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  HelpCircle,
  Crown,
  LogOut
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import './CommandPalette.css';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { terms, isOrganization, isDark, toggleTheme, requestLogout } = useWorkspace();
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  const actions = [
    // Primary Navigation
    { 
      id: 'dash', 
      title: 'Go to Dashboard', 
      category: 'Navigation', 
      icon: LayoutDashboard, 
      path: '/',
      keywords: ['home', 'main', 'analytics', 'overview', 'metrics', 'stats']
    },
    { 
      id: 'forms', 
      title: 'Manage Forms', 
      category: 'Navigation', 
      icon: FileText, 
      path: '/forms',
      keywords: ['builder', 'create form', 'admission', 'scholarship', 'fields', 'edit']
    },
    { 
      id: 'templates', 
      title: 'Form Templates Library', 
      category: 'Navigation', 
      icon: Layers, 
      path: '/templates',
      keywords: ['templates', 'pre-built', 'ready made', 'starter', 'samples']
    },
    { 
      id: 'completed', 
      title: 'Completed Applications', 
      category: 'Navigation', 
      icon: CheckCircle, 
      path: '/completed',
      keywords: ['submitted', 'approved', 'candidates', 'students', 'paid', 'verified', 'applicants']
    },
    { 
      id: 'abandoned', 
      title: 'Incomplete Applications', 
      category: 'Navigation', 
      icon: Clock, 
      path: '/abandoned',
      keywords: ['dropoff', 'drafts', 'pending', 'incomplete', 'abandoned', 'unsubmitted', 'follow up']
    },
    { 
      id: 'exam-slip', 
      title: terms.nav.slipTitle, 
      category: 'Navigation', 
      icon: Ticket, 
      path: terms.nav.slipPath,
      keywords: isOrganization
        ? ['assessment', 'invitation', 'invite', 'venue', 'schedule', 'issue']
        : ['slip', 'hall ticket', 'print', 'examination slip', 'docket', 'seat']
    },
    { 
      id: 'payments', 
      title: 'All Payments', 
      category: 'Navigation', 
      icon: CreditCard, 
      path: '/payments',
      keywords: ['payments', 'transactions', 'history', 'revenue', 'fees', 'collected', 'finance']
    },
    { 
      id: 'requery', 
      title: 'Requery Payment Transactions', 
      category: 'Navigation', 
      icon: CreditCard, 
      path: '/requery',
      keywords: ['payment', 'verify', 'transaction', 'remita', 'pixpay', 'gateway', 'receipt', 'finance']
    },
    { 
      id: 'announcements', 
      title: 'Broadcast Announcements', 
      category: 'Navigation', 
      icon: Bell, 
      path: '/announcements',
      keywords: ['alerts', 'broadcast', 'notifications', 'news', 'messages', 'publish']
    },
    { 
      id: 'result', 
      title: terms.nav.resultTitle, 
      category: 'Navigation', 
      icon: Award, 
      path: terms.nav.resultPath,
      keywords: isOrganization
        ? ['outcome', 'results', 'approved', 'declined', 'notify', 'upload']
        : ['scores', 'grades', 'cutoff', 'ranking', 'pass', 'merit list']
    },
    { 
      id: 'settings', 
      title: isOrganization ? 'General & Assessment Settings' : 'General & Examination Settings', 
      category: 'Navigation', 
      icon: Settings, 
      path: '/settings',
      keywords: isOrganization 
        ? ['settings', 'config', 'assessment', 'cut off', 'venues', 'security', 'password', '2fa', 'organization profile']
        : ['settings', 'config', 'venues', 'exam date', 'duration', 'security', 'password', '2fa', 'school profile']
    },
    { 
      id: 'pricing', 
      title: 'Plans & Pricing (Upgrade Subscription)', 
      category: 'Navigation', 
      icon: Crown, 
      path: '/pricing',
      keywords: ['pricing', 'plans', 'upgrade', 'billing', 'subscription', 'pixpay', 'tier', 'invoices', 'receipts']
    },

    // Quick Actions
    { 
      id: 'new-form', 
      title: 'Create New Application Form', 
      category: 'Actions', 
      icon: PlusCircle, 
      path: '/forms',
      keywords: ['create', 'add form', 'new']
    },
    { 
      id: 'tour', 
      title: 'Start Interactive Guided Tour', 
      category: 'Actions', 
      icon: Sparkles, 
      action: () => {
        navigate('/');
        window.dispatchEvent(new CustomEvent('formboxx:start-tour'));
      }
    },
    { 
      id: 'theme', 
      title: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme', 
      category: 'Actions', 
      icon: isDark ? Sun : Moon, 
      keywords: ['dark mode', 'light mode', 'theme', 'color', 'night', 'appearance'],
      action: () => {
        toggleTheme();
      } 
    },
    { 
      id: 'logout', 
      title: 'Log Out of Account', 
      category: 'Actions', 
      icon: LogOut, 
      keywords: ['logout', 'sign out', 'leave', 'exit', 'disconnect'],
      action: () => {
        requestLogout();
      } 
    },

    // Candidates / Applicants Directory Search
    ...(isOrganization ? [
      { 
        id: 'cand-1', 
        title: 'Amaka Obi (Graduate Trainee 2026 - Lagos)', 
        category: 'Applicants', 
        icon: User, 
        path: '/completed',
        keywords: ['amaka', 'obi', 'lagos', 'graduate', 'trainee', 'app-2026-0016']
      },
      { 
        id: 'cand-2', 
        title: 'James Haruna (Experienced Hire – Finance - Abuja)', 
        category: 'Applicants', 
        icon: User, 
        path: '/completed',
        keywords: ['james', 'haruna', 'abuja', 'finance', 'hire', 'app-2026-7392']
      },
      { 
        id: 'cand-3', 
        title: 'Chidinma Eze (Tech Fellowship Cohort 4 - Rivers)', 
        category: 'Applicants', 
        icon: User, 
        path: '/completed',
        keywords: ['chidinma', 'eze', 'tech', 'fellowship', 'rivers', 'app-2026-5541']
      },
      { 
        id: 'cand-4', 
        title: 'Tunde Bakare (Community Grant - Ogun)', 
        category: 'Applicants', 
        icon: User, 
        path: '/abandoned',
        keywords: ['tunde', 'bakare', 'grant', 'community', 'incomplete', 'app-2026-0922']
      },
      { 
        id: 'cand-5', 
        title: 'Ngozi Adeyemi (Summer Internship - Lagos)', 
        category: 'Applicants', 
        icon: User, 
        path: '/completed',
        keywords: ['ngozi', 'adeyemi', 'internship', 'summer', 'app-2026-1402']
      },
      {
        id: 'venue-1',
        title: 'Lagos Assessment Centre (200 Slots, Active Hub)',
        category: 'Assessment Hubs',
        icon: Building,
        path: '/settings',
        keywords: ['venue', 'lagos assessment centre', 'slots', 'capacity', 'hub', 'lekki']
      },
      {
        id: 'venue-2',
        title: 'Abuja Talent Hub (350 Slots, Active Hub)',
        category: 'Assessment Hubs',
        icon: Building,
        path: '/settings',
        keywords: ['venue', 'abuja talent hub', 'cbd', 'slots', 'capacity', 'assessment']
      },
      {
        id: 'setting-exam-setup',
        title: 'Assessment Schedule & Cut-Off Score Setup',
        category: 'Settings',
        icon: Calendar,
        path: '/settings',
        keywords: ['assessment date', 'duration', 'cut off', 'proctored', 'mode', 'instructions']
      },
    ] : [
      { 
        id: 'cand-1', 
        title: 'David Olamide (Admission 2026 - Lagos State)', 
        category: 'Candidates', 
        icon: User, 
        path: '/completed',
        keywords: ['david', 'olamide', 'lagos', 'admission', 'fb-2026-0891']
      },
      { 
        id: 'cand-2', 
        title: 'Sarah Johnson (Staff Recruitment - Abuja)', 
        category: 'Candidates', 
        icon: User, 
        path: '/completed',
        keywords: ['sarah', 'johnson', 'abuja', 'recruitment', 'staff', 'fb-2026-0412']
      },
      { 
        id: 'cand-3', 
        title: 'Emeka Uchenna (Transfer Application - Rivers)', 
        category: 'Candidates', 
        icon: User, 
        path: '/completed',
        keywords: ['emeka', 'uchenna', 'transfer', 'rivers', 'fb-2026-1104']
      },
      { 
        id: 'cand-4', 
        title: 'Favour Nwosu (Hostel Accommodation - Enugu)', 
        category: 'Candidates', 
        icon: User, 
        path: '/abandoned',
        keywords: ['favour', 'nwosu', 'hostel', 'accommodation', 'enugu', 'incomplete', 'fb-2026-0922']
      },
      { 
        id: 'cand-5', 
        title: 'Chioma Adeleke (Merit Scholarship - Oyo)', 
        category: 'Candidates', 
        icon: User, 
        path: '/completed',
        keywords: ['chioma', 'adeleke', 'scholarship', 'merit', 'oyo', 'fb-2026-1402']
      },
      {
        id: 'venue-1',
        title: 'Lagos Tech Hub (250 Seats, Active Venue)',
        category: 'Venues',
        icon: Building,
        path: '/settings',
        keywords: ['venue', 'lagos tech hub', 'seats', 'capacity', 'examination center', 'yaba']
      },
      {
        id: 'venue-2',
        title: 'Abuja Convention Center (500 Seats, Active Venue)',
        category: 'Venues',
        icon: Building,
        path: '/settings',
        keywords: ['venue', 'abuja', 'convention center', 'garki', 'seats', 'capacity']
      },
      {
        id: 'setting-exam-setup',
        title: 'Examination Schedule & Pass Score Setup',
        category: 'Settings',
        icon: Calendar,
        path: '/settings',
        keywords: ['exam date', 'duration', 'pass score', 'cbt', 'mode', 'instructions']
      },
    ]),
    {
      id: 'setting-security',
      title: 'Security & Two-Factor Authentication (2FA)',
      category: 'Settings',
      icon: ShieldCheck,
      path: '/settings',
      keywords: ['password', 'security', '2fa', 'two factor', 'credentials']
    }
  ];

  // Smart multi-keyword filtering
  const cleanQuery = query.trim().toLowerCase();
  const filtered = actions.filter(item => {
    if (!cleanQuery) return true;
    const titleMatch = item.title.toLowerCase().includes(cleanQuery);
    const categoryMatch = item.category.toLowerCase().includes(cleanQuery);
    const keywordMatch = item.keywords?.some(k => k.toLowerCase().includes(cleanQuery));
    return titleMatch || categoryMatch || keywordMatch;
  });

  // Lock background scroll when palette is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Reset search and auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset selected index when search text changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global Escape key listener while open
  useEffect(() => {
    if (!isOpen) return;
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [isOpen, onClose]);

  // Keyboard navigation within command list
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filtered[selectedIndex];
      if (selected) {
        triggerAction(selected);
      }
    }
  };

  const triggerAction = (item) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="cmd-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Command Palette"
    >
      <div 
        className="cmd-dialog" 
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-header">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search (e.g. Settings, Forms, David, Venues)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="cmd-badge">ESC</kbd>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              No matching commands or records found for "{query}".
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon || FileText;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => triggerAction(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="cmd-item-left">
                    <div className="cmd-icon-box">
                      <Icon size={16} />
                    </div>
                    <span className="cmd-item-title">{item.title}</span>
                  </div>
                  <div className="cmd-item-right">
                    <span className="cmd-category-tag">{item.category}</span>
                    <ArrowRight size={13} className="cmd-arrow" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate: <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Open: <kbd>↵</kbd></span>
          <span>Close: <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>,
    document.body
  );
}
