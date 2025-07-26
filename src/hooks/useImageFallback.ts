import { useState } from "react";
const { VITE_IMG_FALLBACK_URL } = import.meta.env;

const useImageFallback = (urls: string[]) => {
  const [index, setIndex] = useState(0);
  const onError = () => setIndex((prev) => prev + 1);

  const src = urls[index] || `${VITE_IMG_FALLBACK_URL}/240x360/111?text=Media`;
  return { src, onError };
};
export default useImageFallback;
