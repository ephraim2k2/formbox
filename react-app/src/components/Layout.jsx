import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Header from './Header';
import PageLoader from './PageLoader';
import GuidedTour from './GuidedTour';
import CommandPalette from './CommandPalette';
import LogoutModal from './LogoutModal';
import { useWorkspace } from '../context/WorkspaceContext';

export default function Layout() {
  const { isDark, toggleTheme } = useWorkspace();
  const [initialLoading, setInitialLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for global logout verification modal trigger
  useEffect(() => {
    const handleOpenLogout = () => setIsLogoutModalOpen(true);
    window.addEventListener('formboxx:open-logout-modal', handleOpenLogout);
    return () => window.removeEventListener('formboxx:open-logout-modal', handleOpenLogout);
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut + CustomEvent listener
  useEffect(() => {
    const handleOpen = () => setIsCmdOpen(true);
    const handleClose = () => setIsCmdOpen(false);
    const handleToggle = () => setIsCmdOpen(prev => !prev);

    const handleKeyDown = (e) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isKeyK = e.key === 'k' || e.key === 'K' || e.code === 'KeyK';

      if (isCmdOrCtrl && isKeyK) {
        e.preventDefault();
        e.stopPropagation();
        setIsCmdOpen(prev => !prev);
      }
    };

    // Use capture: true to intercept ⌘K before browser address bar or child elements
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('formboxx:open-command-palette', handleOpen);
    window.addEventListener('formboxx:toggle-command-palette', handleToggle);
    window.addEventListener('formboxx:close-command-palette', handleClose);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('formboxx:open-command-palette', handleOpen);
      window.removeEventListener('formboxx:toggle-command-palette', handleToggle);
      window.removeEventListener('formboxx:close-command-palette', handleClose);
    };
  }, []);

  // Initial loader for app load (shortened to 1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-trigger tour on load of the index page ('/') ONLY once
  useEffect(() => {
    if (!initialLoading && location.pathname === '/') {
      const tourShown = localStorage.getItem('formboxx_tour_completed') || 
                        localStorage.getItem('formboxx_tour_seen') || 
                        localStorage.getItem('formboxx_tour_auto_triggered');
      if (!tourShown) {
        // Mark as triggered so it never auto-runs on page load again
        localStorage.setItem('formboxx_tour_auto_triggered', 'true');
        const tourTimer = setTimeout(() => {
          setIsTourOpen(true);
        }, 700);
        return () => clearTimeout(tourTimer);
      }
    }
  }, [initialLoading, location.pathname]);

  // Listen for manual "Quick Tour" trigger from profile dropdown / command palette
  useEffect(() => {
    const handleStartTour = () => {
      if (location.pathname !== '/') {
        navigate('/');
      }
      setIsTourOpen(true);
    };
    window.addEventListener('formboxx:start-tour', handleStartTour);
    return () => window.removeEventListener('formboxx:start-tour', handleStartTour);
  }, [location.pathname, navigate]);

  // Synchronously set navLoading to true as soon as location changes during render phase
  // Note: Bypass loader completely when taking the tour so page changes are instant and seamless!
  if (prevPath !== null && prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (!initialLoading && !isTourOpen) {
      setNavLoading(true);
    }
  }

  useEffect(() => {
    if (prevPath === null) {
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  // Turn off nav loading after a smooth delay (600ms)
  useEffect(() => {
    if (!navLoading) return;
    const timer = setTimeout(() => {
      setNavLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [navLoading]);

  // Loader is only shown if not in tour mode
  const isLoading = initialLoading || (navLoading && !isTourOpen);

  return (
    <div className="dashboard-container">
      <PageLoader visible={isLoading} />
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          visibility: isLoading ? 'hidden' : 'visible',
          transition: 'opacity 0.3s ease', 
          width: '100%' 
        }}
      >
        <Header onOpenCommandPalette={() => setIsCmdOpen(true)} />
        <Outlet />
      </div>

      {/* Interactive Guided Tour for First-Time Users */}
      <GuidedTour 
        isOpen={isTourOpen && !isLoading} 
        onClose={() => setIsTourOpen(false)} 
      />

      {/* Global Command Palette (Cmd + K / Ctrl + K) */}
      <CommandPalette 
        isOpen={isCmdOpen} 
        onClose={() => setIsCmdOpen(false)} 
      />

      {/* Floating Theme Switcher Dock in Spacious Bottom-Right Corner */}
      {!isLoading && (
        <button
          type="button"
          className="floating-theme-dock-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode (or use ⌘K)`}
        >
          <span className="floating-theme-icon-wrap">
            {isDark ? <Sun size={15} className="text-amber" /> : <Moon size={15} />}
          </span>
          <span className="floating-theme-label">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
      )}

      {/* Verification Question Modal on Logout */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          navigate('/login');
        }}
      />
    </div>
  );
}
