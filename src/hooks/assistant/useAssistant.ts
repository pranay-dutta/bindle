import { useMutation } from "@tanstack/react-query";
const { VITE_BACKEND_URL } = import.meta.env;

export const useAssistant = (setMessages: any) => {
  return useMutation({
    mutationFn: async (messages: any[]) => {
      const res = await fetch(`${VITE_BACKEND_URL}/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messages)
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let full = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const clean = line.replace("data:", "").trim();
          if (!clean || clean === "[DONE]") continue;

          const json = JSON.parse(clean);

          if (json.content) {
            full += json.content;

            //  update LAST assistant message live
            setMessages((prev: any[]) => {
              const last = prev[prev.length - 1];
              return [
                ...prev.slice(0, -1),
                { ...last, content: last.content + json.content }
              ];
            });
          }
        }
      }

      return full;
    }
  });
};
