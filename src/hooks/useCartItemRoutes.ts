import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";
import { getOLCoverUrls, isNytBook } from "@/utils";
import useAuthorizedBackendClient from "./useAuthorizedBackendClient";

const useCartItemRoutes = () => {
  const authorizedClient = useAuthorizedBackendClient();

  /// method to add a book to the cart
  const addToCart = async (book: NytBook | SearchedBook) => {
    const backendClient = await authorizedClient("/cart-item/add");

    const isNyt = isNytBook(book);
    const openLibCovers = isNyt ? "" : getOLCoverUrls(book.cover_i || 0);

    const data = {
      bookTitle: book.title,
      image: isNyt ? book.book_image : openLibCovers[0] || "",
      price: parseInt(book.price),
      quantity: 1
    };

    backendClient.post(data);
  };
  //method to remove a book from the cart
  const removeFromCart = async (bookId: string) => {
    const backendClient = await authorizedClient("/cart-item/" + bookId);
    return backendClient.delete();
  };

  const increaseQty = async (bookId: string) => {
    const backendClient = await authorizedClient(
      "/cart-item/increase/" + bookId
    );
    return backendClient.patch();
  };

  const decreaseQty = async (bookId: string) => {
    const backendClient = await authorizedClient(
      "/cart-item/decrease/" + bookId
    );

    return backendClient.patch();
  };

  return { addToCart, removeFromCart, increaseQty, decreaseQty };
};

export default useCartItemRoutes;
