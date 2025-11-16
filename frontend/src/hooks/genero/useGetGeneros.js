import { useQuery } from "@tanstack/react-query";
import { getGeneros } from "../../services/generoServices";

export const useGetGeneros = (params) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["generos-admin", params],
    queryFn: () => getGeneros(token, params),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};