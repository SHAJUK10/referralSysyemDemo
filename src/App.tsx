import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import LeadManagement from './pages/admin/LeadManagement';
import ReferralApprovals from './pages/admin/ReferralApprovals';

// Referrer Pages
import ReferrerDashboard from './pages/referrer/ReferrerDashboard';
import AddReferral from './pages/referrer/AddReferral';
import MyReferrals from './pages/referrer/MyReferrals';

// Referee Pages
import RefereeDashboard from './pages/referee/RefereeDashboard';
import ScheduleVisit from './pages/referee/ScheduleVisit';
import PublicReferralForm from './pages/PublicReferralForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/refer/:referrerId" element={<PublicReferralForm />} />

          {/* Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="referrals" element={<ReferralApprovals />} />
            <Route path="rewards" element={<div className="p-6"><h1 className="text-2xl font-bold">Rewards Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">Notifications</h1><p className="text-gray-600">Coming soon...</p></div>} />
          </Route>

          <Route path="/referrer" element={
            <ProtectedRoute allowedRoles={['referrer']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<ReferrerDashboard />} />
          </Route>

          <Route path="/referee" element={
            <ProtectedRoute allowedRoles={['referee']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<RefereeDashboard />} />
            <Route path="status" element={<div className="p-6"><h1 className="text-2xl font-bold">My Status</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="schedule" element={<ScheduleVisit />} />
            <Route path="callback" element={<div className="p-6"><h1 className="text-2xl font-bold">Request Callback</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="messages" element={<div className="p-6"><h1 className="text-2xl font-bold">Messages</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="profile" element={<div className="p-6"><h1 className="text-2xl font-bold">Profile</h1><p className="text-gray-600">Coming soon...</p></div>} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;