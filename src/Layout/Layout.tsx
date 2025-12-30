import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavOptions from "@/components/NavOptions";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <NavOptions />
      <Container maxW="10xl">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
