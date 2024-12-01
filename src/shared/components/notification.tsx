import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { NotificationType } from '../hooks/useNotification';

interface NotificationProps {
  id: string;
  type: NotificationType;
  message: string;
  isLeaving?: boolean;
  onClose: (id: string) => void;
}

const NotificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const NotificationStyles = {
  success: 'bg-green-100 text-green-900 border-green-300',
  error: 'bg-red-100 text-red-900 border-red-300',
  warning: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  info: 'bg-blue-100 text-blue-900 border-blue-300',
};

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  isLeaving,
  onClose
}) => {
  const Icon = NotificationIcons[type];

  return (
    <div
      className={`
        ${NotificationStyles[type]}
        p-4 rounded-lg shadow-lg border
        flex items-center gap-3
        transform transition-all duration-300 ease-in-out
        ${isLeaving
          ? 'translate-x-[120%] opacity-0'
          : 'translate-x-0 opacity-100'}
      `}
    >
      <Icon size={20} />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="hover:opacity-70 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;