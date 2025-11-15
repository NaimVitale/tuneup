import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { softDeleteArtist } from "../../services/artistServices";

export const useSoftDeleteArtist = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSoftDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await softDeleteArtist(id, token);
      toast.success("Artista eliminado correctamente");

      queryClient.invalidateQueries(["artists"]);

      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al artista género");
      setLoading(false);
      return false;
    }
  };

  return { handleSoftDelete, loading };
};
