import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import './GuidedTour.css';

export const TOUR_STEPS = [
  {
    target: null,
    placement: 'center',
    title: 'Welcome to Formbox! 🎉',
    badge: 'Quick Tour',
    description: 'Welcome to your centralized application and examination administrative hub. Let’s take a quick guided tour across the platform’s core features.'
  },
  {
    target: '#tour-brand',
    title: 'Institutional Workspace 🏛️',
    badge: 'Brand & Home',
    description: 'This is your institutional brand and quick home button. Wherever you are in the application, clicking here brings you straight back to the main dashboard.'
  },
  {
    target: '#tour-nav-dashboard',
    title: 'Executive Dashboard 📊',
    badge: 'Analytics',
    description: 'Monitor real-time submission metrics, application traffic volume, conversion percentages, and recent applicant submissions all in one place.'
  },
  {
    target: '#tour-nav-forms',
    title: 'Form Management & Builder 📝',
    badge: 'Forms & Templates',
    description: 'Create customized multi-step forms or pick from ready-to-use admission, scholarship, and recruitment templates with tailored fees and stages.'
  },
  {
    target: '#tour-nav-applications',
    title: 'Application Pipeline 📂',
    badge: 'Tracking',
    description: 'Track incoming student applications end-to-end. Filter completed entries, re-engage abandoned drafts, and generate official candidate exam slips.'
  },
  {
    target: '#tour-nav-payments',
    title: 'Payments & Verification 💳',
    badge: 'Finance',
    description: 'Manage application fees and financial records. Easily requery and verify pending transactions with payment providers with a single click.'
  },
  {
    target: '#tour-nav-announcements',
    title: 'Broadcasts & Alerts 📢',
    badge: 'Communications',
    description: 'Publish important notices, schedule updates, and exam deadlines directly to applicant portals and administrative dashboards.'
  },
  {
    target: '#tour-nav-results',
    title: 'Examination Results 🏆',
    badge: 'Scoring',
    description: 'Manage candidate assessment outcomes, publish cut-off marks, and verify test scorecards quickly and transparently.'
  },
  {
    target: '#tour-cmd-trigger',
    title: 'Universal Search & Command Palette 🔍',
    badge: 'Search & ⌘K',
    description: 'Quickly find candidates by name, jump across navigation pages, change settings, and execute administrative actions with instant search (⌘K or Ctrl+K).'
  },
  {
    target: '#tour-theme-toggle',
    title: 'Theme & Preferences 🌙',
    badge: 'Personalization',
    description: 'Switch between light and dark mode anytime to suit your preference with custom visual styling and high contrast.'
  },
  {
    target: '#tour-notif-bell',
    title: 'Real-Time Notification Hub 🔔',
    badge: 'Alerts',
    description: 'Review critical system alerts, recent candidate submissions, and payment verifications without leaving your active workflow.'
  },
  {
    target: '#tour-user-avatar',
    title: 'Account & System Settings ⚙️',
    badge: 'Configuration',
    description: 'Customize institutional profiles, default examination dates, test venue configurations, security, and administrative preferences right from your account menu.'
  }
];

export default function GuidedTour({ isOpen, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const cardRef = useRef(null);

  // Always start from the very first step (step 0) whenever tour opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleStart = () => {
      setCurrentStepIndex(0);
    };
    window.addEventListener('formboxx:start-tour', handleStart);
    return () => window.removeEventListener('formboxx:start-tour', handleStart);
  }, []);

  const step = TOUR_STEPS[currentStepIndex];

  // Update target bounding box without route changes
  const updatePosition = () => {
    if (!isOpen || !step) return;

    if (!step.target || step.placement === 'center') {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(step.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right
      });
    } else {
      setTargetRect(null);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Update immediately and once after DOM paint for zero-delay seamless transitions
    updatePosition();
    const rafId = requestAnimationFrame(updatePosition);
    const timer = setTimeout(updatePosition, 60);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [currentStepIndex, isOpen]);

  // Animate modal dialog using GSAP on step change
  useEffect(() => {
    if (isOpen && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [currentStepIndex, isOpen]);

  if (!isOpen || !step) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('formboxx_tour_completed', 'true');
    localStorage.setItem('formboxx_tour_seen', 'true');
    localStorage.setItem('formboxx_tour_auto_triggered', 'true');
    onClose();
  };

  // Center all modals right in the middle of the screen as requested
  const cardWidth = 460;
  const cardStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${cardWidth}px`,
    maxWidth: 'calc(100vw - 32px)'
  };
  const arrowStyle = null;

  return (
    <div className="tour-overlay">
      {/* SVG Backdrop with Hole Punch Mask */}
      <svg className="tour-backdrop-svg">
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 6}
                y={targetRect.top - 6}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx="10"
                ry="10"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(15, 23, 42, 0.72)"
          mask="url(#tour-mask)"
        />
      </svg>

      {/* Spotlight Ring around target */}
      {targetRect && (
        <div
          className="tour-spotlight-ring"
          style={{
            top: `${targetRect.top - 6}px`,
            left: `${targetRect.left - 6}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`
          }}
        />
      )}

      {/* Floating Tour Tooltip */}
      <div className="tour-tooltip-card" ref={cardRef} style={cardStyle}>
        {/* Directional pointer arrow pointing to the spotlighted element */}
        {arrowStyle && (
          <div 
            className={`tour-tooltip-arrow ${arrowStyle.isBelow ? 'arrow-top' : 'arrow-bottom'}`}
            style={{ left: arrowStyle.left }}
          />
        )}

        <button
          className="tour-close-btn"
          onClick={handleComplete}
          aria-label="Skip Tour"
        >
          <X size={18} />
        </button>

        <div className="tour-tooltip-badge">
          <Sparkles size={12} />
          <span>{step.badge} • Step {currentStepIndex + 1} of {TOUR_STEPS.length}</span>
        </div>

        <h3 className="tour-tooltip-title">{step.title}</h3>
        <p className="tour-tooltip-desc">{step.description}</p>

        <div className="tour-tooltip-footer">
          <div className="tour-step-dots">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`tour-step-dot ${idx === currentStepIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="tour-tooltip-btns">
            <button className="tour-btn-skip" onClick={handleComplete}>
              Skip
            </button>

            {currentStepIndex > 0 && (
              <button className="tour-btn-prev" onClick={handlePrev}>
                <ArrowLeft size={14} style={{ marginRight: '4px' }} /> Back
              </button>
            )}

            <button className="tour-btn-next" onClick={handleNext}>
              {currentStepIndex === TOUR_STEPS.length - 1 ? (
                <>Finish <Check size={14} /></>
              ) : (
                <>Next <ArrowRight size={14} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
