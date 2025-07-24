import type { Book } from "@/interfaces/new-york-times/Book";
import { Image } from "@chakra-ui/react";

type BookImageProps = {
  book: Book;
  objectFit: "contain" | "cover";
};

const BookImage = ({ book, objectFit }: BookImageProps) => {
  return (
    <Image
      minW={"160px"}
      minH={"240px"}
      h={"160px"}
      w={"240px"}
      objectFit={objectFit}
      src={book.book_image}
      alt={book.title}
    />
  );
};

export default BookImage;
