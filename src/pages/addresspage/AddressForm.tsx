import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form } from "react-router";
import useAddressRoutes from "@/hooks/useAddressRoutes";

export type AddressFormData = {
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
export default AddressForm;
