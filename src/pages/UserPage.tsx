import { Container } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";

export const UserPage = () => {
  const { listUserProfile, userProfile } = useContext(UsersContext);

  useEffect(() => {
    listUserProfile();
  }, []);

  console.log(userProfile)

  return (
    <Container maxW={"8xl"}>
      <h1>UserPage</h1>
    </Container>
  );
};
