import { Link, useParams } from "react-router-dom";
import { useGetEntradasByUser } from "../hooks/entradas/UseGetEntradasByUser";
import CardProfileTicket from "../components/CardProfileTicket";

export default function EntradasProfilePage(){
    const {id} = useParams();
    const { data: entradas, isError, isLoading } = useGetEntradasByUser(id);

    return(
        <div className="h-[50vh]">
            <h1 className="text-2xl mb-6">Tus entradas</h1>
            <div className="grid grid-cols-2 gap-6 ">
                {entradas?.length === 0 ? (
                    <div className="p-6 bg-white rounded-2xl shadow-md text-center text-gray-700">
                        Actualmente no tienes ninguna entrada comprada.{" "}
                        <Link 
                        to="/conciertos" 
                        className="text-[#C122ED] font-semibold hover:underline"
                        >
                        Compra una aquí
                        </Link>.
                    </div>
                    ) : (
                    entradas?.map((e) => (
                        <CardProfileTicket entrada={e} key={e.id} />
                    ))
                )}
            </div>
        </div>
    )
}