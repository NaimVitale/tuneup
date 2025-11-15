import { useGetArtistAdmin } from "./artist/useGetArtistAdmin";
import { useGetConcertPrivate } from "./concerts/useGetConcertPrivate";
import { useGetGenero } from "./genero/useGetGenero";
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

    case "conciertos":
      const conciertoQuery = useGetConcertPrivate(slug, { enabled: !!slug });
      data = conciertoQuery.data;
      isLoading = conciertoQuery.isLoading;
      isError = conciertoQuery.isError;
      break;

    case "generos":
      const generoQuery = useGetGenero(slug, { enabled: !!slug });
      data = generoQuery.data;
      isLoading = generoQuery.isLoading;
      isError = generoQuery.isError;
      break;


    default:
      break;
  }

  return { data, isLoading, isError };
}