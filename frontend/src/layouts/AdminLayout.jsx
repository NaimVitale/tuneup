import { Navigate, Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function AdminLayout(){
    const { token, rol, loading } = useAuth();
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (loading) return <Spinner></Spinner>;

    if (!token) return <Navigate to="/" replace/>;
    if (rol !== "admin") return <Navigate to="/" replace/>;

    return(
        <div className={isMobile ? "flex flex-col" : "flex"}>
            <div className={isMobile ? "w-full" : ""}>
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className="w-full bg-gradient-to-r from-[#D946EF]/70 via-[#A21CAF]/50 to-[#7C3AED]/40 flex justify-center items-center py-10">
                <Outlet></Outlet>
            </div>
        </div>
    )
}