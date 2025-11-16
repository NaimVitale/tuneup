export function capitalizeWords(str: string) {
  if (!str || typeof str !== 'string') return str;

  return str
    .toLowerCase()
    .split(' ')
    .filter(w => w.trim() !== '')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}