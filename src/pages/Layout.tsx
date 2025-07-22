import Navbar from "@/components/Navbar";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxW="10xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;