import { Flex } from "@chakra-ui/react";
import StoreTitle from "./StoreTitle";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";

const Navbar = () => {
  return (
    <Flex
      justify="space-between"
      p={5}
      gap={3}
      borderBottom="1px"
      borderStyle="solid"
      borderBottomColor="gray.200"
    >
      <StoreTitle />
      <SearchInput />
      <CartButton />
    </Flex>
  );
};

export default Navbar;
