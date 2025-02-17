// src/hooks/useRole.ts
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export type UserRole = 'customer' | 'company' | 'admin' | undefined;

export const useRole = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [role, setRole] = useState<UserRole>();

  useEffect(() => {
    const checkRole = async () => {
      if (isSignedIn && user) {
        const userMetadata = user.publicMetadata;
        setRole(userMetadata.role as UserRole);
      } else {
        setRole(undefined);
      }
    };

    checkRole();
  }, [user, isSignedIn]);

  const updateUserRole = async (newRole: UserRole) => {
    try {
      if (!user) throw new Error('No user found');

      // Update user metadata with the new role
      await user.update({
        unsafeMetadata: {
          role: newRole
        }
      });

      setRole(newRole);
      return true;
    } catch (error) {
      console.error('Error updating role:', error);
      return false;
    }
  };

  return { 
    role, 
    updateUserRole,
    isLoaded,
    isSignedIn
  };
};