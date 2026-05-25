import apiClient from './authService';
import { Product, ProductRequest, ApiResponse, PaginatedResponse } from '../models';

export const productService = {
  // Listar todos os produtos com validação de token
  listProducts: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Listar produtos por tema
  listProductsByTheme: async (themeId: string, page = 1, pageSize = 10): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
      params: { themeId, page, pageSize },
    });
    return response.data;
  },

  // Obter um produto específico
  getProductById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Criar um novo produto
  createProduct: async (data: ProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },

  // Atualizar um produto existente
  updateProduct: async (id: string, data: ProductRequest): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  // Deletar um produto
  deleteProduct: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/products/${id}`);
    return response.data;
  },
};
