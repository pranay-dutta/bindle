import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { toNormalCase } from "@/utils";
import { Box, Button, Card, Flex } from "@chakra-ui/react";
import BookImage from "./BookImage";

const BookCardHorizontal = ({ book }: { book: NytBook }) => {
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
                {toNormalCase(book.title)}
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
