import useCartItemRoutes from "@/hooks/useCartItemRoutes";
import type { CartItem } from "@/hooks/useCartRoutes";
import { toNormalCase } from "@/utils";
import {
  Flex,
  Box,
  HStack,
  Spinner,
  Button,
  Span,
  Text,
  Image
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiTrash, FiMinus, FiPlus } from "react-icons/fi";

//TODO: migrate the backend logic and use a hook

const ShoppingBook = ({ book }: { book: CartItem }) => {
  const { removeFromCart, decreaseQty, increaseQty } = useCartItemRoutes();
  const queryClient = useQueryClient();
  const [loadingAction, setLoadingAction] = useState<
    "remove" | "increase" | "decrease" | null
  >(null);

  const handleRemove = async (book: CartItem) => {
    setLoadingAction("remove");
    try {
      await removeFromCart(book.id);
      await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    } finally {
      setLoadingAction(null);
    }
  };
  const handleIncrease = async (book: CartItem) => {
    setLoadingAction("increase");
    try {
      await increaseQty(book.id);
      await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    } finally {
      setLoadingAction(null);
    }
  };
  const handleDecrease = async (book: CartItem) => {
    setLoadingAction("decrease");
    try {
      await decreaseQty(book.id);
      await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    } finally {
      setLoadingAction(null);
    }
  };

  const height = 150;
  const width = 100;

  return (
    <Flex direction="row" gap={4} width="100%" py={2}>
      {/* Book Cover */}
      <Box minW={width} h={height} w={width} minH={height}>
        <Image width="100%" height="100%" src={book.image} />
      </Box>

      {/* Book Details */}
      <Flex direction="column" width="full">
        <HStack
          height="full"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Text fontSize="medium" fontWeight="medium">
              {toNormalCase(book.bookTitle)}
            </Text>
            {/* <Text fontSize="sm" color="gray.500">
              {isNyt && book.author}
            </Text> */}
          </Box>

          <Text
            onClick={() => !loadingAction && handleRemove(book)}
            cursor={loadingAction ? "not-allowed" : "pointer"}
            opacity={loadingAction ? 0.6 : 1}
          >
            {loadingAction === "remove" ? (
              <Spinner size="xs" />
            ) : (
              <>
                Remove
                <FiTrash
                  style={{ display: "inline-block", marginLeft: "4px" }}
                />
              </>
            )}
          </Text>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text color="orange.600" fontWeight="medium">
            $ {book.price}
          </Text>
          <Flex
            outline="1px dotted orange"
            rounded="sm"
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            gap={3}
          >
            <Button
              size="xs"
              colorPalette="orange"
              variant="ghost"
              rounded="none"
              disabled={!!loadingAction}
              minW="40px"
              onClick={() =>
                book.quantity > 1 ? handleDecrease(book) : handleRemove(book)
              }
            >
              {loadingAction === "decrease" ||
              (loadingAction === "remove" && book.quantity <= 1) ? (
                <Spinner size="xs" />
              ) : book.quantity > 1 ? (
                <FiMinus />
              ) : (
                <FiTrash />
              )}
            </Button>
            <Span fontSize="sm">{book.quantity}</Span>
            <Button
              size="xs"
              rounded="none"
              colorPalette="orange"
              variant="ghost"
              cursor={book.quantity < 10 ? "pointer" : "not-allowed"}
              disabled={!!loadingAction}
              onClick={() => book.quantity < 10 && handleIncrease(book)}
              minW="40px"
            >
              {loadingAction === "increase" ? (
                <Spinner size="xs" />
              ) : (
                <FiPlus />
              )}
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};
export default ShoppingBook;
