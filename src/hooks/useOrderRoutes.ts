import { useAuth } from "@clerk/clerk-react";
import createBackendClient from "../services/clients/backendClient";
import useCartStore from "@/store/useCartStore";
import { getOLCoverUrls, isNytBook } from "@/utils";

const useOrderRoutes = () => {
  const { getToken } = useAuth();
  const cart = useCartStore((s) => s.cart);
  const getQty = useCartStore((s) => s.getQty);

  //method to get all order of the current user
  const getUserOrders = async () => {
    const token = await getToken({ template: "bindle-token" });
    const backendClient = createBackendClient("/order/getall");

    const response = await backendClient.get({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  };

  //method to place a new order
  const placeOrder = async () => {
    const token = await getToken({ template: "bindle-token" });
    const cartItems = [...cart.keys()];

    if (!cartItems.length) return;

    const backendClient = createBackendClient("/order/create");

    const orderItems = cartItems.map((book) => {
      const isNyt = isNytBook(book);
      const qty = getQty(book);
      const openLibCovers = isNyt ? "" : getOLCoverUrls(book.cover_i || 0);

      return {
        bookTitle: book.title,
        price: parseInt(book.price),
        quantity: qty,
        image: isNyt ? book.book_image : openLibCovers[0] || ""
      };
    });
    const response = await backendClient.post(orderItems, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  };

  //method to cancel an existing order
  const cancelOrder = async (orderId: string) => {
    const token = await getToken({ template: "bindle-token" });

    const backendClient = createBackendClient(`/order/cancel/${orderId}`);
    const response = await backendClient.post(null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  };

  return { placeOrder, getUserOrders, cancelOrder };
};
export default useOrderRoutes;
