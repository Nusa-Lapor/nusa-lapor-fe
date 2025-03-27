import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/config/api';
import { convertObjectKeysToSnakeCase, convertObjectKeysToCamelCase } from '@/utils/utils';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to false since we're using token-based auth
});

// Request interceptor for authentication and case conversion
api.interceptors.request.use(
  (config) => {
    // Add Authorization header with JWT token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Convert request data from camelCase to snake_case
    if (config.data) {
      config.data = convertObjectKeysToSnakeCase(config.data);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Track if a refresh request is in progress
let isRefreshing = false;
// Queue of requests to retry after token refresh
let failedQueue: { resolve: (value?: any) => void; reject: (reason?: any) => void }[] = [];

// Process the queue of failed requests
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(request => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Response interceptor for case conversion and token refresh
api.interceptors.response.use(
  (response) => {
    // Convert response data from snake_case to camelCase
    if (response.data) {
      response.data = convertObjectKeysToCamelCase(response.data);
    }
    return response;
  },
  async (error) => {
    // Get original request config
    const originalRequest = error.config;
    
    // If the error is 401 Unauthorized and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      // Check if we have a refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        // No refresh token available, clear auth state and reject
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        return Promise.reject(error);
      }
      
      if (isRefreshing) {
        // If a refresh is already in progress, add this request to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      
      // Mark this request as retried to prevent infinite loop
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Try to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}${'/auth/token/refresh/'}`,
          { refresh: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        const { access } = response.data;
        
        if (access) {
          // Update access token in localStorage
          localStorage.setItem('accessToken', access);
          
          // Update Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          // Process queued requests
          processQueue(null, access);
          
          // Return the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear auth state and process queue with error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        processQueue(new Error('Token refresh failed'));
      } finally {
        isRefreshing = false;
      }
    }
    
    // For errors other than 401 or if refresh failed
    return Promise.reject(error);
  }
);

export default api;