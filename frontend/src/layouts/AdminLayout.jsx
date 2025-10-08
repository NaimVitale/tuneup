import { Navigate, Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import { useAuth } from "../context/AuthContext";


export default function AdminLayout(){
    const { token, user } = useAuth();

    if (!token) return <Navigate to="/" replace/>;
    if (user.rol !== "admin") return <Navigate to="/" replace/>;

    return(
        <div className="flex">
            <div className="w-[20%]">
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className="w-[80%] bg-gradient-to-r from-[#D946EF]/70 via-[#A21CAF]/50 to-[#7C3AED]/40 flex justify-center items-center">
                <Outlet></Outlet>
            </div>
        </div>
    )
}