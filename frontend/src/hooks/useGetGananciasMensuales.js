import { useQuery } from '@tanstack/react-query';
import { getGananciasMensuales } from '../services/stripeServices';

export const useGetGananciasMensuales = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['ganancias-mensuales'],
    queryFn: () => getGananciasMensuales(token),
    staleTime: 1000 * 60 * 5,
    retry: 1, 
  });
};

