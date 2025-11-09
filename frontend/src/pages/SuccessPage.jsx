import { data, Link, useLocation } from 'react-router-dom';
import { CheckCircle, Ticket, Calendar, MapPin, Download, Mail, Home } from 'lucide-react';
import { useGetCompra } from '../hooks/compra/useGetCompra';

export default function SuccessPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  const { data: compra, isLoading, isError } = useGetCompra(sessionId);

  console.log(compra)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#C122ED] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !compra) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <CheckCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error al cargar la compra</h1>
        <p className="text-gray-600">No se pudo encontrar la información de tu compra. Intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen bg-white flex items-center justify-center p-4 lg:p-6 lg:overflow-hidden">
      <div className="w-full max-w-6xl lg:h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-6 lg:mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-3">
            <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl lg:text-2xl font-bold text-gray-900 mb-2">¡Compra confirmada!</h1>
          <p className="text-sm text-gray-600">Orden #{compra.id} • {compra.usuario?.email}</p>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 lg:min-h-0">
          
          {/* Entradas */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 lg:p-4 lg:overflow-y-auto">
            <h2 className="text-xl lg:text-lg font-bold text-gray-900 mb-4 lg:mb-3 flex items-center gap-2 lg:sticky lg:top-0 lg:bg-gray-50 lg:pb-2">
              <Ticket className="text-[#C122ED]" size={22} />
              Tus entradas
            </h2>
            
            <div className="space-y-4 lg:space-y-3">
              {compra.entradas.map((entrada) => (
                <div 
                  key={entrada.id}
                  className="bg-white rounded-xl p-5 lg:p-4 border border-gray-200 hover:border-[#C122ED] transition-colors"
                >
                  <div className="flex justify-between items-start mb-3 lg:mb-2">
                    <h3 className="font-bold text-lg lg:text-base text-gray-900">{entrada.concierto.artista.nombre}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      {entrada.estado_entrada? "Confirmada" : "Cancelada"}
                    </span>
                  </div>
                  
                  <div className="space-y-2 lg:space-y-1.5 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} lg:size={14} className="text-[#C122ED]" />
                      <span>{new Date(entrada.concierto.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} lg:size={14} className="text-[#C122ED]" />
                      <Link to={`/recintos/${entrada.concierto.recinto.id}`} className='hover:underline'>{entrada.concierto.recinto.nombre}</Link>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                      {entrada.seccion.nombre} • <span className='text-[#C122ED]'>{entrada.precio.precio}€</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen y acciones */}
          <div className="flex flex-col gap-4 lg:gap-3">
            
            {/* Resumen total */}
            <div className="bg-gradient-to-br from-[#C122ED] to-[#9333EA] rounded-2xl p-6 lg:p-5 text-white">
              <p className="text-white/80 text-sm mb-1">Total pagado</p>
              <p className="text-5xl lg:text-4xl font-black mb-4">{compra.total}€</p>
              <div className="bg-white/20 rounded-xl p-4 lg:p-3 text-sm space-y-2 lg:space-y-1">
                <div className="flex justify-between">
                  <span className="text-white/80">Entradas:</span>
                  <span className="font-semibold">
                    {compra.entradas.length} uds
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Subtotal:</span>
                  <span className="font-semibold">{compra.total}€</span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3 lg:space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#C122ED] text-[#C122ED] hover:bg-[#f3e0ff] font-semibold py-3.5 lg:py-3 rounded-3xl transition-all">
                <Download size={20} lg:size={18} />
                Descargar PDF
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3.5 lg:py-3 rounded-3xl transition-all">
                <Mail size={20} lg:size={18} />
                Reenviar email
              </button>
            </div>

            {/* Info importante */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 lg:p-3 text-sm lg:text-xs text-blue-900">
              <p className="font-semibold mb-2">📋 Recuerda:</p>
              <ul className="space-y-1.5 lg:space-y-1 text-blue-800">
                <li>• Llega 30 minutos antes del evento</li>
                <li>• Presenta tu entrada digital o impresa</li>
                <li>• Guarda este email de confirmación</li>
              </ul>
            </div>

            {/* Botón volver */}
            <Link 
              to={'/'}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 lg:py-3 rounded-3xl transition-all"
            >
              <Home size={20} lg:size={18} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
