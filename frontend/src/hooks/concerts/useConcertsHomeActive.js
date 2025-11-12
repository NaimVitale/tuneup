import { useQuery } from "@tanstack/react-query";
import { getHomeConciertosActivos } from "../../services/concertServices";

export const useConcertsHomeActive = () => {
  return useQuery({
    queryKey: ["conciertos-activos-home",],
    queryFn: () => getHomeConciertosActivos(),
    staleTime: 5 * 60 * 1000,
  });
};