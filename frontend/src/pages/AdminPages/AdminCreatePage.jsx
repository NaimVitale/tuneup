import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetArtist } from "../../hooks/artist/useGetArtist";
import ArtistCreateForm from "../../components/AdminForms/Create/ArtistCreateForm";
import RecintoCreateForm from "../../components/AdminForms/Create/RecintoCreateForm";
import ConcertCreateForm from "../../components/AdminForms/Create/ConcertCreateForm";

export default function AdminCreatePage() {
    const VALID_RESOURCES = ["artistas", "conciertos", "generos", "recintos", "usuarios", "entradas"];
    const { resource, slug } = useParams();
    const location = useLocation();

    if (resource && !VALID_RESOURCES.includes(resource)) {
      return <Navigate to="/404" replace state={{ from: location }} />;
    }

    return(
        <div className="w-[90%]">
          <div className="h-full bg-white rounded-2xl shadow-md flex flex-col items-center p-10">
            <h1 className="text-2xl font-semibold mb-12">
                Crear {resource}
            </h1>

            {resource === "artistas" && <ArtistCreateForm/>}
            {resource === "recintos" && <RecintoCreateForm/>}
            {resource === "conciertos" && <ConcertCreateForm/>}
          </div>
        </div>
    );
}