import { Pencil, Plus, RotateCw, SearchIcon, Trash } from "lucide-react";
import DataTable from "../../components/DataTable";
import { Link, useNavigate } from "react-router-dom";
import { useGetGeneros } from "../../hooks/genero/useGetGeneros"
import { useRestoreGenero } from "../../hooks/genero/useRestoreGenero";
import { useSoftDeleteGenero } from "../../hooks/genero/useSoftDeleteGenero";

export default function AdminGeneroPage() {
  const navigate = useNavigate()
  const { handleSoftDelete } = useSoftDeleteGenero();
  const { handleRestore } = useRestoreGenero();
  const columns = [
    { key: "index", label: "#", render: (c, i) => i},
    { key: "nombre", label: "Nombre", render: (c) => c.nombre },
    { key: "descripcion", label: "Descripción", render: (c) => c.slug },
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

    const { data: artistas, isLoading, isError } = useGetGeneros();

    return (
    <div className="w-[90%] h-[80vh]">
      <div className="h-full bg-white rounded-2xl shadow-md flex flex-col">
        <div className="pt-5 pl-6 pr-6 pb-5 flex justify-between items-center flex-shrink-0">
          <h1 className="text-3xl">Lista de Generos</h1>
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
              Crear genero
            </Link>
          </div>
        </div>
        {<DataTable columns={columns} data={artistas} actions={actions} />}
      </div>
    </div>
  );
}