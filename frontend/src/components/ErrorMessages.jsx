import { useEffect, useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorMessages({ errors }) {

  // Memoriza los errores — solo cambia cuando cambia `errors`
  const filteredErrors = useMemo(() => {
    const list = Array.isArray(errors) ? errors : [errors];
    return list.filter(err => typeof err === "string" && err.trim() !== "");
  }, [errors]);

  const [visibleErrors, setVisibleErrors] = useState(filteredErrors);

  useEffect(() => {
    // Actualiza visibles cuando cambian realmente los errores
    setVisibleErrors(filteredErrors);

    // Timer de desaparición
    if (filteredErrors.length > 0) {
      const timer = setTimeout(() => setVisibleErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [filteredErrors]);

  if (visibleErrors.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      {visibleErrors.map((err, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-red-600 text-sm animate-shake"
        >
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{err}</span>
        </div>
      ))}
    </div>
  );
}
