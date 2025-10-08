import { Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { dateFormatWithTime } from "../utils/dateFormat.jsx"

function Cardproduct ({information}) {
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img src={information?.artista?.img_card || 'https://brandemia.org/contenido/subidas/2012/07/the-rolling-stones-logo.webp'} alt="" loading="lazy" />
            <div className="p-4">
                <h3 className="text-xl font-medium mb-2 hover:underline"><Link to={"/artista/the-rolling-stones"}>{information?.artista?.nombre || 'The Rolling Stones'}</Link></h3>
                <div className="flex items-center gap-2 mb-2">
                     <Calendar className="text-black" size={22}/>
                    <p>{dateFormatWithTime(information?.fecha)  || "8 de septiembre, 21:00"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-black" size={22}/>
                    <p>{information?.recinto?.ubicacion || "Barcelona, Palau Sant Jordi"}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-md text-[#C122ED]">Desde 79€</p>
                    <Link to={"/evento/the-rolling-stones/1"}><button className='py-1.5 px-4 btn-primary w-max'>Comprar</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Cardproduct