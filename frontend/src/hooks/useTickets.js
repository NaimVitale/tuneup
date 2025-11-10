import { useState } from "react";

export function useTickets(MAX_ENTRADAS_TOTAL = 6) {
  const [ticketsSeleccionados, setTicketsSeleccionados] = useState([]);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  const calcularTotalEntradas = () =>
    ticketsSeleccionados.reduce((total, ticket) => total + ticket.cantidad, 0);

  const manejarSeleccionSeccion = (seccion) => {
    const capacidadDisponible = seccion.capacidad_disponible ?? 0;
    const totalActual = calcularTotalEntradas();

    // ✅ Bloquear agregar si no queda disponibilidad o ya se llegó al máximo total
    if (capacidadDisponible <= 0 || totalActual >= MAX_ENTRADAS_TOTAL) return;

    setZonaSeleccionada(seccion);

    const existe = ticketsSeleccionados.find(t => t.seccion.id === seccion.id);
    if (!existe) {
      setTicketsSeleccionados(prev => [
        ...prev,
        { seccion, cantidad: 1 }
      ]);
    }
  };

  const actualizarCantidad = (seccionId, nuevaCantidad) => {
    const ticketActual = ticketsSeleccionados.find(t => t.seccion.id === seccionId);
    if (!ticketActual) return;

    const capacidadDisponible = ticketActual.seccion.capacidad_disponible ?? 0;

    // Entradas seleccionadas en otras secciones
    const otrasEntradas = calcularTotalEntradas() - ticketActual.cantidad;

    // ✅ Límite: disponibilidad sección + límite general
    const cantidadMax = Math.min(
      nuevaCantidad,
      MAX_ENTRADAS_TOTAL - otrasEntradas,
      capacidadDisponible
    );

    setTicketsSeleccionados(prev =>
      prev.map(ticket =>
        ticket.seccion.id === seccionId
          ? { ...ticket, cantidad: cantidadMax }
          : ticket
      )
    );
  };

  const eliminarTicket = (seccionId) => {
    setTicketsSeleccionados(prev =>
      prev.filter(ticket => ticket.seccion.id !== seccionId)
    );
    if (zonaSeleccionada?.id === seccionId) setZonaSeleccionada(null);
  };

  const calcularTotal = () =>
    ticketsSeleccionados.reduce(
      (total, ticket) =>
        total + (ticket.seccion.precio ?? 0) * ticket.cantidad,
      0
    );

  return {
    ticketsSeleccionados,
    zonaSeleccionada,
    manejarSeleccionSeccion,
    actualizarCantidad,
    eliminarTicket,
    calcularTotal,
    calcularTotalEntradas,
  };
}