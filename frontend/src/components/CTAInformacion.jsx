import { ArrowRight, Bell, Star, Ticket } from "lucide-react";

export default function CTAinformacion() {
    return (
        <div className="relative bg-no-repeat bg-center bg-cover text-white py-16 md:py-24" 
             style={{ backgroundImage: `url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80)` }}>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#8a31e6]/85"></div>
            
            <div className='relative w-[90%] max-w-5xl m-auto'>
                <div className="flex flex-col items-center text-center">
                    {/* Título */}
                    <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
                        ¡No te pierdas ningún concierto!
                    </h2>
                    
                    {/* Descripción */}
                    <p className='text-lg md:text-xl text-white/90 max-w-2xl mb-10'>
                        Regístrate gratis y sé el primero en enterarte de nuevos shows, entradas anticipadas y noticias exclusivas de tus artistas favoritos.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                            <Ticket size={24} className="text-white flex-shrink-0" />
                            <span className="text-sm font-medium">Acceso anticipado</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                            <Bell size={24} className="text-white flex-shrink-0" />
                            <span className="text-sm font-medium">Notificaciones</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                            <Star size={24} className="text-white flex-shrink-0" />
                            <span className="text-sm font-medium">Contenido exclusivo</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <a 
                            href="/register"
                            className='flex items-center gap-2 bg-white text-[#C122ED] hover:bg-gray-100 font-semibold py-3 px-8 text-lg rounded-full transition-all shadow-lg hover:shadow-xl'
                        >
                            Registrarme gratis
                            <ArrowRight size={20} />
                        </a>
                        <a 
                            href="/login"
                            className='bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 px-8 text-lg rounded-full transition-all'
                        >
                            Ya tengo cuenta
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}