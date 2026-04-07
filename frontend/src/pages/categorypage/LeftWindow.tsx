import { useCheckbox } from "@/components/checkbox/useCheckbox";
import { Stack } from "@chakra-ui/react";
import { sortOptions } from "./filtering_options";
import { ebookOptions } from "./filtering_options";
import { Button, Text } from "@chakra-ui/react";
import Checkbox from "@/components/checkbox";
import DateRange from "@/components/DateRange";

const LeftWindow = () => {
  const { reset: ebookReset } = useCheckbox("ebook");
  const { reset: sortReset } = useCheckbox("sort");
  const { reset: languageReset } = useCheckbox("language");

  return (
    <Stack
      borderRight={{ base: "none", md: "1px solid" }}
      borderBottom={{ base: "1px solid", md: "none" }}
      borderColor="gray.300"
      pr={{ base: 0, md: 4 }}
      pb={{ base: 4, md: 0 }}
      gap={4}
    >
      <Checkbox
        key={sortOptions.id}
        options={sortOptions.options}
        group="sort"
        heading="Select Sort Option"
        singleCheck
      />
      <Text my={2} fontSize="sm">
        Select Date Range
      </Text>
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
export default LeftWindow;
