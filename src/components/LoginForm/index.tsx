import { Button, Flex, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { InputForm } from "../InputForm";
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
        <InputForm
          name="email"
          placeHolder="Insira seu email"
          type="text"
          register={register}
          label="Email"
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <InputForm
          name="password"
          placeHolder="Insira sua senha"
          type="password"
          register={register}
          label="Senha"
          error={errors.password}
          errorMessage={errors.password?.message}
        />
        <Button borderRadius={"20px"} w="100%" type="submit" bg="logo-color">
          Login
        </Button>
      </VStack>
    </Flex>
  );
};
