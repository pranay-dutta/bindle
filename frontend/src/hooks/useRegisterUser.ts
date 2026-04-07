import { useMutation } from "@tanstack/react-query";
import useAuthorizedBackendClient from "./useAuthorizedBackendClient";

interface RegisterUserResponse {
  message: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}
const useRegisterUser = () => {
  const authorizedClient = useAuthorizedBackendClient();

  //method to register a new user in the backend
  const registerUser = async () => {
    const backendClient =
      await authorizedClient<RegisterUserResponse>("/user/register");
    return await backendClient.post();
  };

  return useMutation<RegisterUserResponse>({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    retry: false
  });
};

export default useRegisterUser;
