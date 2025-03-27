'use client';

import { useEffect } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';

export const AuthInitializer = () => {
  const { checkAuth } = useAuthContext();
  
  // Check auth status when the app starts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  // This component doesn't render anything
  return null;
};