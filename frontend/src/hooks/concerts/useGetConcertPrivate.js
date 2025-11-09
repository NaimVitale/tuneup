import { useQuery } from "@tanstack/react-query";
import { getConcertPrivate } from "../../services/concertServices";

export const useGetConcertPrivate = (id) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["concierto", id],
    queryFn: () => getConcertPrivate(id, token),
    enabled: !!id,          
    retry: 1,         
    staleTime: 1000 * 60 * 5
  });
};