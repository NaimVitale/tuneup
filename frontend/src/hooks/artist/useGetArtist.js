import { useState, useEffect } from 'react';
import { getArtist } from '../../services/artistServices';

export const useGetArtist = (artistSlug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistSlug) return;

    const fetchArtist = async () => {
      setLoading(true);
      setError(null);

      try {
        const artistdata = await getArtist(artistSlug);
        setData(artistdata);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistSlug]);

  return { data, loading, error };
};