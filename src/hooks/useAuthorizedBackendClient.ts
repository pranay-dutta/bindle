import createBackendClient from "@/services/clients/backendClient";
import { useAuth } from "@clerk/clerk-react";

const useAuthorizedBackendClient = () => {
  const { getToken } = useAuth();

  return async <T>(endpoint: string) => {
    const token = await getToken({ template: "bindle-token" });
    return createBackendClient<T>(endpoint, token);
  };
};

export default useAuthorizedBackendClient;
