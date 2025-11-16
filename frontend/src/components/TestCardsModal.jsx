import { useState } from "react";
import { CreditCard, CheckCircle, X, Copy, Check } from "lucide-react";

export default function TestCardsModal({ open, onClose }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [copiedCardId, setCopiedCardId] = useState(null); // 👈 CAMBIO

  const cards = [
    {
      id: 1,
      type: "Pago exitoso",
      number: "4242 4242 4242 4242",
      icon: "✅",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      id: 2,
      type: "3D Secure",
      number: "4000 0027 6000 3184",
      icon: "🔒",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: 3,
      type: "Fondos insuficientes",
      number: "4000 0000 0000 9995",
      icon: "⚠️",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
    {
      id: 4,
      type: "Pago fallido",
      number: "4000 0000 0000 0002",
      icon: "❌",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ];

  if (!open) return null;

  const handleCopy = (id, number) => {
    navigator.clipboard.writeText(number.replace(/\s/g, ""));
    setCopiedCardId(id); // 👈 CAMBIO
    setTimeout(() => setCopiedCardId(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <CreditCard size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tarjetas de prueba</h2>
              <p className="text-white/80 text-sm">Stripe Test Mode</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Selecciona una tarjeta para simular diferentes escenarios de pago
          </p>

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`relative p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                  selectedCard?.id === card.id
                    ? `${card.borderColor} ${card.bgColor} shadow-lg scale-105`
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {/* Checkmark */}
                {selectedCard?.id === card.id && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle size={24} className={card.textColor} />
                  </div>
                )}

                {/* Contenido */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{card.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{card.type}</h3>
                    <p className="text-sm text-gray-600 font-mono">{card.number}</p>
                  </div>
                </div>

                {/* Botón copiar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(card.id, card.number); // 👈 CAMBIO
                  }}
                  className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    copiedCardId === card.id
                      ? `${card.bgColor} ${card.textColor}`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {copiedCardId === card.id ? (
                    <>
                      <Check size={14} />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copiar número
                    </>
                  )}
                </button>
              </button>
            ))}
          </div>

          {/* Información */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>💡 Datos adicionales:</strong> Usa cualquier fecha futura, CVV (3 dígitos) y código postal válido.
            </p>
          </div>

          {/* Tarjeta seleccionada */}
          {selectedCard && (
            <div className="mb-6 p-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <CreditCard size={32} className="text-white/80" />
                  <span className="text-2xl">{selectedCard.icon}</span>
                </div>
                <p className="text-xl font-mono tracking-wider mb-4">
                  {selectedCard.number}
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/60 mb-1">Tipo de prueba</p>
                    <p className="font-semibold">{selectedCard.type}</p>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-8 opacity-80"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Cerrar */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#C122ED] to-[#9333EA] hover:from-[#a01bc7] hover:to-[#7c2db3] text-white font-bold py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Entendido
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
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
