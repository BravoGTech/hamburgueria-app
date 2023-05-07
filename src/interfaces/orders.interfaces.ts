import { z } from "zod";
import {
  BaseOrderSchema,
  Order,
  createOrderSchema,
  returnCreateOrderSchema,
} from "../schemas/orders.schemas";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface IOrderContextData {
  data: IOrdersData | undefined;
  createOrder: UseMutateFunction<
    IReturnCreateOrder,
    any,
    ICreateOrderWithFunction,
    unknown
  >;
  setOrdersQuantity: React.Dispatch<React.SetStateAction<number>>;
  ordersQuantity: number;
  statusOrder: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    IStatusOrder,
    unknown
  >;
  deleteOrder: UseMutateFunction<any, unknown, string, unknown>
  isFetching: boolean
}

export type ICreateOrder = z.infer<typeof createOrderSchema>;

export type IReturnCreateOrder = z.infer<typeof returnCreateOrderSchema>;

export type ICreateOrderWithFunction = {
  newOrder: ICreateOrder;
  incrementOrderNumber: () => void;
};

export type IStatusOrder = {
  data: {
    orderId: string;
    orderConfirm?: boolean;
    finishedOrder?: boolean;
  };
};
export type IOrdersData = z.infer<typeof Order>[];

export type IResponseStatusOrder = z.infer<typeof BaseOrderSchema>;
