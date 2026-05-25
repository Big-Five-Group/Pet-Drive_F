import apiClient from './authService';
import { Theme, ThemeRequest, ApiResponse, PaginatedResponse } from '../models';

export const themeService = {
  // Listar todos os temas com validação de token
  listThemes: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Theme>> => {
    const response = await apiClient.get<PaginatedResponse<Theme>>('/themes', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Obter um tema específico
  getThemeById: async (id: string): Promise<Theme> => {
    const response = await apiClient.get<Theme>(`/themes/${id}`);
    return response.data;
  },

  // Criar um novo tema
  createTheme: async (data: ThemeRequest): Promise<Theme> => {
    const response = await apiClient.post<Theme>('/themes', data);
    return response.data;
  },

  // Atualizar um tema existente
  updateTheme: async (id: string, data: ThemeRequest): Promise<Theme> => {
    const response = await apiClient.put<Theme>(`/themes/${id}`, data);
    return response.data;
  },

  // Deletar um tema
  deleteTheme: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/themes/${id}`);
    return response.data;
  },
};
