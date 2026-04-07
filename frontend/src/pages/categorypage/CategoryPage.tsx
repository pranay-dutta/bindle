import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";

import OpenLibBook from "@/components/open-library/OpenLibBook";
import type { Subject } from "@/data/open-library-subjects";
import { SUBJECTS } from "@/data/open-library-subjects";
import useOpenLibSubjectList from "@/hooks/open-library/useOpenLibSubjectList";
import OpenLibBookSkeleton from "@/components/open-library/OpenLibBookSkeleton";
import Pagination from "@/components/Pagination";
import { useRef, useState } from "react";
import { TfiMore, TfiMoreAlt } from "react-icons/tfi";
import { useNavigate, useParams, useSearchParams } from "react-router";
import LeftWindow from "./LeftWindow";

const CategoryPage = () => {
  const PAGE_SIZE = 12;
  const [searchParams] = useSearchParams();
  const [subjectLen, setSubjectLen] = useState(10);
  const subjects = Array.from({ length: subjectLen }, (_, i) => SUBJECTS[i]);

  const { category } = useParams<{ category: string }>();

  const page = parseInt(searchParams.get("page") || "1") - 1; // Zero-based index

  const { data, isLoading, isError } = useOpenLibSubjectList(
    category as Subject,
    page
  );
  const navigate = useNavigate();
  const workCount = useRef(0);

  // Update cache only when we have valid data
  if (data?.work_count) {
    workCount.current = data.work_count;
  }

  if (isError) return <div>Error loading data</div>;

  return (
    <Box px={{ base: 0, md: 6 }} py={4}>
      <Heading my={6} display="block" fontSize={{ base: "2xl", md: "3xl" }}>
        {category} Books
      </Heading>

      {/*Subject options */}
      <Flex flexWrap="wrap" mb={4} gap={2}>
        {subjects.map((subject) => (
          <Button
            key={subject}
            rounded="none"
            colorPalette="orange"
            size={{ base: "xs", sm: "sm", md: "md" }}
            variant={category === subject ? "solid" : "subtle"}
            onClick={() => navigate(`/categories/${subject}`)}
          >
            {subject}
          </Button>
        ))}
        <Button
          colorPalette="orange"
          variant="ghost"
          size={{ base: "xs", sm: "sm", md: "md" }}
          onClick={() => setSubjectLen(subjectLen <= 10 ? 20 : 10)}
        >
          {subjectLen <= 10 ? <TfiMoreAlt /> : <TfiMore />}
        </Button>
      </Flex>

      {/* Left Options window and Grid to show the books */}
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        borderTop="1px solid"
        borderColor="gray.300"
        pt={4}
        gap={{ base: 4, md: 6 }}
        alignItems="flex-start"
      >
        {/* Sidebar */}
        <Box
          w={{ base: "full", md: "220px", lg: "250px" }}
          flexShrink={0}
          position={{ md: "sticky" }}
          top={{ md: "20px" }}
        >
          <LeftWindow />
        </Box>

        {/* Books grid */}
        <Box flex={1}>
          <Grid
            alignContent="start"
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)"
            }}
            gap={{ base: 2, md: 4, lg: 5 }}
          >
            {isLoading
              ? Array.from({ length: PAGE_SIZE }, (_, index) => (
                  <OpenLibBookSkeleton key={index} />
                ))
              : data?.works.map((book) => (
                  <OpenLibBook key={book.key} openLibBook={book} />
                ))}
          </Grid>
        </Box>
      </Flex>

      {/* Pagination Component */}
      <Box mx="auto" mt={8} w="fit-content">
        <Pagination pageSize={PAGE_SIZE} totalCount={workCount.current} />
      </Box>
    </Box>
  );
};

export default CategoryPage;
