import { useState } from "react";
import { Castle, LayoutDashboard, LogOut, Music, Paintbrush, User, ChevronLeft, ChevronRight, Tags, Ticket, Menu, X } from "lucide-react";
import TuneUpHeader from "../assets/TuneUp.webp"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function HeaderAdmin(){
    const { user, token, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const menuItems = [
        { to: "", icon: LayoutDashboard, label: "Dashboard" },
        { to: "conciertos", icon: Music, label: "Conciertos" },
        { to: "entradas", icon: Ticket, label: "Entradas" },
        { to: "artistas", icon: Paintbrush, label: "Artistas" },
        { to: "recintos", icon: Castle, label: "Recintos" },
        { to: "usuarios", icon: User, label: "Usuarios" },
        { to: "generos", icon: Tags, label: "Generos" },
    ];

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Mobile Header
    if (isMobile) {
        return (
            <>
                <header className="bg-[#f8f8f8] shadow-xl sticky top-0 z-40">
                    <div className="mx-auto flex items-center justify-between px-4 py-4">
                        <Link to="/" onClick={closeMobileMenu}>
                            <img 
                                src={TuneUpHeader} 
                                alt="TuneUp Header" 
                                className="w-20" 
                                loading="lazy"
                            />
                        </Link>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#C122ED]">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </header>

                {/* Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
                        onClick={closeMobileMenu}
                    ></div>
                )}

                {/* Mobile Sidebar */}
                <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#f8f8f8] shadow-2xl z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="h-full overflow-y-auto flex flex-col">
                        <button 
                            onClick={closeMobileMenu} 
                            className="absolute top-4 right-4 text-[#C122ED] hover:bg-[#f3e0ff] p-2 rounded-lg transition-colors"
                        >
                            <X size={28} />
                        </button>

                        <nav className="flex-1 flex flex-col pt-16">
                            <ul className="flex flex-col">
                                {menuItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname.includes(item.to) && item.to !== "" || (item.to === "" && location.pathname === "/admin/dashboard");
                                    return (
                                        <li key={index}>
                                            <Link 
                                                to={item.to} 
                                                onClick={closeMobileMenu}
                                                className={`flex items-center gap-4 py-4 px-6 transition-colors ${isActive ? 'bg-[#f3e0ff]' : 'hover:bg-[#f3e0ff]'}`}
                                            >
                                                <Icon className={`${isActive ? 'text-[#C122ED] scale-110' : 'text-[#C122ED]'}`} size={24} />
                                                <span className={`text-lg ${isActive ? 'font-semibold text-[#C122ED]' : ''}`}>{item.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            
                            <div className="mt-auto">
                                <button 
                                    onClick={() => {
                                        logout();
                                        closeMobileMenu();
                                    }} 
                                    className="flex items-center gap-4 py-4 px-6 hover:bg-red-50 transition-colors w-full text-left"
                                >
                                    <LogOut className="text-[#C122ED]" size={24}/>
                                    <span className="text-lg">Desconectar</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
        );
    }

    // Desktop Sidebar
    return(
        <header className={`bg-[#f8f8f8] shadow-xl min-h-screen transition-all duration-300 relative sticky top-0  ${isCollapsed ? 'w-20' : 'w-64'}`}>
            {/* Toggle Button */}
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 bg-[#C122ED] text-white rounded-full p-1.5 hover:bg-[#a01bc7] transition-colors shadow-lg z-10"
            >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            <div className="flex flex-col py-10 gap-8 h-full">
                {/* Logo */}
                <div className={`px-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
                    <Link to="/">
                        <img 
                            src={TuneUpHeader} 
                            alt="TuneUp Header" 
                            className={`cursor-pointer transition-all ${isCollapsed ? 'w-12' : 'w-40'}`} 
                            loading="lazy"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col justify-between">
                    <ul className="flex flex-col border-t border-gray-300">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = location.pathname.includes(item.to) && item.to !== "" || (item.to === "" && location.pathname === "/admin/dashboard");
                            return (
                                <li key={index} className="border-b border-gray-300">
                                    <Link 
                                        to={item.to} 
                                        className={`flex items-center gap-4 py-4 px-6 transition-colors group ${isActive ? 'bg-[#f3e0ff] border-[#C122ED]' : 'hover:bg-[#f3e0ff]'}`}
                                        title={isCollapsed ? item.label : ''}
                                    >
                                        <Icon className={`group-hover:scale-110 transition-transform flex-shrink-0 ${isActive ? 'text-[#C122ED] scale-110' : 'text-[#C122ED]'}`} size={24} />
                                        {!isCollapsed && <span className={`text-lg ${isActive ? 'font-semibold text-[#C122ED]' : ''}`}>{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                        
                    <div className="border-t border-gray-300 mt-auto">
                        <button 
                            onClick={logout} 
                            className="flex items-center gap-4 py-4 px-6 hover:bg-red-50 transition-colors w-full text-left group"
                            title={isCollapsed ? 'Desconectar' : ''}
                        >
                            <LogOut className="text-[#C122ED] group-hover:scale-110 transition-transform flex-shrink-0" size={24}/>
                            {!isCollapsed && <span className="text-lg">Desconectar</span>}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}