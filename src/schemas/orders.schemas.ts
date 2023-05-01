import { z } from "zod";
import { orderItemDataSchema, orderItemSchema } from "./orderItems.schemas";
import { userSchema } from "./users.schemas";
import { deliveryAddressSchema } from "./addresses.schemas";

export const BaseOrderSchema = z.object({
  id: z.string(),
  orderNumber: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  paymentMethod: z.string(),
  orderConfirm: z.boolean(),
  finishedOrder: z.boolean(),
  orderItems: z.array(orderItemSchema),
  // user: userSchema,
  deliveryAddress: deliveryAddressSchema,
});

export const createOrderSchema = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  user: true,
  orderConfirm: true,
  finishedOrder: true,
  deliveryAddress: true,
}).extend({
  userId: z.string(),
  deliveryAddressId: z.string(),
});

export const returnCreateOrderSchema = BaseOrderSchema.extend({
  userId: z.string(),
});

export const returnOrderDataSchema = BaseOrderSchema.extend({
  orderItems: z.array(orderItemDataSchema),
});
