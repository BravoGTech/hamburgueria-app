import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { MenuToggle } from "./MenuToggle";
import { NavLinks } from "./Navlinks";
import Logo from "../../assets/logo.png";
import { BsCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrdersContext";

export const Header = () => {
  const { ordersQuantity } = useContext(OrderContext);
  const { isOpen, onToggle } = useDisclosure();
  const [quantity, setQuantity] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]").length
  );

  const navigate = useNavigate();

  useEffect(() => {
    const cart = localStorage.getItem("cart") || "[]";
    setQuantity(cart.length);
  }, [ordersQuantity]);

  return (
    <Flex
      as="nav"
      align={{ base: isOpen ? "flex-start" : "center", sm: "center" }}
      p={["1rem"]}
      justify={{ md: "space-between" }}
      flexDir={{ base: "column", md: "row" }}
      bg="transparent"
    >
      <Flex
        justify={{ base: "space-between" }}
        w={{ base: "100%", md: "auto" }}
      >
        <Image
          src={Logo}
          cursor="pointer"
          width={["120px"]}
          onClick={() => navigate("/")}
        />
        <Flex
          justify={"center"}
          align={"center"}
          gap="0.5rem"
          color="primary-color"
          cursor={"pointer"}
          display={{ base: "flex", md: "none" }}
          onClick={() => navigate("/carrinho")}
        >
          <Box pos={"relative"}>
            <BsCartFill size={25} />
            <Flex
              h="20px"
              w="20px"
              rounded={"50%"}
              bg={"red"}
              fontSize={"12px"}
              justify={"center"}
              align={"center"}
              fontWeight={"bold"}
              p="0.5rem"
              pos={"absolute"}
              top="-3"
              left="3"
            >
              {quantity}
            </Flex>
          </Box>
        </Flex>
        <MenuToggle isOpen={isOpen} onToggle={onToggle} />
      </Flex>
      <NavLinks isOpen={isOpen} onToggle={onToggle} />
    </Flex>
  );
};
