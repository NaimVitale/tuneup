import { useQuery } from "@tanstack/react-query";
import { getCompra } from "../../services/compraServices";

export const useGetCompra = (stripe_payment_id) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["compra", stripe_payment_id],
    queryFn: () => getCompra(stripe_payment_id, token),
    enabled: !!stripe_payment_id,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};