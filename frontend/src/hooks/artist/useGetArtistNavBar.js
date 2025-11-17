import { useQuery } from "@tanstack/react-query";
import { getArtistNavBar } from "../../services/artistServices";

export const useGetArtistNavbar = () => {
  return useQuery({
    queryKey: ["artist-navbar"],
    queryFn: () => getArtistNavBar(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};