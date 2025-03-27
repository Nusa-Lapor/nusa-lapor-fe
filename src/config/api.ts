export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  LOGOUT: '/auth/logout/',
  PROTECTED: '/auth/protected/',
  PROTECTED_PETUGAS: '/auth/protected/petugas/',
  PROTECTED_ADMIN: '/auth/protected/admin/',
  REFRESH: '/auth/refresh/',
  
  // Articles
  ARTICLES: '/article/artikel/',
  ARTICLE_DETAIL: (id: string) => `/article/artikel/${id}`,
  
  // Statistics
  STATISTICS: '/statistics/',
  
  // User
  USER_PROFILE: '/user/profile/',
  UPDATE_PROFILE: '/user/profile/update/',
}; 