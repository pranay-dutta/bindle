import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

export const ContentLayout = () => {
  return (
    <Container maxWidth="10xl">
      <Outlet />
    </Container>
  );
};