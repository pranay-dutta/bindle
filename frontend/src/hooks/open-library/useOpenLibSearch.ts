import createOpenLibClient from "@/services/clients/openLibClient";
import { useQuery } from "@tanstack/react-query";
import type { SearchData } from "@/interfaces/open-library/OLSearch";
import ms from "ms";

const useOpenLibSearch = (
  searchTerm: string | null,
  currentPage: number,
  pageSize: number
) => {
  const olClient = createOpenLibClient<SearchData>("/search.json");

  return useQuery<SearchData>({
    queryKey: [searchTerm, currentPage],
    queryFn: () =>
      olClient.get({
        params: { page: currentPage, q: searchTerm, limit: pageSize }
      }),
    refetchOnWindowFocus: false,
    staleTime: ms("2h"),
    retry: 1,

    select: (data) => {
      const books = data.docs.map((book) => {
        book.price = Math.floor(Math.random() * 100).toString();
        return book;
      });
      return { ...data, docs: books };
    }
  });
};
export default useOpenLibSearch;
