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

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        roleName: string;
    };
}
