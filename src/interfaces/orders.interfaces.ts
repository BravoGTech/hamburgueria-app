import { z } from "zod";
import {
  Order,
  createOrderSchema,
  returnCreateOrderSchema,
} from "../schemas/orders.schemas";
import { UseMutateFunction } from "@tanstack/react-query";

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
}

export type ICreateOrder = z.infer<typeof createOrderSchema>;

export type IReturnCreateOrder = z.infer<typeof returnCreateOrderSchema>;

export type ICreateOrderWithFunction = {
  newOrder: ICreateOrder;
  incrementOrderNumber: () => void;
};

export type IOrdersData = z.infer<typeof Order>[];
