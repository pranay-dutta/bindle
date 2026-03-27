import { Box, Flex, Group, SkeletonCircle } from "@chakra-ui/react";
import StoreTitle from "./StoreTitle";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from "@clerk/clerk-react";

const Navbar = () => {
  const { isLoaded } = useUser();

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
          <Box height="9" width="9" rounded="full">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "100%",
                    height: "100%"
                  },
                }
              }}
            />
          </Box>
        </SignedIn>
        {!isLoaded && <SkeletonCircle size="9" />}
      </Group>
    </Flex>
  );
};

export default Navbar;
