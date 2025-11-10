import { Calendar, MapPin, Ticket, Download, QrCode, CheckCircle } from "lucide-react";

// Componente CardProfileTicket
export default function CardProfileTicket({ entrada }) {
  console.log(entrada)
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'short',
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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-[#C122ED] transition-all duration-300 overflow-hidden group">
      
      {/* Header con estado */}
      <div className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Ticket className="text-white" size={20} />
          <span className="text-white font-semibold">Entrada #{entrada?.id}</span>
        </div>
        <span className={`${estadoBadge.bg} ${estadoBadge.text} text-xs font-semibold px-3 py-1 rounded-full`}>
          {estadoBadge.label}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5">
        
        {/* Artista */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#C122ED] transition-colors">
          {entrada?.concierto.artista.nombre}
        </h3>

        {/* Detalles */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3">
            <Calendar size={18} className="text-[#C122ED] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Fecha</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {formatFecha(entrada?.concierto.fecha)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-[#C122ED] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Ubicación</p>
              <p className="text-sm font-medium text-gray-900">
                {entrada?.concierto.recinto.nombre}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
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