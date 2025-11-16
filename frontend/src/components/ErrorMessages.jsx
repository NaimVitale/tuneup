import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorMessages({ errors }) {
  const errorList = Array.isArray(errors) ? errors : [errors];
  const filteredErrors = errorList.filter(err => err && err.trim() !== "");

  const [visibleErrors, setVisibleErrors] = useState(filteredErrors);

  useEffect(() => {
    setVisibleErrors(filteredErrors);
    if (filteredErrors.length > 0) {
      const timer = setTimeout(() => setVisibleErrors([]), 5000); // desaparece en 5s
      return () => clearTimeout(timer);
    }
  }, [filteredErrors]);

  if (visibleErrors.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      {visibleErrors.map((err, index) => (
        <div key={index} className="flex items-center gap-2 text-red-600 text-sm animate-shake">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{err}</span>
        </div>
      ))}
    </div>
  );
}