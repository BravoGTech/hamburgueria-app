import { z } from "zod";

export const orderItemSchema = z.object({
  quantity: z.number(),
  total: z.number(),
  instructions: z.string(),
  menuItemId: z.string(),
});
