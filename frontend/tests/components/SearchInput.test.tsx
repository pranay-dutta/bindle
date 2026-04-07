import SearchInput from "@/components/SearchInput";
import { it, expect, describe } from "vitest";
import { setup, screen } from "../renderSetup";

describe("SearchInput", () => {
  it("should render a input element", () => {
    setup(<SearchInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});
