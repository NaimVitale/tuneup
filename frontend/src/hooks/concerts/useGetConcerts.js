import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetConciertos = ({estado , genero = '', fechaInicio = '' } = {}) => {
  return useQuery({
    queryKey: [`conciertos-${estado}`, genero, fechaInicio],
    queryFn: async () => {
      const params = {};
      if (genero) params.genero = genero;
      if (fechaInicio) params.fechaInicio = fechaInicio;

      const { data } = await axios.get(`${API_URL}/conciertos/public?estado=${estado}`, { params });
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};