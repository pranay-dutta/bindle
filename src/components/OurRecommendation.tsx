import useNytBookList from "@/hooks/new-york-times/useNytBookList";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCardVertical from "./BookCardVertical";

const OurRecommendation = () => {
  const { isLoading, error, data } = useNytBookList("young-adult-hardcover");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <Swiper
      breakpoints={{
        1080: { slidesPerView: 7 }
      }}
      pagination={{ dynamicBullets: true }}
      spaceBetween={10}
    >
      {data.books.map(
        (book, index) =>
          book.book_image && (
            <SwiperSlide>
              <BookCardVertical key={book.title} index={index} book={book} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};
export default OurRecommendation;
