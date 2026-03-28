import { Button } from "@chakra-ui/react";
import { FcAssistant } from "react-icons/fc";

interface Props {
  onClick: () => void;
}

/** A button that opens the AI assistant window. */
const AssistantButton = ({ onClick }: Props) => {
  return (
    <Button
      position="fixed"
      bottom="20px"
      right="20px"
      colorPalette="orange"
      size="md"
      rounded="full"
      aspectRatio="1/1"
      onClick={onClick}
      height="50px"
      width="50px"
      zIndex="overlay"
      boxShadow="xl"
      outline="2px solid"
      outlineColor="transparent"
      outlineOffset="2px"
      outlineWidth="3px"
      _hover={{
        colorPalette: "red",
        outlineColor: "red.300",
        outlineOffset: "2px",
        outlineWidth: "3px"
      }}
    >
      <FcAssistant size={24} />
    </Button>
  );
};
export default AssistantButton;