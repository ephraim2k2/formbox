import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from '../components/LucideIcon';
import { useWorkspace } from '../context/WorkspaceContext';
import gsap from 'gsap';

const SCHOOL_PAYMENTS = [
  { id: 1, ref: 'REF-NXT-10482', payer: 'Mr. Adebayo', student: 'Tolu Adebayo', form: 'Admission Form 2026', amount: 15000, channel: 'Card', date: '2026-10-13 09:42', status: 'success' },
  { id: 2, ref: 'REF-NXT-98842', payer: 'Mr. Olamide', student: 'David Olamide', form: 'Admission Form 2026', amount: 15000, channel: 'Bank Transfer', date: '2026-10-13 08:15', status: 'pending' },
  { id: 3, ref: 'REF-NXT-73921', payer: 'Mrs. Johnson', student: 'Sarah Johnson', form: 'Admission Form 2026', amount: 15000, channel: 'Card', date: '2026-10-12 17:03', status: 'failed' },
  { id: 4, ref: 'REF-NXT-66210', payer: 'Mrs. Okafor', student: 'Chidera Okafor', form: 'Transfer Application', amount: 20000, channel: 'USSD', date: '2026-10-12 14:27', status: 'success' },
  { id: 5, ref: 'REF-NXT-55410', payer: 'Dr. Uchenna', student: 'Emeka Uchenna', form: 'Admission Form 2026', amount: 15000, channel: 'Bank Transfer', date: '2026-10-12 11:50', status: 'pending' },
  { id: 6, ref: 'REF-NXT-48127', payer: 'Mr. Bello', student: 'Aisha Bello', form: 'Hostel Accommodation', amount: 45000, channel: 'Card', date: '2026-10-11 16:38', status: 'success' },
  { id: 7, ref: 'REF-NXT-39904', payer: 'Mrs. Eze', student: 'Kosi Eze', form: 'Scholarship Application', amount: 5000, channel: 'Card', date: '2026-10-11 10:12', status: 'success' },
  { id: 8, ref: 'REF-NXT-31766', payer: 'Mr. Nwosu', student: 'Favour Nwosu', form: 'Hostel Accommodation', amount: 45000, channel: 'Bank Transfer', date: '2026-10-10 15:21', status: 'failed' },
  { id: 9, ref: 'REF-NXT-27580', payer: 'Mrs. Ojo', student: 'Tunde Ojo', form: 'Admission Form 2026', amount: 15000, channel: 'USSD', date: '2026-10-10 09:05', status: 'success' },
  { id: 10, ref: 'REF-NXT-20319', payer: 'Mr. Ibrahim', student: 'Musa Ibrahim', form: 'Transfer Application', amount: 20000, channel: 'Card', date: '2026-10-09 13:44', status: 'success' },
];

const ORG_PAYMENTS = [
  { id: 1, ref: 'REF-ORG-90412', payer: 'HR Director', student: 'Amaka Obi', form: 'Graduate Trainee 2026', amount: 15000, channel: 'Card', date: '2026-10-13 09:42', status: 'success' },
  { id: 2, ref: 'REF-ORG-88410', payer: 'Finance Lead', student: 'James Haruna', form: 'Experienced Hire – Finance', amount: 25000, channel: 'Bank Transfer', date: '2026-10-13 08:15', status: 'pending' },
  { id: 3, ref: 'REF-ORG-73192', payer: 'Operations Mgr', student: 'Chidinma Eze', form: 'Tech Fellowship Cohort 4', amount: 15000, channel: 'Card', date: '2026-10-12 17:03', status: 'failed' },
  { id: 4, ref: 'REF-ORG-66290', payer: 'Procurement Head', student: 'Dangote Agro Ltd', form: 'Vendor Onboarding', amount: 50000, channel: 'Bank Transfer', date: '2026-10-12 14:27', status: 'success' },
  { id: 5, ref: 'REF-ORG-55104', payer: 'Talent Acquisition', student: 'Tunde Bakare', form: 'Community Grant Programme', amount: 10000, channel: 'Card', date: '2026-10-12 11:50', status: 'pending' },
  { id: 6, ref: 'REF-ORG-48911', payer: 'Executive Sponsor', student: 'Ngozi Adeyemi', form: 'Summer Internship 2026', amount: 15000, channel: 'USSD', date: '2026-10-11 16:38', status: 'success' },
  { id: 7, ref: 'REF-ORG-39120', payer: 'People Ops', student: 'Emeka Okafor', form: 'Executive Leadership Track', amount: 45000, channel: 'Card', date: '2026-10-11 10:12', status: 'success' },
  { id: 8, ref: 'REF-ORG-31002', payer: 'CSR Committee', student: 'Aisha Musa', form: 'Community Grant Programme', amount: 10000, channel: 'Bank Transfer', date: '2026-10-10 15:21', status: 'failed' },
  { id: 9, ref: 'REF-ORG-27419', payer: 'Legal Dept', student: 'Kemi Adeyemi', form: 'Graduate Trainee 2026', amount: 15000, channel: 'Card', date: '2026-10-10 09:05', status: 'success' },
  { id: 10, ref: 'REF-ORG-20993', payer: 'Contract Admin', student: 'Swift Logistics PLC', form: 'Vendor Onboarding', amount: 50000, channel: 'Bank Transfer', date: '2026-10-09 13:44', status: 'success' },
];

