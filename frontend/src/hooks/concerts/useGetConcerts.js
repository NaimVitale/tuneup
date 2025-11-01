import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetConciertos = () => {
  return useQuery({
    queryKey: ['conciertos'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/conciertos/public`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};