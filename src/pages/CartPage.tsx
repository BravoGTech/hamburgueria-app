import { Flex, Heading } from "@chakra-ui/react";
import { Cart } from "../components/Cart";

export const CartPage = () => {
  return (
    <Flex flexDir={"column"} gap="2rem" pb='1rem'>
      <Heading mt="3rem">Carrinho</Heading>
      <Cart />
    </Flex>
  );
};
