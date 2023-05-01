import { z } from "zod";

export const orderItemSchema = z.object({
  quantity: z.number(),
  total: z.number(),
  instructions: z.string(),
  menuItemId: z.string(),
});

export const orderItemDataSchema = orderItemSchema.extend({
  id: z.string(),
});
