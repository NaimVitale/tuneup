import { Ticket } from "lucide-react";

export default function ListTickets({
  secciones,
  ticketsSeleccionados,
  calcularTotalEntradas,
  MAX_ENTRADAS_TOTAL,
  manejarSeleccionSeccion
}) {

  console.log(secciones)

  const seccionesDisponibles =
    secciones?.filter(
      (seccion) =>
        seccion.precio > 0 &&
        Number(seccion.capacidad) > 0 &&
        Number(seccion.capacidad_disponible) > 0
    ) || [];

  return (
    <div className="mt-6">
      <div className="mb-6">
      </div>

      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Ticket className="text-[#C122ED]" size={20} />
        Secciones disponibles
      </h3>

      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
        {seccionesDisponibles.map((seccion) => {
          const yaSeleccionada = ticketsSeleccionados.some(
            (t) => t.seccion.id === seccion.id
          );
          const puedeAgregar = calcularTotalEntradas() < MAX_ENTRADAS_TOTAL;

          return (
            <button
              key={seccion.id}
              onClick={() => puedeAgregar && manejarSeleccionSeccion(seccion)}
              disabled={!puedeAgregar}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                yaSeleccionada
                  ? "border-[#C122ED] bg-[#C122ED]/10 cursor-not-allowed"
                  : puedeAgregar
                  ? "border-gray-200 hover:border-[#C122ED] hover:bg-[#C122ED]/5 cursor-pointer"
                  : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{seccion.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {seccion.precio !== undefined ? `${seccion.precio}€` : "Precio no disponible"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {seccion.capacidad_disponible} disponibles
                  </p>
                  {yaSeleccionada && (
                    <span className="text-xs text-[#C122ED] font-semibold">
                      ✓ Seleccionada
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
