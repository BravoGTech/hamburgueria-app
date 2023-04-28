import { UseMutateFunction } from "@tanstack/react-query";
import {
  baseMenuItemSchema,
  createMenuItemSchema,
  menuItemDataSchema,
} from "../schemas/menuItem.schemas";
import { z } from "zod";
import { FieldValues } from "react-hook-form";

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

export type IMenuItemCreate = z.infer<typeof createMenuItemSchema>;
export type IMenuItemCreateWithFieldValues = IMenuItemCreate & FieldValues;
