import { useQuery } from "@tanstack/react-query";
import { getCiudades } from "../../services/ciudadServices";

export const useGetCiudades = (query = {}) => {
  return useQuery({
    queryKey: ["ciudades", query],
    queryFn: () => getCiudades(query),
    staleTime: 5 * 60 * 1000,
  });
};