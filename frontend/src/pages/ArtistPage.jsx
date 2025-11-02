import HeroEvents from "../components/HeroEvents";
import CardArtist from "../components/CardArtist";
import InputSelect from "../components/InputSelect";
import Spinner from "../components/Spinner";
import HeroArtists from '../assets/hero-artists.avif';
import { useGetArtistsPublic } from "../hooks/artist/useGetArtistsPublic";
import { useGetGeneros } from "../hooks/genero/useGetGeneros";
import { useFilters } from "../hooks/useFilters";

export default function ArtistPage() {

    const { data: generos, isLoading: isLoadingGeneros } = useGetGeneros();

    const { genero, handleGeneroChange} = useFilters(generos);

    const { data: artistas, isLoading, isError } = useGetArtistsPublic(genero);
    
    if (isLoading) {
        return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Spinner/>
        </div>
        );
    }

    return (
        <div className="mb-20">
            <HeroEvents bg_image={HeroArtists} title={"Artistas"}/>
            <div className="w-[90%] m-auto">
                <div className="pb-6 pt-12">
                    <div className="lg:w-[50%] grid lg:grid-cols-3 gap-6">
                        <InputSelect
                            placeholder="Género"
                            value={genero || ""}
                            onChange={handleGeneroChange}
                            options={[
                                { label: "Todos", value: "" },
                                ...(generos?.map((g) => ({
                                label: g.nombre,
                                value: g.nombre.toLowerCase(),
                                })) || []),
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
                        {artistas.map( c => (
                            <CardArtist information={c} key={c.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}