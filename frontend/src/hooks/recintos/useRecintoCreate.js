import { useState } from "react";
import toast from "react-hot-toast";
import { CreateRecinto } from "../../services/recintoServices";

export const useRecintoCreate = () => {
  const [form, setForm] = useState({
    nombre: "",
    ciudad: "",
    secciones: [],
  });

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const updateSections = (newSections) => {
    setForm(prev => ({ ...prev, secciones: newSections }));
  };

  const updateFile = (file, field) => {
    setFiles(prev => ({ ...prev, [field]: file || null }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.ciudad) newErrors.ciudad = "Debes seleccionar una ciudad";
    if (!files.img_card) newErrors.img_card = "La imagen de tarjeta es obligatoria";
    if (!files.img_hero) newErrors.img_hero = "La imagen banner es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Por favor, completa los campos obligatorios");
      return false;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("ciudad", form.ciudad);
      formData.append("secciones", JSON.stringify(form.secciones));

      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const response = await CreateRecinto(token, formData);
      toast.success("Recinto creado correctamente");

      // Limpiar formulario
      setForm({ nombre: "", ciudad: "", secciones: [] });
      setFiles({});
      setErrors({});
      return response;
    } catch (err) {
      console.error(err);
      toast.error(err?.error || "Error al crear el recinto");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    updateField,
    updateSections,
    updateFile,
    handleSubmit,
    loading,
    errors
  };
};