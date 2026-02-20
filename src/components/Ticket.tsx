import { Badge } from "@chakra-ui/react";
import type {
  ColorPalette,
  ConditionalValue,
} from "@chakra-ui/react/styled-system";

interface TicketProps {
  text: string;
  colorPalette: ConditionalValue<ColorPalette>;
}
const Ticket = ({ colorPalette, text }: TicketProps) => {
  return (
    <Badge
      borderRadius={0}
      colorPalette={colorPalette}
      variant="solid"
      size="sm"
      position="absolute"
      top={2}
      right={-2}
      px={3}
    >
      {text}
    </Badge>
  );
};

export default Ticket;
