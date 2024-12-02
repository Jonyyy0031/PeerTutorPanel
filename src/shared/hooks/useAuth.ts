import { useCallback, useState } from 'react';
import { ApiService } from '../../services/api.services';
import { LoginCredentials } from '../models/api.types';

interface loginState {
  loading: boolean;
  error: Error | null;
}

export function useAuth(apiService: ApiService, baseUrl: string) {

  const [state, setState] = useState<loginState>({
    loading: false,
    error: null
  });

  const login = useCallback(async (credentials: LoginCredentials) => {

    setState(prev => ({
      ...prev,
      loading: true}));

    try {
      const response = await apiService.login(baseUrl, credentials);
      return new Promise((resolve) => {
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            loading: false,
            error: null
          }));
          resolve(response);
        }, 1200);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error as Error
          }));
          reject(error);
        }, 1200);
      });
    }
  }, [apiService, baseUrl]);


  const logout = () => {
    localStorage.removeItem('token');
  };

  return {
    login,
    logout,
    ...state
  };
}