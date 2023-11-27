import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

export default function SettingsNumberInput({
  min, max, value, onChange,
} : {
  min: number,
  max: number,
  value: number,
  onChange: (valueAsString: string, valueAsNumber: number) => void,
}) {
  return (
    <NumberInput
      defaultValue={
        value / 60000
      }
      min={min}
      max={max}
      step={0.1}
      value={value / 60000}
      onChange={onChange}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
