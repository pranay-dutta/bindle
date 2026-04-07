import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { toKebabCase, toNormalCase } from "@/utils";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import BookImage from "./BookImage";
import Ticket from "./Ticket";
import { useNavigate } from "react-router";
import type { ListNames } from "@/interfaces/new-york-times/ListNames";
import useNytBookStore from "@/store/useNytBookStore";
import useCartStore from "@/store/useCartStore";
import useCartItemRoutes from "@/hooks/useCartItemRoutes";
import { useState } from "react";

interface BookCardVerticalProps {
  book: NytBook;
  category?: ListNames;
}
const BookCardVertical = ({ book, category }: BookCardVerticalProps) => {
  const setNytBook = useNytBookStore((state) => state.setNytBook);
  const [isAdded, setIsAdded] = useState(false);

  const addBook = useCartStore((s) => s.addToCart);
  const { addToCart } = useCartItemRoutes();

  const navigate = useNavigate();
  const text = book.weeks_on_list > 5 ? "Popular" : "New";

  const onAddToCart = async () => {
    addBook(book);
    addToCart(book);
    setIsAdded(true);
  };

  const handleClick = () => {
    const title = toKebabCase(book.title);
    setNytBook(book);
    navigate(`/details/${title}`, { state: { category } });
  };

  return (
    <Box w="100%" borderRadius="none" border="none" bg="inherit">
      <Flex
        gap={1}
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        padding={2}
      >
        <Box position="relative" w="100%">
          <BookImage book={book} objectFit="cover" />
          <Ticket
            text={text}
            colorPalette={text === "Popular" ? "red" : "green"}
          />
        </Box>
        <Box minH={20} w="100%">
          <Heading
            cursor="pointer"
            textWrap="balance"
            lineClamp={2}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight={600}
            onClick={handleClick}
          >
            {toNormalCase(book.title)}
          </Heading>
          <Text
            lineClamp={1}
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight={400}
            color="gray.500"
          >
            {book.author}
          </Text>
        </Box>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        px={2}
        flexWrap="wrap"
        gap={1}
      >
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight={600}>
          $ {book.price}
        </Text>

        <Button
          onClick={async () => await onAddToCart()}
          size="xs"
          colorPalette="orange"
          variant={isAdded ? "solid" : "outline"}
          w="max-content"
          borderRadius={0}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
      </Flex>
    </Box>
  );
};
export default BookCardVertical;
