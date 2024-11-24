import React, { useRef } from 'react';
import Notification from './notification';
import { NotificationType } from '../hooks/useNotification';

interface NotificationsContainerProps {
  notifications: Array<{
    id: string;
    type: NotificationType;
    message: string;
    isLeaving?: boolean;
  }>;
  onClose: (id: string) => void;
}

const NotificationsContainer: React.FC<NotificationsContainerProps> = ({
  notifications,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getNotificationStyle = (index: number) => {
    const notificationHeight = 72;
    const spacing = 8;
    const maxVisibleNotifications = Math.floor(window.innerHeight * 0.5 / (notificationHeight + spacing));

    let bottom = index * (notificationHeight + spacing);

    if (index >= maxVisibleNotifications) {
      bottom = (maxVisibleNotifications - 1) * (notificationHeight + spacing);
    }

    return {
      position: 'absolute' as const,
      bottom: `${bottom}px`,
      right: '0',
      width: '100%',
      opacity: index >= maxVisibleNotifications ? '0' : '1',
      transform: index >= maxVisibleNotifications
        ? 'translateY(-20px)'
        : 'translateY(0)',
      transition: 'all 0.3s ease-in-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 w-[400px] pointer-events-none"
      style={{
        maxHeight: '50vh',
        zIndex: 9999,
      }}
    >
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={getNotificationStyle(index)}
          className="pointer-events-auto"
        >
          <Notification
            {...notification}
            onClose={onClose}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationsContainer;