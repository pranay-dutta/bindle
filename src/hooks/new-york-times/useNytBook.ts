import type { BooksCategory } from "@/interfaces/new-york-times/BooksCategory";
import type { List } from "@/interfaces/new-york-times/List";
import { removeKebabCase } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";

const useNytBook = (title: string | undefined) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  // Assuming the location state contains the category of books
  const state = location.state as BooksCategory;

  // Get the list from the query cache using the category from the state
  const list = queryClient.getQueryData<List>(["list", state.category]);

  // If the list is not found, return null
  if (!list || !list?.books || !title) return null;

  return list.books.find(
    (book) => book.title.toLowerCase() === removeKebabCase(title)
  );
};

export default useNytBook;
