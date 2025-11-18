import { useQuery } from "@tanstack/react-query";
import { getConcert } from "../../services/concertServices";

export const useGetConcert = (id, slug) => {
  return useQuery({
    queryKey: ["concierto-public", id, slug],
    queryFn: () => getConcert(id, slug),
    enabled: !!id,          
    retry: 1,         
    staleTime: 1000 * 60 * 5
  });
};