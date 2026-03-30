import { Badge, Button, Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import useAddressRoutes from "@/hooks/useAddressRoutes";
import type { AddressFormData } from "./AddressForm";

interface AddressCardProps {
  address: AddressFormData;
  onEdit?: () => void;
}

const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  const { deleteAddress, setDefaultAddress } = useAddressRoutes();
  const queryClient = useQueryClient();

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      p={4}
      aspectRatio={4 / 3}
      w="300px"
      bgColor="white"
      borderRadius="md"
      borderWidth="1px"
      boxShadow={"sm"}
      transition="all 0.2s ease"
      _hover={{ boxShadow: "md" }}
      border={address.isDefault ? "1px solid orange" : "1px solid gray.200"}
      onClick={async () => {
        await setDefaultAddress(address.id);
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }}
      gap={2}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={1}>
        <Text fontWeight="medium">{address.fullName}</Text>
        {address.isDefault && (
          <Badge colorPalette="orange" size="sm" variant="subtle">
            Default
          </Badge>
        )}
      </Flex>
      <Text fontSize="sm" color="gray.600">
        {address.mobileNumber}
      </Text>
      <Text fontSize="sm">{address.addressLine1}</Text>
      {address.addressLine2 && (
        <Text fontSize="sm">{address.addressLine2}</Text>
      )}
      <Text fontSize="sm" color="gray.700">
        {address.city}, {address.state} {address.postalCode}
      </Text>
      <Text fontSize="sm" color="gray.700">
        {address.country}
      </Text>
      <Flex gap={2} justifyContent="space-between">
        <Button
          variant="surface"
          colorPalette="orange"
          flex={1}
          size="sm"
          mt={3}
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
        >
          Edit
        </Button>
        <Button
          variant="surface"
          colorPalette="orange"
          flex={1}
          size="sm"
          mt={3}
          onClick={async (event) => {
            event.stopPropagation();
            await deleteAddress(address.id);
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
          }}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};
export default AddressCard;
