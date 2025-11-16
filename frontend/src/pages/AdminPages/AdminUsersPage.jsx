import { Pencil, Plus, SearchIcon, Trash } from "lucide-react";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";
import { data, Link, useNavigate } from "react-router-dom";
import { useGetUsers } from "../../hooks/useGetUsers";
import { capitalize } from "../../utils/capitalizeString";

export default function AdminUsersPage() {
  const navigate = useNavigate()
  const columns = [
    { key: "index", label: "#", render: (c) => c.id },
    { key: "nombre", label: "Nombre", render: (c) => c.nombre },
    { key: "apellido", label: "Apellido", render: (c) => c.apellido },
    { key: "email", label: "Email", render: (c) => c.email},
    { key: "rol", label: "Rol", render: (c) => capitalize(c.rol) },
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => navigate(`${c.id}/editar`),
      className: "bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer",
    },
    {
      icon: <Trash size={18} />,
      className: "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer",
    },
  ];

  const { data: usuarios, isLoading, isError } = useGetUsers();

  if (isLoading) return <Spinner size={20} color="border-white"/>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar los recintos</p>

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="bg-white min-h-screen overflow-hidden">
          
          {/* Header responsive */}
          <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              
              {/* Título */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Lista de usuarios
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
                  Crear usuario
                </Link>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={usuarios}/>
          </div>
        </div>
      </div>
    </div>
  );
}