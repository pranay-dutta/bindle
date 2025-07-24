import AdSection from "@/components/AdSection";
import OurRecommendation from "@/components/OurRecommendation";
import { Box, Container } from "@chakra-ui/react";

const Homepage = () => {
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
    </>
  );
};

export default Homepage;
