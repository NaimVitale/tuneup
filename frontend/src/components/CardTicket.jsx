import { X, Plus, Minus, Ticket } from "lucide-react";

export default function CardTicket({ seccion, cantidad, onCantidadChange, onRemove, maxTotal, totalActual }) {
  const handleIncrement = () => {
    if (cantidad >= (seccion.capacidad_disponible ?? maxTotal)) return;
    if (totalActual >= maxTotal) return;
    onCantidadChange(seccion.id, cantidad + 1);
  };

  const handleDecrement = () => {
    onCantidadChange(seccion.id, Math.max(cantidad - 1, 1));
  };

  const enLimiteMaximo = totalActual >= maxTotal || cantidad >= (seccion.capacidad_disponible ?? maxTotal);
  const total = (seccion.precio || 0) * cantidad;

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-[#C122ED]/30 transition-all duration-300 group">
      
      {/* Botón eliminar */}
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-full transition-all duration-200"
        aria-label="Eliminar"
      >
        <X size={16} />
      </button>

      {/* Header con icono */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 bg-[#f3e0ff] rounded-xl transition-colors">
          <Ticket size={20} className="text-[#C122ED] transition-colors" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-xl text-gray-900 mb-1">{seccion.nombre}</h4>
          {seccion.precio !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Precio:</span>
              <span className="font-semibold text-[#C122ED]">{seccion.precio}€</span>
            </div>
          )}
        </div>
      </div>

      {/* Capacidad disponible */}
      {seccion.capacidad !== undefined && (
        <div className="mb-4 flex items-end justify-end gap-2">
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
            {seccion.capacidad_disponible} disponibles
          </span>
        </div>
      )}

      {/* Controles y total */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        
        {/* Selector de cantidad */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-[#f3e0ff] text-gray-700 hover:text-[#C122ED] rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDecrement}
            disabled={cantidad <= 1}
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>
          
          <div className="w-14 h-10 flex items-center justify-center bg-[#f3e0ff] rounded-xl">
            <span className="font-bold text-lg text-[#C122ED]">{cantidad}</span>
          </div>
          
          <button
            className="w-10 h-10 flex items-center justify-center bg-[#C122ED] hover:bg-[#a01bc7] text-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            onClick={handleIncrement}
            disabled={enLimiteMaximo}
            title={enLimiteMaximo ? "Límite máximo alcanzado" : ""}
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
          <p className="text-xl font-black text-[#C122ED]">{total.toFixed(2)}€</p>
        </div>
      </div>

      {/* Alerta de límite */}
      {enLimiteMaximo && (
      <div className="mt-3 text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg flex items-center gap-2">
        <span>⚠️</span>
        <span>
          {cantidad >= (seccion.capacidad_disponible ?? maxTotal)
            ? "No hay más entradas disponibles en esta sección"
            : "Límite máximo de entradas alcanzado"}
        </span>
      </div>
    )}
    </div>
  );
}