import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { restoreRecinto } from "../../services/recintoServices";

export const useRestoreRecinto = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRestore = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await restoreRecinto(id, token);
      toast.success("Recinto restaurado correctamente");

      queryClient.invalidateQueries(["recintos"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al restaurar recinto");
      setLoading(false);
      return false;
    }
  };

  return { handleRestore, loading };
};