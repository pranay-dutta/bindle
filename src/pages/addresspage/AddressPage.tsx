import useAddressRoutes from "@/hooks/useAddressRoutes";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import AddressCardWrapper from "./AddressCardWrapper";
import AddressForm from "./AddressForm";

const Addresses = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { useAllAddress } = useAddressRoutes();
  const { data: allAddresses, isLoading } = useAllAddress();

  if (isLoading) return <Text>Loading...</Text>;
  const hasAddress = allAddresses && allAddresses.addresses.length > 0;

  const onCancel = () => {
    setIsAdding(false);
  };

  return (
    <Box minH={"60vh"}>
      <Flex gap={5} flexWrap="wrap" p={5} maxHeight="400px">
        {isAdding ? (
          <AddressForm onCancel={onCancel} />
        ) : (
          <Button
            variant="outline"
            colorPalette="orange"
            size="md"
            onClick={() => setIsAdding(true)}
            aspectRatio={4 / 3}
            w="300px"
            alignSelf="center"
          >
            + Add New Address
          </Button>
        )}

        {/* If addresses exist */}
        {hasAddress &&
          allAddresses.addresses.map((address) => (
            <AddressCardWrapper key={address.id} address={address} />
          ))}

        {/* If user has no addresses */}
        {!hasAddress && <Text fontSize="lg"> No addresses found. </Text>}
      </Flex>
    </Box>
  );
};

export default Addresses;
