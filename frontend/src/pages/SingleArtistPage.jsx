import { useParams } from "react-router-dom";
import Cardproduct from "../components/CardProduct";
import HeroArtist from "../components/HeroArtist";
import { useGetArtist } from "../hooks/artist/useGetArtist";
import { formatDescription } from "../utils/descriptionFormat";

export default function ArtistPage(){

    const { slug: artistSlug } = useParams();
    const { data: artist, isLoading, isError } = useGetArtist(artistSlug);

    console.log(artist)

    return(
        <div>
            <HeroArtist nombre={artist?.nombre} imagen={artist?.img_hero}></HeroArtist>
            <div className='m-auto flex flex-col gap-30 pt-20 pb-12'>
                <div id="destacados" className='w-[90%] m-auto mb-6'>
                  <div>
                   {isLoading ? (
                        <div className="text-center py-10 text-lg text-gray-700">
                            Cargando eventos, por favor espera...
                        </div>
                        ) : artist?.conciertos?.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:row-span-1 gap-8'>
                            {artist.conciertos.map((c) => (
                                <Cardproduct information={c} key={c.id}/>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-10 text-lg text-gray-700">
                            Actualmente este artista no tiene ningún evento.
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className='w-[90%] m-auto flex gap-10 items-center mb-10 bg-[#f8f8f8]'>
                <div className="w-[50%]">
                    <h2 className="text-lg mb-6">Sobre {artist?.nombre}</h2>
                    {formatDescription(artist?.descripcion)}

                </div>
                <img src={artist?.images} className="w-[50%] mix-blend-multiply h-[60vh] object-contain "/>
            </div>
        </div>
    )
}