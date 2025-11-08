import { useGetArtistAdmin } from "./artist/useGetArtistAdmin";
import { useGetRecintoAdmin } from "./recintos/useGetRecintoAdmin";

export function useAdminResource(resource, slug) {
  let data = null;
  let isLoading = false;
  let isError = false;

  switch(resource) {
    case "artistas":
      const artistQuery = useGetArtistAdmin(slug, { enabled: !!slug });
      data = artistQuery.data;
      isLoading = artistQuery.isLoading;
      isError = artistQuery.isError;
      break;

    case "recintos":
      const recintoQuery = useGetRecintoAdmin(slug, { enabled: !!slug });
      data = recintoQuery.data;
      isLoading = recintoQuery.isLoading;
      isError = recintoQuery.isError;
      break;

    default:
      break;
  }

  return { data, isLoading, isError };
}