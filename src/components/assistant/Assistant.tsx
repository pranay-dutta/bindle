import useAssistantRoutes from "@/hooks/useAssistantRoutes";
import {
  Box,
  Button,
  Input,
  InputGroup,
  SkeletonText,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { FcAssistant } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";

interface AssistantButtonProps {
  onClick: () => void;
}

const AssistantButton = ({ onClick }: AssistantButtonProps) => {
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

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { useAssistantResponse } = useAssistantRoutes();
  const { data, isLoading } = useAssistantResponse();

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AssistantButton onClick={toggleAssistant} />
      {isOpen && (
        <Box
          backgroundColor="white"
          border="2px solid"
          borderColor="orange.600"
          position="fixed"
          bottom="80px"
          right="20px"
          width="375px"
          height="500px"
          borderRadius="md"
          boxShadow="2xl"
          padding="4"
          zIndex="max"
          display="flex"
          flexDirection="column"
          gap={2}
          overflow="hidden"
        >
          <Box
            flex="1"
            overflowY="auto"
            _scrollbar={{ width: "6px" }}
            _scrollbarTrack={{ bg: "orange.100", borderRadius: "full" }}
            _scrollbarThumb={{ bg: "orange.600", borderRadius: "full" }}
            scrollbarGutter={"stable"}
          >
            {isLoading && <SkeletonText noOfLines={4} loading={isLoading} />}

            <Text fontSize="sm" color="gray.700">
              {data?.message}
            </Text>
          </Box>

          <InputGroup
            endAddon={
              <Box
                _hover={{ cursor: "pointer", color: "orange.600" }}
                onClick={() => alert("hello")}
              >
                <IoMdSend size={24} />
              </Box>
            }
          >
            <Input placeholder="Type your message..." />
          </InputGroup>
        </Box>
      )}
    </>
  );
};

export default Assistant;
