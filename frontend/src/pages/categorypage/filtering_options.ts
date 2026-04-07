import type { OptionType } from "@/context/CheckboxContext";
interface FilteringOptions {
  id: number;
  heading: string;
  options: OptionType[];
}

const languageOptions: FilteringOptions = {
  id: 1,
  heading: "Select Language",
  options: [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Dutch", value: "dutch" },
    { label: "Polish", value: "polish" },
    { label: "Chinese", value: "chinese" },
    { label: "Russian", value: "russian" },
    { label: "Italian", value: "italian" },
    { label: "Portuguese", value: "portuguese" }
  ]
};
const sortOptions: FilteringOptions = {
  id: 2,
  heading: "Sort By",
  options: [
    { label: "Top Rated", value: "rating" },
    { label: "Most Editions", value: "editions" },
    { label: "First Published", value: "old" },
    { label: "Most Recent", value: "new" },
    { label: "Reading Log", value: "readinglog" },
    { label: "Trending", value: "trending" },
    { label: "Random", value: "random" }
  ]
};
const ebookOptions: FilteringOptions = {
  id: 3,
  heading: "Ebook",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]
};
export { languageOptions, sortOptions, ebookOptions };
