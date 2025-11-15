import { useQuery } from "@tanstack/react-query";
import { getConcertsAdmin } from "../../services/concertServices";

export const useGetConcertsAdmin = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["conciertos-admin"],
    queryFn: () => getConcertsAdmin(token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};