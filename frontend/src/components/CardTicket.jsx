import { X } from "lucide-react";

export default function CardTicket({ seccion, cantidad, onCantidadChange, onRemove, maxTotal, totalActual }) {
  const handleIncrement = () => {
    if (totalActual >= maxTotal) return;
    onCantidadChange(seccion.id, cantidad + 1);
  };

  const handleDecrement = () => {
    onCantidadChange(seccion.id, Math.max(cantidad - 1, 1));
  };

  const enLimiteMaximo = totalActual >= maxTotal;

  const total = (seccion.precio || 0) * cantidad;

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 border-2 border-[#C122ED]/20 hover:border-[#C122ED] transition-all">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Eliminar"
      >
        <X size={18} />
      </button>

      <div className="mb-3">
        <h4 className="font-semibold text-lg text-gray-800">{seccion.nombre}</h4>
        {seccion.precio !== undefined && (
          <p className="text-sm text-gray-600">Precio unitario: {seccion.precio}€</p>
        )}
        {seccion.capacidad !== undefined && (
          <p className="text-xs text-gray-500 mt-1">Disponibles: {seccion.capacidad}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={handleDecrement}
            disabled={cantidad <= 1}
          >
            <span className="text-lg font-semibold">-</span>
          </button>
          <span className="font-medium text-lg w-8 text-center">{cantidad}</span>
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleIncrement}
            disabled={enLimiteMaximo}
            title={enLimiteMaximo ? "Límite máximo alcanzado" : ""}
          >
            <span className="text-lg font-semibold">+</span>
          </button>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-[#C122ED]">{total.toFixed(2)}€</p>
        </div>
      </div>
    </div>
  );
}