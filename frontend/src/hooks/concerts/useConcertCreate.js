import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSeccionesByRecinto } from "../../services/seccionServices";
import { CreateConcierto } from "../../services/concertServices";

export const useConcertCreate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ token, data }) => CreateConcierto(token, data),
    onSuccess: () => {
      toast.success("Concierto creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["conciertos"] });
    },
    onError: () => {
      toast.error("Error al crear el concierto");
    }
  });

  const [form, setForm] = useState({
    id_artista: "",
    id_recinto: "",
    secciones: []
  });

  const [fecha, setFecha] = useState(""); // YYYY-MM-DD
  const [hora, setHora] = useState("");   // HH:MM

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const e = {};
    if (!form.id_artista) e.id_artista = "Seleccione un artista";
    if (!form.id_recinto) e.id_recinto = "Seleccione un recinto";
    if (!fecha) e.fecha = "Seleccione una fecha";
    if (!hora) e.hora = "Seleccione una hora";
    if (form.secciones.every(s => s.precio <= 0))
      e.precio = "Debe asignar al menos un precio a una sección";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const getISOFechaHora = () =>
    fecha && hora ? `${fecha}T${hora}:00` : null;

  const handleSelectChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const updateSections = (sections) => {
    setForm(prev => ({ ...prev, secciones: sections }));
  };

  const handleRecintoChange = async (id_recinto) => {
    handleSelectChange("id_recinto", id_recinto);

    try {
      const secciones = await getSeccionesByRecinto(id_recinto);

      const mapped = secciones.map(s => ({
        id: s.id,
        nombre: s.nombre,
        capacidad: s.capacidad,
        precio: 0 // default
      }));

      setForm(prev => ({
        ...prev,
        secciones: mapped
      }));

    } catch (err) {
      toast.error("Error al cargar secciones");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Faltan datos obligatorios");
      return;
    }

    const token = localStorage.getItem("token");

    const dataToSend = {
      id_artista: form.id_artista,
      id_recinto: form.id_recinto,
      fecha: getISOFechaHora(),
      preciosPorSeccion: form.secciones
        .filter(s => s.precio > 0)
        .map(s => ({
          id_seccion: s.id,
          precio: s.precio
        }))
    };

    const success = await mutation.mutateAsync({ token, data: dataToSend });
    return !!success;
  };

  return {
    form,
    fecha, setFecha,
    hora, setHora,
    handleSelectChange,
    handleRecintoChange,
    updateSections,
    handleSubmit,
    loading: mutation.isPending,
    errors
  };
};
