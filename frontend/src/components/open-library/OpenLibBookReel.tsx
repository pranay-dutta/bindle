import useOpenLibSubjectList from "@/hooks/open-library/useOpenLibSubjectList";
import { Swiper, SwiperSlide } from "swiper/react";
import OpenLibBook from "./OpenLibBook";

const OpenLibBookReel = () => {
  const { data, isLoading, error } = useOpenLibSubjectList("Architecture");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;
  if (!data || !data.works || data.works.length === 0) return <div>No books found</div>;

  return (
    <Swiper slidesPerView={7} spaceBetween={5}>
      {data.works.map((work) => (
        <SwiperSlide key={work.key}>
          <OpenLibBook openLibBook={work} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default OpenLibBookReel;
