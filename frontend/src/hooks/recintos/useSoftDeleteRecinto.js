import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { softDeleteRecinto } from "../../services/recintoServices";

export const useSoftDeleteRecinto = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSoftDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await softDeleteRecinto(id, token);
      toast.success("Recinto eliminado correctamente");

      queryClient.invalidateQueries(["recintos"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al artista recinto");
      setLoading(false);
      return false;
    }
  };

  return { handleSoftDelete, loading };
};