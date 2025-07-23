import useBookList from "@/hooks/useBookList";
import { Box, Card, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Image } from "@chakra-ui/react";
import type { Book } from "@/interfaces/new-york-times/Book";
import { Pagination } from "swiper/modules";

const Recommendation = () => {
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
      navigation={{ enabled: true }}
      modules={[Pagination]}
    >
      {data.books.map(
        (book) =>
          book.book_image && (
            <SwiperSlide>
              <Box py={10}>
                <RecommendationCard book={book} />
              </Box>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default Recommendation;
//TODO: Extract to utils
const toNormalCase = (inputString: string) => {
  return inputString.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());
};

//TODO: Extract this component
const RecommendationCard = ({ book }: { book: Book }) => {
  return (
    <Card.Root
      maxW={"lg"}
      borderRadius="none"
      _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
      transition="all 0.2s ease-in-out"
    >
      <Card.Body>
        <Flex gap={2} alignItems="center" justifyContent="space-between">
          <Flex direction="column" gap={2}>
            <Box minH={20}>
              <Card.Title textWrap="pretty">
                {toNormalCase(book.title)}
              </Card.Title>
              <Card.Description>{book.author}</Card.Description>
            </Box>
            <Button colorPalette="orange" variant="solid" w="max-content">
              Buy now
            </Button>
          </Flex>
          <Box>
            <Image
              minW={"160px"}
              minH={"240px"}
              h={"160px"}
              w={"240px"}
              objectFit="contain"
              src={book.book_image}
              alt={book.title}
            />
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

{
  /* <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
      $450
    </Text> */
}
{
  /* <Card.Footer gap="2">
    <Button variant="ghost">Add to cart</Button>
  </Card.Footer> */
}
