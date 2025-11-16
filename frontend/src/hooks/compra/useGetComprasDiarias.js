import { useQuery } from '@tanstack/react-query';
import { getNewUsers } from '../../services/userServices';
import { getComprasDiarias } from '../../services/compraServices';

export const useGetComprasDiarias = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['compras-diarias'],
    queryFn: () => getComprasDiarias(token),
    staleTime: 1000 * 60 * 5,
    retry: 1, 
  });
};