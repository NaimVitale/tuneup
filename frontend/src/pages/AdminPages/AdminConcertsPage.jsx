import { Eye, EyeOff, Pencil, Plus, RotateCw, SearchIcon, Trash } from "lucide-react";
import { dateFormatWithTime } from "../../utils/dateFormat";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useGetConcertsAdmin } from "../../hooks/concerts/useGetConcertsAdmin";
import { useConfirmPopup } from "../../hooks/useConfirmPopup";
import { useSoftDeleteConcert } from "../../hooks/concerts/useSoftDeleteConcert";
import { useRestoreConcert } from "../../hooks/concerts/useRestoreConcert";
import ConfirmPopup from "../../components/ConfirmPopup";
import { getRestoreWarningsConcert } from "../../services/concertServices";
import { capitalize } from "../../utils/capitalizeString";
import { useState } from "react";

export default function AdminConcertsPage() {
  const navigate = useNavigate()
  const [incluirEliminados, setIncluirEliminados] = useState(false);
  const { isOpen, message, onConfirm, openConfirm, closeConfirm } = useConfirmPopup();
  const { handleSoftDelete } = useSoftDeleteConcert();
  const { handleRestore } = useRestoreConcert();
  const { data: conciertos, isLoading, isError } = useGetConcertsAdmin({incluirEliminados});

  const columns = [
    { key: "index", label: "#", render: (c) => c.id },
    { key: "artista", label: "Artista", render: (c) => c.artista?.nombre },
    { key: "estado", label: "Estado", render: (c) => capitalize(c?.estado)},
    { key: "fecha", label: "Fecha", render: (c) => dateFormatWithTime(c?.fecha) },
    { key: "precio_min", label: "Precio Minimo", render: (c) => `${c.precio_minimo}€`},
    { key: "ciudad", label: "Ciudad", render: (c) => c.recinto?.ciudad?.nombre },
    { key: "recinto", label: "Recinto", render: (c) => c.recinto?.nombre },
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => {
        if (!c.deleted_at) {
          navigate(`${c.id}/editar`);
        }
      },
      className: (c) =>
        c.deleted_at
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
    icon: (c) => (c.deleted_at ? <RotateCw size={18} /> : <Trash size={18} />),
    onClick: async (c) => {
      if (c.deleted_at) {
        // 1️⃣ Llamada directa al backend, NO HOOK
        let warnings = { artistaEliminado: false, recintoEliminado: false };
        try {
          warnings = await getRestoreWarningsConcert(c.id); 
        } catch (err) {
          console.error("Error al obtener warnings", err);
        }

        // 2️⃣ Construir mensaje dinámico
        let message = "¿Está seguro que quiere restaurar este concierto y sus elementos asociados?";
        if (warnings.artistaEliminado || warnings.recintoEliminado) {
          message += "\n⚠️ Atención:";
          if (warnings.artistaEliminado) message += " El artista está eliminado.";
          if (warnings.recintoEliminado) message += " El recinto está eliminado.";
        }

        // 3️⃣ Abrir popup
        openConfirm(message, async () => {
          const success = await handleRestore(c.id);
          closeConfirm();
        });

      } else {
        // Eliminar concierto
        openConfirm(
          "¿Está seguro que quiere eliminar este concierto?",
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

  if (isLoading) return <Spinner size={20} color="border-white"/>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar los conciertos</p>

   return (
    <div className="w-full min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="bg-white min-h-screen overflow-hidden">
          
          {/* Header responsive */}
          <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Título */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Lista de conciertos
              </h1>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
                
                {/* Botón mostrar/ocultar eliminados */}
                <button
                  onClick={() => setIncluirEliminados(prev => !prev)}
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-5 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  {incluirEliminados ? <EyeOff size={20} /> : <Eye size={20} />}
                  <span className="hidden sm:inline">
                    {incluirEliminados ? "Ocultar eliminados" : "Mostrar eliminados"}
                  </span>
                  <span className="sm:hidden">
                    {incluirEliminados ? "Ocultar" : "Mostrar"}
                  </span>
                </button>

                {/* Botón crear */}
                <Link 
                  to="crear"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#C122ED] font-bold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-xl hover:scale-105"
                >
                  <Plus size={20} strokeWidth={3} />
                  Crear concierto
                </Link>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={conciertos} actions={actions} />
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