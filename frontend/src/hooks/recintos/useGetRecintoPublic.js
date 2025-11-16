import { useQuery } from "@tanstack/react-query";
import { getRecintoPublic } from "../../services/recintoServices";

export const useGetRecintoPublic = (id) => {

  return useQuery({
    queryKey: ["recinto-public", id],
    queryFn: () => getRecintoPublic(id),
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};