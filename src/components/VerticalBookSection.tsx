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
    <Box p={5}>
      <Heading fontFamily="inherit" mb={6}>
        {heading}
      </Heading>
      <Swiper
        direction="vertical"
        modules={[Scrollbar]}
        scrollbar={{ draggable: true }}
        style={{ height: "920px" }}
        slidesPerView={4}
        spaceBetween={20}
      >
        {books.map((book) => (
          <SwiperSlide key={book.title}>
            <Flex gap={3} pr={4}>
              <Box w="140px" h="210px">
                <BookImage
                  height="210px"
                  width="140px"
                  book={book}
                  objectFit="fill"
                />
              </Box>

              <Flex direction="column" justify="flex-start">
                <Heading textWrap="pretty" fontFamily="inherit" fontSize="18px">
                  {toNormalCase(book.title)}
                </Heading>
                <Text fontSize="sm" color="gray.600">
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
