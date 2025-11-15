import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { restoreArtist } from "../../services/artistServices";

export const useRestoreArtist = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRestore = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await restoreArtist(id, token);
      toast.success("Artista restaurado correctamente");

      queryClient.invalidateQueries(["artists"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al restaurar artista");
      setLoading(false);
      return false;
    }
  };

  return { handleRestore, loading };
};