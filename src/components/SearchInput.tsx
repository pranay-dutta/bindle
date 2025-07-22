import { Button, Flex, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <Flex gap="2">
      <Input minW="lg" placeholder="Search" />
      <Button colorPalette="orange">
        <CiSearch />
      </Button>
    </Flex>
  );
};

export default SearchInput;