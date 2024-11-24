export interface BaseEntity {
    id: number;
}

export interface ApiResponse<T> {
    status: number;
    code: string;
    message: string;
    data: T;
}

export interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}
