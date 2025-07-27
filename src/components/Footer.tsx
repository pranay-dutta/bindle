import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import StoreTitle from "./StoreTitle";
import { Link } from "react-router";

const Footer = () => {
  return (
    <Container>
      <Box as="footer" py={5} borderTop="1px solid" borderColor="gray.200">
        <Flex justifyContent="space-between" alignItems="center">
          <Stack w="50%">
            <StoreTitle />
            
          </Stack>

          <Flex w="50%" justifyContent="space-between">
            {/* Help Section */}
            <Stack>
              <Heading>Help</Heading>
              <Text>
                <Link to="/faq">FAQ</Link>
              </Text>
              <Text>
                <Link to="/how-to-guides">How to guides</Link>
              </Text>
              <Text>
                <Link to="/customer-service">Customer Service</Link>
              </Text>
            </Stack>

            {/* Other Section */}
            <Stack>
              <Heading>Other</Heading>
              <Text>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </Text>
              <Text>
                <Link to="/sitemap">Sitemap</Link>
              </Text>
              <Text>
                <Link to="/subscription">Subscription</Link>
              </Text>
            </Stack>

            {/* Contact Section */}
            <Stack>
              <Heading>Contact us</Heading>
              <Text>+123 111 222 333</Text>
            </Stack>
          </Flex>
        </Flex>
        <Box fontSize="sm" textAlign="center" color="gray.500" w="100%" mt={5}>
          © {new Date().getFullYear()} Book Store. All rights reserved.
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
