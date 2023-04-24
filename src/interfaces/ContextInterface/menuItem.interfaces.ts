import { UseMutateFunction } from "@tanstack/react-query";
import {
  baseMenuItemSchema,
  menuItemDataSchema,
} from "./../../schemas/menuItem.shemas";
import { z } from "zod";

export interface IMenuItemContext {
  data: IMenuItemInterfaceData[];
  isFetching: boolean;
  listItemDetail: UseMutateFunction<
    {
      id: string;
      name: string;
      price: number;
      description: string;
      imageURL: string;
      categoryId: string;
    },
    any,
    string,
    unknown
  >;

  // menuItemDetailData: IMenuItemData | undefined;
}

export type IMenuItemInterfaceData = z.infer<typeof baseMenuItemSchema>;

export type IMenuItemData = z.infer<typeof menuItemDataSchema>;
