import { useEffect, useState } from "react";
import { patchUser } from "../services/userServices";
import { useAuth } from "../context/AuthContext";

export const useUpdateUser = ({ userData }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: ""
  });

  const { updateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);  // ⬅️ ahora objeto por campo
  const [updatedUser, setUpdatedUser] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const data = updatedUser || userData;
    if (data) {
      setForm({
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        email: data.email || "",
      });
    }
  }, [userData, updatedUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((prev) => ({ ...prev, [id]: value }));

    // limpiar error solo del input editado
    setErrorUpdate((prev) => ({ ...prev, [id]: null, general: null }));

    setSuccess(false);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre no puede estar vacío.";

    if (!form.email.trim()) {
      newErrors.email = "El email no puede estar vacío.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email))
        newErrors.email = "El email no tiene un formato válido.";
    }

    const sinCambios =
      form.nombre === userData?.nombre &&
      form.apellido === userData?.apellido &&
      form.email === userData?.email;

    if (sinCambios) {
      newErrors.general = "No has realizado ningún cambio.";
    }

    return newErrors;
  };

  const handleSubmit = async (userId) => {
    setSuccess(false);
    setErrorUpdate({}); // limpiar errores previos

    const validationErrors = validateForm();

    // si hay cualquier error → NO continuar
    if (Object.keys(validationErrors).length > 0) {
      setErrorUpdate(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const data = await patchUser(userId, form, token);
      setUpdatedUser(data);

      // actualizar info local
      userData.nombre = form.nombre;
      userData.apellido = form.apellido;
      userData.email = form.email;

      updateUser(data);

      setSuccess(true);
      return data;
    } catch (err) {
      // error del backend → error general
      setErrorUpdate({ general: err.message || "Error inesperado" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    updatedUser,
    loading,
    errorUpdate,   // ⬅️ devuelves errores por campo
    success
  };
};
