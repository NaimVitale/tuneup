import { useParams } from "react-router-dom";
import { useGetEntradasByUser } from "../hooks/entradas/UseGetEntradasByUser";
import CardProfileTicket from "../components/CardProfileTicket";

export default function EntradasProfilePage(){
    const {id} = useParams();
    const { data: entradas, isError, isLoading } = useGetEntradasByUser(id);

    return(
        <div className="h-[50vh]">
            <h1 className="text-2xl mb-6">Tus entradas</h1>
            <div className="grid grid-cols-2 gap-6 ">
                {entradas?.map((e) => (
                    <CardProfileTicket entrada={e} key={e.id} />
                ))}
            </div>
        </div>
    )
}