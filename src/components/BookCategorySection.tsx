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
    <Box p={5} bg="white">
      <Heading fontFamily="inherit">{heading}</Heading>
      <Swiper
        breakpoints={{
          1080: { slidesPerView: 5 },
        }}
        pagination={{ dynamicBullets: true }}
        spaceBetween={10}
        loop
      >
        {books.map((book) => (
          <SwiperSlide key={book.title} style={{ width: "160px" }}>
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
