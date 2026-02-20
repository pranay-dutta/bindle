import { toNormalCase } from "@/utils";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookImage from "./BookImage";
import type { List } from "@/interfaces/new-york-times/List";

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
            <Flex gap={3} pr={4}>
              <Box
                flexShrink={0}
                w={{ base: "80px", md: "100px", lg: "120px" }}
              >
                <BookImage width="100%" book={book} objectFit="cover" />
              </Box>

              <Flex direction="column" justify="flex-start" minW={0}>
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
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default VerticalBookSection;
