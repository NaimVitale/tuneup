import { Castle, LayoutDashboard, LogOut, Music, Music2, Paintbrush, User } from "lucide-react";
import TuneUpHeader from "../assets/TuneUp.webp"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export default function HeaderAdmin(){
    const { user, token, logout } = useAuth();
    return(
    <header className="bg-[#f8f8f8] shadow-xl z-99 h-[100vh]">
        <div className="flex flex-col py-10 m-auto gap-8">
            <div className="px-10">
                <Link to={"/"}><img src={TuneUpHeader} alt="TuneUp Header" className="w-40 cursor-pointer" loading="lazy"/></Link>
            </div>
            <nav>
                <ul className="flex flex-col text-xl border-t border-b border-gray-300">
                    <li className="border-b py-4 border-gray-300 px-10">
                        <Link to={""} className="flex items-center gap-4">
                            <LayoutDashboard className="text-[#C122ED]" size={25} />
                            Dashboard
                        </Link>
                    </li>
                    <li className="border-b py-4 border-gray-300 px-10">
                        <Link to={"conciertos"} className="flex items-center gap-4">
                            <Music className="text-[#C122ED]" size={25} />
                            Conciertos
                        </Link>
                    </li>
                    <li className="border-b py-4 border-gray-300 px-10">
                        <Link to={""} className="flex items-center gap-4">
                            <Music2 className="text-[#C122ED]" size={25} />
                            Festivales
                        </Link>
                    </li>
                    <li className="border-b py-4 border-gray-300 px-10">
                        <Link to={""} className="flex items-center gap-4">
                            <Paintbrush className="text-[#C122ED]" size={23} />
                            Artistas
                        </Link>
                    </li>
                    <li className="border-b py-4 border-gray-300 px-10">
                        <Link to={""} className="flex items-center gap-4">
                            <Castle className="text-[#C122ED]" size={24} />
                            Recintos
                        </Link>
                    </li>
                    <li className="border-b py-4 border-gray-300 px-10">
                        <Link to={""} className="flex items-center gap-4">
                            <User className="text-[#C122ED]" size={25} />
                            Usuarios
                        </Link>
                    </li>
                    <li className="py-4">
                        <button onClick={logout} className="flex items-center gap-4 hover:cursor-pointer px-10"><LogOut className="text-[#C122ED]" size={23}/>Desconectar</button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    );
}