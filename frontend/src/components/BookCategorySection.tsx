import { Box, Heading } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardVertical from "./BookCardVertical";
import type { List } from "@/interfaces/new-york-times/List";
import type { ListNames } from "@/interfaces/new-york-times/ListNames";

interface BookCategorySectionProps {
  list: List;
  heading: "For Little Readers" | "Self Development";
}

const BookCategorySection = ({ list, heading }: BookCategorySectionProps) => {
  const books = list.books;

  return (
    <Box p={{ base: 3, md: 5 }} bg="white">
      <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} mb={3}>
        {heading}
      </Heading>
      <Swiper
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 8 },
          480: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
          1280: { slidesPerView: 5, spaceBetween: 10 }
        }}
        spaceBetween={10}
        loop
      >
        {books.map((book) => (
          <SwiperSlide key={book.title}>
            <BookCardVertical
              book={book}
              category={list.list_name_encoded as ListNames}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BookCategorySection;
