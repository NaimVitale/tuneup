import HeroEvents from "../components/HeroEvents";
import CardArtist from "../components/CardArtist";
import InputSelect from "../components/InputSelect";
import Spinner from "../components/Spinner";
import { useGetArtistsPublic } from "../hooks/artist/useGetArtistsPublic";

export default function ArtistPage() {

    const { data: artistas, isLoading, isError } = useGetArtistsPublic();

    if (isLoading) {
        return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Spinner/>
        </div>
        );
    }

    return (
        <div className="mb-20">
            <HeroEvents></HeroEvents>
            <div className="w-[90%] m-auto">
                <div className="pb-6 pt-12">
                    <div className="w-[50%] grid grid-cols-3 gap-6">
                        <InputSelect placeholder="Genero" id="genero"
                            options={[
                            { label: "Rock", value: "rock" },
                            { label: "Pop", value: "pop" },
                            { label: "Reggaeton", value: "reggaeton" },
                            { label: "Electrónica", value: "electro" },
                        ]}/>
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