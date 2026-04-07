import { Image, Skeleton, Flex, Text, Button } from "@chakra-ui/react";
import useImageFallback from "@/hooks/useImageFallback";
import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";

const SearchBookCard = ({
  book,
  urls
}: {
  book: SearchedBook;
  urls: string[];
}) => {
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
export default SearchBookCard;
