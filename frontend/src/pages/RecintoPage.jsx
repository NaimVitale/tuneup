import HeroEvents from "../components/HeroEvents";
import CardArtist from "../components/CardArtist";
import InputSelect from "../components/InputSelect";
import Spinner from "../components/Spinner";
import HeroRecintos from '../assets/hero_recintos.avif'
import { useGetArtistsPublic } from "../hooks/artist/useGetArtistsPublic";
import { useFilters } from "../hooks/useFilters";
import { useGetCiudades } from "../hooks/ciudades/useGetCiudades";
import { useGetRecintosPublic } from "../hooks/recintos/useGetRecintosPublic";
import CardRecinto from "../components/CardRecinto";

export default function RecintoPage() {

    /*const { data: ciudades, isLoading: isLoadingGeneros } = useGetCiudades();*/

    //const {ciudad, handleCiudadChange} = useFilters();
    const { data: recintos, isLoading, isError } = useGetRecintosPublic();

    if (isLoading) {
        return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Spinner/>
        </div>
        );
    }

    return (
        <div className="mb-20">
            <HeroEvents bg_image={HeroRecintos} title={"Recintos"}/>
            <div className="w-[90%] m-auto">
                <div className="pb-6 pt-12">
                    <div className="lg:w-[50%] grid lg:grid-cols-3 gap-6">
                        {/*<InputSelect
                            placeholder="Seleccione ciudad"
                            value={ciudad || ""}
                            onChange={handleCiudadChange}
                            options={[
                                { label: "Todas", value: "" },
                                ...(ciudades?.map((g) => ({
                                label: g.nombre,
                                value: g.nombre.toLowerCase(),
                                })) || []),
                            ]}
                        />*/}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-12">
                        {recintos?.map( c => (
                            <CardRecinto recinto={c} key={c.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}