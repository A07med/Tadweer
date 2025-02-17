// src/components/auth/ProtectedRoute.tsx
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<'customer' | 'company' | 'admin'>;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { role } = useRole();
  
  if (!isLoaded) {
    return null;
  }
  
  if (!isSignedIn || !user) {
    return <Navigate to="/sign-in" replace />;
  }
  
  if (!role) {
    return <Navigate to="/role-selection" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;