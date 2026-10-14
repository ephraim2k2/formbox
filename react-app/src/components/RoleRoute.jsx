import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWorkspace } from '../context/WorkspaceContext';

/*
 * Restricts a route to one workspace role. Anyone else is sent to the dashboard,
 * so a school user can't open organization-only pages (and vice versa).
 */
export default function RoleRoute({ role, children }) {
  const { workspaceType } = useWorkspace();
  return workspaceType === role ? children : <Navigate to="/" replace />;
}
