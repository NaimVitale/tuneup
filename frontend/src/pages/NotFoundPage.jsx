import { Music, Home } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D946EF] via-[#9333EA] to-[#6D28D9] p-4 overflow-hidden">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f3e0ff] rounded-full blur-3xl opacity-30 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e6d0ff] rounded-full blur-3xl opacity-30 -z-10"></div>

                <div className="text-center space-y-6">
                    <div className="relative inline-block">
                        <div className="text-[120px] md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C122ED] to-[#9333EA]">
                            404
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        ¡Ups! Te fuiste del backstage
                    </h1>

                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Lo que buscás no está en nuestro cartel. Quizás encuentres algo épico en estas opciones:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <a 
                            href="/" 
                            className="flex items-center gap-2 bg-[#C122ED] hover:bg-[#a01bc7] text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-md w-full sm:w-auto justify-center"
                        >
                            <Home size={20} />
                            Ir al inicio
                        </a>
                        <a 
                            href="/conciertos" 
                            className="flex items-center gap-2 bg-white hover:bg-[#f3e0ff] text-[#C122ED] font-semibold py-3 px-6 rounded-full transition-all duration-200 border-2 border-[#C122ED] hover:border-[#a01bc7] w-full sm:w-auto justify-center"
                        >
                            <Music size={20} />
                            Ver conciertos
                        </a>
                    </div>

                    <div className="flex justify-center gap-4 pt-8 opacity-30">
                        <Music size={24} className="text-[#C122ED] animate-bounce" style={{ animationDelay: '0s' }} />
                        <Music size={24} className="text-[#9333EA] animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <Music size={24} className="text-[#6D28D9] animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}