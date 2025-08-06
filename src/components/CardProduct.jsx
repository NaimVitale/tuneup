import UbicacionPng from "../assets/ubicacion.png"
import CalendarioPng from "../assets/calendario.png"
import { Link } from "react-router-dom"

function Cardproduct () {
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img src="https://brandemia.org/contenido/subidas/2012/07/the-rolling-stones-logo.webp" alt="" />
            <div className="p-4">
                <h3 className="text-xl font-medium mb-2">The Rolling Stones</h3>
                <div className="flex items-center gap-2 mb-2">
                    <img src={CalendarioPng} alt="" className="w-4 h-4" />
                    <p>Sep 8, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                    <img src={UbicacionPng} alt="" className="w-4 h-4" />
                    <p>Barcelona, Palau Sant Jordi</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-md text-[#C122ED]">Desde 79€</p>
                    <button className='py-1.5 px-4 btn-primary w-max'><Link to={"/evento/the-rolling-stones/1"}>Comprar</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Cardproduct