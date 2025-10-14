import React, { useState, useEffect } from "react";
import { PatchArtist } from "../../services/artistServices";

export const usePatchArtist = (slug, artistData) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    img_card: "",
    img_hero: "",
    images: "",
  });

  console.log(artistData)

  const [files, setFiles] = useState({});

  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatedArtist, setUpdatedArtist] = useState(null);
  const [newSlug, setNewSlug] = useState(null);

  
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
  };

  const handleFileChange = (file, field) => {
    setFiles((prev) => ({ ...prev, [field]: file || null }));
    if (file) setForm((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setErrorUpdate(null);
    setSuccess(false);
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
      setSuccess(true);
      setNewSlug(updated.slug)
      return updated.slug;
    } catch (error) {
      setErrorUpdate(error);
      console.log(error)
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
  };
};