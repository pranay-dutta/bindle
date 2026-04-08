import { CURRENCY_SYMBOL } from "@/constants";
import useCartRoutes from "@/hooks/useCartRoutes";
import { Box, Text } from "@chakra-ui/react";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router";

const CartButton = ({ amount = 0 }: { amount?: number }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const { useCartItems } = useCartRoutes();
  const { data } = useCartItems();

  //TODO: This is a temporary solution to show the cart value.
  const cartValue =
    data?.cart?.items?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) ?? 0;

  const navigate = useNavigate();
  return (
    <>
      <Box
        display="flex"
        border="1px"
        borderStyle="solid"
        borderColor="gray.300"
        p={2}
        gap={2}
        alignItems="center"
        borderRadius="sm"
        flexWrap="nowrap"
        onClick={() => navigate("/cart")}
        _hover={{
          cursor: "pointer"
        }}
      >
        <BsCart2 size={20} />
        <Text textWrap="nowrap" minWidth="14" textAlign="right">
          {CURRENCY_SYMBOL} {amount || cartValue}
        </Text>
      </Box>
      {/* {isOpen && <CartWindow />} */}
    </>
  );
};
export default CartButton;
