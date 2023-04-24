import { Button, Flex, Heading } from "@chakra-ui/react";
import { IMenuItemData } from "../MenuItemCard/ModalConfirm";
import { CartCard } from "./CartCard";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrdersContext";
import { ICreateOrder } from "../../interfaces/ContextInterface/orders.interfaces";

export const Cart = () => {
  const { createOrder } = useContext(OrderContext);

  const [totalValue, setTotalValue] = useState(0);
  const [cart, setCart] = useState<IMenuItemData[]>([]);
  const [orderNumber, setOrderNumber] = useState(1);

  useEffect(() => {
    const storedCart: IMenuItemData[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const storedOrderNumber = localStorage.getItem("orderNumber");
    const storedDate = localStorage.getItem("storedDate");

    setCart(storedCart);
    handleTotalValue(storedCart);

    const currentDate = new Date().toDateString();

    if (storedDate !== currentDate) {
      localStorage.setItem("storedDate", currentDate);
      setOrderNumber(1);
    } else {
      setOrderNumber(storedOrderNumber ? parseInt(storedOrderNumber) : 1);
    }
  }, []);

  const incrementOrderNumber = () => {
    setOrderNumber((prevOrderNumber) => {
      const newOrderNumber = prevOrderNumber + 1;
      localStorage.setItem("orderNumber", newOrderNumber.toString());
      return newOrderNumber;
    });
  };

  const handleTotalValue = (cart: IMenuItemData[]) => {
    const value = cart.reduce((acc, currentValue) => {
      return acc + currentValue.MenuItemCart.total;
    }, 0);
    setTotalValue(value);
  };

  const handleRemoveItem = (item: IMenuItemData) => {
    const newCart = cart.filter((cartItem) => cartItem !== item);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    handleTotalValue(newCart);
  };

  const handleFinishCheckout = () => {
    const orderItems = cart.map((cartItem) => {
      return cartItem.MenuItemCart;
    });

    const newOrder: ICreateOrder = {
      orderNumber: orderNumber,
      deliveryAddress: "1909c4a9-2e80-40a8-bd5d-b502eea8459d",
      paymentMethod: "Cartão de Crédito",
      userId: "f2b1d0ed-fac7-4684-9858-ea2799dae76b",
      orderItems,
    };

    createOrder({ newOrder, incrementOrderNumber });
  };
  return (
    <>
      <Flex flexDir={"column"} gap="1rem">
        {cart.map((item) => {
          return (
            <CartCard
              item={item}
              onRemove={handleRemoveItem}
              handleTotalValue={handleTotalValue}
            />
          );
        })}
      </Flex>
      <Flex
        justify={"center"}
        align={"flex-end"}
        w="100%"
        mt="1rem"
        gap="1rem"
        flexDir={"column"}
      >
        <Heading fontFamily={"Inter"} fontSize={"28px"}>
          Total:{" "}
          {totalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Heading>
        <Button onClick={handleFinishCheckout} colorScheme="green">
          Finalizar Compra
        </Button>
      </Flex>
    </>
  );
};
