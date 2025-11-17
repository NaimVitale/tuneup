import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateConcierto } from "../../services/concertServices";
import { getSeccionesByRecinto } from "../../services/seccionServices";

export const useConcertUpdate = (slug, initialData) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ token, slug, data }) => UpdateConcierto(token, slug, data),
    onSuccess: () => {
      toast.success("Concierto actualizado correctamente");

      // ✅ Invalidar queries relacionadas con este concierto
      queryClient.invalidateQueries({ queryKey: ["conciertos"] });
      queryClient.invalidateQueries({ queryKey: ["concierto", slug] });
      queryClient.invalidateQueries({ queryKey: ['concierto-public', slug] });
    },
    onError: () => {
      toast.error("Error al actualizar concierto");
    }
  });

  // ----------------------------
  // Estados principales
  // ----------------------------
  const [form, setForm] = useState({
    id_artista: "",
    id_recinto: "",
    fecha: "",
    fecha_venta: "",
    secciones: []
  });

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [horaVenta, setHoraVenta] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // ----------------------------
  // Inicialización de datos
  // ----------------------------
  useEffect(() => {
    if (!initialData) return;

    const seccionesConPrecios = initialData.recinto?.secciones?.map(s => {
      const precioObj = initialData.preciosPorSeccion?.find(p => p.seccion.id === s.id);
      return {
        id: s.id,
        nombre: s.nombre,
        precio: precioObj?.precio ?? 0,
        id_precio: precioObj?.id,
        capacidad: s.capacidad // <--- agregado
      };
    }) || [];

    setForm({
      id_artista: initialData.artista?.id || "",
      id_recinto: initialData.recinto?.id || "",
      fecha: initialData.fecha || "",
      secciones: seccionesConPrecios
    });

    if (initialData.fecha) {
      const d = new Date(initialData.fecha);
      setFecha(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
      setHora(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`);
    }

    if (initialData.fecha_venta) {
      const dVenta = new Date(initialData.fecha_venta);
      setFechaVenta(`${dVenta.getFullYear()}-${String(dVenta.getMonth()+1).padStart(2,'0')}-${String(dVenta.getDate()).padStart(2,'0')}`);
      setHoraVenta(`${String(dVenta.getHours()).padStart(2,'0')}:${String(dVenta.getMinutes()).padStart(2,'0')}`);
    } else {
      setFechaVenta("");
      setHoraVenta("");
    }

  }, [initialData]);

  // ----------------------------
  // Handlers de formulario
  // ----------------------------
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.id]: "" }));
  };

  const handleSelectChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const updateSections = (newSections) => {
    setForm(prev => ({ ...prev, secciones: newSections }));
  };

  // ----------------------------
  // Validación
  // ----------------------------
  const validateForm = () => {
    const newErrors = {};
    if (!form.id_artista) newErrors.id_artista = "Seleccione un artista";
    if (!form.id_recinto) newErrors.id_recinto = "Seleccione un recinto";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------
  // Helper para fecha ISO
  // ----------------------------
  const getISOFechaHora = () => {
    if (!fecha || !hora) return null;
    return `${fecha}T${hora}:00`;
  };

  const getISOFechaVenta = () => {
    if (!fechaVenta || !horaVenta) return null;
    return `${fechaVenta}T${horaVenta}:00`;
  };


  // ----------------------------
  // Cambio de recinto
  // ----------------------------
  const handleRecintoChange = async (id_recinto) => {
    handleSelectChange("id_recinto", id_recinto);

    try {
      const secciones = await getSeccionesByRecinto(id_recinto, slug);

      const seccionesConPrecios = secciones.map(s => ({
        id: s.id,
        nombre: s.nombre,
        precio: s.precio ?? 0,
        id_precio: s.id_precio,
        capacidad: s.capacidad // <--- agregado
      }));

      setForm(prev => ({ ...prev, secciones: seccionesConPrecios }));
    } catch (err) {
      toast.error("Error al cargar secciones del recinto");
    }
  };

  // ----------------------------
  // Envío del formulario
  // ----------------------------
  const handleSubmit = async () => {
    setErrorUpdate(null);
    setSuccess(false);

    if (!validateForm()) {
      toast.error("Por favor, completa los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const dataToSend = {
        id_artista: form.id_artista,
        id_recinto: form.id_recinto,
        fecha: getISOFechaHora(),
        fecha_venta: getISOFechaVenta(),
        preciosPorSeccion: form.secciones.map(s => ({
          id: s.id_precio,
          id_seccion: s.id,
          precio: s.precio
        }))
      };

      await mutation.mutateAsync({ token, slug, data: dataToSend });
      setSuccess(true);
      return true;

    } catch (err) {
      setErrorUpdate(err);
      console.error(err);
      return false;

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSelectChange,
    updateSections,
    handleRecintoChange,
    fecha,
    setFecha,
    hora,
    setHora,
    fechaVenta,
    setFechaVenta,
    horaVenta,
    setHoraVenta,
    handleSubmit,
    loading: mutation.isPending,
    success,
    errorUpdate,
    errors
  };
};