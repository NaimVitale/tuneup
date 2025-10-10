import { useQuery } from "@tanstack/react-query";
import { getArtist } from "../../services/artistServices";

export const useGetArtist = (artistSlug) => {
  return useQuery({
    queryKey: ["artist", artistSlug],
    queryFn: () => getArtist(artistSlug),
    enabled: !!artistSlug,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};