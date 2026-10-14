import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

const SCHOOL_SUBMISSIONS = [
  { id: 1, name: 'David Olamide', initials: 'DO', parent: 'Mr. Olamide', email: 'mr.olamide@example.com', phone: '+234 800 000 0000', date: 'Oct 08, 2026' },
  { id: 2, name: 'Sarah Johnson', initials: 'SJ', parent: 'Mrs. Johnson', email: 'mrs.johnson@example.com', phone: '+234 811 111 1111', date: 'Oct 07, 2026' },
  { id: 3, name: 'Emeka Uchenna', initials: 'EU', parent: 'Dr. Uchenna', email: 'dr.uchenna@example.com', phone: '+234 822 222 2222', date: 'Oct 06, 2026' },
  { id: 4, name: 'Blessing Adeyemi', initials: 'BA', parent: 'Chief Adeyemi', email: 'chief.adeyemi@example.com', phone: '+234 803 333 4444', date: 'Oct 05, 2026' },
  { id: 5, name: 'Michael Peters', initials: 'MP', parent: 'Prof. Peters', email: 'peters.fam@example.com', phone: '+234 809 999 1234', date: 'Oct 04, 2026' },
];

const ORG_SUBMISSIONS = [
  { id: 1, name: 'Amaka Obi', initials: 'AO', parent: 'MTN Nigeria', email: 'amaka.obi@mtn.com', phone: '+234 800 686 0000', date: 'Oct 08, 2026' },
  { id: 2, name: 'James Haruna', initials: 'JH', parent: 'Stanbic IBTC', email: 'j.haruna@stanbic.com', phone: '+234 811 221 4411', date: 'Oct 07, 2026' },
  { id: 3, name: 'Chidinma Eze', initials: 'CE', parent: 'Dangote Group', email: 'c.eze@dangote.com', phone: '+234 802 993 7721', date: 'Oct 06, 2026' },
  { id: 4, name: 'Tunde Bakare', initials: 'TB', parent: 'Access Bank', email: 'tunde.b@accessbank.ng', phone: '+234 803 111 5544', date: 'Oct 05, 2026' },
  { id: 5, name: 'Ngozi Adeyemi', initials: 'NA', parent: 'Flutterwave', email: 'ngozi@flutterwave.com', phone: '+234 809 441 9903', date: 'Oct 04, 2026' },
];

export default function ViewForm() {
  const navigate = useNavigate();
  const { isOrganization, terms } = useWorkspace();
  const [search, setSearch] = useState('');

  const submissions = isOrganization ? ORG_SUBMISSIONS : SCHOOL_SUBMISSIONS;

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  const filtered = submissions.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.parent.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <button 
              onClick={() => navigate('/forms')} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '12px', fontSize: '13px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <LucideIcon name="arrow-left" style={{ width: '16px', height: '16px' }} /> Back to Forms
            </button>
            <h2 id="pageSubtitle">
              {isOrganization ? 'Submissions for Talent Acquisition & Screening' : 'Submissions for General Admission'}
            </h2>
            <h1 id="pageTitle">
              {isOrganization ? 'Graduate Trainee Programme 2026' : '2026 Academic Session Admission'}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="applications-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input 
              type="text" 
              placeholder={isOrganization ? "Search submissions by applicant or sponsor..." : "Search submissions by student name or parent..."} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <button className="btn-primary" onClick={() => alert('Exporting form submissions to CSV...')}>
              <LucideIcon name="download" style={{ width: '16px', height: '16px' }} /> Export to CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>{isOrganization ? 'Applicant' : 'Student'}</th>
                <th>{isOrganization ? 'Organisation / Sponsor' : 'Parent'}</th>
                <th>{isOrganization ? 'Work Email' : 'Parent Email'}</th>
                <th>{isOrganization ? 'Contact Phone' : 'Parent Phone'}</th>
                <th>{isOrganization ? 'Submission Date' : 'Payment Date'}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '500', color: 'var(--text-light)' }}>{idx + 1}</td>
                  <td>
                    <div className="user-meta">
                      <div className="user-avatar-sm">{item.initials}</div>
                      <div className="user-info">
                        <span className="name">{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{item.parent}</td>
                  <td>
                    <a href={`mailto:${item.email}`} style={{ color: '#0052cc', textDecoration: 'none' }}>
                      {item.email}
                    </a>
                  </td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-light)' }}>{item.phone}</td>
                  <td>{item.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-action" title="View Details" onClick={() => navigate('/applicant-profile')}>
                        <LucideIcon name="eye" style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button className="btn-action" title="Download Receipt" onClick={() => alert(`Downloading PDF for ${item.name}...`)}>
                        <LucideIcon name="download" style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-light)' }}>
                    No submissions match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
