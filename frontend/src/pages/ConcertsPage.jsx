import Cardproduct from "../components/CardProduct";
import HeroEvents from "../components/HeroEvents";
import UpcomingConcertsCard from "../components/UpcomingConcertsCard";
import InputSelect from "../components/InputSelect";
import InputDate from "../components/InputDate";
import HeroConcerts from '../assets/hero-concerts.avif';
import { useGetGenerosPublic } from "../hooks/genero/useGetGenerosPublic";
import { useFilters } from "../hooks/useFilters";
import { useAuth } from "../context/AuthContext";
import { Guitar } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetConciertos } from "../hooks/concerts/useGetConcerts";
import { useState } from "react";
import Pagination from "../components/Pagination";

  export default function ConcertsPage() {
    const [pageActivo, setPageActivo] = useState(1);
    const [pageProximos, setPageProximos] = useState(1);
    const { data: generos, isLoading: isLoadingGeneros } = useGetGenerosPublic();
    const { genero, fecha, handleGeneroChange, handleFechaChange } = useFilters(generos);
    const { token,} = useAuth();

    const { data: conciertos_activos_response, isLoading } = useGetConciertos({
      estado: "activo",
      genero,
      fechaInicio: fecha,
      page: pageActivo,
    });
    const conciertos_activos = conciertos_activos_response?.data || [];
    const meta = conciertos_activos_response?.meta;

    const { data: conciertos_proximos_response, isLoading: LoadingProximos } = useGetConciertos({
      estado: "proximamente",
      page: pageProximos
    });
    const conciertos_proximos = conciertos_proximos_response?.data || [];
    const meta_proximos = conciertos_proximos_response?.meta;

    return (
      <div className="mb-10 md:mb-20">
        <HeroEvents bg_image={HeroConcerts} title={"Conciertos"} />

        <div className="w-[90%] m-auto">
          <div className="pb-6 pt-12">
            <div className="lg:w-[50%] grid-cols-1 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <InputSelect
                placeholder="Seleccione género"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {conciertos_activos?.map((c) => (
                  <Cardproduct information={c} key={c?.id} />
                ))}
              </div>
            )}
            {conciertos_activos_response?.meta?.totalPages > 1 && (
              <Pagination 
                page={pageActivo} 
                setPage={setPageActivo} 
                totalPages={conciertos_activos_response.meta.totalPages} 
              />
            )}
            <div className="border border-[#C122ED] mt-20 mb-20"></div>
            
            <div id="proximamente">
              <h3 className="text-xl">{conciertos_proximos?.length} Próximos conciertos a la venta</h3>
              <div className="flex flex-col lg:flex-row gap-10 md:gap-8 mt-6">
                <div className="w-[100%] flex flex-col gap-4">
                {conciertos_proximos?.map((c) => (
                  <UpcomingConcertsCard concierto={c} key={c?.id} />
                ))}
                {conciertos_proximos_response?.meta?.totalPages > 1 && (
                <Pagination 
                  page={pageProximos} 
                  setPage={setPageProximos} 
                  totalPages={conciertos_proximos_response.meta.totalPages} 
                />
                )}
                </div>
                  {!token ? (
                    <div className="w-full lg:w-[25%]">
                      <div className="bg-gradient-to-br from-[#C122ED] to-[#9333EA] rounded-3xl text-white p-6 overflow-hidden sticky top-30">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                          <div className="relative z-10 text-center">
                            <Guitar size={50} className="mx-auto mb-4"/>
                            <h3 className="text-2xl font-bold mb-3">¡Únete a TuneUp!</h3>
                            <p className="text-white/90 text-sm mb-6">
                            Guarda favoritos y recibe notificaciones de tus artistas.
                            </p>
                            <div className="flex flex-col">
                              <Link to={'/register'} className="w-full px-4 bg-white text-[#C122ED] hover:bg-gray-100 font-semibold py-3 rounded-full transition-all mb-3">
                              Crear cuenta
                              </Link>
                              <Link to={'/login'} className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-full transition-all">
                              Iniciar sesión
                              </Link>
                            </div>
                          </div>
                      </div>
                    </div>
                    ) : (
                    <>
                    </>
                  )}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
}