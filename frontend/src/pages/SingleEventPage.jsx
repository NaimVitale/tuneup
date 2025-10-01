import { useState } from "react";
import HeroSingleEvent from "../components/HeroSingleEvent";
import SeatMap from "../components/SeatMap";
import SelectFilter from "../components/SelectFilter";

export default function SingleEventPage () {
    const [entradasSelecionadas, setEntradasSelecionadas] = useState(null);

    return (
        <div className="h-[100%]">
            <HeroSingleEvent></HeroSingleEvent>
            <div className="flex">
                <div className="w-[40%] relative p-0 border-r-1 border-[#C122ED]" style={{ boxShadow: '1px 0px 20px -10px #C122ED'}}>
                        {!entradasSelecionadas && (
                                    <div className="absolute centrado-absoluto">
                                        <div className="pr-20 flex flex-col items-center">
                                                <svg  xmlns="http://www.w3.org/2000/svg"  width="750"  height="80"  viewBox="0 0 24 24"  fill="none"  stroke="#C122ED"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-armchair mr-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" /><path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" /><path d="M6 19v2" /><path d="M18 19v2" /></svg>
                                                <p className="text-lg font-medium mt-4">Selecciona tus entradas en el mapa</p>
                                        </div>
                                    </div>
                        )}
                    <div className="w-[75%] m-auto py-8">
                        <div>
                            <h3 className="mb-4 text-xl font-medium">Filtrar por:</h3>
                            <div className="grid grid-cols-3">
                               <SelectFilter nombreCategoria={"Precio"}></SelectFilter>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-auto w-[60%] bg-gradient-to-r from-[#C122ED]/60 via-[#6B21A8]/40 to-[#9333EA]/30">
                    <SeatMap/>
                </div>
            </div>
        </div>
    )
}