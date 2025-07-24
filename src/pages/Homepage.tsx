import AdSection from "@/components/AdSection";
import BookCategorySection from "@/components/BookCategorySection";
import OurRecommendation from "@/components/OurRecommendation";
import VerticalBookSection from "@/components/VerticalBookSection";
import useBookList from "@/hooks/useBookList";
import { Box, Container, Flex } from "@chakra-ui/react";

const Homepage = () => {
  const { data: children } = useBookList("childrens-middle-grade-hardcover");
  const { data: selfDevelopment } = useBookList(
    "advice-how-to-and-miscellaneous"
  );
  const { data: series } = useBookList("series-books");

  if (!children || !selfDevelopment || !series) return null;

  return (
    <>
      <Box bg="gray.700" p={5}>
        <Container>
          <AdSection />
        </Container>
      </Box>
      <Box bg="gray.100">
        <Container>
          <OurRecommendation />
        </Container>
      </Box>
      <Box bg="gray.100" p={5}>
        <Container as={Flex} gap={2}>
          <Container
            bg="gray.100"
            as={Flex}
            flexDirection="column"
            gap={2}
            maxW="70%"
            ms={0}
            p={0}
          >
            <BookCategorySection
              books={children.books}
              heading={"For Little Readers"}
            />
            <BookCategorySection
              books={selfDevelopment.books}
              heading={"Self Development"}
            />
          </Container>
          <Container maxW="2xl" p={0} ms={0} bg="white">
            <VerticalBookSection
              books={series.books}
              heading={"For Little Readers"}
            />
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default Homepage;
