import { useState, useEffect } from 'react';
import { getUser } from '../services/userServices';

export const useGetUser = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      setError(null);

      try {
        const data = await getUser(userId, token);
        setUserData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { userData, loading, error };
};