import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userServices";

export const useGetUsers = () => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ["usuarios"],
    queryFn: () => getUsers(token),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};