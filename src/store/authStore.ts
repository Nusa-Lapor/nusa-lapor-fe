import { create } from 'zustand';
import authService from '@/services/auth';
import { User } from '@/services/auth'; // Import your User type

interface AuthState {
  // State properties
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  
  // Actions
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<any>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  isLoading: true,
  
  // Actions
  login: async (credentials) => {
    try {
      set({ isLoading: true });
      const result = await authService.login(credentials);
      
      if (result.success) {
        set({ 
          isAuthenticated: true, 
          user: result.user,
          isLoading: false
        });
      } else {
        set({ isLoading: false });
      }
      
      return result;
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.message || "Login failed"
      };
    }
  },
  
  logout: async () => {
    try {
      set({ isLoading: true });
      const result = await authService.logout();
      
      // Always reset auth state regardless of API success
      set({ 
        isAuthenticated: false, 
        user: null,
        isLoading: false
      });
      
      return result;
    } catch (error) {
      // Still reset auth state on error
      set({ 
        isAuthenticated: false, 
        user: null,
        isLoading: false
      });
      
      return {
        success: false,
        error: error.message || "Logout failed"
      };
    }
  },
  
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      // First check localStorage
      const user = authService.getCurrentUser();
      if (user) {
        set({ user, isAuthenticated: true });
      }
      
      // Then verify with server
      const isAuth = await authService.isAuthenticated();
      
      set({ 
        isAuthenticated: isAuth,
        isLoading: false
      });
      
      // If not authenticated, clear user
      if (!isAuth) {
        set({ user: null });
      }
      
      return isAuth;
    } catch (error) {
      set({ 
        isAuthenticated: false, 
        user: null,
        isLoading: false
      });
      
      return false;
    }
  }
}));