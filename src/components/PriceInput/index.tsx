import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IPriceInputProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  value: number;
  onChange: (valueAsString: string, valueAsNumber: number) => void;
}

const PriceInput = <T extends FieldValues>({
  label,
  value,
  onChange,
  register,
  ...rest
}: IPriceInputProps<T>) => {
  return (
    <Box>
      <FormControl id="price">
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          <InputLeftAddon children="R$" />
          <NumberInput
            precision={2}
            step={0.01}
            min={0}
            value={value}
            bg="primary-color"
            {...register(na)}
            onChange={onChange}
          >
            <NumberInputField />
          </NumberInput>
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default PriceInput;
