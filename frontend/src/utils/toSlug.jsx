// utils/slug.js
export const toSlug = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")       // espacios por guiones
    .replace(/[^\w-]/g, "");  // quitar caracteres no alfanuméricos salvo guión
