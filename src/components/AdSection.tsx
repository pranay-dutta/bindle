import useBookList from "@/hooks/useBookList";
import { Box } from "@chakra-ui/react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardHorizontal from "./BookCardHorizontal";

const AdSection = () => {
  const { isLoading, error, data } = useBookList("hardcover-nonfiction");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <Swiper
      breakpoints={{
        1080: { slidesPerView: 3 },
      }}
      pagination={{ dynamicBullets: true }}
      spaceBetween={10}
      modules={[Pagination]}
    >
      {data.books.map(
        (book) =>
          book.book_image && (
            <SwiperSlide>
              <Box py={10}>
                <BookCardHorizontal book={book} />
              </Box>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default AdSection;