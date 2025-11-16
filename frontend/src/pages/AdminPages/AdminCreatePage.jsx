import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ArtistCreateForm from "../../components/AdminForms/Create/ArtistCreateForm";
import RecintoCreateForm from "../../components/AdminForms/Create/RecintoCreateForm";
import ConcertCreateForm from "../../components/AdminForms/Create/ConcertCreateForm";
import GeneroCreateForm from "../../components/AdminForms/Create/GeneroCreateForm";
import UserCreateForm from "../../components/AdminForms/Create/UserCreateForm";

export default function AdminCreatePage() {
    const VALID_RESOURCES = ["artistas", "conciertos", "generos", "recintos", "usuarios", "entradas"];
    const { resource, slug } = useParams();
    const location = useLocation();
    const singularResource = resource.endsWith('s') ? resource.slice(0, -1) : resource;

    if (resource && !VALID_RESOURCES.includes(resource)) {
      return <Navigate to="/404" replace state={{ from: location }} />;
    }

    return(
        <div>
          <div className="h-full bg-white flex flex-col items-center min-h-screen pb-6">
            <h1 className="w-full text-2xl text-center font-semibold mb-12 bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 lg:p-10 text-white">
                Crear {singularResource}
            </h1>

            {resource === "artistas" && <ArtistCreateForm/>}
            {resource === "recintos" && <RecintoCreateForm/>}
            {resource === "conciertos" && <ConcertCreateForm/>}
            {resource === "generos" && <GeneroCreateForm/>}
            {resource === "usuarios" && <UserCreateForm/>}
          </div>
        </div>
    );
}