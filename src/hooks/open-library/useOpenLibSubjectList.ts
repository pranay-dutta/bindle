import { useCheckbox } from "@/components/checkbox/useCheckbox";
import type { Subject } from "@/data/open-library-subjects";
import type { SubjectData } from "@/interfaces/open-library/SubjectData";
// import createOpenLibClient from "@/services/openLibClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ms from "ms";

const useOpenLibSubjectList = (subject: Subject, pageNumber: number, limit?: number) => {
  // const openLibClient = createOpenLibClient<SubjectData>(
  //   "/subjects/" + subject.toLocaleLowerCase() + ".json"
  // );

  // const { selectedOptions: ebookOptions } = useCheckbox("ebook");
  const { selectedOptions: languageOptions } = useCheckbox("language");
  const { selectedOptions: sortOptions } = useCheckbox("sort");

  const sortBy = sortOptions[0] ? sortOptions[0].value : "";
  const language = languageOptions.map((opt) => opt.value.substring(0, 3)).join(",");

  const getData = async (offset: number) => {
    return await axios
      .get<SubjectData>(
        `http://localhost:3000/subjects/${subject}?offset=${offset}&limit=${
          limit || 12
        }&sort=${sortBy}&language=${language}`
      )
      .then((res) => res.data);
  };

  return useQuery({
    queryKey: [subject, pageNumber, sortBy, language],
    queryFn: () => getData(pageNumber * (limit || 12)),
    staleTime: ms("1d"),
    refetchOnWindowFocus: false
  });
};

export default useOpenLibSubjectList;
