import { useMemo } from "react";
import { ApiService } from "../../services/api.services";

export function useAdminApiService() {
    return useMemo(
        () => new ApiService(`${import.meta.env.VITE_API_URL}/api/admin`),
        []
    );
}