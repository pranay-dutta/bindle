import { useQuery } from "@tanstack/react-query";
import useAuthorizedBackendClient from "./useAuthorizedBackendClient";

interface OrderItem {
  id: string;
  bookTitle: string;
  quantity: number;
  image: string;
  price: number;
}
interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  orderItems: OrderItem[];
}
interface OrderData {
  orders: Order[];
}

const useOrderRoutes = () => {
  const authorizedClient = useAuthorizedBackendClient();

  //method to get all order of the current user
  const getUserOrders = async () => {
    const backendClient = await authorizedClient<OrderData>("/order/getall");
    return await backendClient.get();
  };

  //method to place a new order
  const placeOrder = async () => {
    const backendClient = await authorizedClient("/order/create");
    return await backendClient.post();
  };

  //method to cancel an existing order
  const cancelOrder = async (orderId: string) => {
    const backendClient = await authorizedClient(`/order/cancel/${orderId}`);
    return await backendClient.post();
  };

  const useUserOrders = () => {
    return useQuery<OrderData>({
      queryKey: ["user-orders"],
      queryFn: getUserOrders,
      refetchOnWindowFocus: false
    });
  };

  return { useUserOrders, placeOrder, getUserOrders, cancelOrder };
};
export default useOrderRoutes;
