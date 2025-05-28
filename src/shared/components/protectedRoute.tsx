import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useNotificationContext } from "../context/notificationContext";
import { useAdminApiService } from "../hooks/useAdminAPI";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { showNotification } = useNotificationContext();
  const token = localStorage.getItem("token");
  const notificationShown = useRef(false);
  const apiService = useAdminApiService();

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        if (!notificationShown.current) {
          showNotification(
            "info",
            "Debes logearte primero para acceder a esta página"
          );
          notificationShown.current = true;
        }
        return;
      }

      try {
        await apiService.getAll("/users");
        setIsValid(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        setIsValid(false);
        if (!notificationShown.current) {
          showNotification(
            "warning",
            "Debes logearte primero para acceder a esta página"
          );
          notificationShown.current = true;
        }
      }
    };

    validateToken();
  }, [token, showNotification]);

  if (isValid === null) {
    return <LoadingSpinner size="lg" className="text-primary-600" />;
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
