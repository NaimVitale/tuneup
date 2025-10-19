import { useState } from "react";
import TuneUpHeader from "../assets/TuneUp.webp"
import PerfilHeader from "../assets/perfil_header.webp"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { Bell, LayoutDashboardIcon, LogOut, User, Menu, X } from "lucide-react"
import SearchBar from "./SearchBarHome";

function Header() {
  const { user, rol, token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const menuItemClass = "flex items-center gap-3 py-4 px-4 hover:bg-[#f3e0ff] rounded-lg transition-colors";

  const UserSection = () => (
    <>
      {!token ? (
        <Link to="/login" onClick={closeMenu} className={menuItemClass}>
          <User className="text-[#C122ED]" size={22}/>
          <p className="text-lg">Acceder/Registrarse</p>
        </Link>
      ) : (
        <>
          <Link to={`/perfil/ajustes/${user.id}`} onClick={closeMenu} className={menuItemClass}>
            <User className="text-[#C122ED]" size={22}/>
            <p className="text-lg">Hola, {user.nombre}</p>
          </Link>
          
          <Link to="#" onClick={closeMenu} className={menuItemClass}>
            <Bell className="text-[#C122ED]" size={20}/>
            <p className="text-lg">Notificaciones</p>
          </Link>

          {rol === "admin" && (
            <Link to="/admin/dashboard" onClick={closeMenu} className={menuItemClass}>
              <LayoutDashboardIcon className="text-[#C122ED]" size={22}/>
              <p className="text-lg">Dashboard</p>
            </Link>
          )}
          
          <button onClick={() => { logout(); closeMenu(); }} className={`${menuItemClass} w-full text-left`}>
            <LogOut className="text-[#C122ED]" size={20}/>
            <p className="text-lg">Cerrar sesión</p>
          </button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-[#f8f8f8] shadow-xl py-4 sticky top-0 z-50">
      {/* Desktop */}
      <div className="hidden md:flex items-center w-[90%] m-auto">
        <div className="w-[30%]">
          <Link to="/"><img src={TuneUpHeader} alt="TuneUp Header" className="w-20 cursor-pointer" loading="lazy"/></Link>
        </div>
        <div className="relative w-[40%]">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end gap-6 w-[30%]">
          {!token ? (
            <Link to="/login" className="flex items-center gap-2">
              <p className="text-lg">Acceder/Registrarse</p>
              <img src={PerfilHeader} alt="Perfil" className="w-8 h-8 cursor-pointer" loading="lazy"/>
            </Link>
          ) : (
            <>
              <Bell className="text-[#C122ED] cursor-pointer" size={20}/>
              {rol === "admin" && (
                <Link to="/admin/dashboard">
                  <LayoutDashboardIcon className="text-[#C122ED]" size={22}/>
                </Link>
              )}
              <Link to={`/perfil/ajustes/${user.id}`} className="flex items-center gap-2">
                <User className="text-[#C122ED]" size={22}/>
                <p className="text-lg">Hola, {user.nombre}</p>
              </Link>
              <button onClick={logout}><LogOut className="text-[#C122ED] hover:cursor-pointer" size={20}/></button>
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-[90%] m-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/"><img src={TuneUpHeader} alt="TuneUp Header" className="w-20 cursor-pointer" loading="lazy"/></Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#C122ED]">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <SearchBar />
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMenu} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          <button onClick={closeMenu} className="absolute top-4 right-4 text-[#C122ED]">
            <X size={28} />
          </button>
          <div className="mt-12">
            <UserSection />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header