import type { CheckboxState, Action } from "./checkboxTypes";

const checkboxReducer = (state: CheckboxState, action: Action): CheckboxState => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        [action.group]: action.payload
      };

    case "RESET":
      return {
        ...state,
        [action.group]: []
      };

    default:
      return state;
  }
};
export default checkboxReducer;
