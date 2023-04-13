import { z } from "zod";
import { baseCategorySchema } from "./category.schemas";

export const baseMenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageURL: z.string(),
  categoryId: z.string(),
  category: baseCategorySchema,
  orderItems: z.array(z.unknown()),
});
