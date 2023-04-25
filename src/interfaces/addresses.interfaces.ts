import { z } from "zod";
import { cepAPIResponseSchema } from "../schemas/addresses.schemas";

export type ICepAPI = z.infer<typeof cepAPIResponseSchema>