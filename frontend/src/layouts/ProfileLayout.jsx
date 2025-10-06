import { Ticket, LogOut, Settings, Star } from "lucide-react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileLayout() {
    const { token, user, logout } = useAuth();

    if (!token) return <Navigate to="/login" replace/>;

    return (
        <div className="h-[90vh] flex justify-center items-center w-full bg-gradient-to-l from-[#6B21A8]/70 via-[#7E22CE]/50 to-[#9333EA]/30">
                <div className="p-[3em] rounded-2xl bg-white shadow-lg flex gap-12 w-[60%]">
                    <div className="w-[20%] border-r border-gray-300 pt-2">
                        <ul className="flex flex-col gap-8 text-gray-700 text-lg">
                            <li>
                                <Link to={""} className="flex items-center gap-2 ">
                                    <Ticket className="text-[#C122ED]" size={25} />
                                    Mis entradas
                                </Link>
                            </li>
                            <li>
                                <Link to={""} className="flex items-center gap-2">
                                    <Star className="text-[#C122ED]" size={25} />
                                    Mis favoritos
                                </Link>
                            </li>
                            <li>
                                <Link to={`ajustes/${user.id}`} className="flex items-center gap-2">
                                    <Settings className="text-[#C122ED]" size={25} />
                                    Mi perfil
                                </Link>
                            </li>
                            <li>
                                <button onClick={logout} className="flex items-center gap-2 hover:cursor-pointer"><LogOut className="text-[#C122ED]" size={24}/>Desconectar</button>
                            </li>
                        </ul>
                    </div>
                    <div className="w-[80%]">
                        <Outlet/>
                    </div>
                </div>
        </div>
    );
}