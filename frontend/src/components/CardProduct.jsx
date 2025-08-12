import UbicacionPng from "../assets/ubicacion.png"
import CalendarioPng from "../assets/calendario.png"
import { Link } from "react-router-dom"
import dateFormat from "../utils/dateFormat.jsx"

function Cardproduct ({information}) {
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img src={information?.artista?.img_card || 'https://brandemia.org/contenido/subidas/2012/07/the-rolling-stones-logo.webp'} alt="" />
            <div className="p-4">
                <h3 className="text-xl font-medium mb-2">{information?.artista?.nombre || 'The Rolling Stones'}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <img src={CalendarioPng} alt="" className="w-4 h-4" />
                    <p>{dateFormat(information?.fecha)  || "8 de septiembre, 21:00"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <img src={UbicacionPng} alt="" className="w-4 h-4" />
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