import { useQuery } from "@tanstack/react-query";
import { getRecintosNavbar } from "../../services/recintoServices";

export const useGetRecintosNavbar = () => {
  return useQuery({
    queryKey: ["recintos-navbar"],
    queryFn: () => getRecintosNavbar(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};