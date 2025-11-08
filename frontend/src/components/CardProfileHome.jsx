import { Music, Settings, User2Icon } from "lucide-react";
import { dateFormatDateOnly } from "../utils/dateFormat"
import CardSpotifySong from "./CardSpotifySong"

export default function CardProfileHome({ usuario, canciones = [] }) {
    const hasSpotify = canciones && canciones.length > 0;

    return (
        <div className="bg-white py-6 px-4 md:px-8 rounded-2xl shadow-md">
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
                            <Music size={14} className="text-white" />
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

            {/* Sección de música */}
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <h3 className='text-xl font-semibold text-gray-900'>Mi música</h3>
                    {!hasSpotify && (
                        <button className='text-sm text-[#C122ED] hover:text-[#a01bc7] font-medium flex items-center gap-2 bg-[#f3e0ff] hover:bg-[#e6d0ff] px-4 py-2 rounded-full transition-colors'>
                            Conectar con Spotify 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
                                <path d="M9 15c1.5 -1 4 -1 5 .5" />
                                <path d="M7 9c2 -1 6 -2 10 .5" />
                            </svg>
                        </button>
                    )}
                </div>

                {hasSpotify ? (
                    <div className="flex gap-3 flex-col">
                        {canciones.slice(0, 3).map((cancion, idx) => (
                            <CardSpotifySong key={idx} cancion={cancion} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Music size={48} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-2">No hay canciones conectadas</p>
                        <p className="text-sm text-gray-400">Conecta tu Spotify para ver tu música favorita</p>
                    </div>
                )}
            </div>
        </div>
    );
}