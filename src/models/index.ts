// Tipos de autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Tipos de Tema
export interface Theme {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeRequest {
  name: string;
  description?: string;
  color?: string;
}

// Tipos de Produto
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  themeId: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  themeId: string;
  image?: string;
}

// Tipos de Viagem (Carona)
export interface Trip {
  id: string;
  origin: string;
  destination: string;
  distance: number; // em km
  speed: number; // em km/h
  estimatedTime: number; // em minutos
  departureTime: string;
  availableSeats: number;
  driverId: string;
  driver?: User;
  passengers?: User[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface TripRequest {
  origin: string;
  destination: string;
  distance: number;
  speed: number;
  departureTime: string;
  availableSeats: number;
}

// Tipos de resposta de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
