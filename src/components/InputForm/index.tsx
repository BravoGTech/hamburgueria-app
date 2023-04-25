import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { ILoginData } from "../../interfaces/login.interfaces";

interface IFormInputProps {
  placeHolder: string;
  register: UseFormRegister<ILoginData>;
  name: any;
  type: string;
  label?: string;
  error?: FieldErrors<ILoginData> | undefined;
  errorMessage?: string;
}

export const InputForm = ({
  placeHolder,
  register,
  name,
  type,
  label,
  error,
  errorMessage,
  ...rest
}: IFormInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color={"primary-color"}>{label}</FormLabel>
      <Input
        placeholder={placeHolder}
        type={type}
        {...register(name)}
        bg="title-color"
        borderRadius={"20px"}
      />
      {error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
