import { useState } from "react";
import toast from "react-hot-toast";
import { restoreGenero } from "../../services/generoServices";
import { useQueryClient } from "@tanstack/react-query";

export const useRestoreGenero = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRestore = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await restoreGenero(id, token);
      toast.success("Género restaurado correctamente");

      queryClient.invalidateQueries(["generos-admin"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al restaurar género");
      setLoading(false);
      return false;
    }
  };

  return { handleRestore, loading };
};