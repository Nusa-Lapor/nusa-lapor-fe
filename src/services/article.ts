import api from './api';
import { API_ENDPOINTS } from '@/config/api';

export interface Article {
  id: number;
  judul: string;
  konten: string;
  tanggal_publikasi: string;
  penulis: string;
  gambar?: string;
}

export const articleService = {
  getArticles: async () => {
    const response = await api.get<Article[]>(API_ENDPOINTS.ARTICLES);
    return response.data;
  },

  getArticleById: async (id: string) => {
    const response = await api.get<Article>(API_ENDPOINTS.ARTICLE_DETAIL(id));
    return response.data;
  },
}; 