import { useNavigate, useParams } from "react-router-dom";
import ArtistEditForm from "../../components/AdminForms/ArtistEditForm";
import { useGetArtist } from "../../hooks/artist/useGetArtist";

export default function AdminEditPage() {
    const { resource, slug } = useParams();
    const { data: artist, isLoading, isError } = useGetArtist(slug);
    const navigate = useNavigate();

    return(
        <div className="w-[90%]">
          <div className="h-full bg-white rounded-2xl shadow-md flex flex-col items-center p-10">
            <h1 className="text-2xl font-semibold mb-12">
                Editar {resource === "artistas" ? "artista" : "concierto"}:
                {<span className="pl-1 text-blue-600">{artist?.nombre}</span>}
            </h1>

            {/* Mostrar el formulario correspondiente */}
            {resource === "artistas" && <ArtistEditForm data={artist} />}
          </div>
        </div>
    );
}