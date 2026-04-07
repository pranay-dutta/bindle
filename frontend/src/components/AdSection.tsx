import useNytBookList from "@/hooks/new-york-times/useNytBookList";
import { Box } from "@chakra-ui/react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardHorizontal from "./BookCardHorizontal";

const AdSection = () => {
  const { isLoading, error, data } = useNytBookList("hardcover-nonfiction");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <Swiper
      slidesPerView={1}
      breakpoints={{
        480: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 10 },
        1024: { slidesPerView: 2, spaceBetween: 20 },
        1280: { slidesPerView: 3, spaceBetween: 20 }
      }}
      pagination={{ dynamicBullets: true, clickable: true }}
      spaceBetween={10}
      modules={[Pagination]}
    >
      {data.books.map(
        (book) =>
          book.book_image && (
            <SwiperSlide key={book.primary_isbn13}>
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
