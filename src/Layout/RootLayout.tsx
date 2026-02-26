import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavOptions from "@/components/NavOptions";
import useRegisterUser from "@/hooks/useRegisterUser";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  const { isSignedIn } = useUser();
  const { mutateAsync: registerNewUser } = useRegisterUser();

  useEffect(() => {
    if (isSignedIn) registerNewUser();
  }, [isSignedIn, registerNewUser]);

  return (
    <>
      <Navbar />
      <NavOptions />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
