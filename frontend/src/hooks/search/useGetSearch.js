import { useState, useEffect } from "react";
import { getSearch } from "../../services/searchServices";

export const useGetSearch = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getSearch(query);

        const formattedResults = [];

        if (res.artistas?.length) {
          formattedResults.push(
            ...res.artistas.map((a) => ({
              id: a.artista_id,
              nombre: a.artista_nombre,
              slug: a.artista_slug,
              imagen: a.artista_img_card,
              tipo: "Artista",
              numConciertos: a.numConciertos,
            }))
          );
        }

        if (res.festivales?.length) {
          formattedResults.push(
            ...res.festivales.map((f) => ({
              id: f.id,
              nombre: f.nombre,
              slug: f.slug,
              imagen: f.img,
              tipo: "Festival",
              fecha: f.fecha,
              ubicacion: f.ubicacion,
            }))
          );
        }

        setData(formattedResults);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return { data, loading, error };
};
