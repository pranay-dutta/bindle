import { Checkbox as ChakraCheckbox, CheckboxGroup, Fieldset, Group } from "@chakra-ui/react";
import { useCheckbox } from "./useCheckbox";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSearchParams } from "react-router";

interface CheckboxProps {
  group: string;
  options: { label: string; value: string }[];
  heading: string;
  singleCheck?: boolean;
}

const Checkbox = ({ group, options, heading, singleCheck }: CheckboxProps) => {
  const OPTION_QTY = 5;
  const { update, selectedOptions } = useCheckbox(group);
  const [, setSearchParams] = useSearchParams();

  //Local state to manage showing more/less
  const [stateOptions, setStateOptions] = useState({
    showingMore: false,
    options: options.slice(0, OPTION_QTY)
  });
  const showMore = () => setStateOptions({ showingMore: true, options: options });
  const showLess = () => setStateOptions({ showingMore: false, options: options.slice(0, OPTION_QTY) });

  //Controlled selected values
  const selectedValues = selectedOptions.map((opt) => opt.value);

  // Handle checkbox changes
  const handleChange = (values: string[]) => {
    if (singleCheck && values.length > 1) return;
    update(values.map((value) => ({ label: value, value })));

    // Update URL search params
    setSearchParams((params) => {
      if (values.length === 0) {
        params.delete(group);
        return params;
      }
      params.set(group, values.join(","));
      return params;
    });
  };

  return (
    <Fieldset.Root>
      <Group cursor="pointer" onClick={() => (stateOptions.showingMore ? showLess() : showMore())}>
        <Fieldset.Legend>{heading}</Fieldset.Legend>
        {stateOptions.showingMore ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
      </Group>
      <CheckboxGroup colorPalette="orange" value={selectedValues} onValueChange={handleChange}>
        <Fieldset.Content>
          {stateOptions.options.map((item) => {
            const isDisabled =
              singleCheck && selectedValues.length > 0 && !selectedValues.includes(item.value);
            return (
              <ChakraCheckbox.Root
                disabled={isDisabled}
                key={item.value}
                value={item.value}
                opacity={isDisabled ? 0.5 : 1}
              >
                <ChakraCheckbox.HiddenInput />
                <ChakraCheckbox.Control />
                <ChakraCheckbox.Label fontWeight="normal">{item.label}</ChakraCheckbox.Label>
              </ChakraCheckbox.Root>
            );
          })}
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  );
};
export default Checkbox;
