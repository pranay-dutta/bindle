import { CURRENCY_SYMBOL } from "@/constants";
import useCartStore from "@/store/useCartStore";
import { toNormalCase } from "@/utils";
import { Text, Box, Image, Flex, Button } from "@chakra-ui/react";

//TODO: fix it if you're using it
const CartWindow = () => {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  return (
    <Flex
      position="fixed"
      top={24}
      right="1%"
      bg="white"
      boxShadow="md"
      p={4}
      zIndex={1000}
      flexDirection="column"
      overflowY="auto"
      maxH={"400px"}
      w="600px"
    >
      <Text fontSize="lg" fontWeight="bold">
        Your Cart
      </Text>
      {[...cart.keys()].map((item) => (
        <Flex key={item.price} alignItems="center" gap={4} mb={2}>
          <Box height={180} width={120}>
            <Image
              width="100%"
              height="100%"
              src={item.price}
              alt={item.title}
            />
          </Box>

          <Box>
            <Text>{toNormalCase(item.title)}</Text>
            <Text>{`${CURRENCY_SYMBOL} ${item.price} Qty: ${cart.get(item)}`}</Text>
            <Flex gap={2} mt={2}>
              <Button colorPalette="orange" onClick={() => decreaseQty(item)}>
                -
              </Button>
              <Button colorPalette="orange" onClick={() => increaseQty(item)}>
                +
              </Button>
            </Flex>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
export default CartWindow;
