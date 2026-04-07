import { useQuery } from "@tanstack/react-query";
import useAuthorizedBackendClient from "./useAuthorizedBackendClient";
import ms from "ms";

interface Address {
  id: string;
  fullName: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}
interface AddressResponse {
  addresses: Address[];
}
const useAddressRoutes = () => {
  const authorizedClient = useAuthorizedBackendClient();

  // get all addresses for the user
  const getAllAddresses = async () => {
    const backendClient = await authorizedClient<AddressResponse>("/address/all");
    return backendClient.get();
  };

  // add a new address for the user
  const addNewAddress = async (address: Address) => {
    const backendClient = await authorizedClient<Address>("/address/create");
    return backendClient.post(address);
  };

  // update an existing address for the user
  const updateAddress = async (id: string, address: Address) => {
    const backendClient = await authorizedClient<Address>(
      `/address/update/${id}`
    );
    return backendClient.patch(address);
  };
  // delete an address for the user
  const deleteAddress = async (id: string) => {
    const backendClient = await authorizedClient<Address>(
      `/address/delete/${id}`
    );
    return backendClient.delete();
  };

  //set default address for the user
  const setDefaultAddress = async (id: string) => {
    const backendClient = await authorizedClient<Address>(
      `/address/default/${id}`
    );
    return backendClient.patch();
  };

  const useAllAddress = () => {
    return useQuery<AddressResponse>({
      queryKey: ["addresses"],
      queryFn: () => getAllAddresses(),
      staleTime: ms("1d"),
      refetchOnWindowFocus: false
    });
  };

  return {
    getAllAddresses,
    addNewAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    useAllAddress
  };
};

export default useAddressRoutes;
