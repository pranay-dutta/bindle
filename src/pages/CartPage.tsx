import { Alert } from "@chakra-ui/react";
import useCartItemRoutes from "@/hooks/useCartItemRoutes";
import useCartRoutes, { type CartItem } from "@/hooks/useCartRoutes";
import useOrderRoutes from "@/hooks/useOrderRoutes";
import { toNormalCase } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Portal,
  Span,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { MdOutlineEditNote } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAddressRoutes from "@/hooks/useAddressRoutes";

const CartPage = () => {
  const navigate = useNavigate();
  const { useCartItems } = useCartRoutes();
  const { placeOrder } = useOrderRoutes();
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { useAllAddress } = useAddressRoutes();
  const { data: allAddresses, isLoading: addressLoading } = useAllAddress();

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      await queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      setAlertMessage("Order placed successfully!");
    } catch {
      setAlertMessage("Failed to place order. Please try again.");
    }
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const { data, isLoading } = useCartItems();

  if (isLoading) return <Text>Loading...</Text>;
  if (addressLoading) return <Text>Loading address...</Text>;

  const defaultAddress = allAddresses?.addresses.find(
    (address) => address.isDefault
  );

  const cartValue = data?.cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Box h={"65vh"}>
      {showAlert && (
        <Portal>
          <Alert.Root
            position="fixed"
            top="4"
            left="50%"
            transform="translateX(-50%)"
            zIndex="9999"
            status={alertMessage.includes("successfully") ? "success" : "error"}
            width="fit-content"
            title={alertMessage}
          >
            <Alert.Indicator />
            <Alert.Title>{alertMessage}</Alert.Title>
          </Alert.Root>
        </Portal>
      )}

      <Flex gap={10} maxH="100%" py={5}>
        {/* My Shopping Cart */}
        <Flex flexDirection="column" width="3/5">
          <Text mb={3} fontSize="3xl">
            My Shopping Cart
          </Text>
          <Text mb={4} color="gray.500">
            {!data || data.cart.items.length === 0
              ? "Your cart is empty"
              : `You have ${data.cart.items.length} item${
                  data.cart.items.length > 1 ? "s" : ""
                } in your cart`}
          </Text>
          <Flex overflowY="auto" direction="column" gap={2} pr={4}>
            {data?.cart.items.map((book, index) => (
              <Box
                key={book.bookTitle}
                borderBottom={
                  index === data.cart.items.length - 1 ? "" : "1px solid #ddd"
                }
                py={1}
              >
                <ShoppingBook book={book} />
              </Box>
            ))}
          </Flex>
        </Flex>

        {/* My Orders */}
        <Flex direction="column" width="2/5" maxH="100%">
          <Text mb={3} fontSize="3xl">
            My Orders
          </Text>

          <Flex overflowY="auto" direction="column" mb={4} flex="1" pr={2}>
            {data?.cart.items.map((book) => (
              <Flex justifyContent="space-between" key={book.bookTitle}>
                <Text truncate>
                  {book.quantity} x {toNormalCase(book.bookTitle)}
                </Text>
                <Text
                  textWrap="nowrap"
                  color="orange.600"
                  ms={10}
                  fontWeight="medium"
                >
                  $ {book.price * book.quantity}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Box bg="blackAlpha.100/50" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Total: ${cartValue}
            </Text>

            <Box mb={4}>
              <Flex justifyContent="space-between" mb={2}>
                <Heading fontSize="lg">Saved Address</Heading>
                <Button
                  colorPalette="orange"
                  size="xs"
                  onClick={() => navigate("/checkout")}
                >
                  <MdOutlineEditNote />
                  Edit
                </Button>
              </Flex>

              {defaultAddress ? (
                <>
                  <Text fontWeight="medium">{defaultAddress.fullName}</Text>
                  <Text fontSize="sm">{defaultAddress.mobileNumber}</Text>
                  <Text fontSize="sm">{defaultAddress.addressLine1}</Text>
                  {defaultAddress.addressLine2 && (
                    <Text fontSize="sm">{defaultAddress.addressLine2}</Text>
                  )}
                  <Text fontSize="sm">
                    {defaultAddress.city}, {defaultAddress.state}{" "}
                    {defaultAddress.postalCode}
                  </Text>
                  <Text fontSize="sm">{defaultAddress.country}</Text>
                </>
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No saved address
                </Text>
              )}
            </Box>

            <Button bg="orange.500" w="full" onClick={handlePlaceOrder}>
              Order and pay ${cartValue}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

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

export default CartPage;
