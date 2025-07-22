import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("should render hello name when name is passed", () => {
    render(<App name="Rick" />);
    
  });
});
