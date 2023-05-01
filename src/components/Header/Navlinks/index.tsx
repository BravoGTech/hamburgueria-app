import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { MenuItem } from "./MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IMenuItemData } from "../../MenuItemCard/ModalConfirm";
import jwt_decode from "jwt-decode";

interface NavLinksProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const NavLinks = ({ isOpen, onToggle }: NavLinksProps) => {
  let location = useLocation();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState(location.pathname);
  const [auth, setAuth] = useState(false);

  const token = localStorage.getItem("@DownTown:Token") || "";

  const cart: IMenuItemData[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode<any>(token);

      const { isAdmin } = decodedToken;

      if (!isAdmin) {
        setAuth(false);
      } else {
        setAuth(true);
      }
    }
  }, [token]);

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("@DownTown:Token");
    setAuth(false);
    navigate("/");
  };

  return (
    <Flex
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={5}
        align={{ base: "flex-start", sm: "center" }}
        justify={{ base: "space-between" }}
        direction={{ base: "column", sm: "row" }}
        pt={{ base: "8", lg: "0" }}
        paddingRight={[5]}
      >
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Home
        </MenuItem>

        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/cardapio"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Cardápio
        </MenuItem>

        <Menu>
          <MenuButton
            fontFamily={"Montserrat"}
            color={"primary-color"}
            fontSize={"20px"}
          >
            Minha Conta
          </MenuButton>
          <MenuList>
            {token && auth ? (
              <>
                <MenuItemOption onClick={() => navigate("/admin")}>
                  Minha Conta
                </MenuItemOption>
                <MenuItemOption>Atualizar Cardápio</MenuItemOption>
                <MenuItemOption>Pedidos</MenuItemOption>
                <MenuItemOption onClick={handleLogout}>Logout</MenuItemOption>
              </>
            ) : token && !auth ? (
              <>
                <MenuItemOption>Minha Conta</MenuItemOption>
                <MenuItemOption>Meus Pedidos</MenuItemOption>
                <MenuItemOption>Atualizar Endereço</MenuItemOption>
                <MenuItemOption>Atualizar Informações</MenuItemOption>
                <MenuItemOption onClick={handleLogout}>Logout</MenuItemOption>
              </>
            ) : (
              <>
                <MenuItemOption onClick={() => navigate("/login")}>
                  Login
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/register")}>
                  Cadastre-se
                </MenuItemOption>
              </>
            )}
          </MenuList>
        </Menu>
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/carrinho"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          <Flex
            justify={"center"}
            align={"center"}
            gap="0.5rem"
            display={{ base: "none", md: "flex" }}
          >
            <Box pos={"relative"}>
              <BsCartFill />
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
                {cart.length}
              </Flex>
            </Box>
          </Flex>
        </MenuItem>
      </Stack>
    </Flex>
  );
};
