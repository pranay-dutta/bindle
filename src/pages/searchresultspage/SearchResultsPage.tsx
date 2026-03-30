import useOpenLibSearch from "@/hooks/open-library/useOpenLibSearch";
import { Box, ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router";
import SearchBookGrid from "./SearchBookGrid";

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get("page");
  const q = searchParams.get("q");

  const [currentPage, setCurrentPage] = useState(pageNo ? parseInt(pageNo) : 1);
  const pageSize = 18;

  const { data, isLoading } = useOpenLibSearch(q, currentPage, pageSize);

  const updatePageChange = (page: number, type?: "FORWARD" | "BACKWARD") => {
    if (type === "FORWARD") {
      setCurrentPage((prevPage) => prevPage + 1);
      setSearchParams((searchParams) => {
        searchParams.set("page", (currentPage + 1).toString());
        return searchParams;
      });
    } else if (type === "BACKWARD") {
      setCurrentPage((prevPage) => prevPage - 1);
      setSearchParams((searchParams) => {
        searchParams.set("page", (currentPage - 1).toString());
        return searchParams;
      });
    } else {
      setCurrentPage(page);
      setSearchParams((searchParams) => {
        searchParams.set("page", page.toString());
        return searchParams;
      });
    }
  };

  if (!data) return <div>No data</div>;
  const totalResults = data.num_found;
  const lastPage = Math.ceil(totalResults / pageSize);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Box>
        <SearchBookGrid data={data} />
      </Box>

      <Pagination.Root
        page={currentPage}
        count={totalResults}
        pageSize={pageSize}
        defaultPage={1}
        my={5}
      >
        <ButtonGroup variant="ghost" size="md">
          <Pagination.PrevTrigger
            asChild
            disabled={currentPage === 1}
            onClick={() => updatePageChange(currentPage, "BACKWARD")}
          >
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                onClick={() => updatePageChange(page.value)}
                variant={{ base: "ghost", _selected: "solid" }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger
            asChild
            disabled={currentPage === lastPage}
            onClick={() => updatePageChange(currentPage, "FORWARD")}
          >
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  );
};

export default SearchResultsPage;
