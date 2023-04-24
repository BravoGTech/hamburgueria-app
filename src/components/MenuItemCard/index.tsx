import { useState } from "react";
import { IMenuItemInterfaceData } from "../../interfaces/ContextInterface/menuItem.interfaces";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCartPlusFill } from "react-icons/bs";
import { ModalConfirm } from "./ModalConfirm";

interface IMenuItemCardProps {
  item: IMenuItemInterfaceData;
}

export const MenuItensCard = ({ item }: IMenuItemCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <Grid
        templateColumns="auto 1fr 100px"
        gap={4}
        p="1rem 0"
        color="logo-color"
        onClick={handleClick}
        cursor="pointer"
      >
        <GridItem>
          <Text>{item.name}</Text>
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={1}
          alignSelf="stretch"
          w="100%"
          bg="transparent"
          borderBottom={"dotted"}
        />
        <GridItem>
          <Text as="b">{`R$${item.price.toFixed(2)}`}</Text>
        </GridItem>
      </Grid>
      {show && (
        <Flex
          bg="rgb(228, 216, 196, 0.55)"
          borderRadius={"10px"}
          // p="1rem"
          justify={"space-around"}
          gap="1rem"
          w="94%"
        >
          <Image
            src={item.imageURL}
            minW={"200px"}
            w="30%"
            borderRadius={"10px"}
            p="1rem"
          />
          <Flex flexDir={"column"} w="100%" gap="0.5rem" p="1rem 0">
            <Heading
              fontWeight={"400"}
              lineHeight={"37.5px"}
              fontSize="26px"
              size={"sm"}
              color="#1E1E1E"
              textAlign={"center"}
            >
              {item.name}
            </Heading>
            <Flex flexDir={"column"}>
              <Heading
                fontWeight={"bold"}
                lineHeight={"37.5px"}
                fontSize="18px"
                color="#1E1E1E"
                fontFamily={"montserrat, sans serif"}
              >
                Descrição:
              </Heading>
              <Text fontFamily={"roboto"}>{item.description}</Text>
            </Flex>
          </Flex>
          <Flex
            bg="#5f4848"
            w="15%"
            borderTopRightRadius={"10"}
            borderBottomRightRadius={"10"}
            cursor={"pointer"}
            align={"center"}
            justify={"center"}
            onClick={onOpen}
          >
            <BsCartPlusFill color="white" size={30} />
          </Flex>
        </Flex>
      )}
      <ModalConfirm isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
};
