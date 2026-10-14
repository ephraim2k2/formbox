import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HtmlPage from './components/HtmlPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import Templates from './pages/Templates';
import CompletedApplications from './pages/CompletedApplications';
import IncompleteApplications from './pages/IncompleteApplications';
import Requery from './pages/Requery';
import AllPayments from './pages/AllPayments';
import ExamSlip from './pages/ExamSlip';
import Settings from './pages/Settings';
import Announcements from './pages/Announcements';
import ApplicantProfile from './pages/ApplicantProfile';
import Result from './pages/Result';
import ViewForm from './pages/ViewForm';
import CandidateDashboard from './pages/CandidateDashboard';
import Login from './pages/Login';
import OrganizationAssessments from './pages/OrganizationAssessments';
import OrganizationOutcomes from './pages/OrganizationOutcomes';
import Pricing from './pages/Pricing';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import './index.css';

/*
 * Dynamic route switchers that ensure both /exam-slip, /assessments,
 * /result, and /outcomes render the exact matching role content.
 */
function SlipRoute() {
  const { isOrganization } = useWorkspace();
  return isOrganization ? <OrganizationAssessments /> : <ExamSlip />;
}

function ResultRoute() {
  const { isOrganization } = useWorkspace();
  return isOrganization ? <OrganizationOutcomes /> : <Result />;
}

function App() {
  return (
    <WorkspaceProvider>
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="forms" element={<Forms />} />
          <Route path="templates" element={<Templates />} />
          <Route path="completed" element={<CompletedApplications />} />
          <Route path="abandoned" element={<IncompleteApplications />} />
          <Route path="payments" element={<AllPayments />} />
          <Route path="requery" element={<Requery />} />
          
          {/* Role-responsive slip/assessment & result/outcome pages */}
          <Route path="exam-slip" element={<SlipRoute />} />
          <Route path="assessments" element={<SlipRoute />} />
          <Route path="result" element={<ResultRoute />} />
          <Route path="outcomes" element={<ResultRoute />} />

          <Route path="announcements" element={<Announcements />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="applicant-profile" element={<ApplicantProfile />} />
          <Route path="view-form" element={<ViewForm />} />
        </Route>
        {/* Candidate Portal */}
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/portal" element={<CandidateDashboard />} />
        {/* Legacy paths */}
        <Route path="*" element={<HtmlPage />} />
      </Routes>
    </Router>
    </WorkspaceProvider>
  );
}

export default App;
