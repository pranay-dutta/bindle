import { Box, Flex, Span } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { GiSparkles } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { GoTag } from "react-icons/go";
import { PiAddressBookLight } from "react-icons/pi";

const navOptions = [
  { label: "Home", link: "/", icon: IoHomeOutline },
  { label: "New Releases", link: "/new-releases", icon: GiSparkles },
  {
    label: "Categories",
    link: "/categories/Architecture",
    icon: TbCategoryPlus
  },
  { label: "Sale", link: "/sale", icon: GoTag },
  { label: "Saved Addresses", link: "/addresses", icon: PiAddressBookLight }
];
const NavOptions = () => {
  const navigate = useNavigate();
  return (
    <Flex
      p={3}
      minH="10"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="xs"
    >
      {navOptions.map((option) => (
        <Box
          onClick={() => navigate(option.link)}
          key={option.label}
          mx={3}
          cursor="pointer"
        >
          <Flex
            _hover={{ color: "orange.700" }}
            color="gray.600"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            {option.icon && <option.icon />}
            <Span display={{ base: "none", md: "block" }}>{option.label}</Span>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default NavOptions;
