import { createContext, useState } from "react";
import { IProvider } from "../interfaces/ContextInterface";
import {
  ICreateOrderWithFunction,
  IOrderContextData,
  IReturnCreateOrder,
} from "../interfaces/ContextInterface/orders.interfaces";
import { api } from "../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const OrderContext = createContext<IOrderContextData>(
  {} as IOrderContextData
);

export const OrderProvider = ({ children }: IProvider) => {
  const [ordersQuantity, setOrdersQuantity] = useState(0);
  // const listOrders = async () => {
  //   const response = await api.get("/orders");
  //   return response.data;
  // };

  // const { data, isFetching, isError, refetch } = useQuery({
  //   queryKey: ["orders"],
  //   queryFn: listOrders,
  // });

  const { mutate: createOrder } = useMutation(
    async ({
      newOrder,
      incrementOrderNumber,
    }: ICreateOrderWithFunction): Promise<IReturnCreateOrder> => {
      return await api.post(`/orders`, newOrder).then((response) => {
        incrementOrderNumber();
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);

        return response;
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
  return (
    <OrderContext.Provider
      value={{ createOrder, setOrdersQuantity, ordersQuantity }}
    >
      {children}
    </OrderContext.Provider>
  );
};
