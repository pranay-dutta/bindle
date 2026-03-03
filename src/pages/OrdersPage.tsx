import useOrderRoutes from "@/hooks/useOrderRoutes";
import useImageFallback from "@/hooks/useImageFallback";
import {
  Box,
  Button,
  Flex,
  Group,
  Heading,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

const OrderItemImage = ({ image, title }: { image: string; title: string }) => {
  const { src, onError } = useImageFallback([image]);

  return (
    <Box
      w="100%"
      aspectRatio={2 / 3}
      bg="gray.50"
      p={2}
      borderBottomWidth="1px"
    >
      <Image
        src={src}
        onError={onError}
        alt={title}
        w="100%"
        h="100%"
        objectFit="contain"
        display="block"
      />
    </Box>
  );
};

const OrdersPage = () => {
  const { useUserOrders, cancelOrder } = useOrderRoutes();
  const { data, isLoading, isError } = useUserOrders();
  const queryClient = useQueryClient();

  const handleCancelOrder = async (orderId: string) => {
    await cancelOrder(orderId);
    await queryClient.invalidateQueries({ queryKey: ["user-orders"] });
  };

  return (
    <Box p={4}>
      <Heading size="2xl" mb={4}>
        My Orders
      </Heading>
      {isLoading && <Text>Loading orders...</Text>}
      {isError && (
        <Text color="red.500">Failed to load orders. Please try again.</Text>
      )}

      {data?.orders.length === 0 && <Text>You have no orders yet.</Text>}
      <VStack align="stretch" gap={4}>
        {data?.orders.map((order) => (
          <Box key={order.id} borderWidth="1px" borderRadius="md" p={4}>
            <Flex justify="space-between" align="flex-start">
              <Group flexDirection="column" alignItems="flex-start">
                <Heading size="md">Order ID: {order.id}</Heading>
                <Text fontSize="sm" color="gray.600">
                  Placed on: {new Date(order.createdAt).toDateString()}
                </Text>
                <Text>
                  At:{" "}
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Total Price: ${order.totalPrice.toFixed(2)}
                </Text>
              </Group>
              <Button onClick={() => handleCancelOrder(order.id)}>
                Cancel Order
              </Button>
            </Flex>
            <Flex mt={3} direction="row" gap={3} wrap="wrap">
              {order.orderItems.map((item) => (
                <Flex
                  key={item.id}
                  direction="column"
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  w="170px"
                  minW="170px"
                >
                  <OrderItemImage image={item.image} title={item.bookTitle} />
                  <Box p={2}>
                    <Text fontWeight="medium" lineClamp={2}>
                      {item.bookTitle}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Quantity: {item.quantity}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Price: ${item.price.toFixed(2)}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default OrdersPage;
