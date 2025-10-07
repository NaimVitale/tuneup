import { useState } from "react";
import { patchUserPassword } from "../services/userServices";

export const useUpdateUserPassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errorPassword) setErrorPassword(null);
    if (success) setSuccess(false);
  };

  const validateForm = () => {
    if (!form.oldPassword.trim()) return "Debes ingresar la contraseña actual.";
    if (!form.newPassword.trim()) return "Debes ingresar una nueva contraseña.";
    if (form.newPassword.length < 6)
      return "La nueva contraseña debe tener al menos 6 caracteres.";
    if (form.newPassword === form.oldPassword)
      return "La nueva contraseña debe ser diferente a la actual.";
    return null;
  };

  const handleSubmitPassword = async (userId) => {
    setErrorPassword(null);
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setErrorPassword(validationError);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await patchUserPassword(userId, {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      }, token);

      setForm({ oldPassword: "", newPassword: "" });
      setSuccess(true);
    } catch (err) {
      setErrorPassword(err.response?.data?.message || err.message || "Error al actualizar contraseña");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChangePassword,
    handleSubmitPassword,
    loading,
    errorPassword,
    success,
  };
};