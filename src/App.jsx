import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { HomePage } from './pages/HomePage';
import TargetCursor from './components/ui/TargetCursor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TargetCursor 
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#06b6d4"
          cursorColorOnTarget="#38bdf8"
        />
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          closeButton
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(51, 65, 85, 0.8)',
              backdropFilter: 'blur(12px)',
              color: '#f8fafc',
              borderRadius: '1rem',
            },
          }}
        />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
