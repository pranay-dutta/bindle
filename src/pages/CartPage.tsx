import useImageFallback from "@/hooks/useImageFallback";
import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";
import useCartStore from "@/store/useCartStore";
import { getOLCoverUrls, isNytBook, toNormalCase } from "@/utils";
import { Box, Button, Flex, Heading, HStack, Image, Input, Span, Text } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const getQty = useCartStore((state) => state.getQty);
  const totalCartValue = [...cart.keys()].reduce((acc, book) => acc + parseInt(book.price) * getQty(book), 0);

  //TODO: implement cart is empty logic
  return (
    <Flex gap={5}>
      {/* My Shopping cart */}
      <Flex direction="column" gap={5} width="1/2">
        <Heading fontSize="2xl">My Shopping Cart</Heading>
        {[...cart.keys()].map((book) => (
          <ShoppingBook key={book.title} book={book} />
        ))}
      </Flex>

      {/* My Orders */}
      <Flex direction="column" width="1/2">
        <Heading fontSize="2xl">My Order</Heading>
        {[...cart.keys()].map((book) => (
          <Flex direction="row" justifyContent="space-between" key={book.title}>
            <Text>
              {getQty(book)} x {toNormalCase(book.title)}
            </Text>
            <Text>$ {parseInt(book.price) * getQty(book)}</Text>
          </Flex>
        ))}

        <Text fontSize="xl" fontWeight="bold">
          Total: ${totalCartValue}
        </Text>
        <Button bg="orange.500">Order and pay {totalCartValue}</Button>
      </Flex>
    </Flex>
  );
};

const ShoppingBook = ({ book }: { book: NytBook | SearchedBook }) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const setQty = useCartStore((state) => state.setQty);
  const getQty = useCartStore((state) => state.getQty);

  const height = 180;
  const width = 120;

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(e.target.value);

    // Validate the new quantity
    if (isNaN(newQty) || newQty < 1) return;

    // Update the quantity in the cart store
    setQty(book, newQty);
  };
  const isNyt = isNytBook(book);
  const urls = isNyt ? [] : getOLCoverUrls(book.cover_i || 0);
  const { src, onError } = useImageFallback(urls);

  return (
    <Flex direction="row" gap={4} width="100%" borderBottom="1px solid black" pb={5}>
      {/* Book Cover */}
      <Box minW={width} h={height} w={width} minH={height}>
        {isNyt ? (
          <Image width="100%" height="100%" src={book.book_image} />
        ) : (
          <Image width="100%" height="100%" src={src} onError={onError} />
        )}
      </Box>

      {/* Book Details */}
      <Flex direction="column" width="full">
        <HStack height="full" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Text>{toNormalCase(book.title)}</Text>
            <Text>{isNyt && book.author}</Text>
          </Box>

          <Text onClick={() => removeItem(book)}>
            Remove
            <FiTrash style={{ display: "inline-block", marginLeft: "4px" }} />
          </Text>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text>{book.price}</Text>
          <Text>
            <Span mr={2}>Qty</Span>
            <Input
              type="number"
              maxW="100px"
              min={1}
              bg="gray.100"
              onChange={handleQtyChange}
              defaultValue={getQty(book)}
            />
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartPage;
