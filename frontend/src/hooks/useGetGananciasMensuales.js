import { useQuery } from '@tanstack/react-query';
import { getGananciasMensuales } from '../services/stripeServices';

export const useGetGananciasMensuales = () => {
  return useQuery({
    queryKey: ['ganancias-mensuales'],
    queryFn: () => getGananciasMensuales(),
    staleTime: 1000 * 60 * 5,
    retry: 1, 
  });
};

