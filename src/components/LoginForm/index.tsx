import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login.schemas";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

interface ILoginData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { login } = useContext(LoginContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: ILoginData) => {
    login(data);
  };

  return (
    <Flex
      as="form"
      flexDir={"column"}
      mt="1rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack spacing={6}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>E-mail</FormLabel>
          <Input placeholder="Insira seu email" {...register("email")} />
          {!!errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Ex: exemplo@email.com.br</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Senha</FormLabel>
          <Input
            placeholder="Insira sua senha"
            type="password"
            {...register("password")}
          />
          {!!errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button borderRadius={"20px"} w="100%" type="submit" bg="logo-color">
          Login
        </Button>
      </VStack>
    </Flex>
  );
};
