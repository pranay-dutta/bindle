import AdSection from "@/components/AdSection";
import BookCategorySection from "@/components/BookCategorySection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavOptions from "@/components/NavOptions";
import OurRecommendation from "@/components/OurRecommendation";
import VerticalBookSection from "@/components/VerticalBookSection";
import useNytBookList from "@/hooks/new-york-times/useNytBookList";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";

const Homepage = () => {
  const { data: childrenBooks } = useNytBookList(
    "childrens-middle-grade-hardcover"
  );
  const { data: selfDevelopmentBooks } = useNytBookList(
    "advice-how-to-and-miscellaneous"
  );
  const { data: seriesBooks } = useNytBookList("series-books");

  if (!childrenBooks || !seriesBooks || !selfDevelopmentBooks) return null;

  return (
    <>
      <Navbar />
      <NavOptions />
      {/* Top Ad Section */}
      <Box bg="gray.800" p={{ base: 0, md: 5 }}>
        <Container>
          <AdSection />
        </Container>
      </Box>

      {/* Our Recommendation Section */}
      <Box bg="gray.100">
        <Container>
          <Heading textAlign="center" pt={8} pb={4}>
            Our Recommendation
            <BsStars
              style={{
                display: "inline",
                marginLeft: "4px",
                color: "orangered"
              }}
            />
          </Heading>
          <OurRecommendation />
        </Container>
      </Box>

      {/* Book Categories Section */}
      <Box bg="gray.100" p={{ base: 0, md: 5 }}>
        <Container
          p={{ base: 2, md: 0 }}
          gap={2}
          as={Flex}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Container
            m={0}
            p={0}
            gap={2}
            bg="gray.100"
            as={Flex}
            flexDirection="column"
            maxW={{ base: "full", md: "60%", lg: "70%" }}
          >
            <BookCategorySection
              list={childrenBooks.data}
              heading={"For Little Readers"}
            />
            <BookCategorySection
              list={selfDevelopmentBooks.data}
              heading={"Self Development"}
            />
          </Container>
          <Container
            p={0}
            ms={0}
            bg="white"
            flex={1}
            maxW={{ base: "full", md: "40%", lg: "30%" }}
          >
            <VerticalBookSection list={seriesBooks.data} heading={"Series"} />
          </Container>
        </Container>
      </Box>

      {/* Footer Section */}
      {/* <Footer /> */}
    </>
  );
};

export default Homepage;
