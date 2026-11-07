import { Navigate } from 'react-router-dom';

// The report's App.jsx routes /dashboardhome to this view. The documented
// screenshots show the combined dashboard at /dashboard, so keep this route
// compatible by redirecting to the evidenced dashboard screen.
export default function DashboardHome() {
  return <Navigate to="/dashboard" replace />;
}
