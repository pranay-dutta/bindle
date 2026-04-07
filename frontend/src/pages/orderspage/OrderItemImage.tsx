import { Box, Image } from "@chakra-ui/react";
import useImageFallback from "@/hooks/useImageFallback";

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

export default OrderItemImage;