import { useQuery } from "@tanstack/react-query";
import { getGeneros } from "../../services/generoServices";

export const useGetGeneros = (query = {}) => {
  return useQuery({
    queryKey: ["generos", query],
    queryFn: () => getGeneros(query),
  });
};