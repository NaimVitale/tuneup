export function dateFormatWithTime(fechaISO) {
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

export function dateFormatDateOnly(fechaISO) {
  if (!fechaISO) return '';

  const fecha = new Date(fechaISO);

  return fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}