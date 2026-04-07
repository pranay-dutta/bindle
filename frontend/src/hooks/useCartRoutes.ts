import { useQuery } from "@tanstack/react-query";
import useAuthorizedBackendClient from "./useAuthorizedBackendClient";

export interface CartItem {
  id: string;
  image: string;
  price: number;
  bookTitle: string;
  quantity: number;
}
export interface CartData {
  message: string;
  cart: {
    id: string;
    userId: string;
    items: CartItem[];
  };
}
const useCartRoutes = () => {
  const authorizedClient = useAuthorizedBackendClient();

  //method to get all cart items of the current user
  const getCartItems = async () => {
    const backendClient = await authorizedClient<CartData>("/cart/getall");
    return await backendClient.get();
  };

  const createCart = async () => {
    const backendClient = await authorizedClient("/cart/create");
    return await backendClient.post();
  };

  const clearCart = async () => {
    const backendClient = await authorizedClient("/cart/clear");
    return await backendClient.post();
  };

  const useCartItems = () => {
    return useQuery<CartData>({
      queryKey: ["cart-items"],
      queryFn: getCartItems,
      refetchOnWindowFocus: false
    });
  };

  return { getCartItems, createCart, clearCart, useCartItems };
};

export default useCartRoutes;
