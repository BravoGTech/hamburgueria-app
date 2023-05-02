import { Container, Image } from "@chakra-ui/react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/OrdersContext";
import { IOrdersData } from "../interfaces/orders.interfaces";

export const OrdersPage = () => {
  const { data } = useContext(OrderContext);

  const [orders, setOrders] = useState<IOrdersData>();

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  console.log(orders);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  console.log(orders);
  // const orders = [
  //   {
  //     id: 1,
  //     timestamp: "02/05/2023 15:30",
  //     lastUpdate: "02/05/2023 16:00",
  //     order: "Camiseta, Calça Jeans",
  //   },
  //   // Adicione mais pedidos aqui...
  // ];
  return (
    <Container maxW={"8xl"}>
      <VStack spacing={4} alignItems="stretch">
        <Box>
          {orders?.length === 0 ? (
            <Image
              src="https://cdn.discordapp.com/attachments/682800725855961174/1103086877013188629/Igor_Garcia_Create_a_funny_image_of_a_burger_with_sad_face_wait_19d577bb-3f46-4126-ac35-a190237db01d.png"
              w="30%"
              m="0 auto"
            />
          ) : (
            <Table variant="simple" bg="white" borderRadius={"10px"}>
              <Thead>
                <Tr>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Nº do Pedido
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Horário do Pedido
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Última Atualização
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Pedido
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Ações
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders?.map((order) => (
                  <Tr key={order.id}>
                    <Td textAlign={"center"}>{order.orderNumber}</Td>
                    <Td textAlign={"center"}>{formatDate(order.createdAt)}</Td>
                    <Td textAlign={"center"}>{formatDate(order.updatedAt)}</Td>
                    <Td textAlign={"center"}>
                      {order.orderItems.map(
                        (item) =>
                          `${item.quantity}x ${item.menuItem.name}. ${item.instructions}`
                      )}
                    </Td>
                    <Td textAlign={"center"}>
                      <Button colorScheme="teal" variant="outline" size="sm">
                        Atualizar
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
    </Container>
  );
};
