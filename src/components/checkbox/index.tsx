import { Checkbox as ChakraCheckbox, CheckboxGroup, Fieldset, Group } from "@chakra-ui/react";
import { useCheckbox } from "./useCheckbox";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface CheckboxProps {
  group: string;
  options: { label: string; value: string }[];
  heading: string;
}

const Checkbox = ({ group, options, heading }: CheckboxProps) => {
  const { update, selectedOptions } = useCheckbox(group);
  const [stateOptions, setStateOptions] = useState({
    showingMore: false,
    options: options.slice(0, 3)
  });

  //Controlled selected values
  const selectedValues = selectedOptions.map((opt) => opt.value);
  const handleChange = (values: string[]) => {
    update(values.map((value) => ({ label: value, value })));
  };

  //Local state to manage showing more/less
  const showMore = () => setStateOptions({ showingMore: true, options: options });
  const showLess = () => setStateOptions({ showingMore: false, options: options.slice(0, 3) });

  return (
    <Fieldset.Root>
      <Group cursor="pointer" onClick={() => (stateOptions.showingMore ? showLess() : showMore())}>
        <Fieldset.Legend>{heading}</Fieldset.Legend>
        {stateOptions.showingMore ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
      </Group>
      <CheckboxGroup colorPalette="orange" value={selectedValues} onValueChange={handleChange}>
        <Fieldset.Content>
          {stateOptions.options.map((item) => (
            <ChakraCheckbox.Root key={item.value} value={item.value}>
              <ChakraCheckbox.HiddenInput />
              <ChakraCheckbox.Control />
              <ChakraCheckbox.Label fontWeight="normal">{item.label}</ChakraCheckbox.Label>
            </ChakraCheckbox.Root>
          ))}
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  );
};
export default Checkbox;
