import type { ListNames } from "@/interfaces/new-york-times/ListNames";
import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import createBackendClient from "@/services/clients/backendClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface NytBookList {
  id: number;
  books?: NytBook[];
  list_name: string;
  list_name_encoded: string;
}
const useNytBookList = (listName: ListNames) => {
  const backendClient = createBackendClient<NytBookList>(
    `/books/${listName}`,
    null
  );

  return useQuery({
    queryKey: ["list", listName],
    queryFn: () => backendClient.get(),
    staleTime: ms("2h")
  });
};
export default useNytBookList;
