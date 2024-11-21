import { useCallback, useState } from "react";
import { ApiService } from "../../services/api.services";
import { BaseEntity } from "../models/api.types";

interface UseCrudState<T> {
    data: T | null;
    list: T[];
    loading: boolean;
    error: Error | null;
    success: {
        create: boolean;
        update: boolean;
        delete: boolean;
        fetch: boolean;
        fetchAll: boolean;
    };
}

export function useApi<T extends BaseEntity>(apiService: ApiService, baseUrl: string) {
    const [state, setState] = useState<UseCrudState<T>>({
        data: null,
        list: [],
        loading: false,
        error: null,
        success: {
            create: false,
            update: false,
            delete: false,
            fetch: false,
            fetchAll: false,
        }
    });

    const fetchAll = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true,
            success: { ...prev.success, fetchAll: false }
        }));

        try {
            const response = await apiService.getAll<T>(baseUrl);
            return new Promise((resolve) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        list: response.data,
                        loading: false,
                        error: null,
                        success: { ...prev.success, fetchAll: true }
                    }));
                    resolve(response.data);
                }, 800);
            });
        } catch (error) {
            return new Promise((_, reject) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        error: error as Error,
                    }));
                    reject(error);
                }, 1200);
            });
        }
    }, [apiService, baseUrl]);

    const fetchById = useCallback(async (id: number | string) => {
        setState(prev => ({
            ...prev,
            loading: true,
            success: { ...prev.success, fetch: false }
        }));

        try {
            const response = await apiService.getById<T>(baseUrl, id);
            return new Promise((resolve) => {
                setState(prev => ({
                    ...prev,
                    data: response.data,
                    loading: false,
                    error: null,
                    success: { ...prev.success, fetch: true }
                }));
                resolve(response.data);
            });
        } catch (error) {
            return new Promise((_, reject) => {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: error as Error,
                }));
                reject(error);
            });
        }
    }, [apiService, baseUrl]);

    const create = useCallback(async (data: Partial<T>) => {
        setState(prev => ({
            ...prev,
            loading: true,
            success: { ...prev.success, create: false }
        }));

        try {
            const response = await apiService.create<T>(baseUrl, data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        data: response.data,
                        list: [...prev.list, response.data],
                        loading: false,
                        error: null,
                        success: { ...prev.success, create: true }
                    }));
                    resolve(response.data);
                }, 1200);
            });
        } catch (error) {
            return new Promise((_, reject) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        error: error as Error,
                    }));
                    reject(error);
                }, 1200);
            });
        }
    }, [apiService, baseUrl]);

    const update = useCallback(async (id: number | string, data: Partial<T>) => {
        setState(prev => ({
            ...prev,
            loading: true,
            success: { ...prev.success, update: false }
        }));

        try {
            const response = await apiService.update<T>(baseUrl, id, data);
            return new Promise((resolve) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        data: response.data,
                        list: prev.list.map(item =>
                            (item as BaseEntity).id === id ? response.data : item
                        ),
                        loading: false,
                        error: null,
                        success: { ...prev.success, update: true }
                    }));
                    console.log(response.data);
                    resolve(response.data);
                }, 1000);
            });
        } catch (error) {
            return new Promise((_, reject) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        error: error as Error,
                    }));
                    reject(error);
                }, 1200);
            });
        }
    }, [apiService, baseUrl]);

    const remove = useCallback(async (id: number | string) => {
        setState(prev => ({
            ...prev,
            loading: true,
            success: { ...prev.success, delete: false }
        }));

        try {
            await apiService.delete(baseUrl, id);
            return new Promise((resolve) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        data: null,
                        list: prev.list.filter(item => (item as BaseEntity).id !== id),
                        loading: false,
                        error: null,
                        success: { ...prev.success, delete: true }
                    }));
                    resolve(true);
                }, 1000);
            });
        } catch (error) {
            return new Promise((_, reject) => {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        error: error as Error,
                    }));
                    reject(error);
                }, 1200);
            });
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