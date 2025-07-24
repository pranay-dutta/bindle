import type { Book } from "@/interfaces/new-york-times/Book";
import { Box, Heading } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardVertical from "./BookCardVertical";

interface BookCategorySectionProps {
  books: Book[];
  heading: "For Little Readers" | "Self Development";
}

const BookCategorySection = ({ books, heading }: BookCategorySectionProps) => {
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
            <BookCardVertical book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BookCategorySection;
