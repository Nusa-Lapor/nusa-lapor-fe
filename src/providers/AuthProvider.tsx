'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User } from '@/services/auth';

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<any>;
  checkAuth: () => Promise<boolean>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: async () => ({ success: false }),
  checkAuth: async () => false,
});

// Custom hook to use auth context
export const useAuthContext = () => useContext(AuthContext);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status initially
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  // Function to check auth status
  const checkAuth = async (): Promise<boolean> => {
    try {
      // First check if we have a user in localStorage
      const storedUser = authService.getCurrentUser();
      
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
        
        // Verify with server in background
        const status = await authService.isAuthenticated();
        setIsAuthenticated(status);
        
        if (!status) {
          setUser(null);
        }
        
        return status;
      }
      
      setIsAuthenticated(false);
      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  // Login function
  const login = async (credentials: any) => {
    const result = await authService.login(credentials);
    
    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    
    return result;
  };

  // Logout function
  const logout = async () => {
    const result = await authService.logout();
    
    // Always clear UI state regardless of API result
    setUser(null);
    setIsAuthenticated(false);
    
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};