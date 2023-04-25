import { Container, Heading } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Container maxW={"lg"} mt="1rem">
      <Heading textAlign={"center"}>Login</Heading>
      <LoginForm />
    </Container>
  );
};
