import useBookList from "@/hooks/useBookList";
import type { Book } from "@/interfaces/new-york-times/Book";
import { toNormalCase } from "@/utils";
import { Box, Card, Flex, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Ticket from "./Ticket";

const OurRecommendation = () => {
  const { isLoading, error, data } = useBookList("young-adult-hardcover");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <Swiper
      breakpoints={{
        1080: { slidesPerView: 7 },
      }}
      pagination={{ dynamicBullets: true }}
      spaceBetween={10}
    >
      {data.books.map(
        (book, index) =>
          book.book_image && (
            <SwiperSlide>
              <OurCard key={book.title} index={index} book={book} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

const OurCard = ({ book, index }: { book: Book; index: number }) => {
  const text = book.weeks_on_list > 5 ? "Popular" : "New";
  return (
    <Card.Root
      maxW={"fit-content"}
      borderRadius="none"
      transition="all 0.2s ease-in-out"
      border="none"
    >
      <Card.Body ps={index == 0 ? 0 : "initial"}>
        <Flex
          gap={2}
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box position="relative">
            <Image
              maxW={"160px"}
              minH={"240px"}
              h={"160px"}
              objectFit="contain"
              src={book.book_image}
              alt={book.title}
            />
            <Ticket
              text={text}
              colorPalette={text === "Popular" ? "red" : "green"}
            />
          </Box>
          <Card.Title lineClamp={1} textWrap="balance">
            {toNormalCase(book.title)}
          </Card.Title>
          <Card.Description lineClamp={1}>{book.author}</Card.Description>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

export default OurRecommendation;
