import type { List } from "@/interfaces/new-york-times/List";
import type { ListNames } from "@/interfaces/new-york-times/ListNames";
import createBackendClient from "@/services/backendClient";
// import createNytClient from "@/services/nytClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useNytBookList = (listName: ListNames) => {
  // const nytClient = createNytClient<List>(`/current/${listName}.json`);
  const client = createBackendClient<List>(`/books/${listName}`);
  const getTempData = async () => {
    return client.getNytAll();
  };

  return useQuery({
    queryKey: ["list", listName],
    queryFn: () => getTempData(),
    staleTime: ms("2h"),
    select: (data) => {
      const books = data.books.map((book) => {
        book.price = Math.floor(Math.random() * 100).toString();
        return book;
      });
      return { data, books: books };
    }
  });
};
export default useNytBookList;
