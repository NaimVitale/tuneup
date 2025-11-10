import { Clock, MapPin } from 'lucide-react';
import HeroEvent from '../assets/hero_event.webp';
import { dateFormatWithTime } from '../utils/dateFormat';
import { Link } from 'react-router-dom';

export default function HeroSingleEvent({eventData}){
    return(
        <div className="relative text-white bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${HeroEvent})` }}>
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="relative w-[90%] m-auto min-h-[30vh] md:min-h-[25vh] py-6 md:py-6 gap-4 md:gap-8 flex flex-col md:flex-row items-center md:items-end">
                
                {/* Imagen del artista */}
                <div className="flex-shrink-0">
                    <img 
                        src={eventData?.artista?.img_card} 
                        alt={eventData?.artista?.nombre}
                        className="h-32 w-32 md:h-36 md:w-36 object-contain rounded-xl bg-white/10 shadow-2xl" 
                        loading='lazy'
                    />
                </div>
                
                {/* Info del evento */}
                <div className="w-full pb-4 md:pb-0">
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-3 text-center md:text-left'>
                        <Link to={`/artistas/${eventData?.artista?.slug}`} className="hover:text-[#C122ED] transition-colors">
                            {eventData?.artista?.nombre}
                        </Link>
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-base md:text-lg">
                        
                        {/* Fecha y hora */}
                        <div className="flex gap-3 items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                            <div className="bg-[#C122ED] p-2 rounded-lg flex-shrink-0">
                                <Clock size={20}/>
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-xs text-white/70 uppercase tracking-wide">Fecha y hora</p>
                                <p className="font-semibold capitalize truncate">{dateFormatWithTime(eventData?.fecha)}</p>
                            </div>
                        </div>
                        
                        {/* Ubicación */}
                        <div className="flex gap-3 items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                            <div className="bg-[#C122ED] p-2 rounded-lg flex-shrink-0">
                                <MapPin size={20}/>
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-xs text-white/70 uppercase tracking-wide">Ubicación</p>
                                <p className="flex gap-1.5 font-semibold truncate">
                                    <Link to={`/ciudad/${eventData?.recinto?.ciudad?.id}`} className="hover:underline">
                                        {eventData?.recinto?.ciudad?.nombre}
                                    </Link>
                                    <span>·</span>
                                    <Link to={`/recinto/${eventData?.id_recinto}`} className="hover:underline">
                                        {eventData?.recinto?.nombre}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}