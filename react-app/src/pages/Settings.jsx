import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

const NIGERIAN_BANKS = [
  'Access Bank Plc',
  'Zenith Bank Plc',
  'Guaranty Trust Bank (GTBank)',
  'First Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Stanbic IBTC Bank',
  'Fidelity Bank',
  'Sterling Bank',
  'Union Bank of Nigeria',
  'Wema Bank / ALAT',
  'Kuda Microfinance Bank',
  'Moniepoint Microfinance Bank',
  'OPay Digital Services',
  'Providus Bank',
  'Taj Bank',
  'Jaiz Bank',
  'Keystone Bank',
  'Polaris Bank',
  'Ecobank Nigeria'
];

const GATEWAY_OPTIONS = [
  'Pixpay Subaccount (Split 100%)',
  'Pixpay Direct Settlement',
  'Remita TSA Central Collection',
  'Flutterwave Dedicated Subaccount',
  'Interswitch WebPAY / Quickteller',
  'Direct Bank Settlement (NIBSS Instant Payment)'
];

const SETTLEMENT_SCHEDULES = [
  'Instant Settlement',
  'Daily Sweep (11:59 PM)',
  'Weekly Settlement',
  'Monthly Batch'
];

export default function Settings() {
  const navigate = useNavigate();
  const { isOrganization, workspaceName, terms, setWorkspace, workspaceType, payoutSettings, updatePayoutSettings, currentPlan, currentSubscription, usageStats, requestLogout } = useWorkspace();
  const [activeTab, setActiveTab] = useState('general');

  // General Settings state
  const [entityName, setEntityName] = useState(workspaceName);
  const [contactEmail, setContactEmail] = useState(terms.adminProfile.email);
  const [contactPhone, setContactPhone] = useState(isOrganization ? '+234 800 227 3772' : '+234 803 123 4567');
  const [timezone, setTimezone] = useState('WAT');
  const [logoPreview, setLogoPreview] = useState('');
  const fileInputRef = useRef(null);

  // Banking & Payment Settlement state
  const [settlementBank, setSettlementBank] = useState(payoutSettings?.bankName || (isOrganization ? 'Access Bank Plc' : 'Zenith Bank Plc'));
  const [accountNumber, setAccountNumber] = useState(payoutSettings?.accountNumber || (isOrganization ? '0123984561' : '1014892019'));
  const [accountName, setAccountName] = useState(payoutSettings?.accountName || (isOrganization ? 'Access Bank Plc - Talent Scheme Operations' : 'Roseville Secondary School - Admissions Revenue'));
  const [gateway, setGateway] = useState(payoutSettings?.gateway || 'Pixpay Subaccount (Split 100%)');
  const [settlementSchedule, setSettlementSchedule] = useState(payoutSettings?.settlementSchedule || 'Instant Settlement');
  const [notificationEmail, setNotificationEmail] = useState(payoutSettings?.notificationEmail || (isOrganization ? 'finance.talent@accessbank.com' : 'bursary@roseville.edu.ng'));
  const [autoReconcile, setAutoReconcile] = useState(payoutSettings?.autoReconcile ?? true);
  const [subaccounts, setSubaccounts] = useState(payoutSettings?.subaccounts || []);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Secondary Subaccount Modal
  const [isSubaccountModalOpen, setIsSubaccountModalOpen] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [subBank, setSubBank] = useState('Zenith Bank Plc');
  const [subAccountNum, setSubAccountNum] = useState('');
  const [subAccountName, setSubAccountName] = useState('');
  const [subGateway, setSubGateway] = useState('Pixpay Subaccount (Direct Split)');
  const [subSplit, setSubSplit] = useState('20');

  // Examination / Assessment Setup state
  const [examDate, setExamDate] = useState(isOrganization ? '2026-11-20' : '2026-11-15');
  const [examDuration, setExamDuration] = useState(isOrganization ? '90' : '120');
  const [passScore, setPassScore] = useState(isOrganization ? '75' : '65');
  const [examMode, setExamMode] = useState(isOrganization ? 'proctored' : 'cbt');
  const [instructions, setInstructions] = useState(
    isOrganization
      ? 'Candidates are required to bring their official Assessment Invitation slip, valid government photo ID, and updated resume. Remote candidates must ensure webcam and microphone compatibility prior to session launch.'
      : 'Please arrive at the venue 30 minutes before the scheduled time. Bring a valid form of identification and your printed application slip. Electronic devices are not permitted inside the examination hall.'
  );

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Venues state & Modal
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueCapacity, setVenueCapacity] = useState('');
  const [venueStatus, setVenueStatus] = useState('active');

  const defaultSchoolVenues = [
    { id: 1, name: 'Lagos Tech Hub', address: '14 Herbert Macaulay Way, Yaba, Lagos', capacity: '250', status: 'active' },
    { id: 2, name: 'Abuja Convention Center', address: 'Garki District, Abuja, FCT', capacity: '500', status: 'active' },
    { id: 3, name: 'Port Harcourt Digital Center', address: 'Aba Road, Port Harcourt, Rivers State', capacity: '150', status: 'inactive' }
  ];

  const defaultOrgVenues = [
    { id: 1, name: 'Lagos Assessment Centre', address: 'Plot 12, Admiralty Way, Lekki Phase 1, Lagos', capacity: '200', status: 'active' },
    { id: 2, name: 'Abuja Talent Hub', address: 'Block C, Central Business District, Abuja', capacity: '350', status: 'active' },
    { id: 3, name: 'Port Harcourt Innovation Hub', address: '24 Aba Road, Port Harcourt, Rivers State', capacity: '120', status: 'active' }
  ];

  const [venues, setVenues] = useState(() => isOrganization ? defaultOrgVenues : defaultSchoolVenues);

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  useEffect(() => {
    setEntityName(workspaceName);
    setContactEmail(terms.adminProfile.email);
    setContactPhone(isOrganization ? '+234 800 227 3772' : '+234 803 123 4567');
    setVenues(isOrganization ? defaultOrgVenues : defaultSchoolVenues);
    setExamDate(isOrganization ? '2026-11-20' : '2026-11-15');
    setExamDuration(isOrganization ? '90' : '120');
    setPassScore(isOrganization ? '75' : '65');
    setExamMode(isOrganization ? 'proctored' : 'cbt');
    setInstructions(
      isOrganization
        ? 'Candidates are required to bring their official Assessment Invitation slip, valid government photo ID, and updated resume. Remote candidates must ensure webcam and microphone compatibility prior to session launch.'
        : 'Please arrive at the venue 30 minutes before the scheduled time. Bring a valid form of identification and your printed application slip. Electronic devices are not permitted inside the examination hall.'
    );
  }, [isOrganization, workspaceName, terms]);

  // Keep banking state in sync when payoutSettings or workspaceType updates
  useEffect(() => {
    if (payoutSettings) {
      setSettlementBank(payoutSettings.bankName);
      setAccountNumber(payoutSettings.accountNumber);
      setAccountName(payoutSettings.accountName);
      setGateway(payoutSettings.gateway);
      setSettlementSchedule(payoutSettings.settlementSchedule);
      setNotificationEmail(payoutSettings.notificationEmail || '');
      setAutoReconcile(payoutSettings.autoReconcile ?? true);
      setSubaccounts(payoutSettings.subaccounts || []);
    }
  }, [payoutSettings, isOrganization]);

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.settings-card', { y: 30, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.settings-card', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, [activeTab]);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setLogoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddVenue = (e) => {
    e.preventDefault();
    if (!venueName.trim()) {
      alert(`Please enter a ${isOrganization ? 'hub' : 'venue'} name.`);
      return;
    }
    const newVenue = {
      id: Date.now(),
      name: venueName,
      address: venueAddress || 'Not specified',
      capacity: venueCapacity || '0',
      status: venueStatus
    };
    setVenues([newVenue, ...venues]);
    setVenueName('');
    setVenueAddress('');
    setVenueCapacity('');
    setVenueStatus('active');
    setIsVenueModalOpen(false);
    showToast(`${isOrganization ? 'Assessment Hub' : 'Venue'} added successfully!`);
  };

  const handleVerifyNuban = () => {
    if (!accountNumber || accountNumber.trim().length !== 10) {
      alert('Please enter a valid 10-digit NUBAN account number.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      showToast(`Account verified via NIBSS NUBAN query: ${settlementBank} • ${accountNumber}`);
    }, 500);
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(accountNumber);
    setCopiedAccount(true);
    showToast(`Account number ${accountNumber} copied to clipboard!`);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleSaveBanking = (e) => {
    e?.preventDefault();
    if (!accountNumber || accountNumber.trim().length !== 10) {
      alert('Please enter a valid 10-digit NUBAN account number.');
      return;
    }
    if (!accountName.trim()) {
      alert('Please enter the account / beneficiary name.');
      return;
    }
    updatePayoutSettings({
      bankName: settlementBank,
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim(),
      gateway,
      settlementSchedule,
      notificationEmail,
      autoReconcile,
      subaccounts
    });
    showToast('Payment settlement destination saved successfully!');
  };

  const handleAddSubaccount = (e) => {
    e.preventDefault();
    if (!subTitle.trim() || !subAccountNum.trim() || subAccountNum.trim().length !== 10) {
      alert('Please provide a valid subaccount title and 10-digit account number.');
      return;
    }
    const newSub = {
      id: `sub-${Date.now()}`,
      title: subTitle,
      bankName: subBank,
      accountNumber: subAccountNum.trim(),
      accountName: subAccountName || `${subTitle} Revenue`,
      gateway: subGateway,
      settlementSchedule: 'Daily Sweep (11:59 PM)',
      splitPercentage: Number(subSplit) || 15
    };
    const updated = [...subaccounts, newSub];
    setSubaccounts(updated);
    updatePayoutSettings({ subaccounts: updated });
    setIsSubaccountModalOpen(false);
    setSubTitle('');
    setSubAccountNum('');
    setSubAccountName('');
    setSubSplit('20');
    showToast('Secondary subaccount added successfully!');
  };

  const handleRemoveSubaccount = (id) => {
    const updated = subaccounts.filter(s => s.id !== id);
    setSubaccounts(updated);
    updatePayoutSettings({ subaccounts: updated });
    showToast('Subaccount removed.');
  };

  const handleSaveGeneral = () => {
    setWorkspace(workspaceType, entityName);
    showToast(`${terms.workspaceLabel} details saved successfully!`);
  };

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'general':
        return {
          title: 'General Settings',
          subtitle: `Manage ${terms.workspaceLabel.toLowerCase()} profile and system configurations`
        };
      case 'payment-settings':
        return {
          title: 'Banking & Payment Settlement',
          subtitle: `Configure destination bank account, NUBAN, and gateway where fee revenues are deposited for ${workspaceName}`
        };
      case 'subscription':
        return {
          title: 'Subscription & Quotas',
          subtitle: `Review your active plan, manage capacity limits, and upgrade for ${workspaceName}`
        };
      case 'exam-setup':
        return {
          title: terms.settingsExamTitle,
          subtitle: terms.settingsExamSubtitle
        };
      case 'exam-venues':
        return {
          title: terms.venuesTitle,
          subtitle: terms.venuesSubtitle
        };
      case 'security':
        return {
          title: 'Security & Login',
          subtitle: 'Manage your administrative credentials and 2FA authentication'
        };
      default:
        return {
          title: 'General Settings',
          subtitle: 'Manage global system configurations'
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1 id="pageTitle">{headerInfo.title}</h1>
            <h2 id="pageSubtitle">{headerInfo.subtitle}</h2>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="settings-layout">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <div
            className={`sidebar-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <LucideIcon name="settings" style={{ width: '18px', height: '18px' }} /> General Settings
          </div>
          <div
            className={`sidebar-item ${activeTab === 'payment-settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment-settings')}
          >
            <LucideIcon name="wallet" style={{ width: '18px', height: '18px' }} /> Banking &amp; Settlement
          </div>
          <div
            className={`sidebar-item ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            <LucideIcon name="crown" style={{ width: '18px', height: '18px', color: '#f59e0b' }} /> Subscription &amp; Plans
          </div>
          <div
            className={`sidebar-item ${activeTab === 'exam-setup' ? 'active' : ''}`}
            onClick={() => setActiveTab('exam-setup')}
          >
            <LucideIcon name="clipboard-list" style={{ width: '18px', height: '18px' }} /> {terms.settingsExamTitle}
          </div>
          <div
            className={`sidebar-item ${activeTab === 'exam-venues' ? 'active' : ''}`}
            onClick={() => setActiveTab('exam-venues')}
          >
            <LucideIcon name="map-pin" style={{ width: '18px', height: '18px' }} /> {terms.venuesTitle}
          </div>
          <div
            className={`sidebar-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <LucideIcon name="shield-check" style={{ width: '18px', height: '18px' }} /> Security & Login
          </div>
          <div
            className="sidebar-item text-danger"
            style={{
              marginTop: '16px',
              borderTop: '1px solid var(--border-color)',
              borderRadius: '0',
              paddingTop: '16px',
              color: '#ef4444'
            }}
            onClick={() => {
              requestLogout();
            }}
          >
            <LucideIcon name="log-out" style={{ width: '18px', height: '18px' }} /> Logout
          </div>
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {/* Tab: General Settings */}
          {activeTab === 'general' && (
            <div id="tab-general" className="tab-pane active">
              <div className="settings-card" id="settingsFormCard">
                <div className="settings-section-title">{terms.workspaceLabel} Information & Branding</div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <div className="image-upload-wrapper">
                      <div className="system-logo-preview">
                        {logoPreview ? (
                          <img
                            id="previewImg"
                            src={logoPreview}
                            alt="Logo"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <LucideIcon
                            name={isOrganization ? "building-2" : "graduation-cap"}
                            id="previewIcon"
                            style={{ width: '32px', height: '32px', color: 'var(--text-light)' }}
                          />
                        )}
                      </div>
                      <div className="upload-controls">
                        <label>{terms.workspaceLabel} Crest / Logo</label>
                        <p className="upload-hint">Recommended size: 256x256px (PNG, SVG, or JPG)</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <label className="btn-upload">
                            <LucideIcon name="upload" style={{ width: '16px', height: '16px' }} /> Upload Logo
                            <input
                              type="file"
                              ref={fileInputRef}
                              id="sysLogo"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleImageChange}
                            />
                          </label>
                          {logoPreview && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '8px 16px' }}
                              onClick={removeImage}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="schoolName">{terms.workspaceLabel} Name</label>
                    <input
                      type="text"
                      id="schoolName"
                      className="form-control"
                      placeholder={`Enter ${terms.workspaceLabel.toLowerCase()} name`}
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactEmail">{terms.emailLabel}</label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="form-control"
                      placeholder={terms.emailPlaceholder}
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Official Telephone</label>
                    <input
                      type="text"
                      id="contactPhone"
                      className="form-control"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="timezone">Default Timezone</label>
                    <select
                      id="timezone"
                      className="form-control"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="WAT">West Africa Time (WAT) - UTC+1</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                      <option value="EST">Eastern Standard Time (EST)</option>
                      <option value="GMT">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>
                <div className="settings-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSaveGeneral}
                  >
                    <LucideIcon name="save" style={{ width: '18px', height: '18px' }} /> Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Banking & Settlement Settings */}
          {activeTab === 'payment-settings' && (
            <div id="tab-payment-settings" className="tab-pane active">
              <div className="settlement-card-wrapper">
                {/* Visual Settlement Bank Card */}
                <div className="settlement-hero-card">
                  <div className="settlement-card-top">
                    <div className="settlement-chip-group">
                      <div className="card-emv-chip" />
                      <span className="settlement-bank-tag">{settlementBank}</span>
                    </div>
                    <span className="settlement-live-badge">
                      <LucideIcon name="check-circle" style={{ width: 12, height: 12 }} /> Verified Live Route
                    </span>
                  </div>

                  <div className="settlement-account-display">
                    <div className="settlement-account-num">
                      {accountNumber ? accountNumber.replace(/(\d{4})(\d{4})(\d{2})/, '$1 $2 $3') : '•••• •••• ••'}
                    </div>
                    <button
                      type="button"
                      className="settlement-copy-btn"
                      onClick={handleCopyAccount}
                      title="Copy account number"
                    >
                      <LucideIcon name={copiedAccount ? "check" : "copy"} style={{ width: 12, height: 12 }} />
                      <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="settlement-card-bottom">
                    <div>
                      <div className="settlement-holder-label">Beneficiary Account Name</div>
                      <div className="settlement-holder-name">{accountName || `${workspaceName} REVENUE`}</div>
                    </div>
                    <div className="settlement-pills-row">
                      <span className="settlement-route-pill">{gateway}</span>
                      <span className="settlement-route-pill" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
                        {settlementSchedule}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Metrics */}
                <div className="settlement-stats-grid">
                  <div className="settlement-stat-box">
                    <div className="stat-icon-wrapper" style={{ background: 'rgba(0, 82, 204, 0.1)', color: '#0052cc' }}>
                      <LucideIcon name="landmark" style={{ width: 22, height: 22 }} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">Active Receiving Bank</div>
                      <div className="stat-value" style={{ fontSize: 14 }}>{settlementBank}</div>
                    </div>
                  </div>
                  <div className="settlement-stat-box">
                    <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                      <LucideIcon name="shield-check" style={{ width: 22, height: 22 }} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">Routing Gateway</div>
                      <div className="stat-value" style={{ fontSize: 13.5 }}>{gateway.split(' ')[0]}</div>
                    </div>
                  </div>
                  <div className="settlement-stat-box">
                    <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                      <LucideIcon name="clock" style={{ width: 22, height: 22 }} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">Disbursement Cycle</div>
                      <div className="stat-value" style={{ fontSize: 14 }}>{settlementSchedule.split(' ')[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Primary Bank Settlement Configuration Form */}
                <form onSubmit={handleSaveBanking}>
                  <div className="settings-card">
                    <div className="settings-section-title">Primary Settlement Destination Account</div>
                    
                    <p style={{ margin: '-8px 0 16px 0', fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5 }}>
                      Configure the destination bank and NUBAN account number where all student admissions, candidate fees, and form sales are deposited for {workspaceName}.
                    </p>

                    <div className="form-grid">
                      {/* Bank Selector */}
                      <div className="form-group">
                        <label htmlFor="settlementBank">Settlement Commercial Bank</label>
                        <select
                          id="settlementBank"
                          className="form-control"
                          value={settlementBank}
                          onChange={(e) => setSettlementBank(e.target.value)}
                        >
                          {NIGERIAN_BANKS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      {/* Account Number (NUBAN) */}
                      <div className="form-group">
                        <label htmlFor="accountNumber">
                          Account Number (10-Digit NUBAN)
                        </label>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <input
                            type="text"
                            id="accountNumber"
                            className="form-control"
                            maxLength={10}
                            placeholder="e.g. 1014892019"
                            value={accountNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setAccountNumber(val);
                            }}
                          />
                          <button
                            type="button"
                            className="btn-draft"
                            onClick={handleVerifyNuban}
                            disabled={isVerifying || accountNumber.length !== 10}
                            style={{ whiteSpace: 'nowrap', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 6 }}
                          >
                            <LucideIcon name="search" style={{ width: 14, height: 14 }} />
                            <span>{isVerifying ? 'Checking...' : 'Verify'}</span>
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                          {accountNumber.length === 10 ? (
                            <span className="nuban-validation-badge valid">
                              <LucideIcon name="check-circle" style={{ width: 13, height: 13 }} />
                              Valid 10-Digit NUBAN format
                            </span>
                          ) : (
                            <span className="nuban-validation-badge warning">
                              <LucideIcon name="alert-circle" style={{ width: 13, height: 13 }} />
                              Enter a 10-digit NUBAN ({accountNumber.length}/10)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Beneficiary Name */}
                      <div className="form-group full-width">
                        <label htmlFor="accountName">Account Beneficiary / Registered Name</label>
                        <input
                          type="text"
                          id="accountName"
                          className="form-control"
                          placeholder="e.g. Roseville Secondary School - Admissions Revenue"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                        />
                        <span style={{ fontSize: 11.5, color: 'var(--text-light)', marginTop: 2 }}>
                          Must match the corporate bank account name registered with the Corporate Affairs Commission (CAC) / Central Bank of Nigeria (CBN).
                        </span>
                      </div>

                      {/* Payment Gateway */}
                      <div className="form-group">
                        <label htmlFor="gateway">Payment Processing Gateway / Settlement Route</label>
                        <select
                          id="gateway"
                          className="form-control"
                          value={gateway}
                          onChange={(e) => setGateway(e.target.value)}
                        >
                          {GATEWAY_OPTIONS.map((gw) => (
                            <option key={gw} value={gw}>{gw}</option>
                          ))}
                        </select>
                      </div>

                      {/* Payout Schedule */}
                      <div className="form-group">
                        <label htmlFor="settlementSchedule">Settlement Payout Frequency</label>
                        <select
                          id="settlementSchedule"
                          className="form-control"
                          value={settlementSchedule}
                          onChange={(e) => setSettlementSchedule(e.target.value)}
                        >
                          {SETTLEMENT_SCHEDULES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Credit Notification Email */}
                      <div className="form-group">
                        <label htmlFor="notificationEmail">Credit Alert &amp; Inflow Notification Email</label>
                        <input
                          type="email"
                          id="notificationEmail"
                          className="form-control"
                          placeholder="finance@yourdomain.edu.ng"
                          value={notificationEmail}
                          onChange={(e) => setNotificationEmail(e.target.value)}
                        />
                      </div>

                      {/* Auto-Reconcile Switch */}
                      <div className="form-group" style={{ justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>Instant Auto-Reconciliation</div>
                            <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Automatically mark forms as paid on CBN NIP / Gateway credit webhook</div>
                          </div>
                          <label className="switch" style={{ marginLeft: 12 }}>
                            <input
                              type="checkbox"
                              checked={autoReconcile}
                              onChange={(e) => setAutoReconcile(e.target.checked)}
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="settings-actions">
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px' }}
                      >
                        <LucideIcon name="save" style={{ width: 16, height: 16 }} />
                        <span>Save Settlement Configuration</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Secondary Subaccounts & Split Routing */}
                <div className="settings-card">
                  <div className="venues-header" style={{ marginBottom: 8 }}>
                    <div>
                      <div className="settings-section-title" style={{ border: 'none', padding: 0, margin: 0 }}>
                        Secondary Subaccounts &amp; Split Payouts
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: 12.5, color: 'var(--text-light)' }}>
                        Route specific fee types (e.g. entrance exam fees, scholarship endowment, or recruitment fees) to secondary accounts.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-add"
                      onClick={() => setIsSubaccountModalOpen(true)}
                    >
                      <LucideIcon name="plus" style={{ width: 15, height: 15 }} /> Add Subaccount
                    </button>
                  </div>

                  {subaccounts.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(0,0,0,0.02)', borderRadius: 12, border: '1px dashed var(--border-color)', color: 'var(--text-light)', fontSize: 13 }}>
                      No secondary subaccounts configured. All fee collections will go 100% to the primary settlement account above.
                    </div>
                  ) : (
                    <div className="subaccounts-grid">
                      {subaccounts.map((sub) => (
                        <div key={sub.id} className="subaccount-card-item">
                          <div className="subaccount-card-top">
                            <div>
                              <div className="subaccount-title">{sub.title}</div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#0052cc', marginTop: 2 }}>
                                {sub.bankName} • {sub.accountNumber}
                              </div>
                            </div>
                            <span className="subaccount-split-tag">{sub.splitPercentage}% Split</span>
                          </div>
                          <div className="subaccount-meta">
                            <div>Account: <strong>{sub.accountName}</strong></div>
                            <div>Gateway: <strong>{sub.gateway}</strong></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 6, borderTop: '1px solid var(--border-color)' }}>
                            <button
                              type="button"
                              className="subaccount-delete-btn"
                              title="Delete Subaccount"
                              onClick={() => handleRemoveSubaccount(sub.id)}
                            >
                              <LucideIcon name="trash-2" style={{ width: 14, height: 14 }} />
                              <span style={{ fontSize: 11.5, marginLeft: 4 }}>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Subscription & Plans */}
          {activeTab === 'subscription' && (
            <div id="tab-subscription" className="tab-pane active">
              <div className="settings-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 10px', borderRadius: 20, marginBottom: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                      ACTIVE SUBSCRIPTION • {currentSubscription?.billingCycle === 'annual' ? 'ANNUAL BILLING' : 'MONTHLY BILLING'}
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 800 }}>{currentPlan?.name || 'Pro Campus'}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-light)' }}>
                      Renews on <strong>{currentSubscription?.renewalDate || 'Jan 15, 2027'}</strong> via Pixpay Direct Settlement.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ background: isOrganization ? '#7c3aed' : '#0052cc', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700 }}
                    onClick={() => navigate('/pricing')}
                  >
                    <LucideIcon name="crown" style={{ width: 16, height: 16 }} />
                    <span>View All Plans &amp; Upgrade</span>
                  </button>
                </div>

                {/* Quotas Meter */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
                  <div style={{ background: 'var(--btn-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-light)', marginBottom: 6 }}>
                      <span>Active Forms Limit</span>
                      <strong>{usageStats?.activeForms} / {usageStats?.formsLimit}</strong>
                    </div>
                    <div style={{ height: 6, width: '100%', background: 'var(--border-color)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (usageStats?.activeForms / usageStats?.formsLimit) * 100)}%`, background: isOrganization ? '#7c3aed' : '#0052cc', borderRadius: 999 }} />
                    </div>
                  </div>

                  <div style={{ background: 'var(--btn-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-light)', marginBottom: 6 }}>
                      <span>Monthly Intake Quota</span>
                      <strong>{usageStats?.submissionsMonth?.toLocaleString()} / {usageStats?.submissionsLimit?.toLocaleString()}</strong>
                    </div>
                    <div style={{ height: 6, width: '100%', background: 'var(--border-color)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (usageStats?.submissionsMonth / usageStats?.submissionsLimit) * 100)}%`, background: isOrganization ? '#7c3aed' : '#0052cc', borderRadius: 999 }} />
                    </div>
                  </div>

                  <div style={{ background: 'var(--btn-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-light)', marginBottom: 6 }}>
                      <span>Pixpay Split Subaccounts</span>
                      <strong>{usageStats?.subaccountsUsed} / {usageStats?.subaccountsLimit}</strong>
                    </div>
                    <div style={{ height: 6, width: '100%', background: 'var(--border-color)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (usageStats?.subaccountsUsed / usageStats?.subaccountsLimit) * 100)}%`, background: isOrganization ? '#7c3aed' : '#0052cc', borderRadius: 999 }} />
                    </div>
                  </div>
                </div>

                {/* Plan Highlights */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Features Unlocked on Your Active Plan:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                    {currentPlan?.features?.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                        <LucideIcon name="check" style={{ width: 16, height: 16, color: '#10b981', flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Banner */}
                <div style={{
                  marginTop: 24,
                  background: isOrganization ? 'rgba(124, 58, 237, 0.05)' : 'rgba(0, 82, 204, 0.05)',
                  border: `1px solid ${isOrganization ? 'rgba(124, 58, 237, 0.2)' : 'rgba(0, 82, 204, 0.2)'}`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dark)' }}>Need Higher Form Quota or Multi-Campus Routing?</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-light)' }}>Upgrade to unlock unlimited candidates, custom domains, and TSA Sweeps.</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ background: isOrganization ? '#7c3aed' : '#0052cc', padding: '8px 18px', fontSize: 13 }}
                    onClick={() => navigate('/pricing')}
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Examination / Assessment Setup */}
          {activeTab === 'exam-setup' && (
            <div id="tab-exam-setup" className="tab-pane active">
              <div className="settings-card">
                <div className="settings-section-title">Global {isOrganization ? 'Assessment' : 'Examination'} Configuration</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="examDate">Default {isOrganization ? 'Assessment' : 'Exam'} Date</label>
                    <input
                      type="date"
                      id="examDate"
                      className="form-control"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="examDuration">Duration (Minutes)</label>
                    <input
                      type="number"
                      id="examDuration"
                      className="form-control"
                      value={examDuration}
                      onChange={(e) => setExamDuration(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passScore">{isOrganization ? 'Cut-Off Score (%)' : 'Passing Score (%)'}</label>
                    <input
                      type="number"
                      id="passScore"
                      className="form-control"
                      value={passScore}
                      onChange={(e) => setPassScore(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="examMode">{isOrganization ? 'Assessment Mode' : 'Examination Mode'}</label>
                    <select
                      id="examMode"
                      className="form-control"
                      value={examMode}
                      onChange={(e) => setExamMode(e.target.value)}
                    >
                      {isOrganization ? (
                        <>
                          <option value="proctored">Online Proctored Assessment</option>
                          <option value="hub">Assessment Center (In-Person)</option>
                          <option value="hybrid">Hybrid Evaluation</option>
                        </>
                      ) : (
                        <>
                          <option value="cbt">Computer Based Test (CBT)</option>
                          <option value="ppt">Paper &amp; Pencil Test</option>
                          <option value="hybrid">Hybrid Evaluation</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="instructions">{isOrganization ? 'Applicant Assessment Instructions' : 'Candidate Exam Instructions'}</label>
                    <textarea
                      id="instructions"
                      className="form-control"
                      style={{ minHeight: '100px' }}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </div>
                <div className="settings-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => showToast(`${isOrganization ? 'Assessment' : 'Examination'} Setup saved successfully!`)}
                  >
                    <LucideIcon name="save" style={{ width: '18px', height: '18px' }} /> Save Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Venues / Assessment Hubs */}
          {activeTab === 'exam-venues' && (
            <div id="tab-exam-venues" className="tab-pane active">
              <div className="settings-card" style={{ background: 'transparent', border: 'none', padding: '0' }}>
                <div className="venues-header">
                  <h3 style={{ margin: '0', color: 'var(--text-dark)', fontSize: '16px' }}>
                    Configured {isOrganization ? 'Assessment Hubs' : 'Examination Venues'}
                  </h3>
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => setIsVenueModalOpen(true)}
                  >
                    <LucideIcon name="plus" style={{ width: '16px', height: '16px' }} /> {isOrganization ? 'Add Hub' : 'Add Venue'}
                  </button>
                </div>

                <div className="venue-list">
                  {venues.map((venue) => (
                    <div className="venue-card" key={venue.id}>
                      <div className="venue-info">
                        <h3>{venue.name}</h3>
                        <p>{venue.address}</p>
                      </div>
                      <div className="venue-meta">
                        <div className="venue-capacity">
                          <LucideIcon
                            name="users"
                            style={{ width: '16px', height: '16px', color: 'var(--text-light)' }}
                          />
                          {venue.capacity} {isOrganization ? 'Slots' : 'Seats'}
                        </div>
                        <div
                          className={`status-badge ${
                            venue.status === 'active' ? 'status-active' : 'status-inactive'
                          }`}
                        >
                          {venue.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Security & Login */}
          {activeTab === 'security' && (
            <div id="tab-security" className="tab-pane active">
              <div className="settings-card">
                <div className="settings-section-title">Login Credentials ({terms.workspaceLabel} Admin)</div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Admin Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={terms.adminProfile.email}
                      disabled
                      style={{ background: 'rgba(0,0,0,0.03)', cursor: 'not-allowed', opacity: 0.8 }}
                    />
                    <span style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
                      Primary administrative account bound to {workspaceName}.
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="settings-section-title" style={{ marginTop: '16px' }}>Two-Factor Authentication</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.01)'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-dark)', fontSize: '14px' }}>
                      Authenticator App
                    </h4>
                    <p style={{ margin: '0', fontSize: '12px', color: 'var(--text-light)' }}>
                      {twoFactorEnabled
                        ? '2FA is currently active on your account.'
                        : 'Use an app like Google Authenticator to secure your account.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-upload"
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      showToast(twoFactorEnabled ? '2FA disabled.' : '2FA enabled successfully!');
                    }}
                  >
                    <LucideIcon name="smartphone" style={{ width: '16px', height: '16px' }} />
                    {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>

                <div className="settings-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      if (!currentPassword) {
                        alert('Please enter your current password.');
                        return;
                      }
                      showToast('Security settings updated successfully!');
                      setCurrentPassword('');
                      setNewPassword('');
                    }}
                  >
                    <LucideIcon name="lock" style={{ width: '18px', height: '18px' }} /> Update Security
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Venue Modal */}
      <div className={`modal-overlay ${isVenueModalOpen ? 'active' : ''}`} id="addVenueModal">
        <div className="modal-container">
          <div className="modal-header">
            <h2>Add New {isOrganization ? 'Assessment Hub' : 'Venue'}</h2>
            <button
              type="button"
              className="modal-close"
              onClick={() => setIsVenueModalOpen(false)}
            >
              <LucideIcon name="x" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
          <form onSubmit={handleAddVenue}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="modalVenueName">{isOrganization ? 'Hub Name' : 'Venue Name'}</label>
              <input
                type="text"
                id="modalVenueName"
                className="form-control"
                placeholder={isOrganization ? "E.g., Lagos Assessment Centre" : "E.g., Lagos Tech Hub"}
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="modalVenueAddress">Address</label>
              <textarea
                id="modalVenueAddress"
                className="form-control"
                style={{ minHeight: '80px' }}
                placeholder="Full street address"
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
              />
            </div>
            <div className="form-grid" style={{ marginBottom: '24px' }}>
              <div className="form-group">
                <label htmlFor="modalVenueCapacity">Capacity ({isOrganization ? 'Slots' : 'Seats'})</label>
                <input
                  type="number"
                  id="modalVenueCapacity"
                  className="form-control"
                  placeholder={isOrganization ? "E.g. 200" : "E.g. 250"}
                  value={venueCapacity}
                  onChange={(e) => setVenueCapacity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modalVenueStatus">Status</label>
                <select
                  id="modalVenueStatus"
                  className="form-control"
                  value={venueStatus}
                  onChange={(e) => setVenueStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="settings-actions" style={{ marginTop: 0 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsVenueModalOpen(false)}
                style={{ marginRight: '12px' }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save {isOrganization ? 'Hub' : 'Venue'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Subaccount Modal */}
      <div className={`modal-overlay ${isSubaccountModalOpen ? 'active' : ''}`} id="addSubaccountModal">
        <div className="modal-container">
          <div className="modal-header">
            <h2>Add Secondary Settlement Subaccount</h2>
            <button
              type="button"
              className="modal-close"
              onClick={() => setIsSubaccountModalOpen(false)}
            >
              <LucideIcon name="x" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
          <form onSubmit={handleAddSubaccount}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="modalSubTitle">Subaccount Purpose / Description</label>
              <input
                type="text"
                id="modalSubTitle"
                className="form-control"
                placeholder={isOrganization ? "E.g. Assessment Processing Fund" : "E.g. Examination Board Revenue"}
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-grid" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label htmlFor="modalSubBank">Bank</label>
                <select
                  id="modalSubBank"
                  className="form-control"
                  value={subBank}
                  onChange={(e) => setSubBank(e.target.value)}
                >
                  {NIGERIAN_BANKS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="modalSubAccountNum">Account Number (10 digits)</label>
                <input
                  type="text"
                  id="modalSubAccountNum"
                  className="form-control"
                  maxLength={10}
                  placeholder="e.g. 0039281745"
                  value={subAccountNum}
                  onChange={(e) => setSubAccountNum(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="modalSubAccountName">Beneficiary Account Name</label>
              <input
                type="text"
                id="modalSubAccountName"
                className="form-control"
                placeholder="e.g. Roseville Secondary School - Exam Board"
                value={subAccountName}
                onChange={(e) => setSubAccountName(e.target.value)}
              />
            </div>

            <div className="form-grid" style={{ marginBottom: '24px' }}>
              <div className="form-group">
                <label htmlFor="modalSubGateway">Gateway</label>
                <select
                  id="modalSubGateway"
                  className="form-control"
                  value={subGateway}
                  onChange={(e) => setSubGateway(e.target.value)}
                >
                  {GATEWAY_OPTIONS.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="modalSubSplit">Split Share (%)</label>
                <input
                  type="number"
                  id="modalSubSplit"
                  className="form-control"
                  min={1}
                  max={100}
                  value={subSplit}
                  onChange={(e) => setSubSplit(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="settings-actions" style={{ marginTop: 0 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsSubaccountModalOpen(false)}
                style={{ marginRight: '12px' }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Subaccount
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <LucideIcon name="check-circle" style={{ width: '18px', height: '18px' }} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
