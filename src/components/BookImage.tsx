import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { Image } from "@chakra-ui/react";

type BookImageProps = {
  book: NytBook;
  objectFit: "contain" | "cover" | "fill";
  height?: string;
  width?: string;
};

const BookImage = ({ book, objectFit, height, width }: BookImageProps) => {
  return (
    <Image
      minW={width || "160px"}
      minH={height || "240px"}
      h={height || "160px"}
      w={width || "240px"}
      objectFit={objectFit}
      src={book.book_image}
      alt={book.title}
    />
  );
};

export default BookImage;
