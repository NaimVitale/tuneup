import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ArtistEditForm from "../../components/AdminForms/Update/ArtistEditForm";
import { useGetArtist } from "../../hooks/artist/useGetArtist";
import ConcertEditForm from "../../components/AdminForms/Update/ConcertEditForm";
import RecintoEditForm from "../../components/AdminForms/Update/RecintoEditForm";
import { useGetArtistAdmin } from "../../hooks/artist/useGetArtistAdmin";
import { useAdminResource } from "../../hooks/useAdminResource";

export default function AdminEditPage() {
    const VALID_RESOURCES = ["artistas", "conciertos", "generos", "recintos", "usuarios", "entradas"];
    const { resource, slug } = useParams();
    const location = useLocation();

    if (resource && !VALID_RESOURCES.includes(resource)) {
      return <Navigate to="/404" replace state={{ from: location }} />;
    } 
    const { data, isLoading, isError } = useAdminResource(resource, slug);

    return(
        <div className="w-[90%]">
          <div className="h-full bg-white rounded-2xl shadow-md flex flex-col items-center p-10">
            <h1 className="text-2xl font-semibold mb-12">
                Editar {resource}:
                {<span className="pl-1 text-blue-600">{data?.nombre || `${data?.artista.nombre} - ${data?.id}`}</span>}
            </h1>

            {resource === "artistas" && <ArtistEditForm data={data} />}
            {resource === "conciertos" && <ConcertEditForm data={data} />}
            {resource === "recintos" && <RecintoEditForm data={data} />}
          </div>
        </div>
    );
}