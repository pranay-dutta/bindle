import OpenLibBook from "@/components/open-library/OpenLibBook";
import OpenLibBookSkeleton from "@/components/open-library/OpenLibBookSkeleton";
import Pagination from "@/components/Pagination";
import useOpenLibSubjectList from "@/hooks/open-library/useOpenLibSubjectList";
import { Box, Grid, Group, Heading } from "@chakra-ui/react";
import { useSearchParams } from "react-router";
import { MdOutlineWbSunny } from "react-icons/md";
import AdSection from "@/components/AdSection";

const NewReleasePage = () => {
  const PAGE_SIZE = 14;
  const subject = "Fantasy";
  const [searchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") || "1") - 1;
  const { data, isLoading } = useOpenLibSubjectList(subject, pageNumber, PAGE_SIZE);

  return (
    <Box p={4}>
      <Group display={"flex"} flexDirection="column" gap={4} alignItems="center">
        <Heading fontSize="2xl" mt={2} mb={-6}>
          New Released Fantasy Books
          <MdOutlineWbSunny style={{ display: "inline", marginLeft: "4px", color: "red" }} />
        </Heading>
        <Box w="full">
          <AdSection />
        </Box>

        <Grid alignContent="start" templateColumns="repeat(7, 1fr)" gap={4}>
          {isLoading
            ? Array.from({ length: PAGE_SIZE }, (_, index) => <OpenLibBookSkeleton key={index} />)
            : data?.works.map((book) => <OpenLibBook text="New" key={book.key} openLibBook={book} />)}
        </Grid>

        {/* Pagination Component */}
        <Box mx="auto" mt={5} w="fit-content">
          <Pagination pageSize={PAGE_SIZE} totalCount={data?.work_count || 0} />
        </Box>
      </Group>
    </Box>
  );
};

export default NewReleasePage;
