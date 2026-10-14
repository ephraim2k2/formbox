import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/*
 * Workspace type drives terminology, entities, and content across all inside pages.
 * 'school'        -> admissions, students, parents, exam slips, academic sessions
 * 'organization'  -> recruitment/programmes, applicants, assessment invites, outcome notices
 */

export const DEFAULT_PAYOUT_SETTINGS = {
  school: {
    bankName: 'Zenith Bank Plc',
    accountNumber: '1014892019',
    accountName: 'Roseville Secondary School - Admissions Revenue',
    gateway: 'Pixpay Subaccount (Split 100%)',
    settlementSchedule: 'Instant Settlement',
    notificationEmail: 'bursary@roseville.edu.ng',
    autoReconcile: true,
    subaccounts: [
      {
        id: 'sub-1',
        title: 'Entrance Examination Processing Subaccount',
        bankName: 'Access Bank Plc',
        accountNumber: '0039281745',
        accountName: 'Roseville Secondary School - Exam Board',
        gateway: 'Pixpay Subaccount (Direct Split)',
        settlementSchedule: 'Daily Sweep (11:59 PM)',
        splitPercentage: 30
      },
      {
        id: 'sub-2',
        title: 'Scholarship & Welfare Endowment Account',
        bankName: 'First Bank of Nigeria',
        accountNumber: '3029182741',
        accountName: 'Roseville Education Endowment Fund',
        gateway: 'Interswitch WebPAY',
        settlementSchedule: 'Weekly Settlement',
        splitPercentage: 15
      }
    ]
  },
  organization: {
    bankName: 'Access Bank Plc',
    accountNumber: '0123984561',
    accountName: 'Access Bank Plc - Talent Scheme Operations',
    gateway: 'Pixpay Subaccount (Split 100%)',
    settlementSchedule: 'Instant Settlement',
    notificationEmail: 'finance.talent@accessbank.com',
    autoReconcile: true,
    subaccounts: [
      {
        id: 'sub-1',
        title: 'Graduate Scheme Payout Subaccount',
        bankName: 'Zenith Bank Plc',
        accountNumber: '1012384759',
        accountName: 'Access Careers - Recruitment Fund',
        gateway: 'Remita Corporate Collection',
        settlementSchedule: 'Daily Sweep (11:59 PM)',
        splitPercentage: 50
      },
      {
        id: 'sub-2',
        title: 'Grants & Fellowship Dedicated Escrow',
        bankName: 'First Bank of Nigeria',
        accountNumber: '2039485712',
        accountName: 'Access Community Innovation Grants',
        gateway: 'Flutterwave Dedicated Subaccount',
        settlementSchedule: 'Weekly Settlement',
        splitPercentage: 20
      }
    ]
  }
};

