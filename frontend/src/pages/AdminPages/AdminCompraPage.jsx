import { Pencil, Plus, SearchIcon, Trash } from "lucide-react";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGetComprasAdmin } from "../../hooks/compra/useGetComprasAdmin";
import { dateFormatWithTime } from "../../utils/dateFormat";

export default function AdminCompraPage() {
  const navigate = useNavigate()
  const columns = [
    { key: "index", label: "#", render: (c, i) => i},
    { key: "usuario", label: "Usuario", render: (c) => c.id_usuario },
    { key: "total", label: "Total", render: (c) => `${c.total}€` },
    { key: "entradas", label: "Entradas", render: (c) => c.total_entradas},
    { key: "fecha", label: "Fecha", render: (c) => dateFormatWithTime(c.fecha_creacion)},
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => navigate(`${c.slug}/editar`),
      className: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      icon: <Trash size={18} />,
      onClick: (c) => console.log("Eliminar", c.id),
      className: "bg-red-500 text-white hover:bg-red-600",
    },
  ];

  const { data: compras, isLoading, isError } = useGetComprasAdmin();

  console.log(compras)

  return (
    <div className="w-[90%] h-[80vh]">
      <div className="h-full bg-white rounded-2xl shadow-md flex flex-col">
        <div className="pt-5 pl-6 pr-6 pb-5 flex justify-between items-center flex-shrink-0">
          <h1 className="text-3xl">Lista de Compras</h1>
          <div className="w-[40%] flex justify-end items-center gap-6">
            <div className="relative w-[80%]">
              <input
                type="search"
                className="rounded-2xl w-full py-2 placeholder:p-5 border shadow-sm border-black"
                placeholder="Buscar..."
              />
              <SearchIcon size={20} className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
        {<DataTable columns={columns} data={compras} />}
      </div>
    </div>
  );
}