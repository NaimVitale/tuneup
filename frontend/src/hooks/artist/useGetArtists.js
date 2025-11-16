import { useQuery } from "@tanstack/react-query";
import { getAllArtist, getArtist } from "../../services/artistServices";

export const useGetArtists = (params) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["artists", params],
    queryFn: () => getAllArtist(token, params),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};