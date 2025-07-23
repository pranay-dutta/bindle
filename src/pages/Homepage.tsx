import Recommendation from "@/components/Recommendation";
import { Box, Container } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Box bg="gray.200" p={10}>
      <Container>
        <Recommendation />
      </Container>
    </Box>
  );
};

export default Homepage;
