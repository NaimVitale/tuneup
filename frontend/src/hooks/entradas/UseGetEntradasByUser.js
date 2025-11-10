import { useQuery } from "@tanstack/react-query";
import { getEntradas } from "../../services/entradaServices";

export const useGetEntradasByUser = (id) => {
    const token = localStorage.getItem('token');

    return useQuery({
        queryKey: ["entradas", id],
        queryFn: () => getEntradas(id, token),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};