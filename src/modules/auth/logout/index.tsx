'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/services/auth';

const LogoutPage = () => {
  const router = useRouter();
  const { logout } = useAuth();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call the logout function from auth service
        await logout();
      } finally {
        // Always redirect to login page, even if logout API fails
        router.push('/auth/login');
      }
    };
    
    performLogout();
  }, [logout, router]);
  
  // Show a simple loading message while logging out
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold">Logging out...</h1>
      </div>
    </div>
  );
}

export { LogoutPage };