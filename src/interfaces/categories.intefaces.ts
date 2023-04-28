import { z } from "zod";
import { baseCategorySchema } from "../schemas/category.schemas";

export interface categoriesContextData {
  data: ICategoryData[] | undefined;
  isFetching: boolean
}

export type ICategoryData = z.infer<typeof baseCategorySchema>;
