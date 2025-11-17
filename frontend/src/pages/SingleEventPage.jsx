import { useMemo, useState, useEffect } from "react";
import HeroSingleEvent from "../components/HeroSingleEvent";
import SeatMap from "../components/SeatMap";
import CardTicket from "../components/CardTicket";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useGetConcert } from "../hooks/concerts/useGetConcert";
import { Armchair, MapIcon, ShoppingCart} from "lucide-react";
import ListTickets from "../components/ListTickets";
import { useTickets } from "../hooks/useTickets";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAuth } from "../context/AuthContext";
import CheckoutButton from "../components/CheckoutButton";

export default function SingleEventPage() {
  const MAX_ENTRADAS_TOTAL = 6;
  const { evento, id } = useParams();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (evento && !VALID_RESOURCES.includes(evento)) {
    return <Navigate to="/404" replace state={{ from: location }} />;
  }

  const { data, isLoading, isError } = useGetConcert(id);
  const { token, userID } = useAuth();

  const {
    ticketsSeleccionados,
    zonaSeleccionada,
    manejarSeleccionSeccion,
    actualizarCantidad,
    eliminarTicket,
    calcularTotalEntradas,
    calcularTotal
  } = useTickets(MAX_ENTRADAS_TOTAL);

  const tieneSVG = useMemo(
    () => data?.recinto?.secciones?.some(s => s.svg_path),
    [data]
  );

  // -----------------------------
  // NUEVA LÓGICA DE DISPONIBILIDAD
  const [entradasDisponibles, setEntradasDisponibles] = useState(true);
  const [contador, setContador] = useState("");

  useEffect(() => {
    if (!data?.fecha_venta) {
      setEntradasDisponibles(true);
      return;
    }

    const fechaVenta = new Date(data.fecha_venta);
    const ahora = new Date();

    if (fechaVenta <= ahora) {
      setEntradasDisponibles(true);
      return;
    }

    setEntradasDisponibles(false);

    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diff = fechaVenta - ahora;
      if (diff <= 0) {
        setEntradasDisponibles(true);
        clearInterval(intervalo);
        return;
      }
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);
      setContador(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [data?.fecha_venta]);
  // -----------------------------

  return (
    <div className="min-h-screen">
      <HeroSingleEvent eventData={data}></HeroSingleEvent>
      <div className="flex flex-col lg:flex-row">
        {/* Columna izquierda - Tickets */}
        <div className="w-full lg:w-[40%] relative p-0 lg:border-r lg:border-[#C122ED]" style={{ boxShadow: isMobile ? 'none' : '1px 0px 20px -10px #C122ED' }}>
          {/* OVERLAY si entradas NO disponibles */}
          {!entradasDisponibles ? (
            <div className="absolute inset-0 z-50 bg-white/80 flex flex-col items-center justify-center pointer-events-auto">
              <Armchair className="text-[#C122ED] mb-2" size={60} />
              <p className="font-semibold text-xl text-gray-700">Entradas disponibles en:</p>
              <p className="text-lg text-gray-500 mt-1">{contador}</p>
            </div>
          ) : (
            <div className="w-full px-4 sm:w-[90%] lg:w-[75%] m-auto pt-4 sm:pt-6 lg:pt-2 min-h-[50vh] lg:h-[calc(100vh-200px)] flex flex-col pb-10 md:pb-1"> 
            {/* Lista de secciones disponibles */}
            {(!tieneSVG || isMobile) && data?.recinto?.secciones && (
              <div className="mb-4 sm:mb-6">
                <ListTickets
                  secciones={data.recinto.secciones}
                  ticketsSeleccionados={ticketsSeleccionados}
                  calcularTotalEntradas={calcularTotalEntradas}
                  MAX_ENTRADAS_TOTAL={MAX_ENTRADAS_TOTAL}
                  manejarSeleccionSeccion={entradasDisponibles ? manejarSeleccionSeccion : () => {}}
                  disabled={!entradasDisponibles}
                />
              </div>
            )}

            {/* Lista de tickets seleccionados */}
            <div className="flex-1 flex flex-col min-h-0 pt-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-medium">Tus entradas</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {calcularTotalEntradas()}/{MAX_ENTRADAS_TOTAL}
                  </span>
                  <ShoppingCart className="text-[#C122ED] mr-4" size={isMobile ? 20 : 24} />
                </div>
              </div>

              {ticketsSeleccionados.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Armchair className="text-[#C122ED] mx-auto mb-2" size={isMobile ? 40 : 48} />
                  <p className="text-sm sm:text-base text-gray-500">
                    {tieneSVG && !isMobile
                      ? "Selecciona secciones en el mapa" 
                      : "Selecciona secciones disponibles"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Máximo {MAX_ENTRADAS_TOTAL} entradas por compra
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-2 sm:space-y-3 mb-3 sm:mb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#C122ED #f1f1f1' }}>
                    {ticketsSeleccionados.map((ticket) => (
                      <CardTicket
                        key={ticket.seccion.id}
                        seccion={ticket.seccion}
                        cantidad={ticket.cantidad}
                        onCantidadChange={entradasDisponibles ? actualizarCantidad : () => {}}
                        onRemove={entradasDisponibles ? () => eliminarTicket(ticket.seccion.id) : () => {}}
                        maxTotal={MAX_ENTRADAS_TOTAL}
                        totalActual={calcularTotalEntradas()}
                      />
                    ))}
                  </div>

                  <div className="p-3 sm:p-4 bg-gradient-to-r from-[#C122ED]/10 to-[#9333EA]/10 rounded-xl border-2 border-[#C122ED]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {calcularTotalEntradas()} {calcularTotalEntradas() === 1 ? 'entrada' : 'entradas'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#C122ED]">
                        {calcularTotal().toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="font-semibold text-base sm:text-lg">Total:</span>
                      <span className="font-bold text-xl sm:text-2xl text-[#C122ED]">
                        {calcularTotal().toFixed(2)}€
                      </span>
                    </div>
                    {token ? (
                      <CheckoutButton 
                        token={token}
                        items={ticketsSeleccionados.map(t => ({
                          id_precio_stripe: t.seccion.id_precio_stripe,
                          quantity: t.cantidad
                        }))}
                        id_usuario={userID}
                        disabled={!entradasDisponibles}
                      />
                    ) : (
                      <button
                        onClick={() => window.location.href = '/login'}
                        className="w-full bg-[#C122ED] text-white font-semibold py-3 rounded-lg hover:bg-[#a01bc7] transition-colors"
                        disabled={!entradasDisponibles}
                      >
                        Inicia sesión para pagar
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
          
        {/* Columna derecha - Mapa */}
        <div className="hidden lg:flex w-full lg:w-[60%] justify-center bg-gradient-to-r from-[#C122ED]/60 via-[#6B21A8]/40 to-[#9333EA]/30 min-h-[400px] lg:min-h-0 relative">
          {!entradasDisponibles && <div className="absolute inset-0 z-50 bg-white/60 pointer-events-auto"></div>}
          {tieneSVG && !isMobile ? (
            <SeatMap
              secciones={data.recinto.secciones}
              onSelect={entradasDisponibles ? manejarSeleccionSeccion : () => {}}
              disabled={!entradasDisponibles}
            />
          ) : (
            <div className="hidden lg:flex py-20 text-center min-h-[80vh] items-center justify-center">
              <div className="text-gray-600 bg-white py-12 sm:py-20 px-6 sm:px-10 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-4 max-w-md mx-4">
                <MapIcon className="text-[#C122ED]" size={32} />
                <p className="text-sm sm:text-base">Mapa no disponible para este recinto</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}