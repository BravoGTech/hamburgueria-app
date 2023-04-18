import { Heading } from "@chakra-ui/react";
import { Cart } from "../components/Cart";

export const CartPage = () => {
  return (
    <>
      <Heading mt="3rem">Carrinho</Heading>
      <Cart />
    </>
  );
};
