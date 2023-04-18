import { z } from "zod";

export const deliveryAddressSchema = z.object({
  id: z.string(),
  zip: z.string(),
  city: z.string(),
  state: z.string(),
  street: z.string(),
  preferred: z.boolean(),
});
