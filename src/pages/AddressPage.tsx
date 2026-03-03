import useAddressRoutes from "@/hooks/useAddressRoutes";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-router";

const Addresses = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { useAllAddress } = useAddressRoutes();
  const { data: allAddresses, isLoading } = useAllAddress();

  if (isLoading) return <Text>Loading...</Text>;
  if (!allAddresses || allAddresses.addresses.length === 0)
    return <Text>No addresses found.</Text>;

  const onCancel = () => {
    setIsAdding(false);
  };

  return (
    <Flex gap={5} flexWrap="wrap" p={5} minH={"60vh"}>
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

      {allAddresses.addresses.map((address) => (
        <AddressCardWrapper key={address.id} address={address} />
      ))}
    </Flex>
  );
};

type AddressFormData = {
  id: string;
  fullName: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};
interface Props {
  address?: AddressFormData;
  onCancel?: () => void;
}
const AddressForm = ({ address, onCancel }: Props) => {
  const {
    formState: { isDirty, dirtyFields },
    register,
    handleSubmit,
    reset
  } = useForm<AddressFormData>({ defaultValues: address });

  const { addNewAddress, updateAddress } = useAddressRoutes();
  const queryClient = useQueryClient();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (address) {
        //update existing address
        await updateAddress(address.id, data);
      } else {
        //create new address
        await addNewAddress(data);
        reset();
      }
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      onCancel?.();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  });

  const handleCancel = () => {
    onCancel?.();
    reset();
  };
  const handleBackgroundChange = (field: keyof AddressFormData) => {
    return dirtyFields[field] ? "orange.50" : undefined;
  };

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      p={4}
      aspectRatio={4 / 3}
      w="300px"
      h="max-content"
      bgColor="white"
      borderRadius="md"
      borderWidth="1px"
      borderColor={isDirty ? "orange.200" : "gray.200"}
      boxShadow={isDirty ? "md" : "sm"}
      transition="all 0.2s ease"
      _hover={{ boxShadow: "md" }}
    >
      <Form onSubmit={onSubmit}>
        <>
          <Input
            backgroundColor={handleBackgroundChange("fullName")}
            mb={2}
            placeholder="Full Name"
            {...register("fullName")}
          />
          <Input
            backgroundColor={handleBackgroundChange("mobileNumber")}
            mb={2}
            placeholder="Mobile Number"
            {...register("mobileNumber")}
          />
          <Input
            mb={2}
            placeholder="Address Line 1"
            {...register("addressLine1")}
            backgroundColor={handleBackgroundChange("addressLine1")}
          />
          <Input
            mb={2}
            placeholder="Address Line 2"
            {...register("addressLine2")}
            backgroundColor={handleBackgroundChange("addressLine2")}
          />
          <HStack>
            <Input mb={2} placeholder="City" {...register("city")} />
            <Input mb={2} placeholder="State" {...register("state")} />
          </HStack>

          <HStack>
            <Input
              mb={2}
              placeholder="Postal Code"
              {...register("postalCode")}
            />
            <Input mb={2} placeholder="Country" {...register("country")} />
          </HStack>
          <Flex gap={2} mt={3}>
            <Button
              variant="solid"
              colorPalette="orange"
              size="sm"
              flex={1}
              onClick={onSubmit}
            >
              Save
            </Button>
            <Button variant="outline" size="sm" flex={1} onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        </>
      </Form>
    </Flex>
  );
};

const AddressCardWrapper = ({ address }: { address: AddressFormData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onCancel = () => {
    setIsEditing(false);
  };
  const onEdit = () => {
    setIsEditing(true);
  };

  return isEditing ? (
    <AddressForm address={address} onCancel={onCancel} />
  ) : (
    <Box>
      <AddressCard address={address} onEdit={onEdit} />
    </Box>
  );
};

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

      <Button
        variant="surface"
        colorPalette="orange"
        width="100%"
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
        width="100%"
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
  );
};

export default Addresses;
