import { useQuery } from "@tanstack/react-query";
import { getAllArtistPublic } from "../../services/artistServices";

export const useGetArtistsPublic = () => {

  return useQuery({
    queryKey: ["public_artists"],
    queryFn: () => getAllArtistPublic(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};