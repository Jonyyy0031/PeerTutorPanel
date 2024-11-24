import React, { createContext, useContext } from "react";
import { useNotification, NotificationType } from "../hooks/useNotification";
import NotificationsContainer from "../components/notificationContainer";

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { notifications, showNotification, removeNotification } =
    useNotification();

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationsContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
