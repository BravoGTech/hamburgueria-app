import { Fragment, useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/OrdersContext";
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
import { IOrdersData } from "../interfaces/orders.interfaces";

export const DeliveryPage = () => {
  const { data } = useContext(OrderContext);

  const [orders, setOrders] = useState<IOrdersData>();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
                    Endereço de Entrega
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Ações
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders?.map((order) => (
                  <Fragment key={order.id}>
                    {order.finishedOrder && (
                      <Tr>
                        <Td textAlign={"center"}>{order.orderNumber}</Td>
                        <Td textAlign={"center"}>
                          {formatDate(order.createdAt)}
                        </Td>
                        <Td textAlign={"center"}>
                          {formatDate(order.updatedAt)}
                        </Td>
                        <Td textAlign={"center"}>
                          {order.deliveryAddress.street},{" "}
                          {order.deliveryAddress.complement},{" "}
                        </Td>
                        <Td textAlign={"center"}>
                          <Button
                            colorScheme="teal"
                            variant="outline"
                            size="sm"
                          >
                            Entrega
                          </Button>
                        </Td>
                      </Tr>
                    )}
                  </Fragment>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
    </Container>
  );
};
