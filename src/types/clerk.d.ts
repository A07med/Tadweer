// src/types/clerk.d.ts
import '@clerk/clerk-react';

declare module '@clerk/clerk-react' {
  export interface UserMetadata {
    role?: 'customer' | 'company' | 'admin';
  }
}