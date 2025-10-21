import { useEffect, useState } from "react";
import { getConcert } from "../../services/concertServices";

export const useGetConcert = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchConcert = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getConcert(id);
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [id]);

  return { data, loading, error };
}