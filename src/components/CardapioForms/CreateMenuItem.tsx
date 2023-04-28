import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { InputForm } from "../InputForm";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMenuItemSchema } from "../../schemas/menuItem.schemas";
import { IMenuItemCreate } from "../../interfaces/menuItem.interfaces";
import PriceInput from "../PriceInput";

export const CreateMenuItem = () => {
  const { data: categories, isFetching } = useContext(CategoriesContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createMenuItemSchema) });

  const [price, setPrice] = useState<string | null>(null);

  // const format = (valueAsString: string) => {
  //   if (+valueAsString / 100 < 0) {
  //     const minValue = 0;
  //     setPrice(
  //       minValue.toLocaleString("pt-BR", {
  //         style: "currency",
  //         currency: "BRL",
  //       })
  //     );
  //   } else {
  //     const formatedValue = (+valueAsString / 100).toLocaleString("pt-BR", {
  //       style: "currency",
  //       currency: "BRL",
  //     });
  //     console.log(formatedValue);

  //     setPrice(formatedValue);
  //   }
  // };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <Flex
      as="form"
      flexDir={"column"}
      maxW={"400px"}
      margin={"0 auto"}
      mt="2rem"
      gap="1rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        name={"name"}
        placeHolder="Digite o nome do produto"
        type="text"
        register={register}
        label="Nome"
      />
      <InputForm
        name={"imageURL"}
        placeHolder="Digite a URL da imagem"
        type="text"
        register={register}
        label="Imagem"
      />
      <InputForm
        name={"price"}
        placeHolder="Digite o preço"
        type="number"
        register={register}
        label="Preço"
      />

      <FormControl>
        <FormLabel color={"primary-color"}>Descrição</FormLabel>
        <Textarea
          bg="title-color"
          borderRadius={"20px"}
          placeholder="Digite a descrição do produto"
          {...register("description")}
        />
      </FormControl>
      <FormControl>
        <FormLabel color={"primary-color"}>Categoria</FormLabel>
        <Select
          {...register("categoryId")}
          bg="title-color"
          borderRadius={"20px"}
        >
          <option>Selecione a categoria</option>
          {isFetching ? (
            <Spinner />
          ) : (
            categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </Select>
      </FormControl>
      <Button type="submit">Adicionar</Button>
    </Flex>
  );
};
