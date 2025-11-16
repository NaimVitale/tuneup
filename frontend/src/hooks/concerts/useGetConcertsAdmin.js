import { useQuery } from "@tanstack/react-query";
import { getConcertsAdmin } from "../../services/concertServices";

export const useGetConcertsAdmin = (params) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["conciertos-admin", params],
    queryFn: () => getConcertsAdmin(token, params),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};