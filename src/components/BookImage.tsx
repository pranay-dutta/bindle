import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import { Image } from "@chakra-ui/react";

type BookImageProps = {
  book: NytBook;
  objectFit: "contain" | "cover" | "fill";
  objectPosition?: string;
  height?: string;
  width?: string;
};

const BookImage = ({
  book,
  objectFit,
  objectPosition,
  height,
  width
}: BookImageProps) => {
  return (
    <Image
      w={width || "100%"}
      h={height || "auto"}
      maxW="100%"
      aspectRatio={2 / 3}
      objectFit={objectFit}
      objectPosition={objectPosition}
      src={book.book_image}
      alt={book.title}
      _hover={{
        transform: "scale3d(1.04, 1.04, 1)",
        cursor: "pointer"
      }}
      transition={"transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"}
      willChange="transform"
    />
  );
};

export default BookImage;
