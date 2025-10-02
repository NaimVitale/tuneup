import Cardproduct from "../components/CardProduct";
import HeroEvents from "../components/HeroEvents";
import UpcomingConcertsCard from "../components/UpcomingConcertsCard"
import SelectFilter from "../components/SelectFilter";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

const tiposValidos = ['conciertos', 'festivales'];

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { tipo } = useParams();

    if (!tiposValidos.includes(tipo)) {
    return <Navigate to="/404" replace />;
    }
 
    useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/${tipo}`)
        .then(response => {
            console.log(response.data);
            setEvents(response.data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error al cargar conciertos:', error);
        });
    }, []);

    return (
        <div className="mb-20">
            <HeroEvents titulo = { tipo }></HeroEvents>
            <div className="w-[90%] m-auto">
                <div className="pb-6 pt-12">
                    <div className="w-[50%] grid grid-cols-3 gap-6">
                        {tipo == 'festivales' ? (null) : (<SelectFilter nombreCategoria="Genero"></SelectFilter>)}
                        <SelectFilter nombreCategoria="Fecha"></SelectFilter>
                        <SelectFilter nombreCategoria="Ubicacion"></SelectFilter>
                    </div>
                </div>
                <div className=" pb-12 pt-6">
                    {isLoading ? (
                        <div className="text-center py-10 text-lg text-gray-700">
                        Cargando eventos, por favor espera...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {events.map(event => (
                            <Cardproduct information={event} key={event.id} />
                        ))}
                        </div>
                    )}
                    <div>
                        <div className="border border-[#C122ED] mt-20 mb-20"></div>
                    </div>
                    <div id="proximamente">
                        <h3 className="text-xl">300 Proximos {tipo}</h3>
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