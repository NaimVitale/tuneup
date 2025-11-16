import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ArtistEditForm from "../../components/AdminForms/Update/ArtistEditForm";
import { useGetArtist } from "../../hooks/artist/useGetArtist";
import ConcertEditForm from "../../components/AdminForms/Update/ConcertEditForm";
import RecintoEditForm from "../../components/AdminForms/Update/RecintoEditForm";
import { useGetArtistAdmin } from "../../hooks/artist/useGetArtistAdmin";
import { useAdminResource } from "../../hooks/useAdminResource";
import GeneroEditForm from "../../components/AdminForms/Update/GeneroEditForm";

export default function AdminEditPage() {
    const VALID_RESOURCES = ["artistas", "conciertos", "generos", "recintos", "usuarios", "entradas"];
    const { resource, slug } = useParams();
    const location = useLocation();

    if (resource && !VALID_RESOURCES.includes(resource)) {
      return <Navigate to="/404" replace state={{ from: location }} />;
    } 
    const { data, isLoading, isError } = useAdminResource(resource, slug);

    return(
        <div>
          <div className="h-full bg-white shadow-md flex flex-col items-center min-h-screen pb-6">
            <h1 className="w-full text-2xl text-center font-semibold mb-12 bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 lg:p-10 text-white">
                Editar {data?.nombre || `${data?.artista.nombre} - ${data?.id}`}
            </h1>

            {resource === "artistas" && <ArtistEditForm data={data} />}
            {resource === "conciertos" && <ConcertEditForm data={data} />}
            {resource === "recintos" && <RecintoEditForm data={data} />}
            {resource === "generos" && <GeneroEditForm data={data} />}
          </div>
        </div>
    );
}