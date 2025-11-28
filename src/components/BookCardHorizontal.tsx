import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { toNormalCase } from "@/utils";
import { Box, Button, Card, Flex } from "@chakra-ui/react";
import BookImage from "./BookImage";

const BookCardHorizontal = ({ book }: { book: NytBook }) => {
  return (
    <Card.Root maxW={"lg"} borderRadius="none">
      <Card.Body>
        <Flex gap={2} alignItems="center" justifyContent="space-between">
          <Flex direction="column" gap={2}>
            <Box minH={20}>
              <Card.Title textWrap="pretty">{toNormalCase(book.title)}</Card.Title>
              <Card.Description>{book.author}</Card.Description>
            </Box>
            <Button colorPalette="orange" variant="outline" w="max-content">
              Learn More
            </Button>
          </Flex>
          <Box>
            <BookImage book={book} objectFit="contain" />
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
export default BookCardHorizontal;