export const PRICING_PLANS = {
  school: [
    {
      id: 'school-starter',
      tier: 'starter',
      name: 'Academy Starter',
      badge: 'Starter',
      tagline: 'Ideal for small preparatory academies and primary institutions',
      popular: false,
      monthlyPrice: 35000,
      annualPrice: 336000, // ₦28,000/mo billed annually
      annualSavings: 'Save ₦84,000/yr',
      limits: {
        forms: '3 Active Forms',
        submissions: '500 Applicants / mo',
        subaccounts: '1 Pixpay Settlement Route',
        staffSeats: '2 Admin Seats',
        storage: '5 GB Secure Storage'
      },
      features: [
        '3 Multi-step Student Admission Forms',
        'Pixpay Direct Settlement Route',
        'Standard Exam Slip Generation (PDF/Print)',
        'Basic Candidate Profile Review',
        'CSV Applicant Export',
        'Automated Email Confirmation Receipts',
        'Standard Support (48-hour SLA)'
      ],
      notIncluded: [
        'Automated CBT Hall & Seat Allocation',
        'Pixpay Direct Split Subaccounts',
        'SMS & WhatsApp Direct Candidate Broadcasts',
        'Whitelabel Branding & Custom Domain'
      ],
      ctaText: 'Switch to Starter'
    },
    {
      id: 'school-pro',
      tier: 'pro',
      name: 'Pro Campus',
      badge: 'Most Popular',
      tagline: 'For fast-growing secondary schools, colleges & polytechnics',
      popular: true,
      monthlyPrice: 75000,
      annualPrice: 720000, // ₦60,000/mo billed annually
      annualSavings: 'Save ₦180,000/yr',
      limits: {
        forms: '15 Active Forms',
        submissions: '5,000 Applicants / mo',
        subaccounts: '3 Pixpay Split Routes',
        staffSeats: '10 Admin & Staff Seats',
        storage: '50 GB Secure Storage'
      },
      features: [
        'All Starter features included',
        '15 Active Multi-stage Stepper Forms',
        'Pixpay Direct Split Subaccounts (100% or Custom %)',
        'Automated CBT Examination Hall & Seat Allocation',
        'SMS & WhatsApp Direct Candidate Messaging',
        'Bulk CSV Exam Score Upload & Auto-Decision',
        'Admission Letter PDF Customizer with Official Seal',
        'Candidate Re-query & Automated Bank Webhooks',
        'Priority 24/7 School Support & Onboarding'
      ],
      notIncluded: [
        'Whitelabel Branding & Custom Domain',
        'TSA Remita Central Sweeps'
      ],
      ctaText: 'Upgrade to Pro Campus'
    },
    {
      id: 'school-enterprise',
      tier: 'enterprise',
      name: 'University Board',
      badge: 'Enterprise',
      tagline: 'For university boards, multi-campus groups & state admissions',
      popular: false,
      monthlyPrice: 180000,
      annualPrice: 1728000, // ₦144,000/mo billed annually
      annualSavings: 'Save ₦432,000/yr',
      limits: {
        forms: 'Unlimited Forms',
        submissions: 'Unlimited Applicants',
        subaccounts: 'Unlimited Pixpay + TSA Split',
        staffSeats: 'Unlimited Admin Accounts',
        storage: '500 GB Cloud Storage'
      },
      features: [
        'All Pro Campus features included',
        'Unlimited Forms & High-Volume Concurrent Applicants',
        'Custom Domain & Whitelabel School Branding',
        'Biometric & Web-CBT Proctoring Integration',
        'TSA Remita + Multi-Bank Pixpay Treasury Sweeps',
        'Candidate Re-sit & Supplementary Batch Rules',
        'Custom Role-Based Access Control (RBAC)',
        'Dedicated Bursary Account Manager & 99.95% SLA'
      ],
      notIncluded: [],
      ctaText: 'Upgrade to University Board'
    }
  ],
  organization: [
    {
      id: 'org-starter',
      tier: 'starter',
      name: 'Talent Essentials',
      badge: 'Starter',
      tagline: 'For fast-moving startups and boutique recruitment teams',
      popular: false,
      monthlyPrice: 50000,
      annualPrice: 480000, // ₦40,000/mo billed annually
      annualSavings: 'Save ₦120,000/yr',
      limits: {
        forms: '3 Recruitment Forms',
        submissions: '1,000 Candidates / mo',
        subaccounts: '1 Pixpay Settlement Route',
        staffSeats: '3 Recruiter Seats',
        storage: '10 GB Resume Storage'
      },
      features: [
        '3 Multi-step Talent Application Forms',
        'Pixpay Gateway Application Processing',
        'Basic Resume & Portfolio Attachment Storage',
        'Candidate Interview Slip Generation',
        'CSV Applicant Export & Scorecards',
        'Standard Email Notifications'
      ],
      notIncluded: [
        'Corporate Assessment Centre Seat Allocation',
        'Multi-tier Pixpay Split Routes',
        'Automated Regret / Offer SMS Broadcasts',
        'Enterprise SSO / Okta Integration'
      ],
      ctaText: 'Switch to Essentials'
    },
    {
      id: 'org-pro',
      tier: 'pro',
      name: 'Enterprise Corporate',
      badge: 'Most Popular',
      tagline: 'For banks, corporate enterprises & national graduate schemes',
      popular: true,
      monthlyPrice: 120000,
      annualPrice: 1152000, // ₦96,000/mo billed annually
      annualSavings: 'Save ₦288,000/yr',
      limits: {
        forms: '25 Active Assessment Drives',
        submissions: '15,000 Candidates / mo',
        subaccounts: '5 Pixpay Subaccount Routes',
        staffSeats: '20 Reviewer & HR Seats',
        storage: '100 GB Document Storage'
      },
      features: [
        'All Talent Essentials features included',
        '25 Concurrent Assessment & Fellowship Drives',
        'Multi-Tier Pixpay Revenue & Stipend Split Routes',
        'Corporate Assessment Centre Seat & Hall Allocation',
        'Automated Interview Slips & QR Attendance Verification',
        'Bulk Candidate Offer / Regret Messaging (Email & SMS)',
        'Custom Screening Criteria & Auto-Disqualification',
        'Priority Enterprise Support & SLA'
      ],
      notIncluded: [
        'Enterprise Single Sign-On (SSO / SAML / Okta)',
        'Custom Webhooks & HRIS Workday Sync'
      ],
      ctaText: 'Upgrade to Enterprise Corporate'
    },
    {
      id: 'org-enterprise',
      tier: 'enterprise',
      name: 'Institutional Global',
      badge: 'Enterprise',
      tagline: 'For multi-subsidiary conglomerates & global talent networks',
      popular: false,
      monthlyPrice: 290000,
      annualPrice: 2784000, // ₦232,000/mo billed annually
      annualSavings: 'Save ₦696,000/yr',
      limits: {
        forms: 'Unlimited Recruitment Programs',
        submissions: 'Unlimited Candidates',
        subaccounts: 'Unlimited Pixpay Subaccounts',
        staffSeats: 'Unlimited Enterprise Seats',
        storage: '1 TB Secure Cloud Storage'
      },
      features: [
        'All Enterprise Corporate features included',
        'Unlimited Programs & Global Applicant Pipelines',
        'Enterprise Single Sign-On (SSO / SAML / Okta)',
        'Automated REST Webhooks & HRIS Integration (Workday, BambooHR)',
        'Multi-Entity Treasury Settlement & Escrow Routes',
        'Custom Whitelabel Branded Candidate Experience',
        'SOC2 & NDPR Data Compliance Guarantee',
        'Dedicated Account Executive & 24/7 Mission-Critical SLA'
      ],
      notIncluded: [],
      ctaText: 'Upgrade to Institutional Global'
    }
  ]
};

