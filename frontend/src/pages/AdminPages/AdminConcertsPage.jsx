import { Pencil, SearchIcon, Trash } from "lucide-react";
import { useGetConciertos } from "../../hooks/concerts/useGetConcerts";
import { dateFormatWithTime } from "../../utils/dateFormat";

export default function AdminConcertsPage() {

  const { data: conciertos, isLoading, isError } = useGetConciertos();

  if (isLoading) return <p className="text-center mt-10">Cargando conciertos...</p>;
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

        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 border-b text-gray-900 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Artista</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Recinto</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conciertos.length > 0 ? (
                conciertos.map((c, index) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{c.artista.nombre}</td>
                    <td className="px-6 py-4">{dateFormatWithTime(c.fecha)}</td>
                    <td className="px-6 py-4">{c.recinto.nombre}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        <Pencil className="text-white" size={18} />
                      </button>
                      <button className="ml-2 px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        <Trash className="text-white" size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No hay conciertos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}