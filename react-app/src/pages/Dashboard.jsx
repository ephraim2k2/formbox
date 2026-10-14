import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import SchoolDashboard from './SchoolDashboard';
import OrganizationDashboard from './OrganizationDashboard';

/*
 * Role switch: each workspace type has its own dedicated dashboard.
 * School       -> SchoolDashboard       (admissions overview)
 * Organization -> OrganizationDashboard (applicant pipeline & review)
 */
export default function Dashboard() {
  const { isOrganization } = useWorkspace();
  return isOrganization ? <OrganizationDashboard /> : <SchoolDashboard />;
}
