import { toNormalCase } from "@/utils";
import { Box, Heading, Flex, Text, Button, Group } from "@chakra-ui/react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookImage from "./BookImage";
import type { List } from "@/interfaces/new-york-times/List";
import { useState } from "react";
import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import useCartItemRoutes from "@/hooks/useCartItemRoutes";

interface VerticalBookSectionProps {
  list: List;
  heading: string;
}

const VerticalBookSection = ({ list, heading }: VerticalBookSectionProps) => {
  const books = list.books;

  return (
    <Box p={{ base: 3, md: 5 }}>
      <Heading mb={4} fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
        {heading}
      </Heading>
      <Swiper
        direction="vertical"
        modules={[Scrollbar]}
        scrollbar={{ draggable: true }}
        style={{ maxHeight: "860px" }}
        slidesPerView="auto"
        spaceBetween={16}
      >
        {books.map((book) => (
          <SwiperSlide key={book.title} style={{ height: "auto" }}>
            <VerticalBook book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

const VerticalBook = ({ book }: { book: NytBook }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartItemRoutes();

  const handleSelected = async (book: NytBook) => {
    if (isAdded) return;

    try {
      setLoading(true);
      await addToCart(book);
    } finally {
      setIsAdded(true);
      setLoading(false);
    }
  };

  return (
    <Flex gap={3} pr={4}>
      <Box flexShrink={0} w={{ base: "80px", md: "100px", lg: "120px" }}>
        <BookImage width="100%" book={book} objectFit="cover" />
      </Box>

      <Flex direction="column" justify="space-between" minW={0}>
        <Group flexDirection="column" alignItems="flex-start" gap={1}>
          <Heading
            textWrap="pretty"
            fontSize={{ base: "sm", md: "md" }}
            lineClamp={2}
          >
            {toNormalCase(book.title)}
          </Heading>
          <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
            {book.author}
          </Text>
        </Group>
        <Button
          mb={2}
          size="xs"
          rounded="none"
          width="min-content"
          colorPalette="orange"
          variant={isAdded ? "solid" : "outline"}
          loading={loading}
          onClick={async () => await handleSelected(book)}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
      </Flex>
    </Flex>
  );
};
export default VerticalBookSection;