const naira = (n) => `₦${n.toLocaleString()}`;

const STATUS = {
  success: { cls: 'status-success', icon: 'check-circle', label: 'Successful' },
  pending: { cls: 'status-pending', icon: 'clock', label: 'Pending' },
  failed: { cls: 'status-failed', icon: 'x-circle', label: 'Failed' },
};

export default function AllPayments() {
  const navigate = useNavigate();
  const { isOrganization, terms } = useWorkspace();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const paymentsList = isOrganization ? ORG_PAYMENTS : SCHOOL_PAYMENTS;

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set('.header-content', { y: 20, opacity: 0 });
    gsap.set('.payments-stats', { y: 20, opacity: 0 });
    gsap.set('.filter-bar', { y: 20, opacity: 0 });
    gsap.set('.table-wrapper', { y: 30, opacity: 0 });
    tl.to('.header-content', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.payments-stats', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.filter-bar', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.table-wrapper', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
  }, []);

  const stats = useMemo(() => {
    const sum = (s) => paymentsList.filter(p => p.status === s).reduce((a, p) => a + p.amount, 0);
    const count = (s) => paymentsList.filter(p => p.status === s).length;
    return [
      { title: terms.feesLabel, value: naira(sum('success')), sub: `${count('success')} successful`, icon: 'banknote', color: '#10b981', bg: '#ecfdf5' },
      { title: 'Pending', value: naira(sum('pending')), sub: `${count('pending')} awaiting confirmation`, icon: 'clock', color: '#f59e0b', bg: '#fffbeb' },
      { title: 'Failed', value: naira(sum('failed')), sub: `${count('failed')} transactions`, icon: 'x-circle', color: '#ef4444', bg: '#fef2f2' },
      { title: 'Transactions', value: paymentsList.length.toString(), sub: 'All time', icon: 'receipt', color: '#3b82f6', bg: '#eff6ff' },
    ];
  }, [paymentsList, terms.feesLabel]);

  const filtered = paymentsList.filter(p => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [p.ref, p.payer, p.student, p.form].some(v => v.toLowerCase().includes(q));
    return matchesQuery && (status === 'all' || p.status === status);
  });

  return (
    <>
      <div className="header-content">
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>{terms.nav.allPayments}</h1>
            <h2>{isOrganization ? 'Every fee and assessment transaction across your programmes' : 'Every transaction across your school forms'}</h2>
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate('/requery')}>
            <LucideIcon name="refresh-cw" /> {terms.nav.requery}
          </button>
        </div>
      </div>

      <div className="payments-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {stats.map(s => (
          <div key={s.title} className="category-card" style={{ gap: '12px' }}>
            <div className="cat-header">
              <div className="cat-title">{s.title}</div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LucideIcon name={s.icon} style={{ width: '20px', height: '20px', color: s.color }} />
              </div>
            </div>
            <div>
              <div className="cat-amount" style={{ marginTop: 0 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="requery-layout">
        <div className="filter-bar">
          <div className="search-box">
            <LucideIcon name="search" style={{ width: '16px', height: '16px' }} />
            <input
              id="payments-search"
              type="text"
              placeholder={isOrganization ? "Search by ref, contact person, applicant or programme..." : "Search by ref, payer, student or form..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Status Filter:</span>
            <select
              id="payments-status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-dark)' }}
            >
              <option value="all">All Payments</option>
              <option value="success">Successful</option>
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
                <th>{isOrganization ? 'Contact Person / Sponsor' : 'Payer'}</th>
                <th>{isOrganization ? 'Applicant / Organisation' : 'Student'}</th>
                <th>{isOrganization ? 'Programme / Form' : 'Form'}</th>
                <th>Amount</th>
                <th>Channel</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, index) => {
                const st = STATUS[p.status];
                return (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-light)' }}>{index + 1}</td>
                    <td style={{ fontWeight: 500, color: 'var(--text-dark)' }}>{p.payer}</td>
                    <td>
                      <div className="user-meta">
                        <div className="user-avatar-sm">{p.student.split(' ').map(n => n[0]).join('')}</div>
                        <div className="user-info">
                          <span className="name">{p.student}</span>
                          <span className="email">{p.ref}</span>
                        </div>
                      </div>
                    </td>
                    <td>{p.form}</td>
                    <td style={{ fontWeight: 600 }}>{naira(p.amount)}</td>
                    <td>{p.channel}</td>
                    <td style={{ color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{p.date}</td>
                    <td>
                      <span className={`status-badge ${st.cls}`}>
                        <LucideIcon name={st.icon} style={{ width: '12px', height: '12px' }} /> {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-light)' }}>
                    No payments match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-info">Showing {filtered.length} of {paymentsList.length} entries</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><LucideIcon name="chevron-left" style={{ width: '16px', height: '16px' }} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn" disabled><LucideIcon name="chevron-right" style={{ width: '16px', height: '16px' }} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
