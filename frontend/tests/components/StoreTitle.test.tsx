import { describe, expect, it } from "vitest";
import { screen, setup } from "../renderSetup";
import StoreTitle from "@/components/StoreTitle";
import { STORE_TITLE } from "@/constants";

describe("StoreTitle", () => {
  it("should render store title", () => {
    setup(<StoreTitle />);

    const storeTitle = screen.getByText(STORE_TITLE);

    expect(storeTitle).toBeInTheDocument();
    expect(storeTitle).toHaveTextContent(STORE_TITLE);
  });
  it("should navigate to homepage on click", () => {
    const { user } = setup(<StoreTitle />);

    const storeTitle = screen.getByText(STORE_TITLE);
    user.click(storeTitle);

    expect(window.location.pathname).toBe("/");
  });
});
