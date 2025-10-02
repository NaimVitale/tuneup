import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputForm({ label, type = "text", id }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative w-full flex items-center">
      <input
        type={isPassword && showPassword ? "text" : type}
        id={id}
        placeholder={label}
        className="peer w-full border rounded-full px-5 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#C122ED]"
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 transition-all
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 
                   peer-placeholder-shown:text-md
                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#C122ED] bg-white px-1"
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 text-gray-500 top-4"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

    </div>
  );
}