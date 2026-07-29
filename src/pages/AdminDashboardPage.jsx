import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { useAuth } from '../context/AuthContext';

export const AdminDashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
        Verifying admin session...
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
};
