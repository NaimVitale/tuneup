import { useQuery } from "@tanstack/react-query";
import { getArtistAdmin } from "../../services/artistServices";

export const useGetArtistAdmin = (artistSlug) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["artist-admin", artistSlug],
    queryFn: () => getArtistAdmin(artistSlug, token),
    enabled: !!artistSlug,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};