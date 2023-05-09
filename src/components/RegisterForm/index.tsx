import {
  Button,
  Checkbox,
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
import { ICreateUser } from "../../interfaces/users.interfaces";
import { createUserSchema } from "../../schemas/users.schemas";
import { useContext, useState } from "react";
import axios from "axios";
import { ICepAPI } from "../../interfaces/addresses.interfaces";
import { UsersContext } from "../../contexts/UsersContext";

export const RegisterForm = () => {
  const { createUser } = useContext(UsersContext);

  const [cepValue, setCepValue] = useState<ICepAPI>();
  const [addressComplement, setAddressComplemnt] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressPreference, setAddressPreference] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICreateUser>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = (newUser: ICreateUser) => {
    const data = {
      ...newUser,
      isAdmin: false,
      addresses: [
        {
          street: `${cepValue?.logradouro}, ${addressNumber}`,
          city: cepValue?.localidade!,
          state: cepValue?.uf!,
          zip: cepValue?.cep!,
          complement: addressComplement ? addressComplement : "",
          preferred: addressPreference,
        },
      ],
    };
    createUser({ data });
  };

  const handleCEP = async (cep: string) => {
    try {
      if (cep.length === 8) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setCepValue(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      as="form"
      flexDir={{ base: "column", lg: "row" }}
      onSubmit={handleSubmit(onSubmit)}
      justify="space-evenly"
      align={"flex-start"}
    >
      <VStack spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Digite seu nome" {...register("name")} />
          {!!errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>E-mail</FormLabel>
          <Input placeholder="Digite seu melhor email" {...register("email")} />
          {!!errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Ex: mail@email.com</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {!!errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.phoneNumber}>
          <FormLabel>Telefone</FormLabel>
          <Input
            placeholder="Digite seu celular"
            {...register("phoneNumber")}
          />
          {!!errors.phoneNumber && (
            <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
          )}
        </FormControl>
      </VStack>
      <VStack spacing={6}>
        <FormControl>
          <FormLabel color={"primary-color"}>CEP</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"20px"}
            type="text"
            maxLength={8}
            onChange={(e) => handleCEP(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"primary-color"}>Complemento</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"20px"}
            type="text"
            onChange={(e) => setAddressComplemnt(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"primary-color"}>Numero</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"20px"}
            type="text"
            onChange={(e) => setAddressNumber(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Checkbox
            defaultChecked
            color="primary-color"
            size="lg"
            onChange={(e) => setAddressPreference(e.target.checked)}
          >
            Endereço Preferido
          </Checkbox>
        </FormControl>
      </VStack>
      <VStack spacing={6}>
        <FormControl>
          <FormLabel color={"primary-color"}>Endereço</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"20px"}
            type="text"
            value={cepValue?.logradouro}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"primary-color"}>Cidade</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"20px"}
            type="text"
            value={cepValue?.localidade}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"primary-color"}>Estado</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"20px"}
            type="text"
            value={cepValue?.uf}
          />
        </FormControl>
        <Button type="submit">Cadastrar</Button>
      </VStack>
    </Flex>
  );
};
