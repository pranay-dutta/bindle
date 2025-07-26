import type { OLWork } from "@/interfaces/open-library/OLWork";
import createOpenLibClient from "@/services/openLibClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import useOpenLibBook from "./useOpenLibBook";

const useOpenLibWork = (workId?: string) => {
  const { data: openLibBook } = useOpenLibBook();

  const bookWorkID = workId || openLibBook?.works?.[0].key;
  const olClient = createOpenLibClient<OLWork>(`${bookWorkID}.json`);

  return useQuery({
    queryKey: ["open-lib-work", bookWorkID],
    queryFn: olClient.get,
    staleTime: ms("1d"),
    enabled: !!bookWorkID
  });
};

export default useOpenLibWork;
