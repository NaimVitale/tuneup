import Spinner from "../../components/Spinner";
import { useGetGananciasDiarias } from "../../hooks/admin/useGetGanaciasDiarias";
import { useGetGananciasMensuales } from "../../hooks/useGetGananciasMensuales";
import { ArrowDownRight, ArrowUpRight, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useGetNewUsers } from "../../hooks/users/useGetNewUsers";
import { useGetComprasDiarias } from "../../hooks/compra/useGetComprasDiarias";

export default function AdminDashboardPage() {
  const { data: total, isLoading, isError } = useGetGananciasMensuales();
  const { data: diaria, isLoading: isLoadingDiaria, isError:isErrorDiaria } = useGetGananciasDiarias();
  const { data: users, isLoading: isLoadingUsers, isError:isErrorUsers} = useGetNewUsers();
  const { data: compras, isLoading: isLoadingCompra, isError:isErrorCompra} = useGetComprasDiarias();

  const stats = {
    ingresosMes: 15750,
    metaMes: 20000,
    ventasHoy: 2450,
    usuariosNuevos: 127,
    entradasVendidas: 342,
    ticketPromedio: 85.50,
    crecimiento: 12.5
  };


    return(
    <div className="w-full min-h-screen">
      <div className="min-h-screen bg-white shadow-md flex flex-col">
        <div className="py-[3em] lg:py-[4em] px-[1em] lg:px-[3em] justify-between items-center flex-shrink-0">
            {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Resumen de actividad y ventas</p>
        </div>

        {/* Grid principal */}
        <div className="flex-1 gap-6 mb-6">
          
        {/* Card principal - Ingresos del mes */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#C122ED] to-[#9333EA] rounded-2xl shadow-lg p-8 text-white mb-10">
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
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <ShoppingCart size={20} className="text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{diaria?.toLocaleString()}€</p>
              <p className="text-xs text-gray-500 mt-1">Ventas hoy</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="bg-blue-100 p-2 rounded-lg mb-3 w-fit">
                <Users size={20} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{users}</p>
              <p className="text-xs text-gray-500 mt-1">Usuarios nuevos</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-[#C122ED] transition-all">
              <div className="bg-purple-100 p-2 rounded-lg mb-3 w-fit">
                <ShoppingCart size={20} className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{compras}</p>
              <p className="text-xs text-gray-500 mt-1">Compras realizadas</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    )
}