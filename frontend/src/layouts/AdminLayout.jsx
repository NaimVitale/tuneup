import { Navigate, Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function AdminLayout(){
    const { token, rol, loading } = useAuth();
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (loading) return <div className='flex justify-center items-center h-[100dvh]'><Spinner></Spinner></div>;

    if (!token) return <Navigate to="/404" replace/>;
    if (rol !== "admin") return <Navigate to="/404" replace/>;

    return(
        <div className={isMobile ? "flex flex-col" : "flex"}>
            <div className={isMobile ? "w-full" : ""}>
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className="w-full">
                <Outlet></Outlet>
            </div>
        </div>
    )
}