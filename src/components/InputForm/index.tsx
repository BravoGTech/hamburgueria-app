import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { ILoginData } from "../../interfaces/login.interfaces";

interface IFormInputProps<T extends FieldValues> {
  placeHolder: string;
  register: UseFormRegister<T>;
  name: any;
  type: string;
  label?: string;
  error?: FieldErrors<T> | undefined;
  errorMessage?: string;
  maxLength?: number;
  pattern?: string;
  value?: string;
}

export const InputForm = <T extends FieldValues>({
  placeHolder,
  register,
  name,
  type,
  label,
  error,
  errorMessage,
  maxLength,
  pattern,
  value,

  ...rest
}: IFormInputProps<T>) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color={"primary-color"}>{label}</FormLabel>
      <Input
        placeholder={placeHolder}
        type={type}
        defaultValue={value}
        {...register(name)}
        bg="title-color"
        borderRadius={"20px"}
        maxLength={maxLength}
        pattern={pattern}
      />
      {error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
