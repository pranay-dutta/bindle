import { Image, Skeleton, Flex, Text, Button, Box } from "@chakra-ui/react";
import useImageFallback from "@/hooks/useImageFallback";
import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";

interface SearchBookCardProps {
  book: SearchedBook;
  urls: string[];
}

const SearchBookCard = ({ book, urls }: SearchBookCardProps) => {
  const [show, setShow] = useState(false);
  const [bookCount, setBookCount] = useState(0);
  const addBook = useCartStore((s) => s.increaseQty);
  const removeBook = useCartStore((s) => s.decreaseQty);

  const width = 210;
  const height = 300;

  const [isLoaded, setIsLoaded] = useState(false);
  const { src, onError } = useImageFallback(urls);

  return (
    <>
      <Skeleton loading={!isLoaded} height={height} width={width}>
        <Box position="relative">
          {
            <Image
              src={src}
              onError={onError}
              w={`${width}px`}
              h={`${height}px`}
              objectFit="fill"
              onLoad={() => setIsLoaded(true)}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              filter={show ? "brightness(70%)" : "none"}
              transition="filter 0.3s ease"
              rounded={show ? "md" : "none"}
              cursor="pointer"
            />
          }
          {show && (
            <Text
              position="absolute"
              bottom={4}
              left={2}
              right={2}
              fontWeight="bold"
              color="white"
            >
              {book.title}
            </Text>
          )}
        </Box>
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
export default SearchBookCard;
