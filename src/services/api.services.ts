import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse, BaseEntity, LoginCredentials, LoginResponse } from '../shared/models/api.types';

export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.authorization = `${token}`;
      }
      return config;
    });
  }

  async getAll<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T[]>> {
    try {
      const response = await this.api.get<ApiResponse<T[]>>(url, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getById<T>(url: string, id: number | string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(url: string, credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await this.api.post<ApiResponse<LoginResponse>>(url, credentials);
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create<T>(url: string, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update<T extends BaseEntity>(
    url: string,
    id: number | string,
    data: Partial<T>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<ApiResponse<T>>(`${url}/${id}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(url: string, id: number | string): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.delete<ApiResponse<void>>(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const { status, data } = error.response;

      const apiError = new Error(data.message || 'Error del servidor');
      (apiError as any).status = status;
      (apiError as any).code = data.code;
      (apiError as any).details = data.details;

      return apiError;
    }

    if (error.request) {
      return new Error('Error de conexión. Por favor, verifica tu conexión a internet.');
    }

    return new Error('Ha ocurrido un error inesperado.');
  }
}
