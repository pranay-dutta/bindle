import { Heading } from "@chakra-ui/react";
import { STORE_TITLE } from "@/constants";
import { useNavigate } from "react-router";

const StoreTitle = () => {
  const navigate = useNavigate();
  return (
    <Heading cursor="pointer" onClick={() => navigate("/")}>
      {STORE_TITLE}
    </Heading>
  );
};

export default StoreTitle;
