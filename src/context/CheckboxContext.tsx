import { createContext, useReducer, type Dispatch, type ReactNode } from "react";

type CheckboxProviderProps = {
  children: ReactNode;
  heading: string;
  options: OptionType[];
};
export type OptionType = {
  label: string;
  value: string;
};
type Action = { type: "SET"; payload: OptionType[] } | { type: "RESET" };
type CheckboxContextType = {
  heading: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  dispatch: Dispatch<Action>;
};

function checkboxReducer(state: OptionType[], action: Action): OptionType[] {
  switch (action.type) {
    case "SET": {
      return action.payload;
    }
    case "RESET":
      return [];

    default:
      return state;
  }
}

const CheckboxContext = createContext<CheckboxContextType>({
  heading: "",
  options: [],
  selectedOptions: [],
  dispatch: () => {}
});

const CheckboxProvider = ({ children, options, heading }: CheckboxProviderProps) => {
  const [selectedOptions, dispatch] = useReducer(checkboxReducer, []);
  return (
    <CheckboxContext.Provider value={{ heading, selectedOptions, options, dispatch }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export default CheckboxProvider;
export { CheckboxContext };
