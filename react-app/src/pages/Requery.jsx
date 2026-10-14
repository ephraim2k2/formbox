import React, { useEffect, useState } from 'react';
import LucideIcon from '../components/LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

const SCHOOL_TRANSACTIONS = [
  { id: 1, ref: 'REF-NXT-98842', parentName: 'Mr. Olamide', studentName: 'David Olamide', formName: '2026 Academic Session Admission', amount: '₦15,000', status: 'pending', loading: false },
  { id: 2, ref: 'REF-NXT-73921', parentName: 'Mrs. Johnson', studentName: 'Sarah Johnson', formName: '2026 Academic Session Admission', amount: '₦15,000', status: 'failed', loading: false },
  { id: 3, ref: 'REF-NXT-55410', parentName: 'Dr. Uchenna', studentName: 'Emeka Uchenna', formName: 'Undergraduate Transfer Form', amount: '₦20,000', status: 'pending', loading: false },
  { id: 4, ref: 'REF-NXT-31766', parentName: 'Mr. Nwosu', studentName: 'Favour Nwosu', formName: 'Hostel Accommodation Request', amount: '₦45,000', status: 'failed', loading: false },
];

const ORG_TRANSACTIONS = [
  { id: 1, ref: 'REF-ORG-88410', parentName: 'Finance Lead', studentName: 'James Haruna', formName: 'Experienced Hire – Finance', amount: '₦25,000', status: 'pending', loading: false },
  { id: 2, ref: 'REF-ORG-73192', parentName: 'Operations Mgr', studentName: 'Chidinma Eze', formName: 'Tech Fellowship Cohort 4', amount: '₦15,000', status: 'failed', loading: false },
  { id: 3, ref: 'REF-ORG-55104', parentName: 'Talent Acquisition', studentName: 'Tunde Bakare', formName: 'Community Grant Programme', amount: '₦10,000', status: 'pending', loading: false },
  { id: 4, ref: 'REF-ORG-31002', parentName: 'CSR Committee', studentName: 'Aisha Musa', formName: 'Community Grant Programme', amount: '₦10,000', status: 'failed', loading: false },
];

export default function Requery() {
  const { isOrganization, terms } = useWorkspace();
  const [transactions, setTransactions] = useState(() => isOrganization ? ORG_TRANSACTIONS : SCHOOL_TRANSACTIONS);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setTransactions(isOrganization ? ORG_TRANSACTIONS : SCHOOL_TRANSACTIONS);
  }, [isOrganization]);

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.filter-bar', { y: 20, opacity: 0 });
    gsap.set('.table-wrapper', { y: 30, opacity: 0 });

    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.filter-bar', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.table-wrapper', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
  }, []);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRequery = (id, ref) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, loading: true } : t));

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'success', loading: false } : t));
        showToast(`Payment ${ref} successfully verified via payment gateway!`);
      } else {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'failed', loading: false } : t));
        showToast(`Payment ${ref} still awaiting confirmation or failed.`, true);
      }
    }, 1200);
  };

  const filtered = transactions.filter(t => {
    const q = search.toLowerCase();
    const matchesSearch = !q || 
      t.ref.toLowerCase().includes(q) || 
      t.studentName.toLowerCase().includes(q) || 
      t.parentName.toLowerCase().includes(q) ||
      t.formName.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>{terms.nav.requery}</h1>
            <h2>{terms.nav.requerySub}</h2>
          </div>
        </div>
      </div>

      <div className="requery-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input 
              type="text" 
              placeholder={isOrganization ? "Search by Transaction Ref, Contact, or Applicant..." : "Search by Transaction Ref, Parent, or Student..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Status Filter:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-dark)' }}
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="success">Verified</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>{isOrganization ? 'Contact Person / Sponsor' : 'Parent Name'}</th>
                <th>{isOrganization ? 'Applicant / Organisation' : 'Student Name'}</th>
                <th>{isOrganization ? 'Programme / Form' : 'Form'}</th>
                <th>Amount</th>
                <th>Gateway Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, index) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 500, color: 'var(--text-light)' }}>{index + 1}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-dark)' }}>{tx.parentName}</td>
                  <td>
                    <div className="user-meta">
                      <div className="user-avatar-sm">
                        {tx.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="user-info">
                        <span className="name">{tx.studentName}</span>
                        <span className="email">{tx.ref}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-dark)' }}>{tx.formName}</td>
                  <td style={{ fontWeight: 600 }}>{tx.amount}</td>
                  <td>
                    {tx.status === 'pending' && (
                      <span className="status-badge status-pending">
                        <LucideIcon name="clock" style={{ width: '12px', height: '12px' }} /> Pending
                      </span>
                    )}
                    {tx.status === 'failed' && (
                      <span className="status-badge status-failed">
                        <LucideIcon name="x-circle" style={{ width: '12px', height: '12px' }} /> Failed
                      </span>
                    )}
                    {tx.status === 'success' && (
                      <span className="status-badge status-success">
                        <LucideIcon name="check-circle" style={{ width: '12px', height: '12px' }} /> Verified
                      </span>
                    )}
                  </td>
                  <td>
                    {tx.status === 'success' ? (
                      <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 600 }}>Confirmed</span>
                    ) : (
                      <button 
                        className={`btn-requery ${tx.loading ? 'loading' : ''}`} 
                        onClick={() => handleRequery(tx.id, tx.ref)}
                      >
                        {tx.loading ? (
                          <><LucideIcon name="loader-2" className="spin" style={{ width: '14px', height: '14px' }} /> Verifying...</>
                        ) : (
                          <><LucideIcon name="refresh-cw" style={{ width: '14px', height: '14px' }} /> {isOrganization ? 'Verify' : 'Requery'}</>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-light)' }}>
                    No transactions match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-info">Showing {filtered.length} of {transactions.length} entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn" disabled><LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} /></button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast-container">
          <div className="toast" style={{ background: toast.isError ? '#ef4444' : '#10b981' }}>
            <LucideIcon name={toast.isError ? "alert-circle" : "check-circle"} style={{ width: '18px', height: '18px' }} />
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
}
