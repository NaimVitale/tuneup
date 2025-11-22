import { useParams } from "react-router-dom";
import Cardproduct from "../components/CardProduct";
import { useGetRecintoPublic } from "../hooks/recintos/useGetRecintoPublic";
import HeroRecinto from "../components/HeroRecinto";

export default function SingleRecintoPage(){
    const { id: recintoID } = useParams();
    const { data: recinto, isLoading, isError } = useGetRecintoPublic(recintoID);

    return(
        <div>
            <HeroRecinto nombre={recinto?.nombre} imagen={recinto?.img_hero} data={[recinto?.nombre, recinto?.ciudad?.nombre]}></HeroRecinto>
            <div className='m-auto flex flex-col gap-30 pt-20 pb-12'>
                <div id="destacados" className='w-[90%] m-auto mb-6'>
                  <div>
                   {isLoading ? (
                        <div className="text-center py-10 text-lg text-gray-700">
                            Cargando eventos, por favor espera...
                        </div>
                        ) : recinto?.conciertos?.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:row-span-1 gap-8'>
                            {recinto.conciertos.map((c) => (
                                <Cardproduct information={c} key={c.id}/>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-10 text-lg text-gray-700">
                            Actualmente este recinto no tiene ningún evento.
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className='m-auto bg-gradient-to-br from-[#D946EF] via-[#A21CAF] to-[#7C3AED] flex flex-col lg:flex-row gap-10 items-center mt-10 md:px-4 md:py-20'>
                <iframe
                    className="md:w-[90%] w-full mx-auto h-[60vh] md:rounded-2xl"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${recinto?.nombre}, ${recinto?.ciudad?.nombre}`)}&output=embed`}
                ></iframe>
            </div>
        </div>
    )
}