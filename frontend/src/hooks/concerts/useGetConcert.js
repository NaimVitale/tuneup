import { useQuery } from "@tanstack/react-query";
import { getConcert } from "../../services/concertServices";

export const useGetConcert = (id) => {
  return useQuery({
    queryKey: ["concierto", id],      // key única del query
    queryFn: () => getConcert(id),  // función que hace la petición
    enabled: !!id,                  // solo ejecuta si hay un id válido
    retry: 1,                       // opcional
    staleTime: 1000 * 60 * 5        // opcional: cache de 5 minutos
  });
};