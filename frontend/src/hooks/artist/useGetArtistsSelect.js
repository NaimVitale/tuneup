import { useQuery } from "@tanstack/react-query";
import { getAllArtistsSelect } from "../../services/artistServices";

export const useGetArtistsSelect = () => {
  return useQuery({
    queryKey: ["artists_select"],
    queryFn: () => getAllArtistsSelect(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};