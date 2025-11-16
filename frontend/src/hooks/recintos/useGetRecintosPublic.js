import { useQuery } from "@tanstack/react-query";
import { getAllRecintosPublic } from "../../services/recintoServices";

export const useGetRecintosPublic = (params) => {

  return useQuery({
    queryKey: ["recintos-public", params],
    queryFn: () => getAllRecintosPublic(params),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

};