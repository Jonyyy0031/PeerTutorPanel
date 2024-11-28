import { useState } from 'react';
import { ApiService } from '../../services/api.services';
import { LoginCredentials } from '../models/api.types';

export function useAuth(apiService: ApiService, baseUrl: string) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.login(baseUrl, credentials);
      console.log('response from hook', response);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  return {
    login,
    logout,
    isLoading,
    error
  };
}