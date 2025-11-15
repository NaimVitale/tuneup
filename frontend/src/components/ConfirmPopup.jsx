
import { AlertCircle, X } from "lucide-react";

export default function ConfirmPopup({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform animate-scaleIn">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Icono de alerta */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 rounded-full p-4">
            <AlertCircle size={48} className="text-orange-500" />
          </div>
        </div>

        {/* Contenido */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          ¿Estás seguro?
        </h2>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          {message}
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-md active:scale-100"
          >
            Confirmar
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
