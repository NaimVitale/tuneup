// hooks/useRecintoUpdate.js
import { useState, useEffect } from "react";
import { UpdateRecinto } from "../../services/recintoServices";
import toast from "react-hot-toast";

export const useRecintoUpdate = (initialData) => {
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    // img_card: null,
    // img_banner: null,
    secciones: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        ciudad: initialData.ciudad || "",
        // img_card: initialData.img_card || null,
        // img_banner: initialData.img_banner || null,
        secciones: initialData.secciones || []
      });
    }
  }, [initialData]);

  // Actualizar campo simple
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Actualizar secciones
  const updateSections = (newSections) => {
    setFormData(prev => ({ ...prev, secciones: newSections }));
  };

  // Actualizar archivo (comentado por ahora)
  // const updateFile = (field, file) => {
  //   setFormData(prev => ({ ...prev, [field]: file }));
  // };

  // Enviar update
  const handleSubmit = async (recintoId) => {
    setLoading(true);
    setError(null);


    
    try {
      const token = localStorage.getItem("token");

      const dataToSend = {
        nombre: formData.nombre,
        ciudad: formData.ciudad.id,
        secciones: formData.secciones
      };

      const response = await UpdateRecinto(token, recintoId, dataToSend);

      setFormData({
        nombre: response.nombre,
        ciudad: response.ciudad, // objeto {id, nombre}
        secciones: response.secciones, // ahora con IDs reales y campos actualizados
        // img_card: response.img_card || null,
        // img_banner: response.img_banner || null,
      });
      toast.success("Recinto actualizado correctamente")
      setLoading(false);
      return true;
    } catch (err) {
      toast.error("Error al actualizar el recinto")
      setError(err);
      console.log(err);
      setLoading(false);
      return false;
    }
  };

  return {
    formData,
    updateField,
    updateSections,
    // updateFile,
    handleSubmit,
    loading,
    error
  };
};