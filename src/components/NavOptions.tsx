import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { GiSparkles } from "react-icons/gi";
import { BsBookmarkStar } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { GoTag } from "react-icons/go";
import { FiBook } from "react-icons/fi";

const navOptions = [
  { label: "Home", link: "/", icon: IoHomeOutline },
  { label: "Ebook", link: "/ebooks", icon: FiBook },
  { label: "New Releases", link: "/new-releases", icon: GiSparkles },
  { label: "Categories", link: "/categories/Architecture", icon: TbCategoryPlus },
  { label: "Recommendations", link: "/recommendations", icon: BsBookmarkStar },
  { label: "Sale", link: "/sale", icon: GoTag }
];
const NavOptions = () => {
  const navigate = useNavigate();
  return (
    <Flex p={3} minH="10" justifyContent="space-between" alignItems="center" boxShadow="xs">
      {navOptions.map((option) => (
        <Box onClick={() => navigate(option.link)} key={option.label} mx={3} cursor="pointer">
          <Flex
            _hover={{ color: "orange.700" }}
            color="gray.600"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            {option.icon && <option.icon />} {option.label}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default NavOptions;
