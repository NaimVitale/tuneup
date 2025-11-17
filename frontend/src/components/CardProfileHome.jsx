import { Music, Settings, Ticket, Calendar, MapPin } from "lucide-react";
import CardProfileTicket from "./CardProfileTicket";

export default function CardProfileHome({ usuario, entradas = [] }) {
    const hasEntradas = entradas && entradas.length > 0;
    
    return (
        <div className="bg-white py-6 px-4 md:px-8 rounded-2xl shadow-md pb-10">
            {/* Header del perfil */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img 
                            src={usuario?.avatar || "https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png"} 
                            alt={usuario?.nombre}
                            className="h-20 w-20 rounded-full object-cover ring-4 ring-[#f3e0ff]" 
                            loading="lazy"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-[#C122ED] rounded-full p-1.5">
                            <Ticket size={14} className="text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-semibold text-gray-900">{usuario?.nombre || "Usuario"}</p>
                        <p className="text-sm text-gray-500">
                            Miembro desde {usuario?.fecha ? new Date(usuario.fecha).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'hace poco'}
                        </p>
                    </div>
                </div>
                
                {/* Botón de ajustes */}
                <a 
                    href={`/perfil/ajustes/${usuario?.id || ''}`}
                    className="p-3 hover:bg-[#f3e0ff] rounded-full transition-colors group hidden md:block"
                    title="Ajustes del perfil"
                >
                    <Settings size={32} className="text-gray-400 group-hover:text-[#C122ED] group-hover:rotate-90 transition-all duration-300" />
                </a>
            </div>

            <div className="border-t border-[#f3e0ff] my-6"></div>

            {/* Sección de entradas */}
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <h3 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                        <Ticket className="text-[#C122ED]" size={24} />
                        Mis últimas entradas
                    </h3>
                    {hasEntradas && (
                        <a 
                            href={`/perfil/entradas/${usuario?.id}`}
                            className='text-sm text-[#C122ED] hover:text-[#a01bc7] font-medium hover:underline transition-colors'
                        >
                            Ver todas
                        </a>
                    )}
                </div>

                {hasEntradas ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {entradas.slice(0, 4).map((entrada) => (
                            <CardProfileTicket entrada={entrada} key={entrada.id} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <Ticket size={48} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-2 font-medium">No tienes entradas todavía</p>
                        <p className="text-sm text-gray-400 mb-4">Explora conciertos y consigue tus entradas</p>
                        <a 
                            href="/conciertos"
                            className="inline-flex items-center gap-2 bg-[#C122ED] hover:bg-[#a01bc7] text-white font-semibold px-6 py-2.5 rounded-full transition-all"
                        >
                            Explorar conciertos
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}