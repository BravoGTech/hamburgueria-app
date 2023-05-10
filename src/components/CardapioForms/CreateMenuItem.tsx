import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMenuItemSchema } from "../../schemas/menuItem.schemas";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import {
  IMenuItemCreate,
  IMenuItemMutation,
} from "../../interfaces/menuItem.interfaces";

export const CreateMenuItem = () => {
  const { data: categories, isFetching } = useContext(CategoriesContext);

  const { createMenuItem, menuItemDeatilData } = useContext(MenuItemContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMenuItemCreate>({ resolver: zodResolver(createMenuItemSchema) });
  const [price, setPrice] = useState<string>("");

  const onSubmit: SubmitHandler<IMenuItemCreate> = (data) => {
    let priceWithoutCurrency = data.price.replace("R$", "").trim();
    let formatedCurrency = priceWithoutCurrency.replace(",", ".");
    const newData: IMenuItemMutation = {
      ...data,
      price: +formatedCurrency,
    };

    createMenuItem(newData);
  };

  const format = (price: string) => {
    let priceWithoutCurrency = price.replace("R$", "").trim();
    let priceWithCurrency = `R$ ${priceWithoutCurrency}`;
    setPrice(priceWithCurrency);
  };

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
      <FormControl isInvalid={!!errors.name}>
        <FormLabel color={"primary-color"}>Nome</FormLabel>
        <Input
          placeholder="Digite o nome do produto"
          {...register("name")}
          bg="title-color"
          borderRadius={"20px"}
        />
        {!!errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.imageURL}>
        <FormLabel color={"primary-color"}>Imagem</FormLabel>
        <Input
          placeholder="Digite a URL da imagem"
          {...register("imageURL")}
          bg="title-color"
          borderRadius={"20px"}
        />
        {!!errors.imageURL && (
          <FormErrorMessage>{errors.imageURL.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.price}>
        <FormLabel color={"primary-color"}>Preço</FormLabel>
        <Input
          bg="title-color"
          borderRadius={"20px"}
          placeholder="Digite o preço do produto"
          {...register("price")}
          onChange={(e) => format(e.target.value)}
          value={price}
          type="text"
        />
        {!!errors.price && (
          <FormErrorMessage>{errors.price.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel color={"primary-color"}>Descrição</FormLabel>
        <Textarea
          bg="title-color"
          borderRadius={"20px"}
          placeholder="Digite a descrição do produto"
          {...register("description")}
        />
        {errors.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.categoryId}>
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
      <Button bg="logo-color" border={"20px"} type="submit">
        Adicionar
      </Button>
    </Flex>
  );
};
