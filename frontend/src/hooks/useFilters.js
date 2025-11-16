import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";

export function useFilters(generos, ciudades) {
  const { genero: generoParam, ciudad: ciudadParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const fechaParam = searchParams.get("fecha");

  const [genero, setGenero] = useState(generoParam?.toLowerCase() || "");
  const [fecha, setFecha] = useState(fechaParam || null);
  const [ciudad, setCiudad] = useState(ciudadParam?.toLowerCase() || "");

  const updateURL = (nuevoGenero, nuevaFecha, nuevaCiudad) => {
    const basePath = "/" + location.pathname.split("/")[1]; // base: /conciertos
    let path = basePath;

    if (nuevoGenero) path += `/${nuevoGenero}`;
    if (nuevaCiudad) path += `/${nuevaCiudad}`;

    const params = new URLSearchParams();
    if (nuevaFecha) params.set("fecha", nuevaFecha);

    const queryString = params.toString();
    navigate(queryString ? `${path}?${queryString}` : path, { replace: true });
  };

  const handleGeneroChange = (nuevoGenero) => {
    setGenero(nuevoGenero || "");
    updateURL(nuevoGenero || "", fecha, ciudad);
  };

  const handleFechaChange = (date) => {
    let nuevaFecha = null;
    if (date instanceof Date) nuevaFecha = date.toISOString().split("T")[0];
    else if (typeof date === "string") nuevaFecha = date;

    setFecha(nuevaFecha);
    updateURL(genero, nuevaFecha, ciudad);
  };

  const handleCiudadChange = (nuevaCiudad) => {
    setCiudad(nuevaCiudad || "");
    updateURL(genero, fecha, nuevaCiudad || "");
  };

  // Validar que genero exista en la lista
  useEffect(() => {
    if (!generos) return;
    if (generoParam) {
      const generoValido = generos.some(
        (g) => g.nombre.toLowerCase() === generoParam.toLowerCase()
      );
      if (!generoValido) {
        setGenero("");
        updateURL("", fecha, ciudad);
      }
    }
  }, [generos, generoParam]);

  // Validar que ciudad exista en la lista
  useEffect(() => {
    if (!ciudades) return;
    if (ciudadParam) {
      const ciudadValida = ciudades.some(
        (c) => c.toLowerCase() === ciudadParam.toLowerCase()
      );
      if (!ciudadValida) {
        setCiudad("");
        updateURL(genero, fecha, "");
      }
    }
  }, [ciudades, ciudadParam]);

  return {
    genero,
    fecha,
    ciudad,
    handleGeneroChange,
    handleFechaChange,
    handleCiudadChange,
  };
}
