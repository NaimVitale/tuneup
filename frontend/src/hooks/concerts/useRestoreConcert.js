import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { restoreConcert } from "../../services/concertServices";

export const useRestoreConcert = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRestore = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await restoreConcert(id, token);
      toast.success("Concierto restaurado correctamente");

      queryClient.invalidateQueries(["conciertos-admin"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al restaurar concierto");
      setLoading(false);
      return false;
    }
  };

  return { handleRestore, loading };
};