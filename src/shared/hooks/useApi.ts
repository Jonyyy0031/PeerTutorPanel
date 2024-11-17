import { useCallback, useState } from "react";
import { ApiService } from "../../services/api.services";
import { BaseEntity } from "../models/api.types";


interface UseCrudState<T> {
    data: T | null;
    list: T[];
    loading: boolean;
    error: Error | null;
}

export function useApi<T extends BaseEntity>(apiService: ApiService, baseUrl: string) {
    const [state, setState] = useState<UseCrudState<T>>({
        data: null,
        list: [],
        loading: false,
        error: null,
    });

    const fetchAll = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await apiService.getAll<T>(baseUrl);
            setState({
                data: null,
                list: response.data,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [apiService, baseUrl]);

    const fetchById = useCallback(async (id: number | string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await apiService.getById<T>(baseUrl, id);
            setState(prev => ({
                ...prev,
                data: response.data,
                loading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [apiService, baseUrl]);

    const create = useCallback(async (data: Partial<T>) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await apiService.create<T>(baseUrl, data);
            setState(prev => ({
                ...prev,
                data: response.data,
                list: [...prev.list, response.data],
                loading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [apiService, baseUrl]);

    const update = useCallback(async (id: number | string, data: Partial<T>) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await apiService.update<T>(baseUrl, id, data);
            setState(prev => ({
                ...prev,
                data: response.data,
                list: prev.list.map(item =>
                    (item as BaseEntity).id === id ? response.data : item
                ),
                loading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [apiService, baseUrl]);

    const remove = useCallback(async (id: number | string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            await apiService.delete(baseUrl, id);
            setState(prev => ({
                ...prev,
                data: null,
                list: prev.list.filter(item => (item as BaseEntity).id !== id),
                loading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [apiService, baseUrl]);

    return {
        ...state,
        fetchAll,
        fetchById,
        create,
        update,
        remove,
    };
}
