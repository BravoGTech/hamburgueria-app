import { useState } from "react";
import { IMenuItemInterfaceData } from "../../interfaces/menuItem.interfaces";
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
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

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
        templateColumns="auto auto 1fr auto"
        gap={4}
        p="1rem 0"
        color="logo-color"
        onClick={handleClick}
        cursor="pointer"
        justifyItems="center"
        alignItems="center"
      >
        <GridItem>
          <Text as="b">
            {show ? <FaCaretDown size="26px" /> : <FaCaretRight size="26px" />}
          </Text>
        </GridItem>
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
          align={{ base: "center" }}
          gap="1rem"
          w="94%"
          flexDir={{ base: "column", md: "row" }}
        >
          <Image
            src={item.imageURL}
            minW={"200px"}
            w="30%"
            borderRadius={"20px"}
            p="1rem"
          />
          <Flex flexDir={"column"} w="100%" gap="0.5rem" p="1rem">
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
            p={{ base: "0.5rem"}}
            w={{ base: "100%", md: "15%" }}
            borderTopRightRadius={{ base: "0", md: "10" }}
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
