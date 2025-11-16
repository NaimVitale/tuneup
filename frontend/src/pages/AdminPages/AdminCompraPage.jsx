import { Eye, EyeOff, Pencil, Plus, SearchIcon, Trash } from "lucide-react";
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

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="bg-white min-h-screen overflow-hidden">
          
          {/* Header responsive */}
          <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Título */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Lista de compras
              </h1>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={compras}/>
          </div>
        </div>
      </div>
    </div>
  );
}