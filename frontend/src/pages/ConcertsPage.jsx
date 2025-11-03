import Cardproduct from "../components/CardProduct";
import HeroEvents from "../components/HeroEvents";
import UpcomingConcertsCard from "../components/UpcomingConcertsCard";
import { useGetConciertos } from "../hooks/concerts/useGetConcerts";
import InputSelect from "../components/InputSelect";
import InputDate from "../components/InputDate";
import HeroConcerts from '../assets/hero-concerts.avif';
import { useGetGenerosPublic } from "../hooks/genero/useGetGenerosPublic";
import { useFilters } from "../hooks/useFilters";

  export default function ConcertsPage() {
    const { data: generos, isLoading: isLoadingGeneros } = useGetGenerosPublic();
    const { genero, fecha, handleGeneroChange, handleFechaChange } = useFilters(generos);

    const { data: conciertos, isLoading } = useGetConciertos({
      genero,
      fechaInicio: fecha,
    });

    return (
      <div className="mb-20">
        <HeroEvents bg_image={HeroConcerts} title={"Conciertos"} />

        <div className="w-[90%] m-auto">
          <div className="pb-6 pt-12">
            <div className="lg:w-[50%] grid-cols-1 grid lg:grid-cols-3 gap-6">
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
              <InputDate
                value={fecha}
                onChange={handleFechaChange}
                placeholder="Filtrar por fecha"
              />
            </div>
          </div>

          <div className="pb-12 pt-6">
            {isLoading ? (
              <div className="text-center py-10 text-lg text-gray-700">
                Cargando eventos, por favor espera...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {conciertos.map((c) => (
                  <Cardproduct information={c} key={c.concierto_id} />
                ))}
              </div>
            )}

            <div className="border border-[#C122ED] mt-20 mb-20"></div>
            
            <div id="proximamente">
              <h3 className="text-xl">300 Próximos Conciertos</h3>
              <div className="flex gap-8 mt-6">
                <div className="w-[100%] flex flex-col gap-4">
                  <UpcomingConcertsCard />
                  <UpcomingConcertsCard />
                  <UpcomingConcertsCard />
                  <UpcomingConcertsCard />
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
    );
}