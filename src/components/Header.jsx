import TuneUpHeader from "../assets/TuneUp.webp"
import CarroComprasPng from "../assets/carro_compras.webp"
import CampanaNotificacion from "../assets/campana-notificacion.webp"
import PerfilHeader from "../assets/perfil_header.webp"
import LupaBusqueda from "../assets/lupa_busqueda.webp"

function Header() {
  return (
    <header className="bg-[#f8f8f8] shadow-xl p-4 sticky top-0 z-99">
      <div className="flex items-center justify-between w-[90%] m-auto">
        <div className="w-[30%]">
          <img src={TuneUpHeader} alt="TuneUp Header" className="w-20 cursor-pointer" />
        </div>
        <div className="relative w-[40%]">
          <input type="search" name="" id="" className="rounded-2xl w-full py-2 placeholder:p-5 border-1 shadow-sm border-black relative" placeholder="Buscar..." />
          <img src={LupaBusqueda} alt="search" className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="flex items-center justify-end gap-6 w-[30%]">
          <img src={CampanaNotificacion} alt="Notificación" className="w-6 h-6 cursor-pointer" />
          <img src={CarroComprasPng} alt="Carro de compra" className="w-8 h-8 cursor-pointer" />
          <img src={PerfilHeader} alt="Perfil" className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}

export default Header