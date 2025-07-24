import type { Book } from "@/interfaces/new-york-times/Book";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardVertical from "./BookCardVertical";

interface BookCategorySectionProps {
  books: Book[];
  heading: "For Little Readers" | "Self Development";
}

const BookCategorySection = ({ books, heading }: BookCategorySectionProps) => {
  return (
    <Container>
      <Box p={5} boxShadow={"md"} border="1px solid gray">
        <Heading fontFamily="inherit">{heading}</Heading>
        <Swiper
          breakpoints={{
            1080: { slidesPerView: 4 },
          }}
          pagination={{ dynamicBullets: true }}
          spaceBetween={10}
          loop
        >
          {books.map((book) => (
            <SwiperSlide key={book.title}>
              <BookCardVertical book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default BookCategorySection;
