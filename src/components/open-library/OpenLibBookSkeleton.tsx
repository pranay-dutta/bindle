import { Skeleton } from "@chakra-ui/react";

const OpenLibBookSkeleton = () => {
  const [height, width] = [270, 180];
  return <Skeleton height={height} width={width} />;
};

export default OpenLibBookSkeleton;
