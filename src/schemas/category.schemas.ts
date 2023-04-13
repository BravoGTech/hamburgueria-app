import { z } from "zod";

export const baseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});
