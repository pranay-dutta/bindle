import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { toKebabCase, toNormalCase } from "@/utils";
import { Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import BookImage from "./BookImage";
import Ticket from "./Ticket";
import { useNavigate } from "react-router";
import type { ListNames } from "@/interfaces/new-york-times/ListNames";
import useNytBookStore from "@/store/useNytBookStore";
import { useState } from "react";

interface BookCardVerticalProps {
  book: NytBook;
  category?: ListNames;
  index?: number;
}
const BookCardVertical = ({ book, index, category }: BookCardVerticalProps) => {
  const setNytBook = useNytBookStore((state) => state.setNytBook);
  const [bookCount, setBookCount] = useState(0);

  const navigate = useNavigate();
  const text = book.weeks_on_list > 5 ? "Popular" : "New";

  const handleClick = () => {
    const title = toKebabCase(book.title);
    setNytBook(book);

    navigate(`/details/${title}`, { state: { category } });
  };

  return (
    <Card.Root maxW={"fit-content"} borderRadius="none" border="none" bg="inherit">
      <Card.Body ps={index === 0 ? 0 : "initial"}>
        <Flex gap={1} direction="column" alignItems="flex-start" justifyContent="space-between">
          <Box position="relative">
            <BookImage book={book} objectFit="fill" />
            <Ticket text={text} colorPalette={text === "Popular" ? "red" : "green"} />
          </Box>
          <Box minH={24}>
            <Card.Title cursor="pointer" textWrap="balance" lineClamp={2} onClick={handleClick}>
              {toNormalCase(book.title)}
            </Card.Title>
            <Card.Description lineClamp={2}>{book.author}</Card.Description>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt={3}>
          <Text>$ {book.price}</Text>

          {bookCount ? (
            <>
              <Button
                onClick={() => setBookCount(bookCount - 1)}
                size="xs"
                colorPalette="orange"
                variant="solid"
                w="max-content"
                borderRadius={0}
              >
                -
              </Button>
              {bookCount}
              <Button
                onClick={() => setBookCount(bookCount + 1)}
                size="xs"
                colorPalette="orange"
                variant="solid"
                w="max-content"
                borderRadius={0}
              >
                +
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setBookCount(bookCount + 1)}
              size="xs"
              colorPalette="orange"
              variant="solid"
              w="max-content"
              borderRadius={0}
            >
              Add to Cart
            </Button>
          )}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
export default BookCardVertical;
