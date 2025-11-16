import { Pencil, Plus, RotateCw, SearchIcon, Trash } from "lucide-react";
import DataTable from "../../components/DataTable";
import Spinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useGetRecintos } from "../../hooks/recintos/useGetRecintos";
import { useConfirmPopup } from "../../hooks/useConfirmPopup";
import { useSoftDeleteRecinto } from "../../hooks/recintos/useSoftDeleteRecinto";
import ConfirmPopup from "../../components/ConfirmPopup";
import { useRestoreRecinto } from "../../hooks/recintos/useRestoreRecinto";

export default function AdminPremisesPage() {
  const navigate = useNavigate()
  const { isOpen, message, onConfirm, openConfirm, closeConfirm } = useConfirmPopup();
  const { handleSoftDelete } = useSoftDeleteRecinto();
  const { handleRestore } = useRestoreRecinto();
  const columns = [
    { key: "index", label: "#", render: (c) => c.id },
    { key: "nombre", label: "Nombre", render: (c) => c.nombre },
    { key: "secciones", label: "Secciones", render: (c) => c.seccionesCount},
    { key: "ciudad", label: "Ciudad", render: (c) => c.ciudad.nombre },
  ];

  const actions = [
    {
      icon: <Pencil size={18} />,
      onClick: (c) => navigate(`${c.id}/editar`),
      className: "bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer",
    },
    {
      icon: (c) => (c.deleted_at ? <RotateCw size={18} /> : <Trash size={18} />),
      onClick: (c) => {
        if (c.deleted_at) {
          // Abrir popup para restaurar
          openConfirm(
            "¿Está seguro que quiere restaurar este recinto? Se restaurarán también los conciertos asociados.",
            async () => {
              const success = await handleRestore(c.id);
              if (success) console.log("Restaurado", c.id);
              closeConfirm();
            }
          );
        } else {
          // Abrir popup para eliminar
          openConfirm(
            "¿Está seguro que quiere eliminar este recinto? Se eliminarán también los conciertos asociados.",
            async () => {
              const success = await handleSoftDelete(c.id);
              if (success) console.log("Eliminado", c.id);
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

  const { data: recintos, isLoading, isError } = useGetRecintos();

  if (isLoading) return <Spinner size={20} color="border-white"/>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar los recintos</p>

  return (
    <div className="w-[90%] h-[80vh]">
      <div className="h-full bg-white rounded-2xl shadow-md flex flex-col">
        <div className="pt-5 pl-6 pr-6 pb-5 flex justify-between items-center flex-shrink-0">
          <h1 className="text-3xl">Lista de Recintos</h1>
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
              Crear Recintos
            </Link>
          </div>
        </div>
        <DataTable columns={columns} data={recintos} actions={actions} />
        <ConfirmPopup
          isOpen={isOpen}
          onClose={closeConfirm}
          onConfirm={onConfirm}
          message={message}
        />
      </div>
    </div>
  );
}