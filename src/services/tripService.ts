import apiClient from './authService';
import { Trip, TripRequest, ApiResponse, PaginatedResponse } from '../models';

export const tripService = {
  // Listar todas as viagens
  listTrips: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Trip>> => {
    const response = await apiClient.get<PaginatedResponse<Trip>>('/trips', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Listar viagens do usuário logado
  listMyTrips: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Trip>> => {
    const response = await apiClient.get<PaginatedResponse<Trip>>('/trips/my-trips', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Obter uma viagem específica
  getTripById: async (id: string): Promise<Trip> => {
    const response = await apiClient.get<Trip>(`/trips/${id}`);
    return response.data;
  },

  // Criar uma nova viagem
  createTrip: async (data: TripRequest): Promise<Trip> => {
    const response = await apiClient.post<Trip>('/trips', data);
    return response.data;
  },

  // Atualizar uma viagem existente
  updateTrip: async (id: string, data: Partial<TripRequest>): Promise<Trip> => {
    const response = await apiClient.put<Trip>(`/trips/${id}`, data);
    return response.data;
  },

  // Deletar uma viagem
  deleteTrip: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/trips/${id}`);
    return response.data;
  },

  // Entrar em uma viagem (como passageiro)
  joinTrip: async (tripId: string): Promise<Trip> => {
    const response = await apiClient.post<Trip>(`/trips/${tripId}/join`);
    return response.data;
  },

  // Sair de uma viagem
  leaveTrip: async (tripId: string): Promise<Trip> => {
    const response = await apiClient.post<Trip>(`/trips/${tripId}/leave`);
    return response.data;
  },
};
