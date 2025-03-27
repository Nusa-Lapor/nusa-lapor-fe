'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectPath = '/auth/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthContext();
  const router = useRouter();
  
  useEffect(() => {
    const verifyAuth = async () => {
      // If not already checking, verify auth status
      const isAuth = await checkAuth();
      
      if (!isAuth) {
        router.push(redirectPath);
      }
    };
    
    verifyAuth();
  }, [checkAuth, router, redirectPath]);
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }
  
  // If authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
};