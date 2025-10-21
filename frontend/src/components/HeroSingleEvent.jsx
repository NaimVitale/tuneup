import { Clock, Hourglass, MapPin } from 'lucide-react';
import HeroEvent from '../assets/hero_event.webp';
import { dateFormatWithTime } from '../utils/dateFormat';
import { Link } from 'react-router-dom';

export default function HeroSingleEvent({eventData}){
    return(
        <div className="relative text-white bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${HeroEvent})` }}>
            <div className="w-[90%] m-auto h-[25vh] gap-8 pb-8 flex items-end">
                <div className="rounded"><img src={eventData?.artista?.img_card} alt="" className="h-35 w-45 object-cover rounded-[20px]" loading='lazy'/></div>
                <div>
                    <h2 className="mb-2"><Link to={`/artistas/${eventData?.artista?.slug}`}>{eventData?.artista?.nombre}</Link></h2>
                    <div className="flex gap-10 text-lg">
                        <div className="flex gap-2 items-center">
                            <Clock className="text-[#C122ED]" size={20}/>
                            <p className="">{dateFormatWithTime(eventData?.fecha)}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MapPin className="text-[#C122ED]" size={20}/>
                            <p>{eventData?.recinto?.ubicacion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}