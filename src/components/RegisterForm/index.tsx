import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { InputForm } from "../InputForm";
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
        <InputForm
          name={"name"}
          placeHolder="Digite seu nome"
          type="text"
          label="Nome"
          register={register}
        />
        <InputForm
          name={"email"}
          placeHolder="Digite seu melhor email"
          type="text"
          label="Email"
          register={register}
        />
        <InputForm
          name={"password"}
          placeHolder="Digite sua senha"
          type="password"
          label="Senha"
          register={register}
        />
        <InputForm
          name={"phoneNumber"}
          placeHolder="Digite seu celular"
          type="text"
          label="Telefone"
          register={register}
        />
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
