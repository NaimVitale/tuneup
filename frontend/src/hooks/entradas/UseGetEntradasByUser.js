import { useQuery } from "@tanstack/react-query";
import { getEntradas } from "../../services/entradaServices";

export const useGetEntradasByUser = (id, limit = null) => {
    const token = localStorage.getItem('token');

    return useQuery({
        queryKey: ["entradas", id, limit],
        queryFn: () => getEntradas(id, token, limit),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};