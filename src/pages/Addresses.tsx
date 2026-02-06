import { getAllAddresses, type Address } from "@/data/addresses";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const Addresses = () => {
  const addresses = getAllAddresses();
  return (
    <Flex gap={5} flexWrap="wrap" p={5} minH={"60vh"}>
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </Flex>
  );
};

const AddressCard = ({ address }: { address: Address }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address);

  const handleSave = () => {
    // TODO: Save to backend/store
    console.log("Saving address:", editedAddress);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAddress(address);
    setIsEditing(false);
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      bgColor="gray.100/70"
      p={4}
      borderRadius="md"
      aspectRatio={4 / 3}
      w="300px"
      h={"max-content"}
    >
      <Box>
        {isEditing ? (
          <>
            <Input
              size="sm"
              mb={2}
              value={editedAddress.name}
              onChange={(e) =>
                setEditedAddress({ ...editedAddress, name: e.target.value })
              }
              placeholder="Name"
            />
            <Input
              size="sm"
              mb={2}
              value={editedAddress.phone}
              onChange={(e) =>
                setEditedAddress({ ...editedAddress, phone: e.target.value })
              }
              placeholder="Phone"
            />
            <Input
              size="sm"
              mb={2}
              value={editedAddress.addressLine1}
              onChange={(e) =>
                setEditedAddress({
                  ...editedAddress,
                  addressLine1: e.target.value
                })
              }
              placeholder="Address Line 1"
            />
            <Input
              size="sm"
              mb={2}
              value={editedAddress.addressLine2 || ""}
              onChange={(e) =>
                setEditedAddress({
                  ...editedAddress,
                  addressLine2: e.target.value
                })
              }
              placeholder="Address Line 2 (Optional)"
            />
            <Flex gap={2} mb={2}>
              <Input
                size="sm"
                value={editedAddress.city}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, city: e.target.value })
                }
                placeholder="City"
              />
              <Input
                size="sm"
                value={editedAddress.state}
                onChange={(e) =>
                  setEditedAddress({ ...editedAddress, state: e.target.value })
                }
                placeholder="State"
              />
            </Flex>
            <Flex gap={2} mb={2}>
              <Input
                size="sm"
                value={editedAddress.zipCode}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    zipCode: e.target.value
                  })
                }
                placeholder="Zip Code"
              />
              <Input
                size="sm"
                value={editedAddress.country}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    country: e.target.value
                  })
                }
                placeholder="Country"
              />
            </Flex>
          </>
        ) : (
          <>
            <Text fontWeight="medium">{editedAddress.name}</Text>
            <Text fontSize="sm">{editedAddress.phone}</Text>
            <Text fontSize="sm">{editedAddress.addressLine1}</Text>
            {editedAddress.addressLine2 && (
              <Text fontSize="sm">{editedAddress.addressLine2}</Text>
            )}
            <Text fontSize="sm">
              {editedAddress.city}, {editedAddress.state}{" "}
              {editedAddress.zipCode}
            </Text>
            <Text fontSize="sm">{editedAddress.country}</Text>
          </>
        )}
      </Box>
      {isEditing ? (
        <Flex gap={2} mt={3}>
          <Button
            variant="solid"
            colorPalette="orange"
            size="sm"
            flex={1}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="outline" size="sm" flex={1} onClick={handleCancel}>
            Cancel
          </Button>
        </Flex>
      ) : (
        <Button
          variant="surface"
          colorPalette="orange"
          size="sm"
          mt={3}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
    </Flex>
  );
};

export default Addresses;
