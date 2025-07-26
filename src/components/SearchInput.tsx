import { Button, Flex, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <Flex gap="2" w="100%" maxW="2xl">
      <Input placeholder="Search books..." />
      <Button colorPalette="orange">
        <CiSearch />
      </Button>
    </Flex>
  );
};

export default SearchInput;
