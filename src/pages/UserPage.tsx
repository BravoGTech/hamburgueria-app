import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";
import { UserAddresses } from "../components/UserPage/Address";
import { AddressesContext } from "../contexts/AddressesContext";

export const UserPage = () => {
  const { listUserProfile, userProfile } = useContext(UsersContext);
  const { handleAddress } = useContext(AddressesContext);

  useEffect(() => {
    listUserProfile();
  }, [handleAddress]);

  return (
    <Container maxW={"8xl"}>
      <Heading mt="2rem">
        Bem vindo(a),{" "}
        <Text letterSpacing={"3px"} fontSize={"35px"} as="b" color="logo-color">
          {userProfile?.name}
        </Text>
      </Heading>
      <Flex>
        {userProfile.addresses && (
          <UserAddresses addresses={userProfile.addresses} />
        )}
        <Flex w="100%" align={"center"} justify={"center"}>
          <Heading fontFamily={"Montserrat"}>Últimos Pedidos</Heading>
        </Flex>
      </Flex>
    </Container>
  );
};