export const DEFAULT_SUBSCRIPTIONS = {
  school: {
    planId: 'school-pro',
    billingCycle: 'annual',
    startDate: '2026-01-15',
    renewalDate: '2027-01-15',
    status: 'active',
    lastPaymentAmount: 720000,
    paymentGateway: 'Pixpay Direct Settlement'
  },
  organization: {
    planId: 'org-pro',
    billingCycle: 'annual',
    startDate: '2026-02-01',
    renewalDate: '2027-02-01',
    status: 'active',
    lastPaymentAmount: 1152000,
    paymentGateway: 'Pixpay Direct Settlement'
  }
};

export const DEFAULT_INVOICES = {
  school: [
    {
      id: 'INV-2026-0891',
      date: 'Jan 15, 2026',
      planName: 'Pro Campus (Annual)',
      amount: 720000,
      gateway: 'Pixpay Direct Settlement',
      status: 'Paid',
      receiptUrl: '#'
    },
    {
      id: 'INV-2025-0412',
      date: 'Jan 15, 2025',
      planName: 'Academy Starter (Annual)',
      amount: 336000,
      gateway: 'Pixpay Direct Settlement',
      status: 'Paid',
      receiptUrl: '#'
    }
  ],
  organization: [
    {
      id: 'INV-2026-1102',
      date: 'Feb 01, 2026',
      planName: 'Enterprise Corporate (Annual)',
      amount: 1152000,
      gateway: 'Pixpay Direct Settlement',
      status: 'Paid',
      receiptUrl: '#'
    },
    {
      id: 'INV-2025-0677',
      date: 'Feb 01, 2025',
      planName: 'Talent Essentials (Annual)',
      amount: 480000,
      gateway: 'Pixpay Direct Settlement',
      status: 'Paid',
      receiptUrl: '#'
    }
  ]
};

