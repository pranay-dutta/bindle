import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { toKebabCase, toNormalCase } from "@/utils";
import { Box, Button, Card, Flex } from "@chakra-ui/react";
import BookImage from "./BookImage";
import { useNavigate } from "react-router";
import useNytBookStore from "@/store/useNytBookStore";

const BookCardHorizontal = ({ book }: { book: NytBook }) => {
  const setNytBook = useNytBookStore((state) => state.setNytBook);
  const navigate = useNavigate();

  const handleClick = () => {
    const title = toKebabCase(book.title);
    setNytBook(book);
    navigate(`/details/${title}`);
  };

  // decode HTML entities in the book title
  const parsedText = new DOMParser().parseFromString(
    toNormalCase(book.title),
    "text/html"
  ).documentElement.textContent;

  return (
    <Card.Root maxW="100%" borderRadius="none">
      <Card.Body p={{ base: 4, md: 6 }}>
        <Flex gap={4} alignItems="center" justifyContent="space-between">
          <Flex direction="column" gap={3} flex={1} minW={0}>
            <Box>
              <Card.Title
                textWrap="pretty"
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
              >
                {parsedText}
              </Card.Title>
              <Card.Description fontSize={{ base: "sm", md: "md" }} mt={1}>
                {book.author}
              </Card.Description>
            </Box>
            <Button
              colorPalette="orange"
              variant="outline"
              w="max-content"
              size={{ base: "sm", md: "md" }}
              onClick={handleClick}
            >
              Learn More
            </Button>
          </Flex>
          <Box flexShrink={0} w={{ base: "100px", sm: "120px", md: "150px" }}>
            <BookImage book={book} objectFit="contain" />
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
export default BookCardHorizontal;
