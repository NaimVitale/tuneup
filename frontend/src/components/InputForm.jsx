import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputForm({ label, type = "text", id, value, onChange}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const isPassword = type === "password";
  const isTextarea = type === "textarea";

  const hasValue = value && value.length > 0;

  return (
    <div className="relative w-full flex items-center">
      {isTextarea ? (
              <textarea
          ref={inputRef}
          id={id}
          placeholder={label}
          className="peer w-full border rounded-2xl px-5 py-3 min-h-[120px] resize-y placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#C122ED]"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ):(
        <input
          ref={inputRef}
          type={isPassword && showPassword ? "text" : type}
          id={id}
          placeholder={label}
          className="peer w-full border rounded-full px-5 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#C122ED]"
          value={value}  
          onChange={onChange} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all bg-white px-1
          ${hasValue || isFocused ? "-top-2 text-sm text-[#C122ED]" : "top-3 text-md text-gray-500"}`}
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
