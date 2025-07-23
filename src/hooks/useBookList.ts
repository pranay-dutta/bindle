import type { ListNames } from "@/interfaces/new-york-times/ListNames";
import type { Overview } from "@/interfaces/new-york-times/Overview";
import createNytClient from "@/services/nytClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useBookList = (listName: ListNames) => {
  const nytClient = createNytClient<Overview>(`/current/${listName}.json`);

  return useQuery({
    queryKey: ["list", listName],
    queryFn: nytClient.getAll,
    staleTime: ms("2h"),
  });
};
export default useBookList;
