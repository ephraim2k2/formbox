import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  Receipt, 
  HelpCircle, 
  Crown, 
  FileText, 
  AlertCircle,
  Copy,
  CheckCircle2,
  Download,
  Building,
  School,
  RefreshCcw,
  ExternalLink
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import './Pricing.css';

export default function Pricing() {
  const { 
    isOrganization, 
    workspaceName, 
    plans, 
    currentSubscription, 
    currentPlan, 
    usageStats, 
    invoices, 
    upgradePlan 
  } = useWorkspace();

  const [billingCycle, setBillingCycle] = useState(currentSubscription?.billingCycle || 'annual');
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState(null);
  const [upgradeStep, setUpgradeStep] = useState('summary'); // 'summary' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('pixpay'); // 'pixpay' | 'transfer' | 'invoice'
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenUpgrade = (plan) => {
    setSelectedPlanForUpgrade(plan);
    setUpgradeStep('summary');
  };

  const handleCloseModal = () => {
    setSelectedPlanForUpgrade(null);
    setUpgradeStep('summary');
  };

  const handleConfirmUpgrade = () => {
    if (!selectedPlanForUpgrade) return;
    setUpgradeStep('processing');

    setTimeout(() => {
      const res = upgradePlan(
        selectedPlanForUpgrade.id, 
        billingCycle, 
        paymentMethod === 'pixpay' ? 'Pixpay Instant Gateway' : 
        paymentMethod === 'transfer' ? 'Pixpay Virtual NUBAN Settlement' : 'Pixpay Corporate Wire'
      );
      if (res.success) {
        setUpgradeStep('success');
        showToast(`Successfully upgraded to ${selectedPlanForUpgrade.name}!`);
      } else {
        setUpgradeStep('summary');
        showToast('Upgrade failed. Please try again.');
      }
    }, 1400);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  // Calculations for Upgrade Modal
  const isTargetAnnual = billingCycle === 'annual';
  const targetPrice = selectedPlanForUpgrade 
    ? (isTargetAnnual ? selectedPlanForUpgrade.annualPrice : selectedPlanForUpgrade.monthlyPrice)
    : 0;
  const vatAmount = Math.round(targetPrice * 0.075);
  const proratedCredit = 15000; // Simulated prorated balance from existing active term
  const finalTotal = Math.max(0, targetPrice + vatAmount - proratedCredit);

  return (
    <div className="pricing-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#10b981',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          fontWeight: 600,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInModal 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Hero */}
      <div className="pricing-hero">
        <div className={`pricing-badge-pill ${isOrganization ? 'org' : ''}`}>
          <Sparkles size={14} />
          <span>{isOrganization ? 'Corporate & Talent Plans' : 'Admissions & Campus Subscriptions'}</span>
        </div>
        <h1 className="pricing-title">Simple, Transparent Pricing for {workspaceName}</h1>
        <p className="pricing-subtitle">
          Manage your subscription tier, scale applicant intake limits, and route payment collections directly with Pixpay.
        </p>

        {/* Billing Interval Toggle */}
        <div className="billing-toggle-container">
          <button 
            type="button"
            className={`billing-toggle-btn ${billingCycle === 'monthly' ? `active ${isOrganization ? 'org' : ''}` : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly Billing
          </button>
          <button 
            type="button"
            className={`billing-toggle-btn ${billingCycle === 'annual' ? `active ${isOrganization ? 'org' : ''}` : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            <span>Annual Billing</span>
            <span className="save-badge">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Current Active Plan Overview Card */}
      <div className="current-plan-card">
        <div className="current-plan-header">
          <div className="current-plan-meta">
            <div className="active-status-badge">
              <span className="active-dot" />
              <span>Active Plan • {currentSubscription?.billingCycle === 'annual' ? 'Billed Annually' : 'Billed Monthly'}</span>
            </div>
            <div className="current-plan-name-row">
              <h2 className="current-plan-title">{currentPlan?.name || 'Pro Campus'}</h2>
              <span className="current-plan-subtext">
                Renews on <strong>{currentSubscription?.renewalDate || 'Jan 15, 2027'}</strong> via Pixpay Direct Settlement
              </span>
            </div>
          </div>
          <div className="current-plan-actions">
            <button 
              type="button" 
              className="btn-secondary-plan"
              onClick={() => {
                const el = document.getElementById('invoices-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Receipt size={16} />
              <span>Billing History</span>
            </button>
            <button 
              type="button" 
              className="btn-secondary-plan"
              style={{ background: isOrganization ? 'rgba(124, 58, 237, 0.1)' : 'rgba(0, 82, 204, 0.1)', color: isOrganization ? '#7c3aed' : '#0052cc', border: 'none' }}
              onClick={() => {
                const el = document.getElementById('plans-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Crown size={16} />
              <span>Compare Upgrades</span>
            </button>
          </div>
        </div>

        {/* Quota Progress Meters */}
        <div className="quota-meters-grid">
          <div className="quota-item">
            <div className="quota-item-header">
              <span>Active Published Forms</span>
              <span className="quota-item-val">{usageStats?.activeForms} / {usageStats?.formsLimit}</span>
            </div>
            <div className="quota-progress-track">
              <div 
                className={`quota-progress-fill ${isOrganization ? 'org' : ''}`}
                style={{ width: `${Math.min(100, (usageStats?.activeForms / usageStats?.formsLimit) * 100)}%` }}
              />
            </div>
          </div>

          <div className="quota-item">
            <div className="quota-item-header">
              <span>Monthly Submissions</span>
              <span className="quota-item-val">{usageStats?.submissionsMonth.toLocaleString()} / {usageStats?.submissionsLimit.toLocaleString()}</span>
            </div>
            <div className="quota-progress-track">
              <div 
                className={`quota-progress-fill ${isOrganization ? 'org' : ''}`}
                style={{ width: `${Math.min(100, (usageStats?.submissionsMonth / usageStats?.submissionsLimit) * 100)}%` }}
              />
            </div>
          </div>

          <div className="quota-item">
            <div className="quota-item-header">
              <span>Pixpay Subaccounts</span>
              <span className="quota-item-val">{usageStats?.subaccountsUsed} / {usageStats?.subaccountsLimit}</span>
            </div>
            <div className="quota-progress-track">
              <div 
                className={`quota-progress-fill ${isOrganization ? 'org' : ''}`}
                style={{ width: `${Math.min(100, (usageStats?.subaccountsUsed / usageStats?.subaccountsLimit) * 100)}%` }}
              />
            </div>
          </div>

          <div className="quota-item">
            <div className="quota-item-header">
              <span>Secure Cloud Storage</span>
              <span className="quota-item-val">18.4 GB / 50 GB</span>
            </div>
            <div className="quota-progress-track">
              <div 
                className={`quota-progress-fill ${isOrganization ? 'org' : ''}`}
                style={{ width: '36.8%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div id="plans-grid" className="pricing-cards-grid">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentSubscription?.planId;
          const isPro = plan.tier === 'pro';
          const isEnterprise = plan.tier === 'enterprise';
          const displayPrice = billingCycle === 'annual' 
            ? Math.round(plan.annualPrice / 12) 
            : plan.monthlyPrice;

          return (
            <div 
              key={plan.id}
              className={`pricing-card ${isCurrent ? 'is-current' : ''} ${isPro && !isCurrent ? `is-popular ${isOrganization ? 'org' : ''}` : ''}`}
            >
              {isCurrent && (
                <div className="card-top-pill current">
                  Your Current Plan
                </div>
              )}
              {!isCurrent && isPro && (
                <div className={`card-top-pill popular ${isOrganization ? 'org' : ''}`}>
                  Most Popular
                </div>
              )}
              {!isCurrent && isEnterprise && (
                <div className="card-top-pill popular" style={{ background: '#0f172a' }}>
                  Enterprise Scale
                </div>
              )}

              <div className="plan-card-header">
                <span className={`plan-badge-tag ${isOrganization ? 'org' : ''}`}>{plan.badge}</span>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              <div className="plan-pricing-box">
                <div className="plan-price-row">
                  <span className="currency-sym">₦</span>
                  <span className="plan-amount">{displayPrice.toLocaleString()}</span>
                  <span className="plan-interval">/ month</span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="annual-billed-note">
                    Billed annually at ₦{plan.annualPrice.toLocaleString()}/yr ({plan.annualSavings})
                  </div>
                )}
              </div>

              {/* Limits Highlights */}
              <div className="plan-limits-summary">
                <span className="limit-pill">{plan.limits.forms}</span>
                <span className="limit-pill">{plan.limits.submissions}</span>
                <span className="limit-pill">{plan.limits.subaccounts}</span>
              </div>

              {/* Action Button */}
              {isCurrent ? (
                <button type="button" className="plan-cta-btn current" disabled>
                  <Check size={16} />
                  <span>Current Active Plan</span>
                </button>
              ) : (
                <button 
                  type="button" 
                  className={`plan-cta-btn upgrade ${isOrganization ? 'org' : ''}`}
                  onClick={() => handleOpenUpgrade(plan)}
                >
                  <Zap size={16} />
                  <span>{plan.ctaText}</span>
                </button>
              )}

              {/* Feature Checklist */}
              <ul className="plan-features-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="plan-feature-item">
                    <Check size={16} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
                {plan.notIncluded && plan.notIncluded.map((feat, idx) => (
                  <li key={`not-${idx}`} className="plan-feature-item not-included">
                    <X size={15} className="feature-cross-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="feature-table-section">
        <h3 className="feature-table-title">Detailed Plan Specifications</h3>
        <p className="feature-table-subtitle">Compare all technical, routing, and quota parameters side-by-side</p>

        <div className="table-responsive">
          <table className="matrix-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Feature / Capability</th>
                <th style={{ width: '20%' }}>{plans[0]?.name || 'Starter'}</th>
                <th style={{ width: '20%' }}>{plans[1]?.name || 'Pro'}</th>
                <th style={{ width: '20%' }}>{plans[2]?.name || 'Enterprise'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Active Application Forms</strong></td>
                <td>3 Forms</td>
                <td>15 Forms</td>
                <td><strong>Unlimited</strong></td>
              </tr>
              <tr>
                <td><strong>Monthly Candidate Intake</strong></td>
                <td>500 / mo</td>
                <td>5,000 / mo</td>
                <td><strong>Unlimited</strong></td>
              </tr>
              <tr>
                <td><strong>Pixpay Payment Routing Routes</strong></td>
                <td>1 Primary Gateway</td>
                <td>3 Subaccounts (Direct Split)</td>
                <td><strong>Unlimited Pixpay + TSA Sweeps</strong></td>
              </tr>
              <tr>
                <td><strong>CBT Hall & Seating Capacity Allocator</strong></td>
                <td><X size={16} style={{ color: 'var(--text-light)' }} /></td>
                <td><Check size={16} style={{ color: '#10b981' }} /> Automated</td>
                <td><Check size={16} style={{ color: '#10b981' }} /> Biometric & Multi-Centre</td>
              </tr>
              <tr>
                <td><strong>SMS & WhatsApp Broadcast Messaging</strong></td>
                <td><X size={16} style={{ color: 'var(--text-light)' }} /></td>
                <td><Check size={16} style={{ color: '#10b981' }} /> Included</td>
                <td><Check size={16} style={{ color: '#10b981' }} /> Dedicated Sender ID</td>
              </tr>
              <tr>
                <td><strong>Candidate Result & Outcome Processing</strong></td>
                <td>Manual CSV</td>
                <td>Bulk Upload & Decision Rules</td>
                <td>Enterprise Decision Engine</td>
              </tr>
              <tr>
                <td><strong>Custom Domain & Whitelabel Experience</strong></td>
                <td><X size={16} style={{ color: 'var(--text-light)' }} /></td>
                <td><X size={16} style={{ color: 'var(--text-light)' }} /></td>
                <td><Check size={16} style={{ color: '#10b981' }} /> Full Whitelabel</td>
              </tr>
              <tr>
                <td><strong>Security & Single Sign-On (SSO)</strong></td>
                <td>Standard 2FA</td>
                <td>Role-Based Access + 2FA</td>
                <td>SAML, Okta & Active Directory</td>
              </tr>
              <tr>
                <td><strong>Technical Support SLA</strong></td>
                <td>48-Hour Email</td>
                <td>24/7 Priority Desk</td>
                <td>Dedicated Account Executive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices & Billing History */}
      <div id="invoices-section" className="invoices-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 className="feature-table-title" style={{ margin: 0 }}>Invoices & Payment History</h3>
            <p className="feature-table-subtitle" style={{ margin: '4px 0 0 0' }}>All transactions settled securely via Pixpay gateway</p>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-light)' }}>
            Showing <strong>{invoices.length}</strong> official receipts
          </span>
        </div>

        <div className="table-responsive">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing Date</th>
                <th>Plan Description</th>
                <th>Amount (NGN)</th>
                <th>Settlement Gateway</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td><strong>{inv.id}</strong></td>
                  <td>{inv.date}</td>
                  <td>{inv.planName}</td>
                  <td><strong>₦{inv.amount.toLocaleString()}</strong></td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5 }}>
                      <CreditCard size={14} style={{ color: '#10b981' }} />
                      {inv.gateway}
                    </span>
                  </td>
                  <td>
                    <span className="invoice-badge-paid">
                      <Check size={12} /> {inv.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-secondary-plan"
                      style={{ padding: '4px 10px', fontSize: 12 }}
                      onClick={() => setSelectedInvoiceForReceipt(inv)}
                    >
                      <Download size={13} />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3 className="faq-title">Frequently Asked Questions</h3>
        <div className="faq-grid">
          <div className="faq-card">
            <h4 className="faq-question">How does Pixpay routing work with my subscription?</h4>
            <p className="faq-answer">
              Your Formboxx subscription fees are billed via Pixpay's automated direct debit or bank transfer settlement. Furthermore, application fees collected from applicants are routed into your configured Pixpay subaccounts with instant split settlement.
            </p>
          </div>
          <div className="faq-card">
            <h4 className="faq-question">Can I upgrade or downgrade at any time?</h4>
            <p className="faq-answer">
              Yes! When upgrading mid-cycle, any remaining time on your existing subscription is automatically prorated and credited toward your new tier. All newly unlocked forms and subaccounts become available instantly.
            </p>
          </div>
          <div className="faq-card">
            <h4 className="faq-question">What happens if our applicants exceed the plan limit?</h4>
            <p className="faq-answer">
              You will receive an automated notification when you reach 85% of your quota. You can seamlessly upgrade in one click without any disruption to live applicant registrations or payment processing.
            </p>
          </div>
          <div className="faq-card">
            <h4 className="faq-question">Do you support custom government or multi-school arrangements?</h4>
            <p className="faq-answer">
              Yes. The University Board and Institutional Global plans support multi-campus central collection, TSA Remita Sweeps, and custom offline invoicing for state education ministries.
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {selectedPlanForUpgrade && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="upgrade-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="upgrade-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Crown size={20} style={{ color: isOrganization ? '#7c3aed' : '#0052cc' }} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Upgrade Subscription Tier</h3>
              </div>
              <button type="button" className="modal-close-btn" onClick={handleCloseModal} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {upgradeStep === 'summary' && (
              <>
                <div className="upgrade-modal-body">
                  {/* Migration Comparison */}
                  <div className="plan-migration-box">
                    <div className="migration-col">
                      <span className="migration-tag">Current Plan</span>
                      <span className="migration-title">{currentPlan?.name}</span>
                    </div>
                    <div className={`migration-arrow ${isOrganization ? 'org' : ''}`}>
                      <ArrowRight size={24} />
                    </div>
                    <div className="migration-col" style={{ textAlign: 'right' }}>
                      <span className="migration-tag">Upgrading To</span>
                      <span className="migration-title" style={{ color: isOrganization ? '#7c3aed' : '#0052cc' }}>
                        {selectedPlanForUpgrade.name}
                      </span>
                    </div>
                  </div>

                  {/* Billing Interval Toggle inside Modal */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>Billing Cycle:</span>
                    <div className="billing-toggle-container" style={{ margin: 0 }}>
                      <button 
                        type="button"
                        className={`billing-toggle-btn ${billingCycle === 'monthly' ? `active ${isOrganization ? 'org' : ''}` : ''}`}
                        onClick={() => setBillingCycle('monthly')}
                        style={{ padding: '5px 12px', fontSize: 12 }}
                      >
                        Monthly
                      </button>
                      <button 
                        type="button"
                        className={`billing-toggle-btn ${billingCycle === 'annual' ? `active ${isOrganization ? 'org' : ''}` : ''}`}
                        onClick={() => setBillingCycle('annual')}
                        style={{ padding: '5px 12px', fontSize: 12 }}
                      >
                        Annual (-20%)
                      </button>
                    </div>
                  </div>

                  {/* Payment Gateway Option */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: 8 }}>
                      Payment Routing Gateway
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${paymentMethod === 'pixpay' ? (isOrganization ? '#7c3aed' : '#0052cc') : 'var(--border-color)'}`,
                        background: paymentMethod === 'pixpay' ? (isOrganization ? 'rgba(124, 58, 237, 0.05)' : 'rgba(0, 82, 204, 0.05)') : 'transparent',
                        cursor: 'pointer'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            checked={paymentMethod === 'pixpay'} 
                            onChange={() => setPaymentMethod('pixpay')} 
                          />
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Pixpay Instant Gateway (Recommended)</div>
                            <div style={{ fontSize: 11.5, color: 'var(--text-light)' }}>Card, Pixpay USSD, Bank Account & Apple Pay</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>Instant</span>
                      </label>

                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${paymentMethod === 'transfer' ? (isOrganization ? '#7c3aed' : '#0052cc') : 'var(--border-color)'}`,
                        background: paymentMethod === 'transfer' ? (isOrganization ? 'rgba(124, 58, 237, 0.05)' : 'rgba(0, 82, 204, 0.05)') : 'transparent',
                        cursor: 'pointer'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            checked={paymentMethod === 'transfer'} 
                            onChange={() => setPaymentMethod('transfer')} 
                          />
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Dedicated Pixpay Virtual NUBAN Transfer</div>
                            <div style={{ fontSize: 11.5, color: 'var(--text-light)' }}>Automated instant reconciliation via CBN NIP</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>NUBAN</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'transfer' && (
                    <div style={{
                      background: 'rgba(0,0,0,0.03)',
                      border: '1px dashed var(--border-color)',
                      borderRadius: 10,
                      padding: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Virtual NUBAN Account (Access Bank / Pixpay):</div>
                        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.04em' }}>9938472019</div>
                        <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Formboxx Ltd - {workspaceName}</div>
                      </div>
                      <button 
                        type="button" 
                        className="btn-secondary-plan" 
                        onClick={() => copyToClipboard('9938472019')}
                        style={{ padding: '6px 12px', fontSize: 12 }}
                      >
                        {copiedAccount ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {/* Cost Calculation Breakdown */}
                  <div className="cost-breakdown-card">
                    <div className="cost-row">
                      <span>Base Plan ({selectedPlanForUpgrade.name} • {isTargetAnnual ? '12 Months' : '1 Month'}):</span>
                      <span>₦{targetPrice.toLocaleString()}</span>
                    </div>
                    {isTargetAnnual && (
                      <div className="cost-row" style={{ color: '#10b981' }}>
                        <span>Annual 20% Discount applied:</span>
                        <span>-₦{Math.round(targetPrice * 0.2).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="cost-row">
                      <span>VAT (7.5% statutory):</span>
                      <span>+₦{vatAmount.toLocaleString()}</span>
                    </div>
                    <div className="cost-row" style={{ color: '#0052cc' }}>
                      <span>Prorated credit from current plan:</span>
                      <span>-₦{proratedCredit.toLocaleString()}</span>
                    </div>
                    <div className="cost-row total">
                      <span>Total Amount Payable:</span>
                      <span style={{ color: isOrganization ? '#7c3aed' : '#0052cc' }}>
                        ₦{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pixpay-security-callout">
                    <ShieldCheck size={20} style={{ flexShrink: 0 }} />
                    <span>
                      Protected by <strong>Pixpay 256-bit SSL encryption</strong> and CBN-compliant settlement routing.
                    </span>
                  </div>
                </div>

                <div className="upgrade-modal-footer">
                  <button type="button" className="btn-secondary-plan" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className={`plan-cta-btn upgrade ${isOrganization ? 'org' : ''}`}
                    onClick={handleConfirmUpgrade}
                    style={{ width: 'auto', margin: 0, padding: '10px 22px' }}
                  >
                    <span>Authorize & Upgrade (₦{finalTotal.toLocaleString()})</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {upgradeStep === 'processing' && (
              <div className="upgrade-modal-body" style={{ alignItems: 'center', textAlign: 'center', padding: '48px 24px' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: `3px solid ${isOrganization ? 'rgba(124, 58, 237, 0.2)' : 'rgba(0, 82, 204, 0.2)'}`,
                  borderTopColor: isOrganization ? '#7c3aed' : '#0052cc',
                  animation: 'spin 0.8s linear infinite',
                  marginBottom: 16
                }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 800 }}>Connecting to Pixpay Gateway...</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-light)', maxWidth: 360 }}>
                  Authorizing split routing and provisioning expanded form quotas for {workspaceName}.
                </p>
              </div>
            )}

            {upgradeStep === 'success' && (
              <div className="upgrade-modal-body">
                <div className="success-card-content">
                  <div className="success-icon-halo">
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: 22, fontWeight: 800 }}>
                      Upgrade Confirmed!
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--text-light)' }}>
                      <strong>{workspaceName}</strong> is now upgraded to the <strong>{selectedPlanForUpgrade.name}</strong> tier.
                    </p>
                  </div>

                  <div style={{
                    width: '100%',
                    background: 'var(--btn-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 12,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    textAlign: 'left',
                    fontSize: 13
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-light)' }}>New Tier:</span>
                      <strong>{selectedPlanForUpgrade.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-light)' }}>Active Limits:</span>
                      <span>{selectedPlanForUpgrade.limits.forms} • {selectedPlanForUpgrade.limits.submissions}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-light)' }}>Payment Method:</span>
                      <span>Pixpay Instant Direct Settlement</span>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className={`plan-cta-btn upgrade ${isOrganization ? 'org' : ''}`}
                    onClick={handleCloseModal}
                    style={{ width: '100%', margin: 0 }}
                  >
                    Return to Pricing Overview
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Official PDF Receipt Modal */}
      {selectedInvoiceForReceipt && (
        <div className="modal-overlay" onClick={() => setSelectedInvoiceForReceipt(null)}>
          <div className="upgrade-modal-card" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="upgrade-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Receipt size={18} style={{ color: '#10b981' }} />
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>Official Payment Receipt</h3>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setSelectedInvoiceForReceipt(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="upgrade-modal-body" style={{ gap: 16 }}>
              <div style={{
                textAlign: 'center',
                padding: '16px 0',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0052cc', marginBottom: 4 }}>
                  form<span style={{ color: '#ffcc00' }}>box</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Payment Settlement Receipt • Pixpay Verified</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: 'var(--text-dark)' }}>
                  ₦{selectedInvoiceForReceipt.amount.toLocaleString()}
                </div>
                <span className="invoice-badge-paid" style={{ marginTop: 6 }}>
                  <Check size={12} /> Payment Confirmed (CBN NIP)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Receipt Number:</span>
                  <strong>{selectedInvoiceForReceipt.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Billed To:</span>
                  <strong>{workspaceName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Date of Payment:</span>
                  <span>{selectedInvoiceForReceipt.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Plan Description:</span>
                  <span>{selectedInvoiceForReceipt.planName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Processing Gateway:</span>
                  <span>Pixpay Subaccount Settlement</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: 10,
                fontSize: 11,
                color: 'var(--text-light)',
                lineHeight: 1.4
              }}>
                This document serves as an electronic proof of payment under the Federal Inland Revenue Service (FIRS) tax provisions.
              </div>
            </div>

            <div className="upgrade-modal-footer">
              <button 
                type="button" 
                className="btn-secondary-plan" 
                onClick={() => {
                  window.print();
                }}
              >
                <Download size={15} />
                <span>Print / Save PDF</span>
              </button>
              <button 
                type="button" 
                className={`plan-cta-btn upgrade ${isOrganization ? 'org' : ''}`}
                onClick={() => setSelectedInvoiceForReceipt(null)}
                style={{ width: 'auto', margin: 0, padding: '8px 18px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

