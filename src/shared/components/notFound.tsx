import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../context/notificationContext';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();
  const notificationShown = useRef(false);

  useEffect(() => {
    if (!notificationShown.current) {
      showNotification('warning', 'La página que buscas no existe');
      notificationShown.current = true;
      navigate('/');
    }
  }, [navigate, showNotification]);

  return null;
};

export default NotFound;