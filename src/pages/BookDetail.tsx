import useOpenLibBook from "@/hooks/open-library/useOpenLibBook";
import useOpenLibWork from "@/hooks/open-library/useOpenLibWork";
import useNytBookStore from "@/store/useNytBookStore";
import { extractWorkDescription, toNormalCase } from "@/utils";
import { Box, Flex, Heading, Image, Quote, Strong, Text } from "@chakra-ui/react";

const BookDetailPage = () => {
  const nytBook = useNytBookStore((s) => s.nytBook);
  const { data: openLibBook, isLoading: isLoadingBook } = useOpenLibBook();
  const { data: openLibWork, isLoading: isLoadingWork } = useOpenLibWork();

  const isLoading = isLoadingBook || isLoadingWork;
  if (isLoading) return <Text>Loading...</Text>;

  const height = 270;
  const width = 180;

  return (
    <Flex gap={8} p={5} alignItems="flex-start">
      <Box height={height} width={width}>
        <Image minW={`${width}px`} minH={`${height}px`} objectFit="fill" src={nytBook.book_image} />
      </Box>

      <Flex direction="column" gap={4} w="100%">
        {/* Book name and author */}
        <Box>
          <Heading fontFamily="inherit">{toNormalCase(nytBook.title)}</Heading>
          <Text color="gray.600">{nytBook.author}</Text>
        </Box>

        {/* Review Publication Page count */}
        <Flex gap={4}>
          <Text color="gray.600">
            <Strong>ISBN:</Strong> {nytBook.primary_isbn13}
          </Text>
          <Text color="gray.600">
            <Strong>Publisher:</Strong> {nytBook.publisher}
          </Text>
          <Text color="gray.600">
            <Strong>Number of Pages:</Strong> {openLibBook?.number_of_pages}
          </Text>
        </Flex>
        <Quote fontWeight="normal" fontStyle="italic">
          {nytBook.description || openLibBook?.subtitle}
        </Quote>

        {/* Book description */}
        <Box>
          <Text>
            {extractWorkDescription(openLibWork) || (openLibBook && openLibBook.description?.value)}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default BookDetailPage;
