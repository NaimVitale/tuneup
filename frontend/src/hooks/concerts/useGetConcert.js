import { useQuery } from "@tanstack/react-query";
import { getConcert } from "../../services/concertServices";

export const useGetConcert = (id) => {
  return useQuery({
    queryKey: ["concierto-public", id],
    queryFn: () => getConcert(id),
    enabled: !!id,          
    retry: 1,         
    staleTime: 1000 * 60 * 5
  });
};