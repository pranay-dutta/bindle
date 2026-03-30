import type { SearchData } from "@/interfaces/open-library/OLSearch";
import { getOLCoverUrls } from "@/utils";
import { Grid, Box } from "@chakra-ui/react";
import SearchBookCard from "./SearchBookCard";

const SearchBookGrid = ({ data }: { data: SearchData }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} p={2}>
      {data.docs.map((book) => {
        const urls = getOLCoverUrls(book.cover_i || 0);
        if (urls.length === 0) return null;

        return (
          <Box maxWidth="min-content" key={book.key}>
            <SearchBookCard book={book} urls={urls} />
          </Box>
        );
      })}
    </Grid>
  );
};
export default SearchBookGrid;