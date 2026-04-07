import { useState } from "react";
const { VITE_IMG_FALLBACK_URL } = import.meta.env;

//TODO: remove dummy data
/**
 * React hook to get a fallback image source from a list of URLs.
 * Automatically switches to the next URL if the current one fails to load.
 *
 * @param urls - An array of image URLs to attempt loading in order.
 * @returns An object containing:
 * - `src`: The current image source URL to use.
 * - `onError`: An error handler to be passed to the image `onError` prop.
 *
 * @example
 * const { src, onError } = useImageFallback([
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg',
 * ]);
 *
 * <img src={src} onError={onError} />
 */
const useImageFallback = (urls: string[]) => {
  const [index, setIndex] = useState(0);
  const onError = () => setIndex((prev) => prev + 1);

  const src = urls[index] || `${VITE_IMG_FALLBACK_URL}/240x360/333?text=book&font=lobster`;
  return { src, onError };
};
export default useImageFallback;
