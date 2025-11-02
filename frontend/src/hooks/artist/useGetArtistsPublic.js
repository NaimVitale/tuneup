import { useQuery } from "@tanstack/react-query";
import { getAllArtistPublic } from "../../services/artistServices";

export const useGetArtistsPublic = (genero) => {
  return useQuery({
    queryKey: ["public_artists", genero],
    queryFn: () => getAllArtistPublic(genero),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};