import useImageFallback from "@/hooks/useImageFallback";
import type { Work } from "@/interfaces/open-library/SubjectData";
import { getOLCoverUrls } from "@/utils";
import { Badge, Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

const OpenLibBook = ({ openLibBook, text }: { openLibBook: Work; text?: "New" | "Sale" | "Popular" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const urls = getOLCoverUrls(openLibBook.cover_id);
  const { src, onError } = useImageFallback(urls);
  const [height, width] = [270, 180];

  return (
    <Box position="relative" height={height} width={width} overflow="clip">
      <Skeleton loading={!isLoaded} height={height} width={width} top={0} left={0}>
        {text && (
          <Badge
            top={2}
            right={2}
            size="md"
            borderRadius={0}
            position="absolute"
            variant="solid"
            colorPalette={text === "Popular" ? "red" : "orange"}
            boxShadow="md"
          >
            {text}
          </Badge>
        )}
        <Image
          src={src}
          onLoad={() => setIsLoaded(true)}
          onError={onError}
          minW={`${width}px`}
          minH={`${height}px`}
          objectFit="fill"
        />
      </Skeleton>
    </Box>
  );
};

export default OpenLibBook;
