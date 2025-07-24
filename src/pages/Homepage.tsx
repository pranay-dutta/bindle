import AdSection from "@/components/AdSection";
import BookCategorySection from "@/components/BookCategorySection";
import OurRecommendation from "@/components/OurRecommendation";
import useBookList from "@/hooks/useBookList";
import { Box, Container } from "@chakra-ui/react";

const Homepage = () => {
  const { data } = useBookList("childrens-middle-grade-hardcover");
  if (!data) return null;

  return (
    <>
      <Box bg="gray.200" p={5}>
        <Container>
          <AdSection />
        </Container>
      </Box>
      <Container>
        <OurRecommendation />
      </Container>
      <BookCategorySection books={data.books} heading={"For Little Readers"} />
    </>
  );
};

export default Homepage;
