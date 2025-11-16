import Spinner from "../../components/Spinner";
import { useGetGananciasMensuales } from "../../hooks/useGetGananciasMensuales";
import { ArrowDownRight, ArrowUpRight, Calendar, ShoppingCart, Ticket, TrendingUp, Users } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: total, isLoading, isError } = useGetGananciasMensuales();

  const stats = {
    ingresosMes: 15750,
    metaMes: 20000,
    ventasHoy: 2450,
    usuariosNuevos: 127,
    entradasVendidas: 342,
    ticketPromedio: 85.50,
    crecimiento: 12.5
  };

  const ventasRecientes = [
    { id: 1, evento: "Metallica", cantidad: 4, total: 360, fecha: "Hace 5 min" },
    { id: 2, evento: "Bad Bunny", cantidad: 2, total: 180, fecha: "Hace 12 min" },
    { id: 3, evento: "Coldplay", cantidad: 6, total: 540, fecha: "Hace 23 min" },
    { id: 4, evento: "Arctic Monkeys", cantidad: 3, total: 240, fecha: "Hace 1 hora" }
  ];

  const topEventos = [
    { nombre: "Metallica", vendidas: 1250, ingresos: 112500, tendencia: "up" },
    { nombre: "Bad Bunny", vendidas: 980, ingresos: 88200, tendencia: "up" },
    { nombre: "Coldplay", vendidas: 850, ingresos: 76500, tendencia: "down" },
    { nombre: "Arctic Monkeys", vendidas: 720, ingresos: 64800, tendencia: "up" }
  ];


    return(
    <div className="w-full">
      <div className="h-full bg-white shadow-md flex flex-col">
        <div className="py-[3em] lg:py-[4em] px-[1em] lg:px-[3em] justify-between items-center flex-shrink-0">
            {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Resumen de actividad y ventas</p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
        {/* Card principal - Ingresos del mes */}
        <div className="lg:col-span-1 bg-gradient-to-br from-[#C122ED] to-[#9333EA] rounded-2xl shadow-lg p-8 text-white">
        {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <Spinner color="white" />
            </div>
        ) : isError ? (
            <p className="text-white text-center">Error al cargar las ganancias</p>
        ) : (
            <>
            <div className="flex items-start justify-between mb-6">
                <div>
                <p className="text-white/80 text-sm mb-1">Ingresos del mes</p>
                <h2 className="text-4xl font-black">{total?.toLocaleString()}€</h2>
                <p className="text-white/80 text-sm mt-2">Meta: {stats.metaMes.toLocaleString()}€</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                <TrendingUp size={28} />
                </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-3">
                <div 
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${(total / stats.metaMes) * 100}%` }}
                />
            </div>
            <p className="text-white/90 text-sm">
                {((total / stats.metaMes) * 100).toFixed(1)}% completado
            </p>
            </>
        )}
        </div>

          {/* Stats cards */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <ShoppingCart size={20} className="text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <ArrowUpRight size={16} />
                  {stats.crecimiento}%
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.ventasHoy.toLocaleString()}€</p>
              <p className="text-xs text-gray-500 mt-1">Ventas hoy</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="bg-blue-100 p-2 rounded-lg mb-3 w-fit">
                <Users size={20} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.usuariosNuevos}</p>
              <p className="text-xs text-gray-500 mt-1">Usuarios nuevos</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="bg-purple-100 p-2 rounded-lg mb-3 w-fit">
                <Ticket size={20} className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.entradasVendidas}</p>
              <p className="text-xs text-gray-500 mt-1">Entradas vendidas</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="bg-orange-100 p-2 rounded-lg mb-3 w-fit">
                <Calendar size={20} className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.ticketPromedio}€</p>
              <p className="text-xs text-gray-500 mt-1">Ticket promedio</p>
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="gap-6">
          {/* Top eventos */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top eventos del mes</h3>
            <div className="space-y-4">
              {topEventos.map((evento, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-gray-300">#{index + 1}</span>
                      <p className="font-semibold text-gray-900">{evento.nombre}</p>
                      {evento.tendencia === "up" ? (
                        <ArrowUpRight size={16} className="text-green-500" />
                      ) : (
                        <ArrowDownRight size={16} className="text-red-500" />
                      )}
                    </div>
                    <p className="font-bold text-[#C122ED]">{evento.ingresos.toLocaleString()}€</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{evento.vendidas} entradas</span>
                    <span>•</span>
                    <span>{(evento.ingresos / evento.vendidas).toFixed(0)}€ promedio</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    )
}