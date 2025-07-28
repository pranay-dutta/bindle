import { Box, Image } from "@chakra-ui/react";
import type { Work } from "@/interfaces/open-library/SubjectData";
import { getOLCoverUrls } from "@/utils";
import useImageFallback from "@/hooks/useImageFallback";

const OpenLibBook = ({ openLibBook }: { openLibBook: Work }) => {
  const amount = 90;
  const urls = getOLCoverUrls(openLibBook.cover_id);
  const { src, onError } = useImageFallback(urls);

  return (
    <Box height={amount * 3} width={amount * 2} overflow="clip">
      <Image
        onError={onError}
        minW={`${amount * 2}px`}
        minH={`${amount * 3}px`}
        objectFit="fill"
        src={src}
      />
    </Box>
  );
};

export default OpenLibBook;
