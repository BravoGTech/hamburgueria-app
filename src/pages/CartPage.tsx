import { Container, Flex, Heading } from "@chakra-ui/react";
import { Cart } from "../components/Cart";

export const CartPage = () => {
  return (
    <Container maxW={{ base: "8xl", md: "6xl", "2xl": "8xl" }}>
      <Flex flexDir={"column"} gap="2rem" pb="1rem">
        <Heading mt="3rem">Carrinho</Heading>
        <Cart />
      </Flex>
    </Container>
  );
};
