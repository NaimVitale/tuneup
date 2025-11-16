import { useState, useEffect } from "react";
import { UpdateRecinto } from "../../services/recintoServices";
import toast from "react-hot-toast";

export const useRecintoUpdate = (initialData) => {
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    secciones: [],
  });
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (initialData) {
    setFormData({
      nombre: initialData.nombre || "",
      ciudad: initialData.ciudad || "",
      secciones: initialData.secciones || [],
      img_card: initialData.img_card || null,
      img_hero: initialData.img_hero || null,
    });
  }
}, [initialData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSections = (newSections) => {
    setFormData(prev => ({ ...prev, secciones: newSections }));
  };

  const updateFile = (file, field) => {
    setFiles(prev => ({ ...prev, [field]: file || null }));
  };

  const handleSubmit = async (recintoId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const success = await UpdateRecinto(token, recintoId, formData, files);

      toast.success("Recinto actualizado correctamente");
      setLoading(false);

      return true;
    } catch (err) {
      toast.error("Error al actualizar el recinto");
      setError(err);
      console.log(err);
      setLoading(false);
      return false;
    }
  };

  return {
    formData,
    files,
    updateField,
    updateSections,
    updateFile,
    handleSubmit,
    loading,
    error
  };
};
