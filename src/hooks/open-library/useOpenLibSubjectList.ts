import type { Subject } from "@/data/open-library-subjects";
import type { SubjectData } from "@/interfaces/open-library/SubjectData";
import createOpenLibClient from "@/services/openLibClient";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useOpenLibSubjectList = (subject: Subject) => {
  const openLibClient = createOpenLibClient<SubjectData>("/subjects/" + subject.toLocaleLowerCase() + ".json");
  return useQuery({
    queryKey: [subject],
    queryFn: openLibClient.get,
    staleTime: ms("1d")
  });
};

export default useOpenLibSubjectList;
