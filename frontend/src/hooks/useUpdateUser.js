import { useEffect, useState } from "react";
import { patchUser } from "../services/userServices";
import { useAuth } from "../context/AuthContext";

export const useUpdateUser = ({ userData}) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: ""
  });

  const {updateUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
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
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (errorUpdate) setErrorUpdate(null);
    if (success) setSuccess(false); 
  };

   const validateForm = () => {
    if (!form.nombre.trim()) return "El nombre no puede estar vacío.";
    if (!form.email.trim()) return "El email no puede estar vacío.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "El email no tiene un formato válido.";

    const sinCambios =
      form.nombre === userData?.nombre &&
      form.apellido === userData?.apellido &&
      form.email === userData?.email;

    if (sinCambios) return "No has realizado ningún cambio.";

    return null;
  };

  const handleSubmit = async (userId) => {
    setSuccess(false);
    setErrorUpdate(null);
    const validationError = validateForm();
    if (validationError) {
      setErrorUpdate(validationError);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      setLoading(true);
      setErrorUpdate(null);

      const data = await patchUser(userId, form, token);
      setUpdatedUser(data);
      
      userData.nombre = form.nombre;
      userData.apellido = form.apellido;
      userData.email = form.email;

      updateUser({
        nombre: form.nombre,
      });

      setSuccess(true);
      return data;
    } catch (err) {
      setErrorUpdate(err);
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
    errorUpdate,
    success
  };
};