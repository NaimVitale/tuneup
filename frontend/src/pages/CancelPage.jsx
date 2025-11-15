import { XCircle, RefreshCw, Home, ShoppingCart, MessageCircle, PhoneIcon, Mail, CircleQuestionMark } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 lg:overflow-hidden">
      <div className="w-full max-w-4xl lg:h-[90vh] flex items-center justify-center">
        
        <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Columna izquierda - Mensaje */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
                <XCircle size={40} className="text-orange-500" strokeWidth={2} />
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Algo salio mal
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                No te preocupes, no se realizó ningún cargo. Tus entradas siguen disponibles para cuando estés listo.
              </p>

              {/* Posibles razones */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">¿Qué pudo pasar?</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Se canceló el proceso de pago</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Hubo un problema con el método de pago</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>La sesión expiró por inactividad</span>
                  </li>
                </ul>
              </div>

              {/* Acciones principales */}
              <div className="space-y-3">             
                <a 
                  href="/conciertos"
                  className="flex items-center justify-center gap-3 w-full bg-white border-2 border-[#C122ED] text-[#C122ED] hover:bg-[#f3e0ff] font-semibold py-4 rounded-full transition-all"
                >
                  <ShoppingCart size={20} />
                  Seguir comprando
                </a>
              </div>
            </div>

            {/* Columna derecha - Soporte/Info */}
            <div className="bg-gradient-to-br from-[#C122ED] to-[#9333EA] p-8 lg:p-10 text-white flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6">¿Necesitas ayuda?</h2>
              
              <div className="space-y-6 mb-8">

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={24}></Mail>
                    <div>
                      <p className="font-semibold text-sm">Email</p>
                      <a href="mailto:soporte@tuneup.com" className="text-sm text-white/90 hover:text-white transition-colors">
                        soporte@tuneup.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <PhoneIcon size={24}></PhoneIcon>
                    <div>
                      <p className="font-semibold text-sm">Teléfono</p>
                      <a href="tel:+34900123456" className="text-sm text-white/90 hover:text-white transition-colors">
                        +34 900 123 456
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CircleQuestionMark size={24}/>
                    <div>
                      <p className="font-semibold text-sm">Centro de ayuda</p>
                      <a href="/faq" className="text-sm text-white/90 hover:text-white transition-colors">
                        Ver preguntas frecuentes
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <p className="text-sm text-white/80 mb-4">
                  💡 <strong>Consejo:</strong> Verifica que tu tarjeta tenga fondos suficientes y esté habilitada para compras online.
                </p>
              </div>
            </div>
          </div>

          {/* Footer con botón home */}
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Tus entradas reservadas se liberarán en <strong className="text-[#C122ED]">15 minutos</strong>
              </p>
              <a 
                href="/"
                className="flex items-center gap-2 text-gray-700 hover:text-[#C122ED] font-medium transition-colors"
              >
                <Home size={18} />
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}