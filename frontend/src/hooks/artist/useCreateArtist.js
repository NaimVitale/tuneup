import { useState } from "react";
import toast from "react-hot-toast";
import { CreateArtist } from "../../services/artistServices";

export const useCreateArtist = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    img_card: "",
    img_hero: "",
    images: "",
    genero: "",
  });

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [newSlug, setNewSlug] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  const handleFileChange = (file, field) => {
    // Validar que sea imagen
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    // Opcional: limitar tamaño máximo (ej. 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast.error("El archivo excede el tamaño máximo de 5MB");
      return;
    }

    setFiles((prev) => ({ ...prev, [field]: file || null }));
  };

  const handleSelectChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria";
    if (!form.genero) newErrors.genero = "Debes seleccionar un género";
    if (!files.img_card) newErrors.img_card = "La imagen de tarjeta es obligatoria";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Por favor, completa los campos obligatorios");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const created = await CreateArtist(token, formData);

      toast.success("Artista creado correctamente");
      setNewSlug(created.slug);

      return created.slug;
    } catch (error) {
      toast.error("Error al crear el artista");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleFileChange,
    handleSelectChange,
    handleSubmit,
    newSlug,
    loading,
    errors
  };
};