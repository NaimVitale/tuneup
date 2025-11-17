import { useQuery } from "@tanstack/react-query";
import { getGenerosNavbar} from "../../services/generoServices";

export const useGetGenerosNavbar = () => {
  return useQuery({
    queryKey: ["generos-navbar"],
    queryFn: () => getGenerosNavbar(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};