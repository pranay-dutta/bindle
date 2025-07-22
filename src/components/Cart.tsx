import { FaShoppingCart } from "react-icons/fa";
import { Flex, Text } from "@chakra-ui/react";
import { CURRENCY_SYMBOL } from "@/constants";

const Cart = ({ amount = 0 }: { amount?: number }) => {
  return (
    <Flex
      border="1px"
      borderStyle="solid"
      borderColor="gray.300"
      px={2}
      gap={2}
      alignItems="center"
      borderRadius="sm"
    >
      <FaShoppingCart />
      <Text>
        {CURRENCY_SYMBOL} {amount}
      </Text>
    </Flex>
  );
};

export default Cart;
