import UbicacionPng from "../assets/ubicacion.png"
import CalendarioPng from "../assets/calendario.png"

function Cardproduct () {
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img src="https://brandemia.org/contenido/subidas/2012/07/the-rolling-stones-logo.webp" alt="" />
            <div className="p-5">
                <h3 className="text-2xl mb-2">The Rolling Stones</h3>
                <div className="flex items-center gap-2">
                    <img src={CalendarioPng} alt="" className="w-4 h-4" />
                    <p>2023</p>
                </div>
                <div className="flex items-center gap-2">
                    <img src={UbicacionPng} alt="" className="w-4 h-4" />
                    <p>Barcelona</p>
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-xl text-[#C122ED]">Desde 79€</p>
                    <button className='py-3 px-4 btn-primary w-max'>Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Cardproduct