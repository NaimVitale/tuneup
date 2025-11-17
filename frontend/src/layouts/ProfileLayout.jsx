import { Ticket, LogOut, Settings, Star, Menu, X } from "lucide-react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ProfileLayout() {
    const { token, user, logout } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!token) return <Navigate to="/login" replace />;

    const isActive = (path) => location.pathname.includes(path);

    const menuItems = [
        { 
            to: `entradas/${user.id}`, 
            icon: Ticket, 
            label: "Mis entradas",
            path: "entradas"
        },
        { 
            to: `ajustes/${user.id}`, 
            icon: Settings, 
            label: "Mi perfil",
            path: "ajustes"
        }
    ];

    return (
        <div className="min-h-[90dvh] flex items-center bg-gradient-to-br from-[#6B21A8] via-[#7E22CE] to-[#9333EA] p-4 lg:p-12">
            
            {/* Decoración de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full lg:w-9/12 mx-auto">
                
                {/* Card principal */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    
                    {/* Header móvil */}
                    <div className="lg:hidden bg-gradient-to-r from-[#C122ED] to-[#9333EA] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {user?.nombre?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="text-white">
                                <p className="font-semibold">{user?.nombre}</p>
                                <p className="text-xs text-white/80">{user?.email}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white p-2"
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        
                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block lg:w-64 border-r border-gray-200 p-8 bg-gray-50">
                            
                            {/* Avatar y nombre */}
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#C122ED] to-[#9333EA] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                    <span className="text-white font-bold text-3xl">
                                        {user?.nombre?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{user?.nombre}</h2>
                                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                            </div>

                            {/* Menú */}
                            <nav>
                                <ul className="space-y-2">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.path);
                                        return (
                                            <li key={item.path}>
                                                <Link 
                                                    to={item.to}
                                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                                        active 
                                                            ? 'bg-[#f3e0ff] text-[#C122ED] font-semibold' 
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <Icon size={22} className={active ? 'text-[#C122ED]' : ''} />
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                    
                                    {/* Botón logout */}
                                    <li className="pt-4 mt-4 border-t border-gray-200">
                                        <button 
                                            onClick={logout}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full"
                                        >
                                            <LogOut size={22} />
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        {/* Menú móvil (dropdown) */}
                        {menuOpen && (
                            <div className="lg:hidden bg-gray-50 border-b border-gray-200">
                                <nav className="p-4">
                                    <ul className="space-y-2">
                                        {menuItems.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.path);
                                            return (
                                                <li key={item.path}>
                                                    <Link 
                                                        to={item.to}
                                                        onClick={() => setMenuOpen(false)}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                                            active 
                                                                ? 'bg-[#f3e0ff] text-[#C122ED] font-semibold' 
                                                                : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        <Icon size={22} />
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                        <li>
                                            <button 
                                                onClick={() => {
                                                    logout();
                                                    setMenuOpen(false);
                                                }}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full"
                                            >
                                                <LogOut size={22} />
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}

                        {/* Contenido principal */}
                        <main className="flex-1 p-6 lg:p-8 min-h-[60vh] lg:min-h-[70vh] overflow-y-auto items-center justify-center">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}