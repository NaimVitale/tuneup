import { useState, useEffect } from 'react';
import { verifyEmail } from '../../services/userServices';

export const useVerifyEmail = (token) => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token de verificación no válido.');
      return;
    }

    const fetchVerify = async () => {
      try {
        const data = await verifyEmail(token);
        setStatus('success');
        setMessage(data.message || '¡Tu cuenta ha sido verificada exitosamente!');
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Error al verificar tu cuenta.');
      }
    };

    fetchVerify();
  }, [token]);

  return { status, message };
};

