import { useState, useRef, useEffect } from "react";
import { Trash2, Upload } from "lucide-react";

export default function InputFile({ label = "Imagen", onChange, field, initialUrl }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    if (onChange) onChange(file, field);
  };

  const handleRemove = () => {
    setPreview(null);
    fileInputRef.current.value = "";
    if (onChange) onChange(null, field);
  };

  const handleSelect = () => fileInputRef.current.click();

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="font-medium text-lg">{label}</label>
      <div className="relative w-full h-[300px]">
        <img
          src={preview || initialUrl}
          alt="Vista previa"
          className="w-full h-full object-cover rounded-2xl border shadow-sm"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button type="button" onClick={handleSelect} className="flex items-center bg-gray-100 bg-opacity-25 gap-1 px-3 py-1.5 rounded-full shadow">
            <Upload size={16} /> {preview ? "Cambiar" : "Seleccionar"}
          </button>
          {preview && (
            <button type="button" onClick={handleRemove} className="flex items-center gap-1 px-3 py-1.5 rounded-full shadow">
              <Trash2 size={16} /> Eliminar
            </button>
          )}
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
