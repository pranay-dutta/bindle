import { useQuery } from "@tanstack/react-query";
import createOpenLibClient from "@/services/openLibClient";
import type { OpenLibraryBookData } from "@/interfaces/open-library";

export const useOpenLibBook = (isbn: string) => {
  const client = createOpenLibClient<OpenLibraryBookData>(`/api/books`);

  return useQuery({
    queryKey: ["OpenLibBook", isbn],
    queryFn: () =>
      client.get({ params: { bibkeys: isbn, jscmd: "data", format: "json" } }),
  });
};
