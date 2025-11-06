import { Pencil, Plus, SearchIcon, Trash } from "lucide-react";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGetGeneros } from "../../hooks/genero/useGetGeneros"

export default function AdminGeneroPage() {
  const navigate = useNavigate()
  const columns = [
    { key: "index", label: "#", render: (c, i) => i + 1 },
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
      icon: <Trash size={18} />,
      onClick: (c) => console.log("Eliminar", c.id),
      className: "bg-red-500 text-white hover:bg-red-600",
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
            <button className="flex gap-2 items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-2 rounded-xl shadow-md transition-all duration-200 w-[40%]">
              <Plus size={24} />
              Crear genero
            </button>
          </div>
        </div>
        {<DataTable columns={columns} data={artistas} actions={actions} />}
      </div>
    </div>
  );
}