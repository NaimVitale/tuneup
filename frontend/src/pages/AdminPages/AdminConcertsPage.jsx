import { Pencil, SearchIcon, Trash } from "lucide-react";
import { useGetConciertos } from "../../hooks/concerts/useGetConcerts";
import { dateFormatWithTime } from "../../utils/dateFormat";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";

export default function AdminConcertsPage() {
  const columns = [
    { key: "index", label: "#", render: (c, i) => i + 1 },
    { key: "artista", label: "Artista", render: (c) => c.artista.nombre },
    { key: "fecha", label: "Fecha", render: (c) => dateFormatWithTime(c.fecha) },
    { key: "recinto", label: "Recinto", render: (c) => c.recinto.nombre },
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => console.log("Editar", c.id),
      className: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      icon: <Trash size={18} />,
      onClick: (c) => console.log("Eliminar", c.id),
      className: "bg-red-500 text-white hover:bg-red-600",
    },
  ];

  const { data: conciertos, isLoading, isError } = useGetConciertos();

  if (isLoading) return <Spinner size={20} color="border-white"/>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar los conciertos</p>;

  return (
    <div className="w-[90%] h-[80vh]">
      <div className="h-full bg-white rounded-2xl shadow-md flex flex-col">
        <div className="pt-5 pl-6 pr-6 pb-5 flex justify-between items-center flex-shrink-0">
          <h1 className="text-3xl">Lista de Conciertos</h1>
          <div className="w-[30%]">
            <div className="relative">
              <input
                type="search"
                className="rounded-2xl w-full py-2 placeholder:p-5 border shadow-sm border-black"
                placeholder="Buscar..."
              />
              <SearchIcon size={22} className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={conciertos} actions={actions} />;
      </div>
    </div>
  );
}