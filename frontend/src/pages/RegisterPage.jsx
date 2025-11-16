import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useRegisterForm } from "../hooks/useRegisterForm"
import { Bell, CheckCircle, Shield, Sparkles, Ticket } from "lucide-react";

export default function RegisterPage(){
    
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, loading, error } = useRegisterForm(navigate);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#D946EF] via-[#9333EA] to-[#6D28D9] p-4 relative overflow-hidden">
            
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Card principal */}
            <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Columna izquierda - Beneficios */}
                    <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#C122ED] to-[#9333EA] p-12 text-white relative overflow-hidden">
                        
                        {/* Decoración */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                                    <Sparkles size={32} />
                                </div>
                                <h1 className="text-4xl font-black">Únete a TuneUp</h1>
                            </div>
                            
                            <h3 className="text-2xl font-semibold mb-8 text-white/90">
                                Disfruta de ventajas exclusivas
                            </h3>
                            
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                                    <CheckCircle className="flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="font-semibold mb-1">Ofertas exclusivas</p>
                                        <p className="text-sm text-white/80">Accede a promociones especiales antes que nadie</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                                    <Ticket className="flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="font-semibold mb-1">Guarda favoritos</p>
                                        <p className="text-sm text-white/80">Ten tus eventos favoritos siempre a mano</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                                    <Bell className="flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="font-semibold mb-1">Alertas personalizadas</p>
                                        <p className="text-sm text-white/80">Recibe notificaciones de tus artistas favoritos</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                                    <Shield className="flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="font-semibold mb-1">Compras seguras</p>
                                        <p className="text-sm text-white/80">Gestiona tus entradas de forma protegida</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Columna derecha - Formulario */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        
                        {/* Header móvil */}
                        <div className="lg:hidden text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Crear cuenta</h2>
                            <p className="text-gray-600">Únete a miles de fans</p>
                        </div>

                        {/* Header desktop */}
                        <div className="hidden lg:block mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear tu cuenta</h2>
                            <p className="text-gray-600">Es rápido y gratis</p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputForm 
                                    label="Nombre*" 
                                    type="text" 
                                    id="nombre" 
                                    value={formData.nombre} 
                                    onChange={handleChange} 
                                    error={error?.nombre}
                                />
                                <InputForm 
                                    label="Apellido" 
                                    type="text" 
                                    id="apellido" 
                                    value={formData.apellido} 
                                    onChange={handleChange} 
                                    error={error?.apellido}
                                />
                            </div>

                            <InputForm 
                                label="Correo electrónico*" 
                                type="email" 
                                id="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                error={error?.email}
                            />

                            <InputForm 
                                label="Contraseña*" 
                                type="password" 
                                id="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                error={error?.password}
                            />

                            {/* Términos y condiciones */}
                            <p className="text-xs text-gray-500 mt-4">
                                Al registrarte, aceptas nuestros{" "}
                                <Link to="/terminos" className="text-[#C122ED] hover:underline">
                                    Términos y Condiciones
                                </Link>{" "}
                                y{" "}
                                <Link to="/privacidad" className="text-[#C122ED] hover:underline">
                                    Política de Privacidad
                                </Link>
                            </p>

                            {/* Botón submit */}
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#C122ED] to-[#9333EA] hover:from-[#a01bc7] hover:to-[#7c2db3] text-white font-bold py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creando cuenta...
                                    </span>
                                ) : (
                                    "Crear cuenta gratis"
                                )}
                            </button>

                            {/* Link a login */}
                            <div className="text-center mt-6">
                                <p className="text-gray-600">
                                    ¿Ya tienes cuenta?{" "}
                                    <Link 
                                        to="/login" 
                                        className="text-[#C122ED] hover:text-[#a01bc7] font-semibold hover:underline transition-colors"
                                    >
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}