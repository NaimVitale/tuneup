import { useMemo } from "react";
import HeroSingleEvent from "../components/HeroSingleEvent";
import SeatMap from "../components/SeatMap";
import CardTicket from "../components/CardTicket";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useGetConcert } from "../hooks/concerts/useGetConcert";
import { Armchair, MapIcon, ShoppingCart} from "lucide-react";
import ListTickets from "../components/ListTickets";
import { useTickets } from "../hooks/tickets/useTickets";

export default function SingleEventPage() {
  const VALID_RESOURCES = ["conciertos"];
  const MAX_ENTRADAS_TOTAL = 6;
  const { evento, id } = useParams();
  const location = useLocation();

  if (evento && !VALID_RESOURCES.includes(evento)) {
    return <Navigate to="/404" replace state={{ from: location }} />;
  }

  const { data, isLoading, isError } = useGetConcert(id);

  const {
    ticketsSeleccionados,
    zonaSeleccionada,
    manejarSeleccionSeccion,
    actualizarCantidad,
    eliminarTicket,
    calcularTotalEntradas,
    calcularTotal
  } = useTickets(MAX_ENTRADAS_TOTAL);

  const tieneSVG = useMemo(() =>
    data?.recinto?.secciones?.some(s => s.svg_path),
  [data]);

  return (
    <div className="h-[100%]">
      <HeroSingleEvent eventData={data}></HeroSingleEvent>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[40%] relative p-0 border-r-1 border-[#C122ED]" style={{ boxShadow: '1px 0px 20px -10px #C122ED' }}>
          <div className="w-[90%] md:w-[75%] m-auto py-8"> 

            {/* Mostrar secciones disponibles si no hay SVG */}
            {!tieneSVG && data?.recinto?.secciones && (
              <ListTickets
                secciones={data.recinto.secciones}
                ticketsSeleccionados={ticketsSeleccionados}
                calcularTotalEntradas={calcularTotalEntradas}
                MAX_ENTRADAS_TOTAL={MAX_ENTRADAS_TOTAL}
                manejarSeleccionSeccion={manejarSeleccionSeccion}
              />
            )}

            {/* Lista de tickets seleccionados */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Tus entradas</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {calcularTotalEntradas()}/{MAX_ENTRADAS_TOTAL}
                  </span>
                  <ShoppingCart className="text-[#C122ED]" size={24} />
                </div>
              </div>

              {ticketsSeleccionados.length === 0 ? (
                <div className="text-center py-8">
                  <Armchair className="text-[#C122ED] mx-auto mb-2" size={48} />
                  <p className="text-gray-500">
                    {tieneSVG 
                      ? "Selecciona secciones en el mapa" 
                      : "Selecciona secciones disponibles"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Máximo {MAX_ENTRADAS_TOTAL} entradas por compra
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ticketsSeleccionados.map((ticket) => (
                    <CardTicket
                      key={ticket.seccion.id}
                      seccion={ticket.seccion}
                      cantidad={ticket.cantidad}
                      onCantidadChange={actualizarCantidad}
                      onRemove={() => eliminarTicket(ticket.seccion.id)}
                      maxTotal={MAX_ENTRADAS_TOTAL}
                      totalActual={calcularTotalEntradas()}
                    />
                  ))}

                  {/* Resumen total */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#C122ED]/10 to-[#9333EA]/10 rounded-lg border-2 border-[#C122ED]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">
                        {calcularTotalEntradas()} {calcularTotalEntradas() === 1 ? 'entrada' : 'entradas'}
                      </span>
                      <span className="text-sm font-semibold text-[#C122ED]">
                        {calcularTotal().toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-lg">Total:</span>
                      <span className="font-bold text-2xl text-[#C122ED]">
                        {calcularTotal().toFixed(2)}€
                      </span>
                    </div>
                    <button className="w-full py-3 bg-[#C122ED] text-white rounded-lg font-semibold hover:bg-[#9333EA] transition-colors">
                      Proceder al pago
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="m-auto w-full md:w-[60%] bg-gradient-to-r from-[#C122ED]/60 via-[#6B21A8]/40 to-[#9333EA]/30">
          {tieneSVG ? (
            <SeatMap
              secciones={data.recinto.secciones}
              onSelect={manejarSeleccionSeccion}
            />
          ) : (
            <div className="py-20 text-center h-[80vh] flex items-center justify-center">
              <p className="text-gray-600 bg-white py-20 px-10 rounded-2xl shadow-xl flex items-center gap-4">
                <MapIcon className="text-[#C122ED]" size={32} />
                Mapa no disponible para este recinto
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}