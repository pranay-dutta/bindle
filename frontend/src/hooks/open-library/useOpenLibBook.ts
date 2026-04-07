import type { OLBook } from "@/interfaces/open-library/OLBook";
import createOpenLibClient from "@/services/clients/openLibClient";
import useNytBookStore from "@/store/useNytBookStore";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useOpenLibBook = (isbn?: string) => {
  const currentNytBook = useNytBookStore((s) => s.nytBook);
  const bookIsbn = isbn || currentNytBook.primary_isbn13;
  const olClient = createOpenLibClient<OLBook>(`/isbn/${bookIsbn}.json`);

  return useQuery({
    queryKey: ["open-lib-book", bookIsbn],
    queryFn: olClient.get,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: ms("1d")
  });
};

export default useOpenLibBook;
