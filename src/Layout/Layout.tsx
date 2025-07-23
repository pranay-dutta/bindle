import Navbar from "@/components/Navbar";
// import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Container maxW="10xl"> */}
      {/* </Container> */}
    </>
  );
};

export default Layout;
