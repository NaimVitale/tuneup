import { useQuery } from '@tanstack/react-query';
import { getConcertsPublic } from '../../services/concertServices';

export const useGetConciertos = ({ estado, genero = '', fechaInicio = '', page = 1, limit = 10 } = {}) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 3;

  return useQuery({
    queryKey: ['conciertos', estado, genero, fechaInicio, pageNumber, limitNumber],
    queryFn: () =>
      getConcertsPublic({
        estado,
        genero,
        fechaInicio,
        page: pageNumber,
        limit: limitNumber,
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
