import useOpenLibSearch from "@/hooks/open-library/useOpenLibSearch";
import { useSearchParams } from "react-router";
import { ButtonGroup, Image, Grid, IconButton, Pagination, Skeleton, Box } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import useImageFallback from "@/hooks/useImageFallback";
import { getOLCoverUrls } from "@/utils";
import type { SearchData, SearchedBook } from "@/interfaces/open-library/OLSearch";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  const q = searchParams.get("q");
  const { data, isLoading } = useOpenLibSearch(q, currentPage, pageSize);

  if (!data) return <div>No data</div>;
  const totalResults = data.num_found;
  const lastPage = Math.ceil(totalResults / pageSize);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {/* <ul>
        {data.docs.map((book) => (
          <li key={book.key}>
            <ul>
              <li key={book.title}>{book.title}</li>
            </ul>
          </li>
        ))}
      </ul> */}
      <Box marginBottom={4}>
        <BookGrid data={data} />
      </Box>

      <Pagination.Root page={currentPage} count={totalResults} pageSize={20} defaultPage={1}>
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger
            asChild
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                onClick={() => setCurrentPage(page.value)}
                variant={{ base: "ghost", _selected: "outline" }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger
            asChild
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
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

const BookGrid = ({ data }: { data: SearchData }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} p={2}>
      {data.docs.map((book) => (
        <BookCard book={book} />
      ))}
    </Grid>
  );
};

const BookCard = ({ book }: { book: SearchedBook }) => {
  const width = 210;
  const height = 300;

  const [isLoaded, setIsLoaded] = useState(false);
  const urls = getOLCoverUrls(book.cover_i || 0);
  const { src, onError } = useImageFallback(urls);

  return (
    <Skeleton loading={!isLoaded} height={height} width={width}>
      <Image
        src={src}
        onLoad={() => setIsLoaded(true)}
        onError={onError}
        w={`${width}px`}
        h={`${height}px`}
        objectFit="fill"
      />
    </Skeleton>
  );
};
