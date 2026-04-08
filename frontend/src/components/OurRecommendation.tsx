import useNytBookList from "@/hooks/new-york-times/useNytBookList";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardVertical from "./BookCardVertical";

const OurRecommendation = () => {
  const { isLoading, error, data } = useNytBookList("picture-books");
  if (isLoading) return <div>Loading...</div>;

  if (!data || !data.books) return null;
  if (error) return <div>{error.message}</div>;

  return (
    <Swiper
      slidesPerView={2}
      breakpoints={{
        480: { slidesPerView: 3, spaceBetween: 10 },
        640: { slidesPerView: 4, spaceBetween: 10 },
        768: { slidesPerView: 5, spaceBetween: 10 },
        1024: { slidesPerView: 6, spaceBetween: 10 },
        1280: { slidesPerView: 7, spaceBetween: 10 }
      }}
      pagination={{ dynamicBullets: true, clickable: true }}
      spaceBetween={8}
    >
      {data.books.map(
        (book) =>
          book.book_image && (
            <SwiperSlide key={book.primary_isbn13 || book.title}>
              <BookCardVertical book={book} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};
export default OurRecommendation;
