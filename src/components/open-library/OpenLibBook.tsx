import useImageFallback from "@/hooks/useImageFallback";
import type { Work } from "@/interfaces/open-library/SubjectData";
import { getOLCoverUrls } from "@/utils";
import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

const OpenLibBook = ({ openLibBook }: { openLibBook: Work }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const urls = getOLCoverUrls(openLibBook.cover_id);
  const { src, onError } = useImageFallback(urls);
  const height = 90 * 3;
  const width = 90 * 2;

  return (
    <Box height={height} width={width} overflow="clip">
      <Skeleton loading={!isLoaded} height={height} width={width} position="absolute" top={0} left={0}>
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
