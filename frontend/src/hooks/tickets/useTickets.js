import { useState } from "react";

export function useTickets(MAX_ENTRADAS_TOTAL = 6) {
  const [ticketsSeleccionados, setTicketsSeleccionados] = useState([]);
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  const calcularTotalEntradas = () =>
    ticketsSeleccionados.reduce((total, ticket) => total + ticket.cantidad, 0);

  const manejarSeleccionSeccion = (seccion) => {
    setZonaSeleccionada(seccion);

    const existe = ticketsSeleccionados.find(t => t.seccion.id === seccion.id);
    if (!existe && calcularTotalEntradas() < MAX_ENTRADAS_TOTAL) {
      setTicketsSeleccionados(prev => [...prev, { seccion, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (seccionId, nuevaCantidad) => {
    const ticketActual = ticketsSeleccionados.find(t => t.seccion.id === seccionId);
    const otrasEntradas = calcularTotalEntradas() - (ticketActual?.cantidad || 0);

    const cantidadMax = Math.min(
      nuevaCantidad,
      MAX_ENTRADAS_TOTAL - otrasEntradas,
      ticketActual?.seccion.capacidad ?? MAX_ENTRADAS_TOTAL
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
      (total, ticket) => total + (ticket.seccion.precio || 0) * ticket.cantidad,
      0
    );

  return {
    ticketsSeleccionados,
    zonaSeleccionada,
    manejarSeleccionSeccion,
    actualizarCantidad,
    eliminarTicket,
    calcularTotalEntradas,
    calcularTotal
  };
}