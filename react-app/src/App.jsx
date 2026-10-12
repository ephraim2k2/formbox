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
import ExamSlip from './pages/ExamSlip';
import Settings from './pages/Settings';
import Announcements from './pages/Announcements';
import ApplicantProfile from './pages/ApplicantProfile';
import Result from './pages/Result';
import ViewForm from './pages/ViewForm';
import CandidateDashboard from './pages/CandidateDashboard';
import Login from './pages/Login';
import './index.css';

function App() {
  return (
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
          <Route path="requery" element={<Requery />} />
          <Route path="exam-slip" element={<ExamSlip />} />
          <Route path="settings" element={<Settings />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="applicant-profile" element={<ApplicantProfile />} />
          <Route path="result" element={<Result />} />
          <Route path="view-form" element={<ViewForm />} />
        </Route>
        {/* Candidate Dashboard (Standalone portal with dedicated nav) */}
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/portal" element={<CandidateDashboard />} />
        {/* Legacy paths */}
        <Route path="*" element={<HtmlPage />} />
      </Routes>
    </Router>
  );
}

export default App;
