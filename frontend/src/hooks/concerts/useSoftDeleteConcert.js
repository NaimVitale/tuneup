import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { softDeleteConcert } from "../../services/concertServices";

export const useSoftDeleteConcert = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSoftDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await softDeleteConcert(id, token);
      toast.success("Concierto eliminado correctamente");

      queryClient.invalidateQueries(["conciertos-admin"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al artista concierto");
      setLoading(false);
      return false;
    }
  };

  return { handleSoftDelete, loading };
};