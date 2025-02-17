// src/components/auth/SignUpPage.tsx
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen pt-24 px-4 bg-[#FFFBE6] flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/role-selection"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-[#5F7053] hover:bg-[#5F7053]/90 text-white',
              footerActionLink: 'text-[#5F7053] hover:text-[#5F7053]/90',
              card: 'bg-white',
              headerTitle: 'text-[#5F7053]',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
              socialButtonsBlockButtonText: 'text-gray-600',
              formFieldLabel: 'text-gray-700',
              formFieldInput: 'border-gray-200 focus:border-[#5F7053] focus:ring-[#5F7053]',
              dividerLine: 'bg-gray-200',
              dividerText: 'text-gray-400'
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;