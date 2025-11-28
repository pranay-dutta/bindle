import { Button, Flex, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

const SearchInput = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const onSubmit = handleSubmit((data) => {
    navigate("/search");
    setSearchParams({ q: data.query, page: "1" });
  });

  return (
    <Flex as="form" gap="2" w="100%" maxW="2xl" onSubmit={onSubmit}>
      <Input placeholder="Search books..." {...register("query")} />
      <Button type="submit" colorPalette="orange">
        <CiSearch />
      </Button>
    </Flex>
  );
};

export default SearchInput;
