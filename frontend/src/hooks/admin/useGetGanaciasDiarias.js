import { useQuery } from '@tanstack/react-query';
import { getGananciasDiarias } from '../../services/stripeServices';

export const useGetGananciasDiarias = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['ganancias-diarias'],
    queryFn: () => getGananciasDiarias(token),
    staleTime: 1000 * 60 * 5,
    retry: 1, 
  });
};