import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { Footer } from "../components/Footer";
import bgHome from "../assets/image 2.png";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Container maxW={"5xl"}>
        <Flex
          as="section"
          flexDir={"column"}
          gap="1rem"
          h={{ base: "100%", md: "90vh" }}
          justify={"center"}
        >
          <Heading fontSize={"32px"} letterSpacing={"5%"} color="#DBBE9E">
            Bem vindos à
          </Heading>
          <Heading fontSize={"65px"} letterSpacing={"5px"}>
            DownTown
          </Heading>
          <Heading fontSize={"32px"} color="second-color">
            Sua Hamburgueria gourmet
          </Heading>
          <Text color="#856959" fontFamily={"inter"}>
            Acesse nosso cardápio e descubra uma nova dimensão de sabor.
          </Text>
          <Button
            fontFamily={"Inter"}
            borderRadius={"50px"}
            w="330px"
            bg="#E4D8C4"
            p="24px"
            fontSize={"18px"}
            mt="5rem"
            onClick={() => navigate("/cardapio")}
          >
            Acessar Cardápio
          </Button>
        </Flex>
      </Container>

      <Flex bg="#E1D4C0" mt="2rem" p="2rem 0">
        <Container maxW={"5xl"}>
          <Heading textAlign={"center"} fontSize={"40px"} color={"#000000"}>
            O que temos para você
          </Heading>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            mt="2rem"
            justify={"space-around"}
            alignItems={"flex-start"}
            gap="1rem"
          >
            <Flex flexDir={"column"} align={"center"} gap="0.5rem" w="100%">
              <IoFastFoodSharp size="70" color={"#43342A"} />
              <Heading color={"#43342A"}>Hamburguers</Heading>
              <Text color={"#43342A"}>
                Suculento hambúrguer artesanal e Árabe
              </Text>
            </Flex>
            <Flex flexDir={"column"} align={"center"} gap="0.5rem" w="100%">
              <MdDeliveryDining size="80" color={"#43342A"} />
              <Heading color={"#43342A"}>Delivery</Heading>
              <Text color={"#43342A"} textAlign={"center"}>
                Saboreie nossas deliciosas ofertas e pratos exclusivos de
                hambúrgueres direto para sua casa através do nosso aplicativo.
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};
