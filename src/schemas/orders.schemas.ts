import { z } from "zod";
import { orderItemSchema } from "./orderItems.schemas";
import { userSchema } from "./users.schemas";
import { deliveryAddressSchema } from "./addresses.schemas";
import { baseCategorySchema } from "./category.schemas";

export const BaseOrderSchema = z.object({
  id: z.string(),
  orderNumber: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  paymentMethod: z.string(),
  orderConfirm: z.boolean(),
  finishedOrder: z.boolean(),
  orderItems: z.array(orderItemSchema),
  user: userSchema,
  deliveryAddress: deliveryAddressSchema,
});

export const createOrderSchema = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  user: true,
  orderConfirm: true,
  finishedOrder: true,
}).extend({
  userId: z.string(),
  deliveryAddress: z.string(),
});

export const returnCreateOrderSchema = BaseOrderSchema.omit({
  user: true,
}).extend({
  userId: z.string(),
});
