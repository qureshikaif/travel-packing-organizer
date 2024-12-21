import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";

import API_CLIENT from "../utils/api-client";

/**
 * Fetches the gear list for the authenticated user.
 * @returns {Object} - Contains data, error, and status flags.
 */
const fetchAllUsers = async () => {
  const response = await API_CLIENT.get(`/api/users`);
  return response.data;
};

/**
 * Custom hook to fetch the gear list for the authenticated user.
 * Utilizes TanStack Query for data fetching and caching.
 * @returns {Object} - Contains data, error, and status flags.
 */
const useAllUsers = () => {
  const { user, token } = useAuth();

  const enabled = !!user && !!token;
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60,
    enabled,
  });
};

export default useAllUsers;
