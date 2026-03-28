import { Box, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AssistantButton from "./AssistantButton";
import UserMessageForm from "./AssistantForm";
import { FcAssistant } from "react-icons/fc";

export interface AssistantResponse {
  role: "user" | "assistant";
  content: string;
}

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantResponse[]>([]);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AssistantButton onClick={toggleAssistant} />
      {isOpen && (
        <Box
          gap={2}
          backgroundColor="white"
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
          overflow="hidden"
          border="1px solid"
          borderColor="gray.200"
        >
          <Box
            flex="1"
            ref={chatBoxRef}
            overflowY="auto"
            _scrollbar={{ width: "6px" }}
            _scrollbarTrack={{ bg: "orange.100", borderRadius: "full" }}
            _scrollbarThumb={{ bg: "orange.600", borderRadius: "full" }}
            scrollbarGutter={"stable"}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {!messages.length && (
              <>
                <Text fontSize="sm" color="gray.500" textAlign="center" mt="10">
                  No messages yet. Start the conversation!
                </Text>
                <FcAssistant
                  opacity={0.3}
                  style={{ margin: "auto" }}
                  size={200}
                />
              </>
            )}
            {messages &&
              messages.map((msg, index) => {
                return (
                  <Text
                    key={index}
                    fontSize="sm"
                    padding="2"
                    whiteSpace="pre-wrap"
                    backgroundColor="gray.100"
                    borderRadius="md"
                    color={msg.role === "user" ? "blue.600" : "gray.800"}
                    alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
                  >
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </Markdown>
                  </Text>
                );
              })}
          </Box>

          {/* Message Input of user */}
          <UserMessageForm setMessages={setMessages} />
        </Box>
      )}
    </>
  );
};

export default Assistant;
