import { useQuery } from '@tanstack/react-query';
import { getRestoreWarningsConcert } from '../../services/concertServices';

export const useGetRestoreWarningsConcert = (conciertoId) => {
  return useQuery({
    queryKey: ['restoreWarnings', conciertoId],
    queryFn: () => getRestoreWarningsConcert(conciertoId),
    enabled: !!conciertoId, // solo corre si hay ID
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};