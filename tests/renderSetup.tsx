import { render, screen } from "@testing-library/react";
import { Provider } from "@/ui/provider";

function setup(jsx: React.ReactElement) {
  return {
    ...render(<Provider>{jsx}</Provider>),
  };
}
export { screen, setup };
