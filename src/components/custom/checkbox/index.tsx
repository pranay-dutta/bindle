import { Checkbox as ChakraCheckbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { CheckboxContext, type OptionType } from "@/context/CheckboxContext";
import { useContext } from "react";

const Checkbox = () => {
  const { options, heading, dispatch } = useContext(CheckboxContext);

  const handleChange = (selectedValues: string[]) => {
    const selectedOptions: OptionType[] = selectedValues.map((value) => ({
      label: value.toLocaleLowerCase(),
      value
    }));
    dispatch({ type: "SET", payload: selectedOptions });
  };
  return (
    <Fieldset.Root>
      <Fieldset.Legend>{heading}</Fieldset.Legend>
      <CheckboxGroup colorPalette="orange" onValueChange={handleChange}>
        <Fieldset.Content>
          {options.map((item) => (
            <ChakraCheckbox.Root key={item.value} value={item.value}>
              <ChakraCheckbox.HiddenInput />
              <ChakraCheckbox.Control />
              <ChakraCheckbox.Label>{item.label}</ChakraCheckbox.Label>
            </ChakraCheckbox.Root>
          ))}
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  );
};
export default Checkbox;
