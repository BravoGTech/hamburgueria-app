import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CreateMenuItem } from "../components/CardapioForms/CreateMenuItem";
import { EditMenuItem } from "../components/CardapioForms/EditMenuItem";
import { DeleteMenuItem } from "../components/CardapioForms/DeleteMenuItem";

export const AdminPage = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const handleClick = (index: number) => {
    setSelectedMenu((prevState) => (prevState === index ? null : index));
  };
  return (
    <Container maxW={"8xl"} mt="1rem">
      <Heading fontSize={"40px"}>Bem Vindo</Heading>
      <Flex justify={"center"} align={"center"} mt="2rem" gap="5rem ">
        <Heading
          onClick={handleSubMenu}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"26px"}
          borderBottom={showSubMenu ? "solid 1px white" : "none"}
        >
          Atualizar Cardápio
        </Heading>
        <Heading fontFamily={"Montserrat"} fontSize={"26px"}>
          Pedidos
        </Heading>
      </Flex>
      {showSubMenu && (
        <Flex justify={"center"} align={"center"} gap="5rem" mt="3rem">
          <Text
            color={selectedMenu === 0 ? "white" : "gray"}
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            borderBottom={selectedMenu === 0 ? "2px solid white" : ""}
            onClick={() => handleClick(0)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Adicionar
          </Text>
          <Text
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            color={selectedMenu === 1 ? "white" : "gray"}
            borderBottom={selectedMenu === 1 ? "2px solid white" : ""}
            onClick={() => handleClick(1)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Editar
          </Text>
          <Text
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            color={selectedMenu === 2 ? "white" : "gray"}
            borderBottom={selectedMenu === 2 ? "2px solid white" : ""}
            onClick={() => handleClick(2)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Deletar
          </Text>
        </Flex>
      )}
      {selectedMenu === 0 ? (
        <CreateMenuItem />
      ) : selectedMenu === 1 ? (
        <EditMenuItem />
      ) : selectedMenu === 2 ? (
        <DeleteMenuItem />
      ) : null}
    </Container>
  );
};
