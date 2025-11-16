import { useQuery } from "@tanstack/react-query";
import { getAllRecintos } from "../../services/recintoServices";

export const useGetRecintos = (params) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["recintos", params],
    queryFn: () => getAllRecintos(token, params),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};