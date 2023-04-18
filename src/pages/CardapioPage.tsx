import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useState } from "react";
import { MenuItemContext } from "../contexts/MenuItemContext";
import { MenuItensCard } from "../components/MenuItemCard";

export const CardapioPage = () => {
  const { data: cardapio, isFetching } = useContext(MenuItemContext);
  const [selected, setSelected] = useState<string | null>(null);

  const handleButtonClick = (button: string) => {
    if (button === selected) {
      setSelected(null);
    } else {
      setSelected(button);
    }
  };

  return (
    <Flex flexDir={"column"} w="100%" gap={"2rem"}>
      <Flex align={"center"} justify={"center"} w="100%">
        <Heading size={{ base: "2xl", md: "3xl", lg: "4xl" }}>Cardápio</Heading>
      </Flex>
      <Flex justify={"center"} gap={"5rem"}>
        <Button
          bg={selected === "hamburgers" ? "logo-color" : "#E4D8C4"}
          color={selected === "hamburgers" ? "black-color" : "gray.800"}
          rounded={"50px"}
          h="50px"
          w="200px"
          transition={"0.3s"}
          _hover={{ bg: "logo-color", color: "black-color" }}
          onClick={() => handleButtonClick("hamburgers")}
        >
          Hamburgers
        </Button>
        <Button
          bg={selected === "bebidas" ? "logo-color" : "#E4D8C4"}
          color={selected === "bebidas" ? "black-color" : "gray.800"}
          rounded={"50px"}
          h="50px"
          w="200px"
          transition={"0.3s"}
          _hover={{ bg: "logo-color", color: "black-color" }}
          onClick={() => handleButtonClick("bebidas")}
        >
          Bebidas
        </Button>
      </Flex>
      <Container maxW={"4xl"}>
        <Heading m="3.125rem 0 1.5rem 0">Hamburguers</Heading>

        {isFetching ? (
          <Spinner />
        ) : (
          cardapio.map((item) => {
            if (item.category.name === "Hamburgers") {
              return (
                <Fragment key={item.id}>
                  <MenuItensCard item={item} />
                </Fragment>
              );
            }
          })
        )}

        <Heading m="3.125rem 0 1.5rem 0">Bebidas</Heading>

        {isFetching ? (
          <Spinner />
        ) : (
          cardapio.map((item) => {
            if (item.category.name === "Bebidas") {
              return (
                <Fragment key={item.id}>
                  <MenuItensCard item={item} />
                </Fragment>
              );
            }
          })
        )}

        <Heading m="3.125rem 0 1.5rem 0">Lanches Árabes</Heading>

        {isFetching ? (
          <Spinner />
        ) : (
          cardapio.map((item) => {
            if (item.category.name === "Árabes") {
              return (
                <Fragment key={item.id}>
                  <MenuItensCard item={item} />
                </Fragment>
              );
            }
          })
        )}
      </Container>
    </Flex>
  );
};