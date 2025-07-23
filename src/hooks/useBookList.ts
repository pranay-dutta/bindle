import type { List } from "@/interfaces/new-york-times/List";
import type { ListNames } from "@/interfaces/new-york-times/ListNames";
import createNytClient from "@/services/nytClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useBookList = (listName: ListNames) => {
  const nytClient = createNytClient<List>(`/current/${listName}.json`);

  return useQuery({
    queryKey: ["list", listName],
    queryFn: nytClient.getAll,
    staleTime: ms("2h"),
  });
};
export default useBookList;
