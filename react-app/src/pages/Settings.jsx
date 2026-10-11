import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

  // General Settings state
  const [schoolName, setSchoolName] = useState('Ephraim High school');
  const [contactEmail, setContactEmail] = useState('support@EphraimHighschool');
  const [contactPhone, setContactPhone] = useState('+1 (555) 123-4567');
  const [timezone, setTimezone] = useState('UTC');
  const [logoPreview, setLogoPreview] = useState('');
  const fileInputRef = useRef(null);

  // Examination Setup state
  const [examDate, setExamDate] = useState('2026-11-15');
  const [examDuration, setExamDuration] = useState('120');
  const [passScore, setPassScore] = useState('65');
  const [examMode, setExamMode] = useState('cbt');
  const [instructions, setInstructions] = useState(
    'Please arrive at the venue 30 minutes before the scheduled time. Bring a valid form of identification and your printed application slip. Electronic devices are not permitted inside the examination hall.'
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
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: 'Lagos Tech Hub',
      address: '14 Herbert Macaulay Way, Yaba, Lagos',
      capacity: '250',
      status: 'active'
    },
    {
      id: 2,
      name: 'Abuja Convention Center',
      address: 'Garki District, Abuja, FCT',
      capacity: '500',
      status: 'active'
    },
    {
      id: 3,
      name: 'Port Harcourt Digital Center',
      address: 'Aba Road, Port Harcourt, Rivers State',
      capacity: '150',
      status: 'inactive'
    }
  ]);

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.settings-card', { y: 30, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.settings-card', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);

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
      alert('Please enter a venue name.');
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
    showToast('Venue added successfully!');
  };

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'general':
        return {
          title: 'General Settings ',
          subtitle: 'Manage global system configurations'
        };
      case 'exam-setup':
        return {
          title: 'Examination Setup',
          subtitle: 'Configure rules and parameters for examinations'
        };
      case 'exam-venues':
        return {
          title: 'Examination Venues',
          subtitle: 'Manage testing locations and capacities'
        };
      case 'security':
        return {
          title: 'Security & Login',
          subtitle: 'Manage your account credentials and 2FA'
        };
      default:
        return {
          title: 'General Settings ⚙️',
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
            className={`sidebar-item ${activeTab === 'exam-setup' ? 'active' : ''}`}
            onClick={() => setActiveTab('exam-setup')}
          >
            <LucideIcon name="clipboard-list" style={{ width: '18px', height: '18px' }} /> Examination Setup
          </div>
          <div
            className={`sidebar-item ${activeTab === 'exam-venues' ? 'active' : ''}`}
            onClick={() => setActiveTab('exam-venues')}
          >
            <LucideIcon name="map-pin" style={{ width: '18px', height: '18px' }} /> Examination Venues
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
              if (window.confirm('Are you sure you want to log out?')) {
                navigate('/');
              }
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
                <div className="settings-section-title">System Information</div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <div className="image-upload-wrapper">
                      <div className="system-logo-preview">
                        {logoPreview ? (
                          <img
                            id="previewImg"
                            src={logoPreview}
                            alt="System Logo"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <LucideIcon
                            name="image"
                            id="previewIcon"
                            style={{ width: '32px', height: '32px', color: 'var(--text-light)' }}
                          />
                        )}
                      </div>
                      <div className="upload-controls">
                        <label>System Logo / Image</label>
                        <p className="upload-hint">Recommended size: 256x256px (PNG or JPG)</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <label className="btn-upload">
                            <LucideIcon name="upload" style={{ width: '16px', height: '16px' }} /> Upload Image
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
                    <label htmlFor="schoolName">School Name</label>
                    <input
                      type="text"
                      id="schoolName"
                      className="form-control"
                      placeholder="Enter school name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="form-control"
                      placeholder="support@EphraimHighschool"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Contact Phone</label>
                    <input
                      type="text"
                      id="contactPhone"
                      className="form-control"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="timezone">System Timezone</label>
                    <select
                      id="timezone"
                      className="form-control"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="EST">Eastern Standard Time (EST)</option>
                      <option value="CST">Central Standard Time (CST)</option>
                      <option value="PST">Pacific Standard Time (PST)</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                    </select>
                  </div>
                </div>
                <div className="settings-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => showToast('General Settings saved successfully!')}
                  >
                    <LucideIcon name="save" style={{ width: '18px', height: '18px' }} /> Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Examination Setup */}
          {activeTab === 'exam-setup' && (
            <div id="tab-exam-setup" className="tab-pane active">
              <div className="settings-card">
                <div className="settings-section-title">Global Exam Configuration</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="examDate">Default Exam Date</label>
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
                    <label htmlFor="passScore">Passing Score (%)</label>
                    <input
                      type="number"
                      id="passScore"
                      className="form-control"
                      value={passScore}
                      onChange={(e) => setPassScore(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="examMode">Exam Mode</label>
                    <select
                      id="examMode"
                      className="form-control"
                      value={examMode}
                      onChange={(e) => setExamMode(e.target.value)}
                    >
                      <option value="cbt">Computer Based Test (CBT)</option>
                      <option value="ppt">Paper & Pencil Test</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="instructions">Candidate Instructions</label>
                    <textarea
                      id="instructions"
                      className="form-control"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </div>
                <div className="settings-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => showToast('Examination Setup saved successfully!')}
                  >
                    <LucideIcon name="save" style={{ width: '18px', height: '18px' }} /> Save Setup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Examination Venues */}
          {activeTab === 'exam-venues' && (
            <div id="tab-exam-venues" className="tab-pane active">
              <div className="settings-card" style={{ background: 'transparent', border: 'none', padding: '0' }}>
                <div className="venues-header">
                  <h3 style={{ margin: '0', color: 'var(--text-dark)', fontSize: '16px' }}>Configured Venues</h3>
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => setIsVenueModalOpen(true)}
                  >
                    <LucideIcon name="plus" style={{ width: '16px', height: '16px' }} /> Add Venue
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
                          {venue.capacity} Seats
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
                <div className="settings-section-title">Login Credentials</div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value="admin@nixtio.com"
                      disabled
                      style={{ background: 'rgba(0,0,0,0.03)', cursor: 'not-allowed', opacity: 0.7 }}
                    />
                    <span style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>
                      To change your email, please contact technical support.
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
            <h2>Add New Venue</h2>
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
              <label htmlFor="modalVenueName">Venue Name</label>
              <input
                type="text"
                id="modalVenueName"
                className="form-control"
                placeholder="E.g., Lagos Tech Hub"
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
                <label htmlFor="modalVenueCapacity">Capacity (Seats)</label>
                <input
                  type="number"
                  id="modalVenueCapacity"
                  className="form-control"
                  placeholder="E.g. 250"
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
                Save Venue
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

