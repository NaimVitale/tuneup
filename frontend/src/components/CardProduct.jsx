import { Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { dateFormatWithTime } from "../utils/dateFormat.jsx"

function Cardproduct ({information}) {
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img src={information?.artista_img_card || information?.artista?.img_card || 'https://brandemia.org/contenido/subidas/2012/07/the-rolling-stones-logo.webp'} alt="" loading="lazy" className="h-[20vh] object-cover w-full" />
            <div className="p-4">
                <h3 className="text-xl font-medium mb-3 hover:text-[#C122ED]"><Link to={`/artistas/detalle/${information?.artista_slug || information?.artista?.slug }`}>{information?.artista_nombre || information?.artista?.nombre || 'The Rolling Stones'}</Link></h3>
                <div className="flex items-center gap-2 mb-1">
                     <Calendar className="text-black" size={16}/>
                    <p>{dateFormatWithTime(information?.concierto_fecha)  || dateFormatWithTime(information?.fecha) ||"8 de septiembre, 21:00"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-black" size={16}/>
                    <p className="flex gap-1">
                                <Link to={`/ciudad/${information?.ciudad_id || information?.recinto?.ciudad?.id}`} className="hover:underline">
                                    {information?.ciudad_nombre || information?.recinto?.ciudad?.nombre || "Barcelona"}
                                </Link>
                                <span>·</span>
                                <Link to={`/recinto/${information?.recinto_id || information?.recinto?.id}`} className="hover:underline">
                                    {information?.recinto_nombre || information?.recinto?.nombre || "Palau Sant Jordi"}
                                </Link>
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-md text-[#C122ED]">Desde <span className="font-semibold">{information?.precio_minimo || "79"}€</span></p>
                    <Link to={`/conciertos/${information?.artista_slug || information?.artista?.slug }/${information?.concierto_id || information?.id}`}><button className='py-1.5 px-4 btn-primary w-max'>Comprar</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Cardproduct