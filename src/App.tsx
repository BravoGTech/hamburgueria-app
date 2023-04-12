import { Box, Container, Heading } from "@chakra-ui/react";
import bg from "./assets/bg 1.png";
import { Header } from "./components/Header";

function App() {
  return (
    <Box backgroundImage={bg} h="100vh" backgroundSize={"cover"}>
      <Container maxW={"8xl"}>
        <Header />
      </Container>
    </Box>
  );
}

export default App;
