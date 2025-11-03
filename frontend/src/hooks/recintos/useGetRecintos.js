import { useQuery } from "@tanstack/react-query";
import { getAllRecintos } from "../../services/recintoServices";

export const useGetRecintos = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["recintos"],
    queryFn: () => getAllRecintos(token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};