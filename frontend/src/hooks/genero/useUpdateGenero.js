import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateGenero } from "../../services/generoServices";

export const useUpdateGenero = (initialData) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ⚡ Cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || ""
      });
    }
  }, [initialData]);

  // Actualizar campo simple
  const updateField = (valueOrEvent, field) => {
    if (valueOrEvent?.target) {
      const { id, value } = valueOrEvent.target;
      setFormData(prev => ({ ...prev, [id]: value }));
      setErrors(prev => ({ ...prev, [id]: null }));
    } else if (field) {
      setFormData(prev => ({ ...prev, [field]: valueOrEvent }));
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };


  // Validar
  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    else if (formData.nombre.length > 50) newErrors.nombre = "Máximo 50 caracteres";

    else if (formData.descripcion.length > 200) newErrors.descripcion = "Máximo 200 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar update
  const handleSubmit = async () => {
    setSuccess(false);

    if (!validate()) {
      toast.error("Corrige los errores antes de enviar");
      return false;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateGenero(initialData.id, formData, token);

      setFormData({
        nombre: response.nombre,
        descripcion: response.descripcion
      });
      setSuccess(true);
      setErrors({});
      toast.success("Género actualizado correctamente");
      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error al actualizar el género");
      setLoading(false);
      return false;
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    errors,
    loading,
    success
  };
};
