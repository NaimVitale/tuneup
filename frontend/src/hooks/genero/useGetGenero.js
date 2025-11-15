import { useQuery } from "@tanstack/react-query";
import { getGenero} from "../../services/generoServices";

export const useGetGenero = (slug) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["genero", slug],
    queryFn: () => getGenero(slug ,token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};