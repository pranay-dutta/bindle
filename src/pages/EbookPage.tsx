import OpenLibBook from "@/components/open-library/OpenLibBook";
import OpenLibBookSkeleton from "@/components/open-library/OpenLibBookSkeleton";
import Pagination from "@/components/Pagination";
import useOpenLibSubjectList from "@/hooks/open-library/useOpenLibSubjectList";
import { Box, Grid, Group, Heading } from "@chakra-ui/react";
import { useSearchParams } from "react-router";

const EbookPage = () => {
  const PAGE_SIZE = 14;
  const subject = "Bears";
  const [searchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") || "1") - 1;
  const { data, isLoading } = useOpenLibSubjectList(subject, pageNumber, PAGE_SIZE);

  return (
    <Box p={4}>
      <Group display={"flex"} flexDirection="column" gap={4} alignItems="center">
        <Heading my={4}>Ebooks Collection</Heading>

        <Grid alignContent="start" templateColumns="repeat(7, 1fr)" gap={4}>
          {isLoading
            ? Array.from({ length: PAGE_SIZE }, (_, index) => <OpenLibBookSkeleton key={index} />)
            : data?.works.map((book) => <OpenLibBook key={book.key} openLibBook={book} />)}
        </Grid>

        {/* Pagination Component */}
        <Box mx="auto" mt={5} w="fit-content">
          <Pagination pageSize={PAGE_SIZE} totalCount={data?.work_count || 0} />
        </Box>
      </Group>
    </Box>
  );
};

export default EbookPage;
