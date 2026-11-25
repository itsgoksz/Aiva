/**
 * Namma Universe — Main Application
 * Routes, auth guards, and app shell.
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider, useAuth } from './features/auth/AuthProvider';
import { isAivaSubdomain } from './lib/subdomain';
import NammaUniversePage from './features/universe/NammaUniversePage';
import AivaProductPage from './features/universe/products/AivaProductPage';

const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const LoginPage = lazy(() => import('./features/auth/LoginPage'));
const RegisterPage = lazy(() => import('./features/auth/RegisterPage'));
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const AppointmentsPage = lazy(() => import('./features/appointments/AppointmentsPage'));
const CustomersPage = lazy(() => import('./features/customers/CustomersPage'));
const CallsPage = lazy(() => import('./features/calls/CallsPage'));
const ServicesPage = lazy(() => import('./features/services/ServicesPage'));
const StaffPage = lazy(() => import('./features/staff/StaffPage'));
const AnalyticsPage = lazy(() => import('./features/analytics/AnalyticsPage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));
const AivaMarketingPage = lazy(() => import('./features/marketing/AivaMarketingPage'));
const CasaMotoProductPage = lazy(() => import('./features/universe/products/CasaMotoProductPage'));
const EvCopilotProductPage = lazy(() => import('./features/universe/products/EvCopilotProductPage'));
const WelloraProductPage = lazy(() => import('./features/universe/products/WelloraProductPage'));
const AirportDigitalTwinProductPage = lazy(() => import('./features/universe/products/AirportDigitalTwinProductPage'));
const NammaHoodProductPage = lazy(() => import('./features/universe/products/NammaHoodProductPage'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/app" replace />;

  return <>{children}</>;
}

function AppRoutes() {
  const isAivaHost = isAivaSubdomain();

  if (isAivaHost) {
    return (
      <Routes>
        {/* Aiva Subdomain Routes (aiva.nammauniverse.in) */}
        <Route path="/" element={<AivaProductPage />} />
        <Route path="/products/aiva" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="calls" element={<CallsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="marketing" element={<AivaMarketingPage />} />
        </Route>

        {/* Catch-all on Aiva subdomain redirects to Aiva home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Public routes on Main Universe (nammauniverse.in / www.nammauniverse.in) */}
      <Route path="/" element={<PublicRoute><NammaUniversePage /></PublicRoute>} />
      <Route path="/products/aiva" element={<AivaProductPage />} />
      <Route path="/products/casamoto" element={<CasaMotoProductPage />} />
      <Route path="/products/echo" element={<Navigate to="/products/casamoto" replace />} />
      <Route path="/products/ev-copilot" element={<EvCopilotProductPage />} />
      <Route path="/products/wellora" element={<WelloraProductPage />} />
      <Route path="/products/airport-digital-twin" element={<AirportDigitalTwinProductPage />} />
      <Route path="/products/homie" element={<Navigate to="/products/airport-digital-twin" replace />} />
      <Route path="/products/airport-3d-simulator" element={<Navigate to="/products/airport-digital-twin" replace />} />
      <Route path="/products/namma-hood" element={<NammaHoodProductPage />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Protected routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="calls" element={<CallsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="marketing" element={<AivaMarketingPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div className="min-h-screen bg-[#0A0508]" />}>
          <AppRoutes />
        </Suspense>
        <Analytics />
      </AuthProvider>
    </BrowserRouter>
  );
}