export const DEFAULT_USAGE_STATS = {
  school: {
    activeForms: 4,
    formsLimit: 15,
    submissionsMonth: 2140,
    submissionsLimit: 5000,
    subaccountsUsed: 2,
    subaccountsLimit: 3
  },
  organization: {
    activeForms: 7,
    formsLimit: 25,
    submissionsMonth: 6320,
    submissionsLimit: 15000,
    subaccountsUsed: 3,
    subaccountsLimit: 5
  }
};

export const WORKSPACE_TERMS = {
  school: {
    workspaceLabel: 'School',
    entityPlaceholder: '-- Select School --',
    defaultEntity: 'Roseville Secondary School, Enugu',
    emailLabel: 'School Email',
    emailPlaceholder: 'admin@yourschool.edu.ng',
    adminProfile: {
      name: 'Roseville Admissions Office',
      email: 'admin@roseville.edu.ng',
      role: 'School Administrator',
      initials: 'RS',
    },
    applicantsLabel: 'Applicants',
    payerLabel: 'Parent / Sponsor',
    contactLabel: 'Parent',
    contactEmailLabel: 'Parent Email',
    contactPhoneLabel: 'Parent Phone',
    applications: 'Applications',
    completedApplications: 'Completed Applications',
    completedSubtitle: 'Review candidates who have successfully submitted their forms',
    incompleteApplications: 'Incomplete Applications',
    incompleteSubtitle: 'Track forms saved as drafts, identify drop-off stages, and send completion reminders',
    examSlips: 'Exam Slips',
    examSlipsSubtitle: 'Generate & print candidate exam slips with allocated venues',
    results: 'Results & Messaging',
    resultsSubtitle: 'Manage results and communicate with candidates',
    approvedLabel: 'Admitted',
    approvedKey: 'admitted',
    declinedLabel: 'Not Admitted',
    inviteLabel: 'Generate Slip',
    inviteAllLabel: 'Generate All',
    slipLabel: 'Exam Slip',
    slipStatusLabel: 'Slip Status',
    venueLabel: 'Venue & Time',
    venuesTitle: 'Examination Venues',
    venuesSubtitle: 'Manage testing locations, halls, and seating capacities',
    settingsExamTitle: 'Examination Setup',
    settingsExamSubtitle: 'Configure parameters, CBT guidelines, and scoring criteria',
    uploadCardTitle: 'Upload Results',
    uploadCardSubtitle: 'Upload candidate scores or admission status (CSV/Excel)',
    processBtn: 'Process Results & Send Auto-Messages',
    positiveTemplateTitle: 'Admitted Candidates',
    negativeTemplateTitle: 'Not Admitted Candidates',
    positiveMessage: `Congratulations {{name}},

We are pleased to inform you that you have been offered admission for the upcoming academic session. Please log in to your dashboard to view your admission letter and next steps.`,
    negativeMessage: `Dear {{name}},

Thank you for your application. We regret to inform you that we are unable to offer you admission for the upcoming academic session. We wish you the very best in your future endeavors.`,
    dashboardSubtitle: 'Admissions overview and form analytics',
    nav: {
      group: 'Applications',
      completed: 'Completed Applications',
      completedSub: 'Successfully submitted forms',
      incomplete: 'Incomplete Applications',
      incompleteSub: 'Users who dropped off',
      slipPath: '/exam-slip',
      slipTitle: 'Exam Slips',
      slipSub: 'Generate & print candidate exam slips with allocated venues',
      resultPath: '/result',
      resultTitle: 'Results & Messaging',
      resultSub: 'Manage results and communicate with candidates',
      payments: 'Payments',
      allPayments: 'All Payments',
      allPaymentsSub: 'View every transaction',
      requery: 'Requery Payment',
      requerySub: 'Verify payment status',
      announcements: 'Announcements',
    },
    feesLabel: 'Fees Collected',
    pendingLabel: 'Pending Applications',
    receivedLabel: 'Received Applications',
    formsSubtitle: 'Manage school application forms & entrance registrations',
    searchPlaceholder: 'Search by student, parent, or email...',
    incompleteStagePlaceholder: 'Search by student, parent, email, or stage...',
    slipSearchPlaceholder: 'Search by student name, ID or examination venue...',
    announcementAudience: [
      { value: 'all', label: 'All Applicants' },
      { value: 'admitted', label: 'Admitted Candidates' },
      { value: 'pending', label: 'Pending Reviews' },
      { value: 'rejected', label: 'Rejected Candidates' },
    ],
    chartForms: ['Admission', 'Transfer', 'Hostel', 'Scholarship', 'JSS1', 'SSS1', 'Boarding'],
    recentSubmissions: [
      { initials: 'DO', name: 'David Olamide', form: '2026 Admission (JSS1)', status: 'Completed', time: '2 mins ago' },
      { initials: 'SA', name: 'Sarah Adekola', form: 'Scholarship Application', status: 'Pending', time: '45 mins ago' },
      { initials: 'ME', name: 'Michael Ezenwa', form: 'Transfer Application', status: 'Completed', time: '2 hours ago' },
      { initials: 'FN', name: 'Favour Nwosu', form: 'Hostel Accommodation', status: 'Rejected', time: '5 hours ago' },
      { initials: 'TO', name: 'Tunde Ojo', form: '2026 Admission (SSS1)', status: 'Pending', time: '1 day ago' },
    ],
    notifications: [
      {
        id: 1,
        title: 'New Application Submitted',
        description: 'David Olamide submitted an application for 2026 Academic Session.',
        time: '2 mins ago',
        type: 'success',
        unread: true
      },
      {
        id: 2,
        title: 'Bank Payment Verified',
        description: 'Payment of ₦25,000 via Pixpay confirmed for Sarah Johnson.',
        time: '24 mins ago',
        type: 'payment',
        unread: true
      },
      {
        id: 3,
        title: 'Exam Hall Capacity Alert',
        description: 'Lagos Tech Hub has reached 90% capacity (225 / 250 seats).',
        time: '2 hours ago',
        type: 'warning',
        unread: true
      },
      {
        id: 4,
        title: 'System Security Update',
        description: 'Two-factor authentication was activated for school admin account.',
        time: '1 day ago',
        type: 'info',
        unread: false
      }
    ]
  },
  organization: {
    workspaceLabel: 'Organization',
    entityPlaceholder: '-- Select Organization --',
    defaultEntity: 'Access Bank Plc',
    emailLabel: 'Work Email',
    emailPlaceholder: 'admin@yourorganization.com',
    adminProfile: {
      name: 'Access Talent & Recruitment',
      email: 'talent@accessbank.com',
      role: 'Organization Administrator',
      initials: 'AB',
    },
    applicantsLabel: 'Applicants',
    payerLabel: 'Contact Person / Sponsor',
    contactLabel: 'Contact Person',
    contactEmailLabel: 'Contact Email',
    contactPhoneLabel: 'Contact Phone',
    applications: 'Applications',
    completedApplications: 'Submitted Applications',
    completedSubtitle: 'Review applicants who have successfully completed and submitted their forms',
    incompleteApplications: 'Incomplete Submissions',
    incompleteSubtitle: 'Track incomplete submissions, identify drop-off points, and send follow-up reminders',
    examSlips: 'Assessment Invitations',
    examSlipsSubtitle: 'Issue and manage assessment invites with venue and schedule details',
    results: 'Assessment Outcomes',
    resultsSubtitle: 'Upload outcome data and notify applicants automatically',
    approvedLabel: 'Approved',
    approvedKey: 'approved',
    declinedLabel: 'Not Approved',
    inviteLabel: 'Issue Invite',
    inviteAllLabel: 'Issue All',
    slipLabel: 'Assessment Invitation',
    slipStatusLabel: 'Invite Status',
    venueLabel: 'Venue & Schedule',
    venuesTitle: 'Assessment Centres & Hubs',
    venuesSubtitle: 'Manage testing locations, assessment hubs, and interview rooms',
    settingsExamTitle: 'Assessment Setup',
    settingsExamSubtitle: 'Configure parameters, evaluation guidelines, and scoring criteria',
    uploadCardTitle: 'Upload Outcome Data',
    uploadCardSubtitle: 'Upload applicant scores or outcome status (CSV/Excel)',
    processBtn: 'Process & Send Notifications',
    positiveTemplateTitle: 'Approved Applicants',
    negativeTemplateTitle: 'Declined Applicants',
    positiveMessage: `Dear {{name}},

We are pleased to inform you that your application has been reviewed and approved. Please log in to your dashboard for next steps and further instructions.`,
    negativeMessage: `Dear {{name}},

Thank you for submitting your application. After careful review, we regret to inform you that your application was not successful at this time. We encourage you to explore future opportunities with us.`,
    dashboardSubtitle: 'Application pipeline overview and submission analytics',
    nav: {
      group: 'Applicants',
      completed: 'Review Queue',
      completedSub: 'Applicants ready for your review',
      incomplete: 'Incomplete Submissions',
      incompleteSub: 'Applicants who stopped midway',
      slipPath: '/assessments',
      slipTitle: 'Assessment Invitations',
      slipSub: 'Issue and manage assessment invites with venue and schedule details',
      resultPath: '/outcomes',
      resultTitle: 'Assessment Outcomes',
      resultSub: 'Upload outcome data and notify applicants automatically',
      payments: 'Fees',
      allPayments: 'All Fees',
      allPaymentsSub: 'View every fee received',
      requery: 'Verify Payment',
      requerySub: 'Verify fee payment status',
      announcements: 'Announcements',
    },
    feesLabel: 'Fees Collected',
    pendingLabel: 'Pending Review',
    receivedLabel: 'Received Applications',
    formsSubtitle: 'Manage and track all corporate recruitment & programme forms',
    searchPlaceholder: 'Search by applicant name, contact, or email...',
    incompleteStagePlaceholder: 'Search by applicant, contact, email, or stage...',
    slipSearchPlaceholder: 'Search by applicant, ID or assessment venue...',
    announcementAudience: [
      { value: 'all', label: 'All Applicants' },
      { value: 'approved', label: 'Approved Applicants' },
      { value: 'pending', label: 'Pending Reviews' },
      { value: 'declined', label: 'Declined Applicants' },
    ],
    chartForms: ['Graduate Trainee', 'Tech Fellowship', 'Exec Leadership', 'Grants', 'Finance Intern', 'HR Associate', 'Supply Chain'],
    recentSubmissions: [
      { initials: 'AO', name: 'Amaka Obi', form: 'Graduate Trainee 2026', status: 'Completed', time: '2 mins ago' },
      { initials: 'JH', name: 'James Haruna', form: 'Experienced Hire – Finance', status: 'Pending', time: '45 mins ago' },
      { initials: 'CE', name: 'Chidinma Eze', form: 'Tech Fellowship Cohort 4', status: 'Completed', time: '2 hours ago' },
      { initials: 'TB', name: 'Tunde Bakare', form: 'Community Grant', status: 'Rejected', time: '5 hours ago' },
      { initials: 'NA', name: 'Ngozi Adeyemi', form: 'Summer Internship', status: 'Pending', time: '1 day ago' },
    ],
    notifications: [
      {
        id: 1,
        title: 'New Application Submitted',
        description: 'Amaka Obi submitted an application for Graduate Trainee Programme 2026.',
        time: '2 mins ago',
        type: 'success',
        unread: true
      },
      {
        id: 2,
        title: 'Assessment Fee Verified',
        description: 'Payment of ₦15,000 via Pixpay confirmed for James Haruna.',
        time: '24 mins ago',
        type: 'payment',
        unread: true
      },
      {
        id: 3,
        title: 'Assessment Hub Alert',
        description: 'Lagos Assessment Centre has reached 85% capacity (170 / 200 candidates).',
        time: '2 hours ago',
        type: 'warning',
        unread: true
      },
      {
        id: 4,
        title: 'System Security Update',
        description: 'Two-factor authentication was activated for organization admin account.',
        time: '1 day ago',
        type: 'info',
        unread: false
      }
    ]
  },
};

