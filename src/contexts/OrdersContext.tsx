import { createContext, useState } from "react";
import { IProvider } from "../interfaces";
import {
  ICreateOrderWithFunction,
  IOrderContextData,
  IOrdersData,
  IResponseStatusOrder,
  IReturnCreateOrder,
  IStatusOrder,
} from "../interfaces/orders.interfaces";
import { api } from "../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import jwt_decode from 'jwt-decode'

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

  const token = localStorage.getItem("@DownTown:Token")
  
  const {isAdmin} = jwt_decode<any>(token)

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: listOrders,
    enabled: isAdmin && token != null,
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

  const { mutate: statusOrder } = useMutation(
    async ({ data }: IStatusOrder): Promise<IResponseStatusOrder> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api
        .patch("/orders/statusOrder", data)
        .then((response) => response.data);
    },
    {
      onSuccess: (response) => {
        refetch();
      },
      onError: (error: AxiosError) => {
        console.log(error);
      },
    }
  );

  const { mutate: deleteOrder } = useMutation(
    async (id: string) => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.delete(`/orders/${id}`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (_) => {
        toast.success("Pedido excluido");
        refetch();
      },
    }
  );
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        setOrdersQuantity,
        ordersQuantity,
        data,
        statusOrder,
        deleteOrder,
        isFetching,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
