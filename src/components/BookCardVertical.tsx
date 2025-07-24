import type { Book } from "@/interfaces/new-york-times/Book";
import { toNormalCase } from "@/utils";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import BookImage from "./BookImage";
import Ticket from "./Ticket";

interface BookCardVerticalProps {
  book: Book;
  index?: number;
}
const BookCardVertical = ({ book, index }: BookCardVerticalProps) => {
  const text = book.weeks_on_list > 5 ? "Popular" : "New";

  return (
    <Card.Root
      maxW={"fit-content"}
      borderRadius="none"
      transition="all 0.2s ease-in-out"
      border="none"
    >
      <Card.Body ps={index === 0 ? 0 : "initial"}>
        <Flex
          gap={1}
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box position="relative">
            <BookImage book={book} objectFit="cover" />
            <Ticket
              text={text}
              colorPalette={text === "Popular" ? "red" : "green"}
            />
          </Box>
          <Box minH={20}>
            <Card.Title textWrap="balance">
              {toNormalCase(book.title)}
            </Card.Title>
            <Card.Description>{book.author}</Card.Description>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt={3}>
          <Text>$ {book.price}</Text>
          <Button
            size="xs"
            colorPalette="orange"
            variant="solid"
            w="max-content"
            borderRadius={0}
          >
            Buy now
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
export default BookCardVertical;
