import { useState } from "react";
import { createUser } from "../services/userServices";

export const useRegisterForm = (navigate) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const validateField = (id, value) => {
    switch (id) {
      case "nombre":
        if (!value.trim()) return "Nombre obligatorio";
        break;
      case "email":
        if (!value.trim()) return "Email obligatorio";
        else if (!/\S+@\S+\.\S+/.test(value)) return "Email inválido";
        break;
      case "password":
        if (!value) return "Contraseña obligatoria";
        else if (value.length < 6) return "Debe tener al menos 6 caracteres";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));

    const fieldError = validateField(id, value);
    setError((prev) => ({ ...prev, [id]: fieldError }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const fieldError = validateField(key, formData[key]);
      if (fieldError) errors[key] = fieldError;
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    setError({});
    try {
      const user = await createUser(formData);
      setFormData({ nombre: "", apellido: "", email: "", password: "" });
      navigate("/login")
    } catch (err) {
      const response = err
      if (response?.errors) {
        setError(response.errors);
      } else if (response?.field && response?.message) {
        setError({ [response.field]: response.message });
      } else {
        setError({ general: 'Error al registrar usuario' });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};