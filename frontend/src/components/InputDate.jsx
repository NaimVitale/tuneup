import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function InputDate({ value, onChange, placeholder = "Selecciona una fecha", disabledDates }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const formattedValue = value ? new Date(value).toLocaleDateString("es-ES") : "";

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
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full border rounded-full px-5 py-3 flex items-center justify-between
          bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C122ED]
          hover:border-[#C122ED] transition`}
      >
        <span className={!formattedValue ? "text-gray-600" : ""}>
          {formattedValue || placeholder}
        </span>
        <Calendar size={20} className="text-gray-400" />
      </button>

      {/* Calendario popover */}
      {open && (
        <div className="absolute z-50 mt-2">
          <DayPicker
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={disabledDates}
            className="bg-white rounded-2xl shadow-lg p-3 border border-gray-200"
          />
        </div>
      )}
    </div>
  );
}