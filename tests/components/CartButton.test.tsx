import CartButton from "@/components/CartButton";
import { CURRENCY_SYMBOL } from "@/constants";
import { describe, expect, it } from "vitest";
import { screen, setup } from "../renderSetup";

describe("Cart", () => {
  it("should render cart with correct amount", () => {
    const amount = 200;
    setup(<CartButton amount={amount} />);

    const cartAmount = screen.getByText(`${CURRENCY_SYMBOL} ${amount}`);

    expect(cartAmount).toBeInTheDocument();
    expect(cartAmount).toHaveTextContent(`${CURRENCY_SYMBOL} ${amount}`);
  });

  it("should render cart with default amount when none is passed", () => {
    setup(<CartButton />);

    const cartAmount = screen.getByText(`${CURRENCY_SYMBOL} 0`);

    expect(cartAmount).toBeInTheDocument();
  });
});
