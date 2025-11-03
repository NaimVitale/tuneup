import { useQuery } from "@tanstack/react-query";
import { getGeneros } from "../../services/generoServices";

export const useGetGeneros = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["generos"],
    queryFn: () => getGeneros(token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};