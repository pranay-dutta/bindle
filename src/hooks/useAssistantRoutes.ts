import { useQuery } from "@tanstack/react-query";
import useAuthorizedBackendClient from "./useAuthorizedBackendClient";

const useAssistantRoutes = () => {
  const authorizedClient = useAuthorizedBackendClient();

  const getAssistantResponse = async () => {
    const backendClient = await authorizedClient<{ message: string }>(
      "/assistant"
    );
    return await backendClient.get();
  };

  const useAssistantResponse = () => {
    return useQuery({
      queryKey: ["assistant-response"],
      queryFn: () => getAssistantResponse(),
      refetchOnWindowFocus: false
    });
  };

  return { useAssistantResponse };
};

export default useAssistantRoutes;
