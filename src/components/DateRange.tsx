import { Group, Slider, Text, type SliderValueChangeDetails } from "@chakra-ui/react";
import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useSearchParams } from "react-router";

const DateRange = () => {
  const initialValue = [1600, 2025];
  const [value, setValue] = useState<number[]>(initialValue);
  const [, setSearchParams] = useSearchParams();

  // Handle slider change end to update URL params
  const handleEndChange = (e: SliderValueChangeDetails) => {
    setSearchParams((params) => {
      // Remove param if it matches initial value
      if (e.value[0] === initialValue[0] && e.value[1] === initialValue[1]) {
        params.delete("published_in");
        return params;
      } else {
        params.set("published_in", `${e.value[0]}-${e.value[1]}`);
        return params;
      }
    });
  };

  return (
    <>
      <Group fontSize="sm" fontWeight="medium" mt={-2} mb={2}>
        <CiCalendarDate />
        <Text ms={-1}>
          {value[0]} - {value[1]}
        </Text>
      </Group>
      <Slider.Root
        maxW="md"
        colorPalette="orange"
        value={value}
        min={1600}
        max={2025}
        step={1}
        minStepsBetweenThumbs={8}
        onValueChange={(e) => setValue(e.value)}
        onValueChangeEnd={(e) => handleEndChange(e)}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </>
  );
};
export default DateRange;
