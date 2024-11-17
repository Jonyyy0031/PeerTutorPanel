import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse, BaseEntity } from '../shared/models/api.types';

export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // this.api.interceptors.request.use((config) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // });
  }

  async getAll<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T[]>> {
    try {
      const response = await this.api.get<T[]>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getById<T>(url: string, id: number | string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(`${url}/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create<T>(url: string, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data);
      return {
        data: response.data,
        status: response.status,
      };
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
      const response = await this.api.put<T>(`${url}/${id}`, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(url: string, id: number | string): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(error.response.data.message || 'Error del servidor');
    }
    if (error.request) {
      return new Error('Error de red');
    }
    return new Error('Error desconocido');
  }
}
