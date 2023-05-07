import { z } from "zod";
import { menuItemForOrder } from "./menuItem.schemas";

export const orderItemSchema = z.object({
  quantity: z.number(),
  total: z.number(),
  instructions: z.string(),
  menuItemId: z.string(),
});

export const orderItemDataSchema = orderItemSchema.extend({
  id: z.string(),
});

export const orderItemForOrder = orderItemSchema
  .extend({
    id: z.string(),
    menuItem: menuItemForOrder,
  })
  .omit({
    menuItemId: true,
  });
