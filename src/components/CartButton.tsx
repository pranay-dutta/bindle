import { CURRENCY_SYMBOL } from "@/constants";
import { Flex, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";

const CartButton = ({ amount = 0 }: { amount?: number }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  return (
    <>
      <Flex
        border="1px"
        borderStyle="solid"
        borderColor="gray.300"
        p={2}
        gap={2}
        alignItems="center"
        borderRadius="sm"
        flexWrap="nowrap"
        onClick={() => navigate("/cart")}
        _hover={{ boxShadow: "md", cursor: "pointer" }}
      >
        <FaShoppingCart />
        <Text textWrap="nowrap">
          {CURRENCY_SYMBOL} {amount}
        </Text>
      </Flex>
      {/* {isOpen && <CartWindow />} */}
    </>
  );
};
export default CartButton;
