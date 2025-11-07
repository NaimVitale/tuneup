import { useQuery } from "@tanstack/react-query";
import { getGenerosPublic } from "../../services/generoServices";

export const useGetGenerosPublic = (query = {}) => {
  return useQuery({
    queryKey: ["generos", query],
    queryFn: () => getGenerosPublic(query),
    staleTime: 5 * 60 * 1000,
  });
};