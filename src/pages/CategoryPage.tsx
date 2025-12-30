import { Box, Button, Flex, Grid, Heading, Stack } from "@chakra-ui/react";

import OpenLibBook from "@/components/open-library/OpenLibBook";
import type { Subject } from "@/data/open-library-subjects";
import { SUBJECTS } from "@/data/open-library-subjects";
import useOpenLibSubjectList from "@/hooks/open-library/useOpenLibSubjectList";

import Checkbox from "@/components/checkbox";
import { useCheckbox } from "@/components/checkbox/useCheckbox";
import DateRange from "@/components/DateRange";
import Pagination from "@/components/Pagination";
import type { OptionType } from "@/context/CheckboxContext";
import { useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import OpenLibBookSkeleton from "@/components/open-library/OpenLibBookSkeleton";
import { TfiMoreAlt } from "react-icons/tfi";
import { TfiMore } from "react-icons/tfi";

const CategoryPage = () => {
  const PAGE_SIZE = 12;
  const [searchParams] = useSearchParams();
  const [subjectLen, setSubjectLen] = useState(10);
  const subjects = Array.from({ length: subjectLen }, (_, i) => SUBJECTS[i]);

  const { category } = useParams<{ category: string }>();

  const page = parseInt(searchParams.get("page") || "1") - 1; // Zero-based index

  const { data, isLoading, isError } = useOpenLibSubjectList(category as Subject, page);
  const navigate = useNavigate();
  const workCount = useRef(0);

  // Update cache only when we have valid data
  if (data?.work_count) {
    workCount.current = data.work_count;
  }

  if (isError) return <div>Error loading data</div>;

  return (
    <Box my={3}>
      <Heading my={6} display="block" fontSize="3xl">
        {category} Books
      </Heading>

      {/*Subject options */}
      <Flex flexWrap="wrap" mb={4} gap={2}>
        {subjects.map((subject) => (
          <Button
            key={subject}
            rounded="none"
            colorPalette="orange"
            variant={category === subject ? "solid" : "subtle"}
            onClick={() => navigate(`/categories/${subject}`)}
          >
            {subject}
          </Button>
        ))}
        <Button
          colorPalette="orange"
          variant="ghost"
          onClick={() => setSubjectLen(subjectLen <= 10 ? 20 : 10)}
        >
          {subjectLen <= 10 ? <TfiMoreAlt /> : <TfiMore />}
        </Button>
      </Flex>
      {/* Left Options window and Grid to show the books*/}
      <Flex borderTop="1px solid gray" pt={2}>
        <Box width="200px" mr={4}>
          <LeftWindow />
        </Box>
        {
          <Grid alignContent="start" templateColumns="repeat(6, 1fr)" gap={4}>
            {isLoading
              ? Array.from({ length: PAGE_SIZE }, (_, index) => <OpenLibBookSkeleton key={index} />)
              : data?.works.map((book) => <OpenLibBook key={book.key} openLibBook={book} />)}
          </Grid>
        }
      </Flex>
      {/* Pagination Component */}
      <Box mx="auto" mt={5} w="fit-content">
        <Pagination pageSize={PAGE_SIZE} totalCount={workCount.current} />
      </Box>
    </Box>
  );
};

export default CategoryPage;

const LeftWindow = () => {
  const { reset: ebookReset } = useCheckbox("ebook");
  const { reset: sortReset } = useCheckbox("sort");
  const { reset: languageReset } = useCheckbox("language");

  return (
    <Stack borderRight={"1px solid gray"} pr={2}>
      <Checkbox
        key={sortOptions.id}
        options={sortOptions.options}
        group="sort"
        heading="Select Sort Option"
        singleCheck
      />
      <Heading fontSize="sm">Select Date Range</Heading>
      <DateRange />
      <Checkbox
        key={ebookOptions.id}
        options={ebookOptions.options}
        group="ebook"
        heading="Select E-Book Option"
        singleCheck
      />

      {/* Reset filters */}
      <Button
        colorPalette="orange"
        rounded="none"
        onClick={() => {
          ebookReset();
          sortReset();
          languageReset();
        }}
      >
        Reset Filters
      </Button>
    </Stack>
  );
};

const languageOptions: { id: number; heading: string; options: OptionType[] } = {
  id: 1,
  heading: "Select Language",
  options: [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Dutch", value: "dutch" },
    { label: "Polish", value: "polish" },
    { label: "Chinese", value: "chinese" },
    { label: "Russian", value: "russian" },
    { label: "Italian", value: "italian" },
    { label: "Portuguese", value: "portuguese" }
  ]
};
const sortOptions: { id: number; heading: string; options: OptionType[] } = {
  id: 2,
  heading: "Sort By",
  options: [
    { label: "Top Rated", value: "rating" },
    { label: "Most Editions", value: "editions" },
    { label: "First Published", value: "old" },
    { label: "Most Recent", value: "new" },
    { label: "Reading Log", value: "readinglog" },
    { label: "Trending", value: "trending" },
    { label: "Random", value: "random" }
  ]
};
const ebookOptions: { id: number; heading: string; options: OptionType[] } = {
  id: 3,
  heading: "Ebook",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]
};
