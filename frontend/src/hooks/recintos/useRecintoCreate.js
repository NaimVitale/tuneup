// hooks/useRecintoCreate.js
import { useState } from "react";
import { CreateRecinto } from "../../services/recintoServices";
import toast from "react-hot-toast";

export const useRecintoCreate = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    // img_card: null,
    // img_banner: null,
    secciones: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Actualizar campo simple
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Actualizar secciones
  const updateSections = (newSections) => {
    setFormData(prev => ({ ...prev, secciones: newSections }));
  };

  // Futuro: actualizar archivos
  // const updateFile = (field, file) => {
  //   setFormData(prev => ({ ...prev, [field]: file }));
  // };

  // Enviar creación
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const dataToSend = {
        nombre: formData.nombre,
        ciudad: formData.ciudad, // ID numérico
        secciones: formData.secciones?.length
          ? formData.secciones.map(s => ({
              nombre: s.nombre,
              capacidad: s.capacidad,
              tipo_svg: s.tipo_svg,
              svg_path: s.svg_path,
            }))
          : undefined,
        // img_card: formData.img_card,
        // img_banner: formData.img_banner,
      };

      const response = await CreateRecinto(token, dataToSend);

      toast.success("Recinto creado correctamente");

      // Limpiar formulario
      setFormData({
        nombre: "",
        ciudad: "",
        // img_card: null,
        // img_banner: null,
        secciones: [],
      });
      

      setLoading(false);
      return response;

    } catch (err) {
      console.error(err);
      setError(err);
      toast.error("Error al crear el recinto");
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
    error,
  };
};
