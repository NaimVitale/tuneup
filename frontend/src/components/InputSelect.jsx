import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function InputSelect({
  value,
  onChange,
  options = [],
  placeholder = "Selecciona una opción",
  isLoading = false,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            ? options.find((opt) => opt.value === value)?.label || value
            : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && !isLoading && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded-2xl shadow-lg overflow-hidden">
          {options.length > 0 ? (
            options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
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