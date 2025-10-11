import { useQuery } from "@tanstack/react-query";
import { getAllArtist, getArtist } from "../../services/artistServices";

export const useGetArtists = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["artists"],
    queryFn: () => getAllArtist(token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};