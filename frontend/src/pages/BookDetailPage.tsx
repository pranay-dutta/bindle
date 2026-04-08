import OpenLibBookReel from "@/components/open-library/OpenLibBookReel";
import { CURRENCY_SYMBOL } from "@/constants";
import useOpenLibBook from "@/hooks/open-library/useOpenLibBook";
import useOpenLibWork from "@/hooks/open-library/useOpenLibWork";
import useNytBookStore from "@/store/useNytBookStore";
import { extractWorkDescription, toNormalCase } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Quote,
  Strong,
  Text
} from "@chakra-ui/react";
import { BiBook } from "react-icons/bi";

const BookDetailPage = () => {
  const nytBook = useNytBookStore((s) => s.nytBook);
  const { data: openLibBook, isLoading: isLoadingBook } = useOpenLibBook();
  const { data: openLibWork, isLoading: isLoadingWork } = useOpenLibWork();

  const isLoading = isLoadingBook || isLoadingWork;
  if (isLoading) return <Text>Loading...</Text>;

  const height = 270;
  const width = 180;

  return (
    <Box my={5}>
      <Flex my={5} gap={8} alignItems="flex-start">
        <Flex gap={2} direction="column">
          <Box height={height} width={width}>
            <Image
              height="100%"
              width="100%"
              objectFit="fill"
              src={nytBook.book_image}
            />
          </Box>
          <Button bg="gray.500" color="white" variant="solid">
            {CURRENCY_SYMBOL} 123 only
          </Button>
          <Button display="flex" w="100%" bg="#0C9DEB" color="white">
            Want to Read
            <BiBook style={{ marginLeft: "auto" }} />
          </Button>
        </Flex>

        <Flex direction="column" gap={4} w="100%">
          {/* Book name and author */}
          <Box>
            <Heading>{toNormalCase(nytBook.title)}</Heading>
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
            <Text lineClamp={3} color="gray.700">
              {extractWorkDescription(openLibWork) ||
                (openLibBook && openLibBook.description?.value)}
            </Text>
          </Box>

          <Flex gap={4}>
            {/* Add to cart */}
            <Button maxW="100px" bg="#0C9DEB" colorPalette="blue" color="white">
              Buy Now
            </Button>

            <Button colorPalette="orange" maxW="100px">
              Add to Cart
            </Button>
          </Flex>
        </Flex>
      </Flex>
      //TODO: remove this comment after you have consistent details page
      {/* <Heading as="h2" size="md" mb={4}>
        Similar Books
      </Heading>
      <OpenLibBookReel /> q*/}
    </Box>
  );
};

export default BookDetailPage;