const WorkspaceContext = createContext(null);

function sanitizePayoutSettings(data, defaultData) {
  if (!data) return defaultData;
  const str = JSON.stringify(data);
  if (str.includes('Paystack')) {
    try {
      return JSON.parse(str.replace(/Paystack/g, 'Pixpay'));
    } catch {
      return data;
    }
  }
  return data;
}

export function WorkspaceProvider({ children }) {
  // Global theme management
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'enabled';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      try {
        localStorage.setItem('darkMode', next ? 'enabled' : 'disabled');
      } catch (err) {
        console.error('Failed to save theme:', err);
      }
      if (next) {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
      }
      return next;
    });
  }, []);

  const setThemeMode = useCallback((mode) => {
    const next = mode === 'dark';
    setIsDark(next);
    try {
      localStorage.setItem('darkMode', next ? 'enabled' : 'disabled');
    } catch (err) {
      console.error('Failed to save theme:', err);
    }
    if (next) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }, []);

  const [workspaceType, setWorkspaceTypeState] = useState(
    () => localStorage.getItem('workspaceType') === 'organization' ? 'organization' : 'school'
  );
  const [workspaceName, setWorkspaceNameState] = useState(() => localStorage.getItem('workspaceName') || '');

  const [payoutSettings, setPayoutSettingsState] = useState(() => {
    try {
      const currentType = localStorage.getItem('workspaceType') === 'organization' ? 'organization' : 'school';
      const saved = localStorage.getItem(`payoutSettings_${currentType}`);
      if (saved) {
        const cleaned = sanitizePayoutSettings(JSON.parse(saved), DEFAULT_PAYOUT_SETTINGS[currentType]);
        localStorage.setItem(`payoutSettings_${currentType}`, JSON.stringify(cleaned));
        return cleaned;
      }
      return DEFAULT_PAYOUT_SETTINGS[currentType];
    } catch {
      return DEFAULT_PAYOUT_SETTINGS[workspaceType || 'school'];
    }
  });

  // Keep payoutSettings in sync when switching between school and organization
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`payoutSettings_${workspaceType}`);
      if (saved) {
        const cleaned = sanitizePayoutSettings(JSON.parse(saved), DEFAULT_PAYOUT_SETTINGS[workspaceType]);
        localStorage.setItem(`payoutSettings_${workspaceType}`, JSON.stringify(cleaned));
        setPayoutSettingsState(cleaned);
      } else {
        setPayoutSettingsState(DEFAULT_PAYOUT_SETTINGS[workspaceType]);
      }
    } catch {
      setPayoutSettingsState(DEFAULT_PAYOUT_SETTINGS[workspaceType]);
    }
  }, [workspaceType]);

  const updatePayoutSettings = useCallback((updated) => {
    setPayoutSettingsState(prev => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(`payoutSettings_${workspaceType}`, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to persist payout settings:', err);
      }
      return next;
    });
  }, [workspaceType]);

  const [subscription, setSubscriptionState] = useState(() => {
    try {
      const currentType = localStorage.getItem('workspaceType') === 'organization' ? 'organization' : 'school';
      const saved = localStorage.getItem(`subscription_${currentType}`);
      return saved ? JSON.parse(saved) : DEFAULT_SUBSCRIPTIONS[currentType];
    } catch {
      return DEFAULT_SUBSCRIPTIONS[workspaceType || 'school'];
    }
  });

  const [invoices, setInvoicesState] = useState(() => {
    try {
      const currentType = localStorage.getItem('workspaceType') === 'organization' ? 'organization' : 'school';
      const saved = localStorage.getItem(`invoices_${currentType}`);
      return saved ? JSON.parse(saved) : DEFAULT_INVOICES[currentType];
    } catch {
      return DEFAULT_INVOICES[workspaceType || 'school'];
    }
  });

  // Keep subscription & invoices in sync when switching between school and organization
  useEffect(() => {
    try {
      const savedSub = localStorage.getItem(`subscription_${workspaceType}`);
      setSubscriptionState(savedSub ? JSON.parse(savedSub) : DEFAULT_SUBSCRIPTIONS[workspaceType]);
      const savedInv = localStorage.getItem(`invoices_${workspaceType}`);
      setInvoicesState(savedInv ? JSON.parse(savedInv) : DEFAULT_INVOICES[workspaceType]);
    } catch {
      setSubscriptionState(DEFAULT_SUBSCRIPTIONS[workspaceType]);
      setInvoicesState(DEFAULT_INVOICES[workspaceType]);
    }
  }, [workspaceType]);

  const plans = PRICING_PLANS[workspaceType] || [];
  const currentPlan = plans.find(p => p.id === subscription.planId) || plans[1] || plans[0];
  const usageStats = DEFAULT_USAGE_STATS[workspaceType];

  const upgradePlan = useCallback((planId, billingCycle = 'annual', paymentMethod = 'Pixpay Instant Checkout') => {
    const currentPlans = PRICING_PLANS[workspaceType] || [];
    const targetPlan = currentPlans.find(p => p.id === planId);
    if (!targetPlan) return { success: false, error: 'Target plan does not exist' };

    const amount = billingCycle === 'annual' ? targetPlan.annualPrice : targetPlan.monthlyPrice;
    const today = new Date();
    const renewal = new Date(today);
    if (billingCycle === 'annual') {
      renewal.setFullYear(renewal.getFullYear() + 1);
    } else {
      renewal.setMonth(renewal.getMonth() + 1);
    }

    const newSub = {
      planId,
      billingCycle,
      startDate: today.toISOString().split('T')[0],
      renewalDate: renewal.toISOString().split('T')[0],
      status: 'active',
      lastPaymentAmount: amount,
      paymentGateway: paymentMethod
    };

    const newInvoice = {
      id: `INV-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      planName: `${targetPlan.name} (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
      amount,
      gateway: paymentMethod,
      status: 'Paid',
      receiptUrl: '#'
    };

    setSubscriptionState(newSub);
    setInvoicesState(prev => {
      const nextInv = [newInvoice, ...prev];
      try {
        localStorage.setItem(`invoices_${workspaceType}`, JSON.stringify(nextInv));
      } catch (e) {
        console.error('Failed to save invoice', e);
      }
      return nextInv;
    });

    try {
      localStorage.setItem(`subscription_${workspaceType}`, JSON.stringify(newSub));
    } catch (err) {
      console.error('Failed to persist subscription upgrade:', err);
    }

    return { success: true, subscription: newSub, invoice: newInvoice, plan: targetPlan };
  }, [workspaceType]);

  const setWorkspace = useCallback((type, name = '') => {
    localStorage.setItem('workspaceType', type);
    localStorage.setItem('workspaceName', name);
    setWorkspaceTypeState(type);
    setWorkspaceNameState(name);
  }, []);

  const switchWorkspace = useCallback((targetType) => {
    const nextType = targetType || (workspaceType === 'school' ? 'organization' : 'school');
    const defaultName = WORKSPACE_TERMS[nextType].defaultEntity;
    setWorkspace(nextType, defaultName);
  }, [workspaceType, setWorkspace]);

  const requestLogout = useCallback(() => {
    window.dispatchEvent(new CustomEvent('formboxx:open-logout-modal'));
  }, []);

  const activeEntityName = workspaceName || WORKSPACE_TERMS[workspaceType].defaultEntity;

  const value = {
    workspaceType,
    workspaceName: activeEntityName,
    isSchool: workspaceType === 'school',
    isOrganization: workspaceType === 'organization',
    terms: WORKSPACE_TERMS[workspaceType],
    payoutSettings,
    updatePayoutSettings,
    plans,
    currentSubscription: subscription,
    currentPlan,
    usageStats,
    invoices,
    upgradePlan,
    setWorkspace,
    switchWorkspace,
    isDark,
    toggleTheme,
    setThemeMode,
    requestLogout,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside <WorkspaceProvider>');
  return ctx;
}
