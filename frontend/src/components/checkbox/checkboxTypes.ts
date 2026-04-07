import type { Dispatch } from "react";

type OptionType = {
  label: string;
  value: string;
};

type CheckboxState = Record<string, OptionType[]>;
type Action = { type: "SET"; group: string; payload: OptionType[] } | { type: "RESET"; group: string };

type CheckboxContextType = {
  state: CheckboxState;
  dispatch: Dispatch<Action>;
};
export type { OptionType, CheckboxState, Action, CheckboxContextType };
