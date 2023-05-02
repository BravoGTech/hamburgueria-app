import { createContext, useState } from "react";
import { IProvider } from "../interfaces";
import {
  ICreateOrderWithFunction,
  IOrderContextData,
  IOrdersData,
  IReturnCreateOrder,
} from "../interfaces/orders.interfaces";
import { api } from "../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const OrderContext = createContext<IOrderContextData>(
  {} as IOrderContextData
);

export const OrderProvider = ({ children }: IProvider) => {
  const [ordersQuantity, setOrdersQuantity] = useState(0);
  const listOrders = async (): Promise<IOrdersData> => {
    const token = localStorage.getItem("@DownTown:Token");

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get("/orders");
    return response.data;
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: listOrders,
  });

  const { mutate: createOrder } = useMutation(
    async ({
      newOrder,
      incrementOrderNumber,
    }: ICreateOrderWithFunction): Promise<IReturnCreateOrder> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.post(`/orders`, newOrder).then((response) => {
        incrementOrderNumber();
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);
        toast.success("Pedido Efetuado com sucesso");
        localStorage.setItem("cart", "[]");
        refetch();
        
        return response;
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
  return (
    <OrderContext.Provider
      value={{ createOrder, setOrdersQuantity, ordersQuantity, data }}
    >
      {children}
    </OrderContext.Provider>
  );
};
