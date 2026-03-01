import type { OLWork } from "@/interfaces/open-library/OLWork";
const { VITE_OPEN_LIB_COVERS_URL } = import.meta.env;
import type { NytBook } from "@/interfaces/new-york-times/NytBook";
import type { SearchedBook } from "@/interfaces/open-library/OLSearch";

export const toNormalCase = (inputString: string) => {
  return inputString.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());
};

export const toKebabCase = (inputString: string) => {
  return inputString.toLowerCase().replace(/\s+/g, "-");
};

export const removeKebabCase = (inputString: string) => {
  return inputString.replace(/-/g, " ");
};
export const openLibKeyToWorkId = (key: string | undefined) => {
  if (!key) return null;

  const match = key.match(/\/books\/([^/]+)/);
  return match ? match[1] : null;
};

export const extractWorkDescription = (
  work: OLWork | undefined
): string | null => {
  if (!work) return null;

  if (!work.description) return null;
  if (typeof work.description === "string") return work.description;
  if (typeof work.description === "object" && "value" in work.description)
    return work.description.value;

  return null;
};

export const getOLCoverUrls = (coverId: number | null) => {
  if (!coverId) return [];

  return [
    `${VITE_OPEN_LIB_COVERS_URL}${coverId}-M.jpg`,
    `${VITE_OPEN_LIB_COVERS_URL}${coverId}-L.jpg`,
    `${VITE_OPEN_LIB_COVERS_URL}${coverId}-S.jpg`
  ];
};

export const isNytBook = (book: NytBook | SearchedBook): book is NytBook => {
  return (book as NytBook).primary_isbn13 !== undefined;
};
