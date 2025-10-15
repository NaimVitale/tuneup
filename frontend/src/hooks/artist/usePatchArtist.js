import { useState, useEffect } from "react";
import { PatchArtist } from "../../services/artistServices";
import toast from "react-hot-toast";


export const usePatchArtist = (slug, artistData) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    img_card: "",
    img_hero: "",
    images: "",
  });

  const [files, setFiles] = useState({});

  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatedArtist, setUpdatedArtist] = useState(null);
  const [newSlug, setNewSlug] = useState(null);
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    const data = updatedArtist || artistData;
    if (data) {
      setForm({
        nombre: data.nombre || "",
        descripcion: data.descripcion || "",
        img_card: data.img_card || "",
        img_hero: data.img_hero || "",
        images: data.images || "",
      });
    }
  }, [artistData, updatedArtist]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  const handleFileChange = (file, field) => {
    setFiles((prev) => ({ ...prev, [field]: file || null }));
  };

  
  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre || form.nombre.trim() === "") {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!form.descripcion || form.descripcion.trim() === "") {
      newErrors.descripcion = "La descripción es obligatoria";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    const original = artistData || {};
    const textChanged = Object.keys(form).some((key) => form[key] !== (original[key] || ""));
    const fileChanged = Object.keys(files).length > 0;
    return textChanged || fileChanged;
  };

  const handleSubmit = async () => {
    setErrorUpdate(null);
    setSuccess(false);

    if (!validateForm()) {
      toast.error("Por favor, completa los campos obligatorios");
      return;
    }

    if (!hasChanges()) {
      toast.error("No hay cambios para actualizar");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const updated = await PatchArtist(token, slug, formData);
      setUpdatedArtist(updated);
      toast.success("Artista actualizado correctamente")
      setNewSlug(updated.slug)
      return updated.slug;
    } catch (error) {
      setErrorUpdate(error);
      toast.error(error)
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    newSlug,
    loading,
    errorUpdate,
    success,
    errors,
  };
};