import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FcAssistant } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { VITE_BACKEND_URL } = import.meta.env;

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

interface AssistantResponse {
  role: "user" | "assistant";
  content: string;
}

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantResponse[]>([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");

  const handleClick = async () => {
    if (!input.trim()) return;

    setMessages((prev) => {
      return [...prev, { role: "user", content: input }];
    });
    setInput("");

    setTimeout(() => {
      //scroll to bottom after state updates and new message is rendered
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 0);
  };

  useEffect(() => {
    const fetchResponse = async () => {
      const lastMessage = messages.at(-1);
      if (!lastMessage || lastMessage.role !== "user") return;

      try {
        const response = await fetch(`${VITE_BACKEND_URL}/assistant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(messages)
        });

        if (!response.ok || !response.body) return;

        setIsStreaming(true);
        setStreamedContent("");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        const parseLine = (rawLine: string) => {
          const trimmed = rawLine.trim();
          if (!trimmed) return;

          const normalized = trimmed.startsWith("data:")
            ? trimmed.slice(5).trim()
            : trimmed;

          if (!normalized || normalized === "[DONE]") return;

          try {
            const chunk = JSON.parse(normalized) as { content?: string };

            if (chunk.content) {
              accumulated += chunk.content;
              setStreamedContent((prev) => prev + chunk.content);
            }
          } catch (error) {
            console.log(error);
          }
        };

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            parseLine(line);
          }
        }

        if (buffer) {
          parseLine(buffer);
        }

        if (accumulated) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: accumulated }
          ]);
        }
      } finally {
        setIsStreaming(false);
        setStreamedContent("");
      }
    };
    fetchResponse();
  }, [messages]);

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
            {messages &&
              messages.map((msg, index) => {
                return (
                  <Text
                    fontSize="sm"
                    color={msg.role === "user" ? "blue.600" : "gray.800"}
                    padding="2"
                    whiteSpace="pre-wrap"
                    backgroundColor="gray.100"
                    borderRadius="md"
                    alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
                    key={index}
                  >
                    {msg.role === "assistant" ? (
                      <Markdown>{msg.content}</Markdown>
                    ) : (
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </Markdown>
                    )}
                  </Text>
                );
              })}
            {isStreaming && (
              <Text
                fontSize="sm"
                color="gray.800"
                padding="2"
                whiteSpace="pre-wrap"
                backgroundColor="gray.100"
                borderRadius="md"
                alignSelf="flex-start"
              >
                <Markdown remarkPlugins={[remarkGfm]}>
                  {streamedContent}
                </Markdown>
              </Text>
            )}
          </Box>

          <InputGroup
            endAddon={
              <Box
                _hover={{ cursor: "pointer", color: "orange.600" }}
                onClick={handleClick}
              >
                <IoMdSend size={24} />
              </Box>
            }
          >
            <Input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type your message..."
            />
          </InputGroup>
        </Box>
      )}
    </>
  );
};

export default Assistant;
