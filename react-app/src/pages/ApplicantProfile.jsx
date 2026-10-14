import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

export default function ApplicantProfile() {
  const navigate = useNavigate();
  const { isOrganization, terms } = useWorkspace();

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  const profile = isOrganization ? {
    name: 'Amaka Obi',
    initials: 'AO',
    form: 'Graduate Trainee Programme 2026',
    statusBadge: 'Application Shortlisted',
    statusColor: '#10b981',
    id: 'APP-2026-0016',
    dob: 'July 22, 1999',
    gender: 'Female',
    contact1Title: 'Primary Contact (Employer / Sponsor)',
    contact1Name: 'Alex Johnson (Talent Lead)',
    contact1Role: 'MTN Nigeria - Sponsor',
    contact1Email: 'alex.johnson@mtn.com',
    contact1Phone: '+234 800 686 0000',
    contact2Title: 'Professional Reference',
    contact2Name: 'Dr. Kenneth Clark',
    contact2Role: 'Senior Engineering Manager',
    contact2Email: 'k.clark@zenithtech.ng',
    contact2Phone: '+234 802 119 4433',
    field1Label: 'Current Employer & Track',
    field1Val: 'Zenith Tech Ltd. – Software Engineering',
    field2Label: 'Programme Track Applied For',
    field2Val: 'Graduate Engineering Trainee (Cohort 2026)',
    field3Label: 'Highest Qualification',
    field3Val: 'B.Sc. Computer Science (First Class Honours, UNILAG)',
    addressLabel: 'Residential / Office Address',
    addressVal: '14 Commerce Avenue, Victoria Island, Lagos, Nigeria',
    documents: [
      { name: 'Curriculum_Vitae_Amaka_Obi.pdf', size: '1.4 MB', icon: 'file-text' },
      { name: 'NYSC_Discharge_Certificate.pdf', size: '920 KB', icon: 'award' },
      { name: 'UNILAG_Degree_Certificate.pdf', size: '1.1 MB', icon: 'file-check' }
    ],
    feeLabel: 'Assessment & Screening Fee',
    feeAmount: '₦15,000',
    feeDate: 'Oct 08, 2026'
  } : {
    name: 'David Olamide',
    initials: 'DO',
    form: '2026 Academic Session Admission',
    statusBadge: 'Admission Offered',
    statusColor: '#10b981',
    id: 'APP-2026-0842',
    dob: 'March 14, 2010',
    gender: 'Male',
    contact1Title: "Father's Information",
    contact1Name: 'Mr. David Olamide Snr.',
    contact1Role: 'Father & Primary Guardian',
    contact1Email: 'mr.olamide@example.com',
    contact1Phone: '+234 800 000 0000',
    contact2Title: "Mother's Information",
    contact2Name: 'Mrs. Funke Olamide',
    contact2Role: 'Mother',
    contact2Email: 'mrs.olamide@example.com',
    contact2Phone: '+234 800 000 0001',
    field1Label: 'Previous School Attended',
    field1Val: 'Lagos Junior High School, Victoria Island',
    field2Label: 'Class Applied For',
    field2Val: 'Senior Secondary 1 (SS1 Science Stream)',
    field3Label: 'State of Origin & LGA',
    field3Val: 'Lagos State (Ikeja LGA)',
    addressLabel: 'Home Residential Address',
    addressVal: '124 Broad Street, Lagos Island, Lagos, Nigeria',
    documents: [
      { name: 'Birth_Certificate.pdf', size: '1.2 MB', icon: 'file-text' },
      { name: 'Passport_Photograph.jpg', size: '845 KB', icon: 'image' },
      { name: 'Junior_Secondary_Transcript.pdf', size: '2.4 MB', icon: 'file-check' }
    ],
    feeLabel: 'Application Form Fee',
    feeAmount: '₦15,000',
    feeDate: 'Oct 08, 2026'
  };

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <button 
              onClick={() => navigate(-1)} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '12px', fontSize: '13px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <LucideIcon name="arrow-left" style={{ width: '16px', height: '16px' }} /> Back
            </button>
            <h2 id="pageSubtitle">{isOrganization ? 'Applicant Dossier & Verification Details' : 'Student Profile & Admission Details'}</h2>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="applications-layout">
        <div className="profile-layout profile-layout-grid">
          {/* Left Column: Profile Card */}
          <div className="profile-sidebar">
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: isOrganization ? 'rgba(124, 58, 237, 0.1)' : 'rgba(0, 82, 204, 0.1)', color: isOrganization ? '#7c3aed' : '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>
                {profile.initials}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' }}>
                {profile.name}
              </h3>
              <p style={{ color: 'var(--text-light)', fontSize: '13px', marginBottom: '16px' }}>
                {profile.form}
              </p>
              
              <span className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: profile.statusColor, marginBottom: '24px' }}>
                <LucideIcon name="check-circle" style={{ width: '12px', height: '12px' }} /> {profile.statusBadge}
              </span>

              <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', marginBottom: '24px' }}></div>
              
              <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>Applicant ID</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600', fontFamily: 'monospace' }}>{profile.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>{profile.dob}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>Gender</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>{profile.gender}</div>
                </div>
              </div>
            </div>

            {/* Contact Card 1 */}
            <div className="card" style={{ padding: '24px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', marginTop: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '16px' }}>
                {profile.contact1Title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="user" style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>{profile.contact1Name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{profile.contact1Role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="mail" style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div>
                    <a href={`mailto:${profile.contact1Email}`} style={{ fontSize: '13px', fontWeight: '500', color: '#0052cc', textDecoration: 'none' }}>
                      {profile.contact1Email}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="phone" style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-dark)', fontFamily: 'monospace' }}>
                      {profile.contact1Phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="card" style={{ padding: '24px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', marginTop: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '16px' }}>
                {profile.contact2Title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="user" style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>{profile.contact2Name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{profile.contact2Role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="mail" style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div>
                    <a href={`mailto:${profile.contact2Email}`} style={{ fontSize: '13px', fontWeight: '500', color: '#0052cc', textDecoration: 'none' }}>
                      {profile.contact2Email}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LucideIcon name="phone" style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-dark)', fontFamily: 'monospace' }}>
                      {profile.contact2Phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details Tabs */}
          <div className="profile-content">
            <div className="card" style={{ padding: '24px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)' }}>Submitted Application Data</h4>
                <button className="btn-action" style={{ padding: '6px 12px' }} onClick={() => alert(`Printing dossier for ${profile.name}...`)}>
                  <LucideIcon name="printer" style={{ width: '14px', height: '14px' }} /> Print Application
                </button>
              </div>
              
              <div className="profile-info-grid">
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>{profile.field1Label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {profile.field1Val}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>{profile.field2Label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {profile.field2Val}
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>{profile.field3Label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {profile.field3Val}
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500', marginBottom: '4px' }}>{profile.addressLabel}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {profile.addressVal}
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '20px' }}>Uploaded Documents & Credentials</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {profile.documents.map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '12px', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LucideIcon name={doc.icon} style={{ width: '20px', height: '20px' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{doc.size}</div>
                      </div>
                    </div>
                    <button className="btn-action" style={{ padding: '8px', borderRadius: '8px' }} onClick={() => alert(`Downloading ${doc.name}...`)}>
                      <LucideIcon name="download" style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '24px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '20px' }}>Payment & Processing History</h4>
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <table className="modern-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '12px 16px', fontSize: '11px' }}>FEE TYPE</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px' }}>AMOUNT</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px' }}>DATE</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '16px', fontSize: '13px', fontWeight: '500' }}>{profile.feeLabel}</td>
                      <td style={{ padding: '16px', fontSize: '13px', fontFamily: 'monospace', fontWeight: '600' }}>{profile.feeAmount}</td>
                      <td style={{ padding: '16px', fontSize: '12px', color: 'var(--text-light)' }}>{profile.feeDate}</td>
                      <td style={{ padding: '16px' }}>
                        <span className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 8px', fontSize: '10px' }}>Verified & Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
