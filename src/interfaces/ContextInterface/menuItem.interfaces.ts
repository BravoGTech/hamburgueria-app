import { baseMenuItemSchema } from "./../../schemas/menuItem.shemas";
import { z } from "zod";

export interface IMenuItemContext {
  data: IMenuItemInterfaceData[];
  isFetching: boolean
}

export type IMenuItemInterfaceData = z.infer<typeof baseMenuItemSchema>;
