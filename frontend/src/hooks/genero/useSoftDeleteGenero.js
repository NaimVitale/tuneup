import { useState } from "react";
import toast from "react-hot-toast";
import { softDeleteGenero } from "../../services/generoServices"
import { useQueryClient } from "@tanstack/react-query";

export const useSoftDeleteGenero = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSoftDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await softDeleteGenero(id, token);
      toast.success("Género eliminado correctamente");

      queryClient.invalidateQueries(["generos-admin"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al eliminar género");
      setLoading(false);
      return false;
    }
  };

  return { handleSoftDelete, loading };
};
