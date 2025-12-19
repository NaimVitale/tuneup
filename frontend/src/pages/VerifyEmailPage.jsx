// VerifyEmailPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import { useVerifyEmail } from '../hooks/users/userVerifyEmail';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const { status, message } = useVerifyEmail(token);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D946EF] via-[#A21CAF] to-[#7C3AED] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Logo/Título */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#C122ED] to-[#D946EF] bg-clip-text text-transparent">
              TuneUp
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-[#C122ED] to-[#D946EF] mx-auto mt-3 rounded-full" />
          </div>

          {/* Estado de verificación */}
          <div className="mb-8">
            {status === 'loading' && (
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <Loader2 size={48} className="text-[#C122ED] animate-spin" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-[#C122ED]/20 rounded-full animate-ping" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Verificando tu cuenta
                  </h2>
                  <p className="text-gray-600">
                    Por favor espera un momento...
                  </p>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={48} className="text-green-600" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 mx-auto">
                    <div className="w-full h-full border-4 border-green-200 rounded-full animate-ping opacity-75" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Cuenta verificada! 🎉
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {message}
                  </p>
                  <p className="text-sm text-gray-500">
                    Serás redirigido al inicio de sesión en breve...
                  </p>
                </div>
                
                {/* Botón de acción */}
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C122ED] to-[#D946EF] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#D946EF] hover:to-[#C122ED] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Ir a Iniciar Sesión
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center">
                    <XCircle size={48} className="text-red-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Error en la verificación
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {message}
                  </p>
                  
                  {/* Sugerencias */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-amber-800 font-medium mb-2">
                      Posibles causas:
                    </p>
                    <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                      <li>El enlace ha expirado (24 horas)</li>
                      <li>El token ya fue utilizado</li>
                      <li>El enlace no es válido</li>
                    </ul>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-3xl font-semibold hover:bg-gray-200 transition-all duration-200"
                    >
                      Volver al Inicio
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer informativo */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda? Contacta con{' '}
              <a href="mailto:soporte@tuneup.com" className="text-[#C122ED] hover:underline font-medium">
                soporte@tuneup.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}