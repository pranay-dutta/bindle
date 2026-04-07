import type { Dispatch, SetStateAction } from "react";
import type { AssistantResponse } from "./Assistant";
import { useForm } from "react-hook-form";
import { useAssistant } from "@/hooks/assistant/useAssistant";
import { Form } from "react-router";
import { Input, InputGroup } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";

interface UserFormData {
  message: string;
}
interface Props {
  setMessages: Dispatch<SetStateAction<AssistantResponse[]>>;
}

/** User input form to talk with the assistant */
const UserMessageForm = ({ setMessages }: Props) => {
  const { register, handleSubmit, reset } = useForm<UserFormData>();
  const assistantMutation = useAssistant(setMessages);

  const onSubmit = handleSubmit((data) => {
    if (!data.message.trim()) return; //if message is empty, do nothing

    const newMessages: AssistantResponse[] = [
      { role: "user", content: data.message },
      { role: "assistant", content: "" }
    ];
    setMessages((prev: AssistantResponse[]) => [...prev, ...newMessages]);
    assistantMutation.mutate(newMessages);
    reset();
  });

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup endAddon={<IoMdSend onClick={onSubmit} size={24} />}>
        <Input placeholder="Type your message..." {...register("message")} />
      </InputGroup>
    </Form>
  );
};
export default UserMessageForm;
