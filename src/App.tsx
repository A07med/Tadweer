import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersProvider } from './context/OrdersContext';

// Landing Page Components
import Header from './components/landing/Header';
import Hero from './components/landing/Hero';
import IntegratedHowItWorks from './components/landing/IntegratedHowItWorks';
import Footer from './components/landing/Footer';

// Auth Components
import SignInPage from './components/auth/SignInPage';
import RoleSelection from './components/auth/RoleSelection';

// Dashboard Components
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import DashboardLayout from './components/dashboard/customer/DashboardLayout';

// Customer Dashboard Pages
import ScheduleCollection from './components/dashboard/customer/ScheduleCollection';
import BuyContainers from './components/dashboard/customer/BuyContainers';
import Leaderboard from './components/dashboard/customer/Leaderboard';
import CollectionHistory from './components/dashboard/customer/CollectionHistory';
import Rewards from './components/dashboard/customer/Rewards';
import Settings from './components/dashboard/customer/Settings';

// Company Dashboard Components
import CompanyDashboardLayout from './components/dashboard/company/layout/CompanyDashboardLayout';
import Analytics from './components/dashboard/company/pages/Analytics';
import Deliveries from './components/dashboard/company/pages/Deliveries';
import Orders from './components/dashboard/company/pages/Orders';
import CompanySettings from './components/dashboard/company/pages/Settings';

const App = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const userRole = user.unsafeMetadata.role as string | undefined;
      
      // Don't redirect if already on the correct page
      if (userRole === 'customer' && location.pathname.startsWith('/dashboard')) return;
      if (userRole === 'company' && location.pathname.startsWith('/company')) return;
      if (!userRole && location.pathname === '/role-selection') return;

      // Redirect based on role
      if (userRole === 'customer') {
        navigate('/dashboard');
      } else if (userRole === 'company') {
        navigate('/company/dashboard');
      } else if (!userRole) {
        navigate('/role-selection');
      }
    }
  }, [isLoaded, isSignedIn, user, navigate, location.pathname]);

  // Protected Route component
  const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
    if (!isLoaded) return null;
    
    if (!isSignedIn) {
      return <Navigate to="/sign-in" />;
    }

    const userRole = user?.unsafeMetadata.role as string | undefined;
    
    if (!userRole) {
      return <Navigate to="/role-selection" />;
    }

    if (userRole !== allowedRole) {
      return <Navigate to={userRole === 'customer' ? '/dashboard' : '/company/dashboard'} />;
    }

    return <>{children}</>;
  };

  if (!isLoaded) return null;

  return (
    <OrdersProvider>
    <div className="bg-[#FFFBE6] min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <IntegratedHowItWorks />
            <Footer />
          </>
        } />

        {/* Auth Routes */}
        <Route path="/sign-in" element={
          isSignedIn 
            ? <Navigate to={user?.unsafeMetadata.role 
                ? (user.unsafeMetadata.role === 'customer' ? '/dashboard' : '/company/dashboard')
                : '/role-selection'} 
              /> 
            : <SignInPage />
        } />
        
        <Route path="/role-selection" element={
          !isSignedIn 
            ? <Navigate to="/sign-in" /> 
            : user?.unsafeMetadata.role 
              ? <Navigate to={user.unsafeMetadata.role === 'customer' ? '/dashboard' : '/company/dashboard'} />
              : <RoleSelection />
        } />

        {/* Customer Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRole="customer">
              <DashboardLayout>
                <Routes>
                  <Route index element={<CustomerDashboard />} />
                  <Route path="schedule" element={<ScheduleCollection />} />
                  <Route path="containers" element={<BuyContainers />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="history" element={<CollectionHistory />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Company Dashboard Routes */}
        <Route
          path="/company/*"
          element={
            <ProtectedRoute allowedRole="company">
              <CompanyDashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<CompanyDashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="deliveries" element={<Deliveries />} />
                  <Route path="settings" element={<CompanySettings />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </CompanyDashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    </OrdersProvider>
  );
};

export default App;