import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import ErrorMessages from "./ErrorMessages";

export default function InputSelect({
  value,
  onChange,
  options = [],
  placeholder = "Selecciona una opción",
  isLoading = false,
  type = "default",
  error 
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [typed, setTyped] = useState(""); // para letras escritas

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setTyped("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hourOptions =
    type === "hour"
      ? Array.from({ length: (24 - 12) * 2 }, (_, i) => {
          const h = Math.floor(i / 2) + 12;
          const hourStr = h.toString().padStart(2, "0");
          const m = i % 2 === 0 ? "00" : "30";
          return { label: `${hourStr}:${m}`, value: `${hourStr}:${m}` };
        })
      : options;

  // Manejar escritura para saltar a opción
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key.length === 1) { // letra o número
        const newTyped = typed + e.key.toLowerCase();
        setTyped(newTyped);

        const match = hourOptions.find(opt =>
          opt.label.toLowerCase().startsWith(newTyped)
        );
        if (match) onChange(match.value);

        // Limpiar buffer después de 1 segundo sin escribir
        clearTimeout(handleKeyDown.timeout);
        handleKeyDown.timeout = setTimeout(() => setTyped(""), 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typed, open, hourOptions, onChange]);

  return (
    <div className="w-full relative" ref={containerRef}>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => setOpen((o) => !o)}
        className={`w-full border rounded-full px-5 py-3 flex items-center justify-between
          bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C122ED]
          hover:border-[#C122ED] transition-colors  hover:cursor-pointer ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
      >
        <span className={!value ? "text-gray-600" : ""}>
          {isLoading
            ? "Cargando..."
            : value
            ? hourOptions.find((opt) => opt.value === value)?.label || value
            : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {error && (
              <ErrorMessages errors={error}></ErrorMessages>
      )}

      {open && !isLoading && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded-2xl shadow-lg overflow-y-auto max-h-64">
          {hourOptions.length > 0 ? (
            hourOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setTyped("");
                }}
                className={`px-5 py-2 cursor-pointer hover:bg-[#F7E8FB] transition ${
                  value === opt.value ? "bg-[#F0D4FA]" : ""
                }`}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="px-5 py-2 text-gray-500">Sin opciones disponibles</li>
          )}
        </ul>
      )}
    </div>
  );
}
