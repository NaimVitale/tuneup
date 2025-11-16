import { Pencil, Plus, RotateCw, SearchIcon, Trash } from "lucide-react";
import DataTable from "../../components/DataTable";
import { Link, useNavigate } from "react-router-dom";
import { useGetGeneros } from "../../hooks/genero/useGetGeneros"
import { useRestoreGenero } from "../../hooks/genero/useRestoreGenero";
import { useSoftDeleteGenero } from "../../hooks/genero/useSoftDeleteGenero";
import { useConfirmPopup } from "../../hooks/useConfirmPopup";
import ConfirmPopup from "../../components/ConfirmPopup";

export default function AdminGeneroPage() {
  const navigate = useNavigate()
  const { isOpen, message, onConfirm, openConfirm, closeConfirm } = useConfirmPopup();
  const { handleSoftDelete } = useSoftDeleteGenero();
  const { handleRestore } = useRestoreGenero();
  const columns = [
    { key: "index", label: "#", render: (c, i) => i},
    { key: "nombre", label: "Nombre", render: (c) => c.nombre },
    { key: "descripcion", label: "Descripción", render: (c) => c.descripcion },
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
      onClick: (c) => {
        if (c.deleted_at) {
          // Abrir popup para restaurar
          openConfirm(
            "¿Está seguro que quiere restaurar este genero?",
            async () => {
              const success = await handleRestore(c.id);
              if (success) console.log("Restaurado", c.id);
              closeConfirm();
            }
          );
        } else {
          // Abrir popup para eliminar
          openConfirm(
            "¿Está seguro que quiere eliminar este genero?",
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

    const { data: artistas, isLoading, isError } = useGetGeneros();

    return (
    <div className="w-[90%] h-[80vh]">
      <div className="h-full bg-white rounded-2xl shadow-md flex flex-col">
        <div className="pt-5 pl-6 pr-6 pb-5 flex justify-between items-center flex-shrink-0">
          <h1 className="text-3xl">Lista de Generos</h1>
          <div className="flex items-center gap-6">
            <Link to={'crear'} className="flex gap-2 w-full items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-3xl shadow-md transition-all duration-200 w-[40%]">
              <Plus size={24} />
              Crear genero
            </Link>
          </div>
        </div>
        {<DataTable columns={columns} data={artistas} actions={actions} />}
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