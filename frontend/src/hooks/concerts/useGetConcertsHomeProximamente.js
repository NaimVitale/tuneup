import { useQuery } from "@tanstack/react-query";
import { getHomeConciertosProximos } from "../../services/concertServices";

export const useGetConcertsHomeProximamente = () => {
  return useQuery({
    queryKey: ["conciertos-proximos-home",],
    queryFn: () => getHomeConciertosProximos(),
    staleTime: 5 * 60 * 1000,
  });
};