import api from "./api";
import { useRouter } from "next/navigation";
import {
  convertObjectKeysToCamelCase,
  extractErrorMessage,
} from "@/utils/utils";

// API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login/",
  REGISTER: "/auth/register/",
  LOGOUT: "/auth/logout/",
  VERIFY: "/auth/verify/",
  PROTECTED: "/auth/protected/",
  PROTECTED_PETUGAS: "/auth/protected/petugas/",
  PROTECTED_ADMIN: "/auth/protected/admin/",
  REFRESH: "/auth/refresh/",
};

// Type definitions for better TypeScript support
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  name: string;
  password: string;
  nomorTelepon?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  isStaff: boolean;
  isSuperuser: boolean;
}

// Authentication state with caching mechanism
export let authState = {
  isAuthenticated: false,
  lastChecked: 0,
  checkInProgress: false,
  user: null as User | null,
};

// Cache validity period (5 minutes)
const CACHE_VALIDITY = 5 * 60 * 1000;

// Authentication service with all related methods
const authService = {
  // Login function
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      
      const { user } = response.data;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
        // Update auth state
        authState.lastChecked = Date.now();
        authState.user = user;
      }
      
      authState.isAuthenticated = true;
      return { success: true, user };
    } catch (error: any) {
      let fieldErrors: Record<string, string> = {};

      if (error.response && error.response.data && error.response.data.field_errors) {
        fieldErrors = convertObjectKeysToCamelCase(error.response.data.field_errors);
      }
      const message = extractErrorMessage(error);
      return {
        success: false,
        error: message || "Login failed",
        fieldErrors,
      };
    }
  },

  // Register function remains the same
  register: async (userData: RegisterCredentials) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
      
      return {
        success: true,
        message: response.data.message || "Registration successful",
        user: response.data.user,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Registration failed",
      };
    }
  },

  // Logout function with state update
  logout: async () => {
    try {
      // Only call API if we have a valid session
      if (authState.isAuthenticated) {
        await api.post(AUTH_ENDPOINTS.LOGOUT);
      }

      // Clear state regardless of API result
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      
      // Reset auth state
      authState = {
        isAuthenticated: false,
        lastChecked: 0,
        checkInProgress: false,
        user: null,
      };

      return { success: true };
    } catch (error: any) {
      // Clear state even if API fails
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      
      // Reset auth state
      authState = {
        isAuthenticated: false,
        lastChecked: 0,
        checkInProgress: false,
        user: null,
      };
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Logout failed",
      };
    }
  },

  // Get currently logged in user with caching
  getCurrentUser: (): User | null => {
    // Return from cache if available
    if (authState.user) {
      return authState.user;
    }
    
    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          authState.user = user;
          return user;
        } catch {
          localStorage.removeItem("user");
          return null;
        }
      }
    }
    return null;
  },
  
  // Check if user is authenticated with cache
  isAuthenticated: async (): Promise<boolean> => {
    // First, check localStorage to avoid unnecessary API calls
    const user = authService.getCurrentUser();
    if (!user) {
      authState.isAuthenticated = false;
      return false;
    }
    
    // Return cached value if recent enough
    const now = Date.now();
    if (authState.isAuthenticated && 
        authState.lastChecked > 0 && 
        now - authState.lastChecked < CACHE_VALIDITY) {
      return true;
    }
    
    // Prevent multiple concurrent checks
    if (authState.checkInProgress) {
      // Wait for the ongoing check to complete
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (!authState.checkInProgress) {
            clearInterval(checkInterval);
            resolve(authState.isAuthenticated);
          }
        }, 100);
      });
    }
    
    // Run verification
    authState.checkInProgress = true;
    try {
      const response = await api.get(AUTH_ENDPOINTS.VERIFY);
      
      // Update state
      authState.isAuthenticated = true;
      authState.lastChecked = now;
      
      // Update user data if returned
      if (response.data.user) {
        authState.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      
      return true;
    } catch (error) {
      // Token is invalid, clear session
      authState.isAuthenticated = false;
      authState.user = null;
      localStorage.removeItem("user");
      return false;
    } finally {
      authState.checkInProgress = false;
    }
  },
  
  // Manually request token refresh
  refreshToken: async (): Promise<boolean> => {
    try {
      if (!authState.isAuthenticated && !authService.getCurrentUser()) {
        return false;
      }
      
      await api.post(AUTH_ENDPOINTS.REFRESH);
      authState.lastChecked = Date.now();
      return true;
    } catch {
      // If refresh fails, clear session
      authState.isAuthenticated = false;
      authState.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      return false;
    }
  }
};

// React hook for authentication
export function useAuth() {
  const router = useRouter();
  
  return {
    ...authService,
    // Additional methods that need router
    loginAndRedirect: async (credentials: LoginCredentials, redirectPath: string = '/') => {
      const result = await authService.login(credentials);
      if (result.success) {
        router.push(redirectPath);
      }
      return result;
    },
    
    logoutAndRedirect: async (redirectPath: string = '/auth/login') => {
      await authService.logout();
      router.push(redirectPath);
    },
    
    // Check auth status without API call if possible
    checkAuthStatus: (): boolean => {
      return !!authService.getCurrentUser() && (
        authState.isAuthenticated && 
        Date.now() - authState.lastChecked < CACHE_VALIDITY
      );
    }
  };
}

export default authService;