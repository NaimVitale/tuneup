import { Pencil, Plus, RotateCw, SearchIcon, Trash } from "lucide-react";
import { useGetArtists } from "../../hooks/artist/useGetArtists";
import DataTable from "../../components/DataTable";
import { Link, useNavigate } from "react-router-dom";
import { useSoftDeleteArtist } from "../../hooks/artist/useSoftDeleteArtist";
import { useRestoreArtist } from "../../hooks/artist/useRestoreArtist";
import { useConfirmPopup } from "../../hooks/useConfirmPopup";
import ConfirmPopup from "../../components/ConfirmPopup";

export default function AdminArtistPage() {
  const navigate = useNavigate()
  const { isOpen, message, onConfirm, openConfirm, closeConfirm } = useConfirmPopup();
  const { handleSoftDelete } = useSoftDeleteArtist();
  const { handleRestore } = useRestoreArtist();
  const columns = [
    { key: "index", label: "#", render: (c, i) => i},
    { key: "artista", label: "Artista", render: (c) => c.nombre },
    { key: "slug", label: "Slug", render: (c) => c.slug },
    { key: "descripcion", label: "Descripcion", render: (c) => c.descripcion},
    { key: "img_card", label: "Imagen Tarjeta", render: (c) => c.img_card },
    { key: "img_hero", label: "Imagen Banner", render: (c) => c.img_hero },
    { key: "images", label: "Imagen About", render: (c) => c.images },
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => {
        if (!c.deleted_at) {
          navigate(`${c.slug}/editar`);
        }
      },
      className: (c) =>
        c.deleted_at
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      icon: (c) => (c.deleted_at ? <RotateCw size={18} /> : <Trash size={18} />),
      onClick: (c) => {
        if (c.deleted_at) {
          // Abrir popup para restaurar
          openConfirm(
            "¿Está seguro que quiere restaurar este artista? Se restaurarán también los conciertos asociados.",
            async () => {
              const success = await handleRestore(c.id);
              closeConfirm();
            }
          );
        } else {
          // Abrir popup para eliminar
          openConfirm(
            "¿Está seguro que quiere eliminar este artista? Se eliminarán también los conciertos asociados.",
            async () => {
              const success = await handleSoftDelete(c.id);
              closeConfirm();
            }
          );
        }
      },
      className: (c) =>
        c.deleted_at
          ? "bg-yellow-500 text-white hover:bg-yellow-600"
          : "bg-red-500 text-white hover:bg-red-600",
    },
  ];

    const { data: artistas, isLoading, isError } = useGetArtists();

    return (
    <div className="w-full min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="bg-white min-h-screen overflow-hidden">
          
          {/* Header responsive */}
          <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Título */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Lista de artistas
              </h1>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
                
                {/* Botón mostrar/ocultar eliminados */}
                {/*<button
                  onClick={() => setIncluirEliminados(prev => !prev)}
                  disabled={eliminadosCount === 0}
                 className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold transition-all shadow-md
                  ${eliminadosCount === 0
                    ? "bg-white/10 border border-white/20 text-white/50 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-sm hover:shadow-lg"
                  }`}
                >
                  {/*incluirEliminados ? <EyeOff size={20} /> : <Eye size={20} />}
                  <span className="hidden sm:inline">
                    {incluirEliminados ? "Ocultar eliminados" : "Mostrar eliminados"}
                  </span>
                  <span className="sm:hidden">
                    {incluirEliminados ? "Ocultar" : "Mostrar"}
                  </span>
                </button>*/}

                {/* Botón crear */}
                <Link 
                  to="crear"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#C122ED] font-bold px-6 py-3 rounded-full transition-all shadow-md"
                >
                  <Plus size={20} strokeWidth={3} />
                  Crear artista
                </Link>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={artistas} actions={actions} />
          </div>

          <ConfirmPopup
            isOpen={isOpen}
            onClose={closeConfirm}
            onConfirm={onConfirm}
            message={message}
          />
        </div>
      </div>
    </div>
  );
}