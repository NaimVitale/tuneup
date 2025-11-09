import { useQuery } from "@tanstack/react-query";
import { getAllRecintosSelect } from "../../services/recintoServices";

export const useGetRecintosSelect = () => {
  return useQuery({
    queryKey: ["recintos_select"],
    queryFn: () => getAllRecintosSelect(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};