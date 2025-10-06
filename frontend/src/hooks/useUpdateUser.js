import { useEffect, useState } from "react";

export const useUpdateUser = ({userData}) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

    useEffect(() => {
    if (userData) {
      setForm({
        nombre: userData.nombre || '',
        apellido: userData.apellido || '',
        email: userData.email || '',
        telefono: userData.telefono || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return { form, handleChange };
}