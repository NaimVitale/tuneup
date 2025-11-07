import { useGetArtistAdmin } from "./artist/useGetArtistAdmin";
import { useGetRecintoAdmin } from "./recintos/useGetRecintoAdmin";

export function useAdminResource(resource, slug) {
  const artistQuery = useGetArtistAdmin(slug, { enabled: resource === "artistas" });
  const recintoQuery = useGetRecintoAdmin(slug, { enabled: resource === "recintos" });

  let data, isLoading, isError;

  switch(resource) {
    case "artistas":
      data = artistQuery.data;
      isLoading = artistQuery.isLoading;
      isError = artistQuery.isError;
      break;
    /*case "conciertos":
      data = concertQuery.data;
      isLoading = concertQuery.isLoading;
      isError = concertQuery.isError;
      break;*/
    case "recintos":
      data = recintoQuery.data;
      isLoading = recintoQuery.isLoading;
      isError = recintoQuery.isError;
      break;
    default:
      data = null;
      isLoading = false;
      isError = false;
  }

  return { data, isLoading, isError };
}