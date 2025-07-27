import AdSection from "@/components/AdSection";
import BookCategorySection from "@/components/BookCategorySection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OurRecommendation from "@/components/OurRecommendation";
import VerticalBookSection from "@/components/VerticalBookSection";
import useNytBookList from "@/hooks/new-york-times/useNytBookList";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";

const Homepage = () => {
  const { data: children } = useNytBookList("childrens-middle-grade-hardcover");
  const { data: selfDevelopment } = useNytBookList("advice-how-to-and-miscellaneous");
  const { data: series } = useNytBookList("series-books");

  if (!children || !selfDevelopment || !series) return null;

  return (
    <>
      <Navbar />
      {/* Top Ad Section */}
      <Box bg="gray.800" p={5}>
        <Container>
          <AdSection />
        </Container>
      </Box>

      {/* Our Recommendation Section */}
      <Box bg="gray.100">
        <Container>
          <Heading textAlign="center" pt={8} pb={4}>
            Our Recommendation
            <BsStars style={{ display: "inline", marginLeft: "4px", color: "orangered" }} />
          </Heading>
          <OurRecommendation />
        </Container>
      </Box>

      {/* Book Categories Section */}
      <Box bg="gray.100" p={5}>
        <Container as={Flex} gap={2}>
          <Container bg="gray.100" as={Flex} flexDirection="column" gap={2} maxW="70%" ms={0} p={0}>
            <BookCategorySection list={children} heading={"For Little Readers"} />
            <BookCategorySection list={selfDevelopment} heading={"Self Development"} />
          </Container>
          <Container maxW="2xl" p={0} ms={0} bg="white">
            <VerticalBookSection list={series} heading={"Series"} />
          </Container>
        </Container>
      </Box>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Homepage;
