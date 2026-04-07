import { useContext } from "react";
import type { OptionType } from "./checkboxTypes";
import { CheckboxContext } from "./checkboxContext";

export function useCheckbox(group: string) {
  const { state, dispatch } = useContext(CheckboxContext);

  //Get selected options for the specified group
  const selectedOptions = state[group] ?? [];

  const update = (options: OptionType[]) => {
    dispatch({
      type: "SET",
      group,
      payload: options
    });
  };

  const reset = () => {
    dispatch({ type: "RESET", group });
  };

  return {
    selectedOptions,
    update,
    reset
  };
}
