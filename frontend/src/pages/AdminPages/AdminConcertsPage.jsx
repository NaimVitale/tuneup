import { Pencil, Plus, RotateCw, SearchIcon, Trash } from "lucide-react";
import { useGetConciertos } from "../../hooks/concerts/useGetConcerts";
import { dateFormatWithTime } from "../../utils/dateFormat";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetConcertsAdmin } from "../../hooks/concerts/useGetConcertsAdmin";

export default function AdminConcertsPage() {
  const navigate = useNavigate()
  const { data: conciertos, isLoading, isError } = useGetConcertsAdmin();

  console.log(conciertos)

  const columns = [
    { key: "index", label: "#", render: (c) => c.id },
    { key: "artista", label: "Artista", render: (c) => c.artista?.nombre },
    { key: "fecha", label: "Fecha", render: (c) => dateFormatWithTime(c?.fecha) },
    { key: "precio_min", label: "Precio Minimo", render: (c) => `${c.precio_minimo}€`},
    { key: "ciudad", label: "Ciudad", render: (c) => c.recinto?.ciudad?.nombre },
    { key: "recinto", label: "Recinto", render: (c) => c.recinto?.nombre },
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => navigate(`${c.id}/editar`),
      className: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      icon: (c) =>
        c.deleted_at ? <RotateCw size={18} /> : <Trash size={18} />,
      onClick: async (c) => {
        if (c.deleted_at) {
          const success = await handleRestore(c.id);
          if (success) console.log("Restaurado", c.id);
        } else {
          const success = await handleSoftDelete(c.id);
          if (success) console.log("Eliminado", c.id);
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
    <div className="w-[90%] h-[80vh]">
      <div className="h-full bg-white rounded-2xl shadow-md flex flex-col">
        <div className="pt-5 pl-6 pr-6 pb-5 flex justify-between items-center flex-shrink-0">
          <h1 className="text-3xl">Lista de Conciertos</h1>
          <div className="w-[40%] flex items-center gap-6">
            <div className="relative w-[80%]">
              <input
                type="search"
                className="rounded-2xl w-full py-2 placeholder:p-5 border shadow-sm border-black"
                placeholder="Buscar..."
              />
              <SearchIcon size={20} className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Link to={'crear'} className="flex gap-2 items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-2 rounded-3xl shadow-md transition-all duration-200 w-[40%]">
              <Plus size={24} />
              Crear concierto
            </Link >
          </div>
        </div>
        <DataTable columns={columns} data={conciertos} actions={actions} />
      </div>
    </div>
  );
}