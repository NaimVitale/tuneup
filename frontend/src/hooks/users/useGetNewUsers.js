import { useQuery } from '@tanstack/react-query';
import { getNewUsers } from '../../services/userServices';

export const useGetNewUsers = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['usuarios-nuevos'],
    queryFn: () => getNewUsers(token),
    staleTime: 1000 * 60 * 5,
    retry: 1, 
  });
};