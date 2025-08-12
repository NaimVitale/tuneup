export default function dateFormat(fechaISO) {
  if (!fechaISO) return '';

  const fecha = new Date(fechaISO);

  return fecha.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}