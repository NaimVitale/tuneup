import TuneUpHeader from "../assets/TuneUp.webp"
import PerfilHeader from "../assets/perfil_header.webp"
import LupaBusqueda from "../assets/lupa_busqueda.webp"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { Bell, LayoutDashboardIcon, LogOut, User} from "lucide-react"

function Header() {
  const { user, token, logout } = useAuth();
  return (
    <header className="bg-[#f8f8f8] shadow-xl py-4 sticky top-0 z-99">
      <div className="flex items-center w-[90%] m-auto">
        <div className="w-[30%]">
          <Link to={"/"}><img src={TuneUpHeader} alt="TuneUp Header" className="w-20 cursor-pointer" /></Link>
        </div>
        <div className="relative w-[40%]">
          <input type="search" name="" id="" className="rounded-2xl w-full py-2 placeholder:p-5 border-1 shadow-sm border-black relative" placeholder="Buscar..." />
          <img src={LupaBusqueda} alt="search" className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {!token && (
          <div className="flex items-center justify-end gap-2 w-[30%]">
            <Link to={"/login"} className="flex items-center justify-end gap-2">
              <p className="text-lg">Acceder/Registrarse</p>
              <img src={PerfilHeader} alt="Perfil" className="w-8 h-8 cursor-pointer" />
            </Link>
          </div>
        )}
        {token && (
          <div className="flex items-center justify-end gap-6 w-[30%]">
            <Bell className="text-[#C122ED]" size={20}/>
            {user.rol === "admin" && (
              <Link to={"/admin"} className="flex items-center justify-end gap-2">
                <LayoutDashboardIcon className="text-[#C122ED]" size={22}/>
              </Link>
            )}
            <Link to={"/perfil/ajustes/1"} className="flex items-center justify-end gap-2">
              <User className="text-[#C122ED]" size={22}/>
              <p className="text-lg">Hola, {user.nombre}</p>
            </Link>
            <button onClick={logout}><LogOut className="text-[#C122ED] hover:cursor-pointer" size={20}/></button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header