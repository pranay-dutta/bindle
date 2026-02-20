import useImageFallback from "@/hooks/useImageFallback";
import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";
import useCartStore from "@/store/useCartStore";
import { getOLCoverUrls, isNytBook, toNormalCase } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Span,
  Text
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router";
import { MdOutlineEditNote } from "react-icons/md";
import { getDefaultAddress } from "@/data/dummyaddresses";

const CartPage = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const getQty = useCartStore((state) => state.getQty);
  const totalCartValue = [...cart.keys()].reduce(
    (acc, book) => acc + parseInt(book.price) * getQty(book),
    0
  );
  const cartItems = [...cart.keys()];
  const defaultAddress = getDefaultAddress();

  return (
    <Box h={"65vh"}>
      <Flex gap={10} maxH="100%" py={5}>
        {/* My Shopping Cart */}
        <Flex flexDirection="column" width="3/5">
          <Text mb={3} fontSize="3xl">
            My Shopping Cart
          </Text>
          <Flex overflowY="auto" direction="column" gap={2} pr={4}>
            {cartItems.map((book, index) => (
              <Box
                key={book.title}
                borderBottom={
                  index === cartItems.length - 1 ? "" : "1px solid #ddd"
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
            {[...cart.keys()].map((book) => (
              <Flex justifyContent="space-between" key={book.title}>
                <Text truncate>
                  {getQty(book)} x {toNormalCase(book.title)}
                </Text>
                <Text
                  textWrap="nowrap"
                  color="orange.600"
                  ms={10}
                  fontWeight="medium"
                >
                  $ {parseInt(book.price) * getQty(book)}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Box bg="blackAlpha.100/50" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Total: ${totalCartValue}
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
                  <Text fontWeight="medium">{defaultAddress.name}</Text>
                  <Text fontSize="sm">{defaultAddress.phone}</Text>
                  <Text fontSize="sm">{defaultAddress.addressLine1}</Text>
                  {defaultAddress.addressLine2 && (
                    <Text fontSize="sm">{defaultAddress.addressLine2}</Text>
                  )}
                  <Text fontSize="sm">
                    {defaultAddress.city}, {defaultAddress.state}{" "}
                    {defaultAddress.zipCode}
                  </Text>
                  <Text fontSize="sm">{defaultAddress.country}</Text>
                </>
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No saved address
                </Text>
              )}
            </Box>

            <Button bg="orange.500" w="full" onClick={() => alert("hi")}>
              Order and pay {totalCartValue}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

const ShoppingBook = ({ book }: { book: NytBook | SearchedBook }) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const setQty = useCartStore((state) => state.setQty);
  const getQty = useCartStore((state) => state.getQty);

  const height = 150;
  const width = 100;

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
    <Flex direction="row" gap={4} width="100%" py={2}>
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
        <HStack
          height="full"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Text fontSize="medium" fontWeight="medium">
              {toNormalCase(book.title)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {isNyt && book.author}
            </Text>
          </Box>

          <Text onClick={() => removeItem(book)} cursor={"pointer"}>
            Remove
            <FiTrash style={{ display: "inline-block", marginLeft: "4px" }} />
          </Text>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text color="orange.600" fontWeight="medium">
            $ {book.price}
          </Text>
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
