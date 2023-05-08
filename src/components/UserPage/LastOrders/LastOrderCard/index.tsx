import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { IUserDetailsOrderProps } from "../../../../interfaces/orders.interfaces";

export const LastOrderCard = ({ order }: IUserDetailsOrderProps) => {
  console.log(order);

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <Flex
      bg="rgba(255, 255, 255, 0.80)"
      p="1rem"
      borderRadius={"30px"}
      minWidth={"300px"}
      maxW={"500px"}
    >
      {order?.orderItems?.map((item) => {
        return (
          <Flex
            flexDir={{ base: "column", md: "row" }}
            gap="1rem"
            align={{ base: "center" }}
          >
            <Image
              src={item.menuItem.imageURL}
              w="100%"
              maxW={"140px"}
              maxH={"190px"}
              borderRadius={"10px"}
              objectFit={"cover"}
            />
            <Flex flexDir={"column"} gap="1rem">
              <Text>
                <Text as="b">Data:</Text> {formatDate(order.createdAt)}
              </Text>
              <Text>
                <Text as="b">Pedido:</Text> {item.quantity}x{" "}
                {item.menuItem.name}
              </Text>
              <Button fontSize={"13px"} borderRadius={"20px"} bg="logo-color">
                Adicionar ao Carrinho
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
