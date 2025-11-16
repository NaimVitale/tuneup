import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useLoginForm } from "../hooks/useLoginForm"
import { Lock } from "lucide-react";

export default function LoginPage(){
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, loading, error } = useLoginForm(navigate);

    return(
        <div className="min-h-screen lg:h-screen flex justify-center items-center bg-gradient-to-br from-[#D946EF] via-[#A21CAF] to-[#7C3AED] p-4 relative overflow-hidden">
            
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Card principal */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 lg:p-10 backdrop-blur-sm">
                
                {/* Logo o decoración superior */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C122ED] to-[#9333EA] rounded-2xl flex items-center justify-center shadow-lg">
                        <Lock size={36} className="text-white" />
                    </div>
                </div>

                {/* Título */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        ¡Bienvenido de nuevo!
                    </h1>
                    <p className="text-gray-600">Inicia sesión para continuar</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div>
                        <InputForm 
                            label="Correo electrónico*" 
                            type="text" 
                            id="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            error={error?.email}
                        />
                    </div>

                    <div>
                        <InputForm 
                            label="Contraseña*" 
                            type="password" 
                            id="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            error={error?.unauthorized}
                        />
                    </div>

                    {/* Olvidé mi contraseña */}
                    {/*<div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-[#C122ED] hover:text-[#a01bc7] hover:underline transition-colors">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>*/}

                    {/* Botón submit */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#C122ED] to-[#9333EA] hover:from-[#a01bc7] hover:to-[#7c2db3] text-white font-bold py-4 rounded-full transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando sesión...
                            </span>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </button>

                    {/* Divisor */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">o</span>
                        </div>
                    </div>

                    {/* Link a registro */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            ¿No tienes cuenta?{" "}
                            <Link 
                                to="/register" 
                                className="text-[#C122ED] hover:text-[#a01bc7] font-semibold hover:underline transition-colors"
                            >
                                Regístrate gratis
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}