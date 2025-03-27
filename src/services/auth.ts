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
  REFRESH: "/auth/token/refresh/",  // Adjusted to match your backend endpoint
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

export interface TokenPair {
  access: string;
  refresh: string;
}

// Authentication state with caching mechanism
let authState = {
  isAuthenticated: false,
  lastChecked: 0,
  checkInProgress: false,
  user: null as User | null,
};

// Cache validity period (5 minutes)
const CACHE_VALIDITY = 5 * 60 * 1000;

// Authentication service with all related methods
const authService = {
  // Token management methods
  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  },
  
  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  },
  
  setTokens: (access: string, refresh: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    }
  },
  
  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Login function with token handling
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      
      // Extract tokens and user from response
      const { access, refresh, user } = response.data;
      
      if (typeof window !== "undefined" && access && refresh && user) {
        // Store tokens and user data
        authService.setTokens(access, refresh);
        localStorage.setItem("user", JSON.stringify(user));
        
        // Update auth state
        authState.isAuthenticated = true;
        authState.lastChecked = Date.now();
        authState.user = user;
      }
      
      return { success: true, user };
    } catch (error: any) {
      let fieldErrors: Record<string, string> = {};

      if (error.response?.data?.field_errors) {
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

  // Register function
  register: async (userData: RegisterCredentials) => {
    try {
      // Convert nomorTelepon to nomor_telepon for the API
      const apiData = {
        ...userData,
        nomor_telepon: userData.nomorTelepon,
      };
      delete (apiData as any).nomorTelepon;
      
      const response = await api.post(AUTH_ENDPOINTS.REGISTER, apiData);
      
      return {
        success: true,
        message: response.data.message || "Registration successful",
        user: response.data.user,
      };
    } catch (error: any) {
      let fieldErrors: Record<string, string> = {};

      if (error.response?.data?.field_errors) {
        fieldErrors = convertObjectKeysToCamelCase(error.response.data.field_errors);
      }
      
      const message = extractErrorMessage(error);
      return {
        success: false,
        error: message || "Registration failed",
        fieldErrors,
      };
    }
  },

  // Logout function with token revocation
  logout: async () => {
    try {
      // Get refresh token to send to server for revocation
      const refreshToken = authService.getRefreshToken();
      console.log("Logout - Refresh token exists:", !!refreshToken);
      
      if (refreshToken) {
        try {
          // Send the refresh token to the server to invalidate it
          console.log("Calling logout API endpoint...");
          await api.post(AUTH_ENDPOINTS.LOGOUT, { refresh: refreshToken });
          console.log("API call successful!");
        } catch (apiError) {
          // Log API error but continue with client-side logout
          console.error("API logout error:", apiError);
        }
      } else {
        console.log("No refresh token found, skipping server call");
      }
  
      // Always clear local storage tokens even if API call fails
      console.log("Clearing local tokens and state");
      authService.clearTokens();
      
      // Reset auth state
      authState = {
        isAuthenticated: false,
        lastChecked: 0,
        checkInProgress: false,
        user: null,
      };
  
      return { success: true };
    } catch (error: any) {
      console.error("Client-side logout error:", error);
      
      // Still clear tokens on error
      authService.clearTokens();
      
      // Reset auth state
      authState = {
        isAuthenticated: false,
        lastChecked: 0,
        checkInProgress: false,
        user: null,
      };
      
      return {
        success: false,
        error: error.message || "Logout failed",
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
  
  // Check if user is authenticated with cache and token validation
  isAuthenticated: async (): Promise<boolean> => {
    // First check if we have tokens
    if (!authService.getAccessToken() || !authService.getRefreshToken()) {
      authState.isAuthenticated = false;
      return false;
    }
    
    // Then check if we have a user
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
    
    // Run verification against protected endpoint
    authState.checkInProgress = true;
    try {
      // Add the token as Authorization header
      const response = await api.get(AUTH_ENDPOINTS.PROTECTED);
      
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
      // Token might be expired, try to refresh
      const refreshSuccess = await authService.refreshToken();
      
      if (refreshSuccess) {
        // Try the protected endpoint again after refresh
        try {
          const response = await api.get(AUTH_ENDPOINTS.PROTECTED);
          
          // Update state
          authState.isAuthenticated = true;
          authState.lastChecked = now;
          
          // Update user data if returned
          if (response.data.user) {
            authState.user = response.data.user;
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          
          return true;
        } catch {
          // Still failing even after refresh
          authState.isAuthenticated = false;
          authService.clearTokens();
          return false;
        }
      } else {
        // Refresh failed, clear session
        authState.isAuthenticated = false;
        authService.clearTokens();
        return false;
      }
    } finally {
      authState.checkInProgress = false;
    }
  },
  
  // Refresh token implementation
  refreshToken: async (): Promise<boolean> => {
    try {
      const refreshToken = authService.getRefreshToken();
      
      if (!refreshToken) {
        return false;
      }
      
      const response = await api.post(AUTH_ENDPOINTS.REFRESH, {
        refresh: refreshToken
      });
      
      // Get new access token
      const { access } = response.data;
      
      if (access) {
        // Only update the access token, keep the same refresh token
        localStorage.setItem("accessToken", access);
        authState.lastChecked = Date.now();
        return true;
      }
      
      return false;
    } catch {
      // If refresh fails, clear session
      authState.isAuthenticated = false;
      authService.clearTokens();
      return false;
    }
  },
  
  // Check if user has a specific role
  hasRole: (role: 'staff' | 'admin'): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    
    if (role === 'admin') {
      return user.isSuperuser;
    }
    
    if (role === 'staff') {
      return user.isStaff || user.isSuperuser;
    }
    
    return false;
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
      return !!authService.getAccessToken() && 
             !!authService.getRefreshToken() && 
             !!authService.getCurrentUser();
    }
  };
}

export default authService;