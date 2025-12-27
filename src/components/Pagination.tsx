import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { Pagination as ChakraPagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router";

interface Props {
  totalCount: number;
  pageSize: number;
}

const Pagination = ({ totalCount, pageSize }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const lastPage = Math.ceil(totalCount / pageSize);

  return (
    <>
      <ChakraPagination.Root count={totalCount} pageSize={pageSize} page={currentPage}>
        <ButtonGroup variant="ghost" size="sm">
          <ChakraPagination.PrevTrigger
            onClick={() =>
              setSearchParams((searchParams) => {
                searchParams.set("page", (currentPage - 1).toString());
                return searchParams;
              })
            }
            disabled={currentPage == 1}
            asChild
          >
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>

          <ChakraPagination.Items
            render={(page) => (
              <IconButton
                onClick={() =>
                  setSearchParams((searchParams) => {
                    searchParams.set("page", page.value.toString());
                    return searchParams;
                  })
                }
                variant={{ base: "ghost", _selected: "outline" }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <ChakraPagination.NextTrigger
            onClick={() =>
              setSearchParams((searchParams) => {
                searchParams.set("page", (currentPage + 1).toString());
                return searchParams;
              })
            }
            disabled={currentPage >= lastPage}
            asChild
          >
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </ChakraPagination.Root>
    </>
  );
};
export default Pagination;
