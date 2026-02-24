import { useEffect, useMemo } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import createBackendClient from "@/services/clients/backendClient";

const useRegisterUser = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  // Memoize backend client to avoid unnecessary re-renders and API calls
  const backendClient = useMemo(
    () => createBackendClient("/user/register"),
    []
  );

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) return;

      try {
        const token = await getToken({ template: "bindle-token" });
        await backendClient.post(null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("User sync failed", err);
      }
    };

    syncUser();
  }, [isSignedIn, backendClient, getToken]);
};

export default useRegisterUser;
