import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";

export function useFilters(generos) {
  const { genero: generoParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const fechaParam = searchParams.get("fecha");

  const [genero, setGenero] = useState(generoParam?.toLowerCase() || "");
  const [fecha, setFecha] = useState(fechaParam || null);

  const updateURL = (nuevoGenero, nuevaFecha) => {
    const basePath = "/" + location.pathname.split("/")[1];
    const params = new URLSearchParams();
    if (nuevaFecha) params.set("fecha", nuevaFecha);

    const path = nuevoGenero ? `${basePath}/${nuevoGenero}` : basePath;
    const queryString = params.toString();

    navigate(queryString ? `${path}?${queryString}` : path, { replace: true });
  };

  const handleGeneroChange = (nuevoGenero) => {
    setGenero(nuevoGenero || "");
    updateURL(nuevoGenero || "", fecha);
  };

  const handleFechaChange = (date) => {
    let nuevaFecha = null;
    if (date instanceof Date) nuevaFecha = date.toISOString().split("T")[0];
    else if (typeof date === "string") nuevaFecha = date;

    setFecha(nuevaFecha);
    updateURL(genero, nuevaFecha);
  };

  useEffect(() => {
    if (!generos) return;
    if (generoParam) {
      const generoValido = generos.some(
        (g) => g.nombre.toLowerCase() === generoParam.toLowerCase()
      );
      if (!generoValido) {
        setGenero("");
        updateURL("", fecha);
      }
    }
  }, [generos, generoParam]);

  return {
    genero,
    fecha,
    handleGeneroChange,
    handleFechaChange,
  };
}