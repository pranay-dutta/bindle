import { Flex, Group } from "@chakra-ui/react";
import StoreTitle from "./StoreTitle";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/clerk-react";

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
      <Group gap={5}>
        <CartButton />
        {/* Show the sign-in and sign-up buttons when the user is signed out */}
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        {/* Show the user button when the user is signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Group>
    </Flex>
  );
};

export default Navbar;
