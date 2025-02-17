// src/components/auth/AuthPage.tsx
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import { useEffect } from "react";
import RoleSelection from "./RoleSelection";

const AuthPage = () => {
  const { isSignedIn, role, isLoaded } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (role) {
        // If role exists, redirect to appropriate dashboard
        switch (role) {
          case 'customer':
            navigate('/dashboard');
            break;
          case 'company':
            navigate('/company-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
        }
      }
      // If no role, RoleSelection will be shown
    }
  }, [isSignedIn, role, isLoaded, navigate]);

  // Show role selection if signed in but no role
  if (isLoaded && isSignedIn && !role) {
    return <RoleSelection />;
  }

  // Show sign in form if not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-[#FFFBE6] flex items-center justify-center">
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#5F7053] hover:bg-[#5F7053]/90',
                footerActionLink: 'text-[#5F7053] hover:text-[#5F7053]/90',
              }
            }}
          />
        </div>
      </div>
    );
  }

  return null; // Loading state
};
export default AuthPage;