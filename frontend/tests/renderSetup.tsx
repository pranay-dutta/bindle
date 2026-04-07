import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Providers from "@/providers";
import { MemoryRouter } from "react-router";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter>
        <Providers>{jsx}</Providers>
      </MemoryRouter>
    ),
  };
}
export { screen, setup };
