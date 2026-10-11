import React, { useEffect, useState } from 'react';
import LucideIcon from '../components/LucideIcon';
import gsap from 'gsap';

export default function Requery() {
  const [transactions, setTransactions] = useState([
    { id: 1, ref: 'REF-NXT-98842', parentName: 'Mr. Olamide', studentName: 'David Olamide', amount: '₦15,000', status: 'pending', loading: false },
    { id: 2, ref: 'REF-NXT-73921', parentName: 'Mrs. Johnson', studentName: 'Sarah Johnson', amount: '₦15,000', status: 'failed', loading: false },
    { id: 3, ref: 'REF-NXT-55410', parentName: 'Dr. Uchenna', studentName: 'Emeka Uchenna', amount: '₦15,000', status: 'pending', loading: false },
  ]);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.filter-bar', { y: 20, opacity: 0 });
    gsap.set('.table-wrapper', { y: 30, opacity: 0 });

    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.filter-bar', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.table-wrapper', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
  }, []);

  useEffect(() => {
    
  }, [transactions, toast]);

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
        showToast(`Payment ${ref} successfully verified!`);
      } else {
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'failed', loading: false } : t));
        showToast(`Payment ${ref} still failed.`, true);
      }
    }, 1500);
  };

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Requery Payments</h1>
            <h2>Check the status of pending or failed transactions</h2>
          </div>
        </div>
      </div>

      <div className="requery-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input type="text" placeholder="Search by Transaction Ref or Email" />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Status Filter:</span>
            <select style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-dark)' }}>
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Parent Name</th>
                <th>Student Name</th>
                <th>Amount</th>
                <th>Gateway Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
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
                        <LucideIcon name="check-circle" style={{ width: '12px', height: '12px' }} /> Successful
                      </span>
                    )}
                  </td>
                  <td>
                    {tx.status === 'success' ? (
                      <span style={{ color: 'var(--text-light)', fontSize: '12px' }}>Verified</span>
                    ) : (
                      <button 
                        className={`btn-requery ${tx.loading ? 'loading' : ''}`} 
                        onClick={() => handleRequery(tx.id, tx.ref)}
                      >
                        {tx.loading ? (
                          <><LucideIcon name="loader-2" className="spin" style={{ width: '14px', height: '14px' }} /> Syncing...</>
                        ) : (
                          <><LucideIcon name="refresh-cw" style={{ width: '14px', height: '14px' }} /> Requery</>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-info">Showing 1 to 10 of 50 entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">5</button>
            <button className="page-btn"><LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} /></button>
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
