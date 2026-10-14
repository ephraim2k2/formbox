import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { TableSkeletonRows } from '../components/Skeleton';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

export default function CompletedApplications() {
  const navigate = useNavigate();
  const { isOrganization, terms } = useWorkspace();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const schoolApplications = [
    { id: 1, student: 'David Olamide', initials: 'DO', parent: 'Mr. Olamide', email: 'mr.olamide@example.com', phone: '+234 800 000 0000', date: 'Oct 08, 2026', status: 'admitted' },
    { id: 2, student: 'Sarah Johnson', initials: 'SJ', parent: 'Mrs. Johnson', email: 'mrs.johnson@example.com', phone: '+234 811 111 1111', date: 'Oct 07, 2026', status: 'review' },
    { id: 3, student: 'Emeka Uchenna', initials: 'EU', parent: 'Dr. Uchenna', email: 'dr.uchenna@example.com', phone: '+234 822 222 2222', date: 'Oct 06, 2026', status: 'admitted' },
    { id: 4, student: 'Blessing Adeyemi', initials: 'BA', parent: 'Chief Adeyemi', email: 'chief.adeyemi@example.com', phone: '+234 803 333 4444', date: 'Oct 05, 2026', status: 'review' },
    { id: 5, student: 'Michael Peters', initials: 'MP', parent: 'Prof. Peters', email: 'peters.fam@example.com', phone: '+234 809 999 1234', date: 'Oct 04, 2026', status: 'rejected' },
  ];

  const orgApplications = [
    { id: 1, student: 'Amaka Obi', initials: 'AO', parent: 'MTN Nigeria', email: 'amaka.obi@mtn.com', phone: '+234 800 686 0000', date: 'Oct 08, 2026', status: 'shortlisted', programme: 'Graduate Trainee 2026' },
    { id: 2, student: 'James Haruna', initials: 'JH', parent: 'Stanbic IBTC', email: 'j.haruna@stanbic.com', phone: '+234 811 221 4411', date: 'Oct 07, 2026', status: 'review', programme: 'Experienced Hire – Finance' },
    { id: 3, student: 'Chidinma Eze', initials: 'CE', parent: 'Dangote Group', email: 'c.eze@dangote.com', phone: '+234 802 993 7721', date: 'Oct 06, 2026', status: 'shortlisted', programme: 'Tech Fellowship Cohort 4' },
    { id: 4, student: 'Tunde Bakare', initials: 'TB', parent: 'Access Bank', email: 'tunde.b@accessbank.ng', phone: '+234 803 111 5544', date: 'Oct 05, 2026', status: 'review', programme: 'Community Scholarship' },
    { id: 5, student: 'Ngozi Adeyemi', initials: 'NA', parent: 'Flutterwave', email: 'ngozi@flutterwave.com', phone: '+234 809 441 9903', date: 'Oct 04, 2026', status: 'rejected', programme: 'Summer Internship' },
  ];

  const initialApplications = isOrganization ? orgApplications : schoolApplications;

  // Status labels per workspace
  const positiveLabel = isOrganization ? 'Shortlisted' : 'Admitted';
  const positiveKey = isOrganization ? 'shortlisted' : 'admitted';

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });

    // Simulate fast data fetching with skeleton state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filtered = initialApplications.filter(app => {
    const matchesSearch = 
      app.student.toLowerCase().includes(search.toLowerCase()) ||
      app.parent.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>{terms.completedApplications}</h1>
            <h2>{terms.completedSubtitle}</h2>
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
              placeholder={isOrganization ? 'Search by applicant, company, or email...' : 'Search by student, parent, or email...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="review">Under Review</option>
              <option value={positiveKey}>{positiveLabel}</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="btn-primary" onClick={() => alert('Exporting completed applications to CSV...')}>
              <LucideIcon name="download" style={{ width: '16px', height: '16px' }} /> Export CSV
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
                <th>{isOrganization ? 'Organisation / Company' : 'Parent'}</th>
                <th>{isOrganization ? 'Work Email' : 'Parent Email'}</th>
                <th>Status</th>
                <th>{isOrganization ? 'Submission Date' : 'Payment Date'}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeletonRows rows={5} cols={7} />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                    No matching applications found. Try clearing your search query.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500', color: 'var(--text-light)' }}>{idx + 1}</td>
                    <td>
                      <div className="user-meta">
                        <div className="user-avatar-sm">{item.initials}</div>
                        <div className="user-info">
                          <span className="name">{item.student}</span>
                          {isOrganization && item.programme && (
                            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{item.programme}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{item.parent}</td>
                    <td>
                      <a href={`mailto:${item.email}`} style={{ color: '#0052cc', textDecoration: 'none' }}>
                        {item.email}
                      </a>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        (item.status === 'admitted' || item.status === 'shortlisted') ? 'status-success' : 
                        item.status === 'rejected' ? 'status-failed' : 'status-pending'
                      }`}>
                        {(item.status === 'admitted') ? 'Admitted'
                         : item.status === 'shortlisted' ? 'Shortlisted'
                         : item.status === 'rejected' ? 'Rejected' : 'Under Review'}
                      </span>
                    </td>
                    <td>{item.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-action" title="View Details" onClick={() => navigate('/applicant-profile')}>
                          <LucideIcon name="eye" style={{ width: '14px', height: '14px' }} />
                        </button>
                        <button className="btn-action" title="Download" onClick={() => alert(`Downloading application PDF for ${item.student}...`)}>
                          <LucideIcon name="download" style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-info">Showing {filtered.length} of {initialApplications.length} entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled>
              <LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} />
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">
              <LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
