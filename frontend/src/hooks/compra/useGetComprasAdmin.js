import { useQuery } from "@tanstack/react-query";
import { getComprasAdmin } from "../../services/compraServices";

export const useGetComprasAdmin = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["compras-admin"],
    queryFn: () => getComprasAdmin(token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};