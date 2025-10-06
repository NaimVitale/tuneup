import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";


export default function AdminLayout(){
    return(
        <div className="flex">
            <div className="w-[20%]">
                <HeaderAdmin></HeaderAdmin>
            </div>
            <div className="w-[80%] bg-gradient-to-r from-[#D946EF]/70 via-[#A21CAF]/50 to-[#7C3AED]/40 flex justify-center items-center">
                <div className="p-[3em] rounded-2xl bg-white shadow-lg flex gap-12 w-[95%] h-[90vh]">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}