import { useQuery } from "@tanstack/react-query";
import { getRecintoAdmin } from "../../services/recintoServices";

export const useGetRecintoAdmin = (id) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["recinto", id],
    queryFn: () => getRecintoAdmin(token, id),
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};