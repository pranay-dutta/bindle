import { createContext, useReducer, type ReactNode } from "react";
import type { CheckboxContextType } from "./checkboxTypes";
import checkboxReducer from "./checkboxReducer";

const CheckboxContext = createContext<CheckboxContextType>({
  state: {},
  dispatch: () => {}
});

const CheckboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(checkboxReducer, {});

  return <CheckboxContext.Provider value={{ state, dispatch }}>{children}</CheckboxContext.Provider>;
};

export { CheckboxContext, CheckboxProvider };
