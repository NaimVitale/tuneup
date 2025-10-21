import { useState } from "react";
import HeroSingleEvent from "../components/HeroSingleEvent";
import SeatMap from "../components/SeatMap";
import InputSelect from "../components/InputSelect";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useGetConcert } from "../hooks/concerts/useGetConcert";
import { Armchair, MapIcon } from "lucide-react";

export default function SingleEventPage () {
    const VALID_RESOURCES = ["conciertos", "festivales"];
    const {evento, id} = useParams();
    const location = useLocation();

    if (evento && !VALID_RESOURCES.includes(evento)) {
      return <Navigate to="/404" replace state={{ from: location }} />;
    } 

    const { data, isLoading, isError } = useGetConcert(id);

    return (
        <div className="h-[100%]">
            <HeroSingleEvent eventData={data} ></HeroSingleEvent>
            <div className="flex">
                <div className="w-full md:w-[40%] relative p-0 border-r-1 border-[#C122ED]" style={{ boxShadow: '1px 0px 20px -10px #C122ED'}}>
                                    <div className="absolute centrado-absoluto hidden md:block">
                                        <div className="flex flex-col items-center">
                                                <Armchair className="text-[#C122ED]" size={72}/>
                                                <p className="text-lg font-medium mt-4">Selecciona tus entradas en el mapa</p>
                                        </div>
                                    </div>
                    <div className="w-[75%] m-auto py-8">
                        <div>
                            <h3 className="mb-4 text-xl font-medium">Filtrar por:</h3>
                            <div>
                               <InputSelect placeholder="Precio"></InputSelect>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-auto w-[60%] bg-gradient-to-r from-[#C122ED]/60 via-[#6B21A8]/40 to-[#9333EA]/30 hidden md:block">
                {data?.secciones ? (
                        <SeatMap />
                        ) : (
                        <div className="py-20 text-center h-[60vh] flex items-center justify-center">
                            <p className="text-gray-600 bg-white py-20 px-10 rounded-2xl shadow-xl flex items-center gap-4"><MapIcon className="text-[#C122ED]" size={32}/>Mapa no disponible para este recinto</p>
                        </div>
                )}
                </div>
            </div>
        </div>
    )
}