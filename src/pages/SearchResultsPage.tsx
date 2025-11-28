import useOpenLibSearch from "@/hooks/open-library/useOpenLibSearch";
import { useSearchParams } from "react-router";
import {
  ButtonGroup,
  Image,
  Grid,
  IconButton,
  Pagination,
  Skeleton,
  Box,
  Flex,
  Text,
  Button
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import useImageFallback from "@/hooks/useImageFallback";
import { getOLCoverUrls } from "@/utils";
import type { SearchData, SearchedBook } from "@/interfaces/open-library/OLSearch";
import useCartStore from "@/store/useCartStore";

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
        <BookGrid data={data} />
      </Box>

      <Pagination.Root page={currentPage} count={totalResults} pageSize={pageSize} defaultPage={1} my={5}>
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

const BookGrid = ({ data }: { data: SearchData }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} p={2}>
      {data.docs.map((book) => (
        <div key={book.key}>
          <BookCard book={book} />
        </div>
      ))}
    </Grid>
  );
};

const BookCard = ({ book }: { book: SearchedBook }) => {
  const [bookCount, setBookCount] = useState(0);
  const addBook = useCartStore((s) => s.increaseQty);
  const removeBook = useCartStore((s) => s.decreaseQty);

  const width = 210;
  const height = 300;

  const [isLoaded, setIsLoaded] = useState(false);
  const urls = getOLCoverUrls(book.cover_i || 0);
  const { src, onError } = useImageFallback(urls);

  return (
    <>
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

      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Text>$ {book.price}</Text>

        {bookCount ? (
          <>
            <Button
              onClick={() => {
                setBookCount(bookCount - 1);
                removeBook(book);
              }}
              size="xs"
              colorPalette="orange"
              variant="solid"
              w="max-content"
              borderRadius={0}
            >
              -
            </Button>
            {bookCount}
            <Button
              onClick={() => {
                setBookCount(bookCount + 1);
                addBook(book);
              }}
              size="xs"
              colorPalette="orange"
              variant="solid"
              w="max-content"
              borderRadius={0}
            >
              +
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setBookCount(bookCount + 1);
              addBook(book);
            }}
            size="xs"
            colorPalette="orange"
            variant="solid"
            w="max-content"
            borderRadius={0}
          >
            Add to Cart
          </Button>
        )}
      </Flex>
    </>
  );
};
