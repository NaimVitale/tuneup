import Cardproduct from "../components/CardProduct";
import HeroEvents from "../components/HeroEvents";
import UpcomingConcertsCard from "../components/UpcomingConcertsCard"
import SelectFilter from "../components/SelectFilter";
import { useGetConciertos } from "../hooks/concerts/useGetConcerts";
import InputSelect from "../components/InputSelect";
import InputDate from "../components/InputDate";
import { useState } from "react";

export default function ConcertsPage() {
    
    const { data: conciertos, isLoading, isError } = useGetConciertos();
    const [fecha, setFecha] = useState(null);
 
    return (
        <div className="mb-20">
            <HeroEvents></HeroEvents>
            <div className="w-[90%] m-auto">
                <div className="pb-6 pt-12">
                    <div className="w-[50%] grid grid-cols-3 gap-6">
                        <InputSelect placeholder="Ubicación" id="genero" valueonChange
                            options={[
                            { label: "Barcelona", value: "barcelona" },
                            { label: "Madrid", value: "madrid" },
                            { label: "Valencia", value: "valencia" },
                            { label: "Sevilla", value: "sevilla" },
                        ]}/>
                        <InputSelect placeholder="Genero" id="genero"
                            options={[
                            { label: "Rock", value: "rock" },
                            { label: "Pop", value: "pop" },
                            { label: "Reggaeton", value: "reggaeton" },
                            { label: "Electrónica", value: "electro" },
                        ]}/>
                        <InputDate
                            value={fecha}
                            onChange={setFecha}
                            placeholder="Filtrar por fecha"
                        />
                    </div>
                </div>
                <div className=" pb-12 pt-6">
                    {isLoading ? (
                        <div className="text-center py-10 text-lg text-gray-700">
                        Cargando eventos, por favor espera...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {conciertos.map( c => (
                            <Cardproduct information={c} key={c.id} />
                        ))}
                        </div>
                    )}
                    <div>
                        <div className="border border-[#C122ED] mt-20 mb-20"></div>
                    </div>
                    <div id="proximamente">
                        <h3 className="text-xl">300 Proximos Conciertos</h3>
                        <div className="flex gap-8 mt-6">
                            <div className="w-[100%] flex flex-col gap-4">
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                            </div>
                            <div className="w-[25%]">
                                <div className="color-primary rounded-2xl text-white p-4 h-[30vh]">
                                    <h3></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}