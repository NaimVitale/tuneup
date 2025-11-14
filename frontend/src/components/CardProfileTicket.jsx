import { Calendar, MapPin, Ticket, CheckCircle } from "lucide-react";

// Componente CardProfileTicket
export default function CardProfileTicket({ entrada }) {
  console.log(entrada)
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      activa: { bg: 'bg-green-100', text: 'text-green-700', label: 'Activa' },
      usada: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Usada' },
      cancelada: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelada' }
    };
    return estados[estado] || estados.activa;
  };

  const estadoBadge = getEstadoBadge(entrada?.estado_entrada);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 overflow-hidden group">
      
      {/* Header con estado */}
      <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-4 flex justify-between items-center">
        <div className="gap-2">
          <div className="flex gap-2">
            <Ticket className="text-white mt-1.5" size={20} />
            <h3 className="text-xl font-bold text-white transition-colors">
            {entrada?.concierto.artista.nombre}</h3>
          </div>
        </div>
        <span className={`${estadoBadge.bg} ${estadoBadge.text} text-xs font-semibold px-3 py-1 rounded-full`}>
          {estadoBadge.label}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Detalles */}
        <div className="space-y-3 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-[#C122ED] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Fecha</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {formatFecha(entrada?.concierto.fecha)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[#C122ED] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Ubicación</p>
              <p className="text-sm font-medium text-gray-900">
                {entrada?.concierto.recinto.nombre}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-[#C122ED] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Sección</p>
              <p className="text-sm font-medium text-gray-900">
                {entrada?.seccion.nombre}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        {/*entrada?.estado_entrada === 'activa' && (
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#C122ED] hover:bg-[#a01bc7] text-white font-semibold py-2.5 rounded-xl transition-all">
              <QrCode size={16} />
              Ver QR
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition-all">
              <Download size={16} />
            </button>
          </div>
        )*/}
      </div>
    </div>
  );
}