export interface BaseEntity {
    id: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}
